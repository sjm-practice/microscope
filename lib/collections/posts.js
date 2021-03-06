Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function (userId, post) { return ownsDocument(userId, post); },
    remove: function (userId, post) { return ownsDocument(userId, post); }
});

/**
 * This deny update callback, verifies only url or title are being modified,
 * else prevents the update action from occurring.
 *
 *  (using underscore, without returns the difference of fieldNames and the
 *  listed fields, in an array. If there are fields remaining (length > 0),
 *  the deny returns true, meaning to deny the operation request.
 */
Posts.deny({
    update: function (userId, post, fieldNames) {
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

/**
 * This deny update callback, verifies the submitted post contains valid data
 * (a title and url).
 */
Posts.deny({
    update: function (userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

Meteor.methods({
    postInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var errors = validatePost(postAttributes);
        if (errors.title || errors.url) {
            throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
        }

        var postWithSameLink = Posts.findOne({ url: postAttributes.url });
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            upVoters: [],
            votes: 0,
            commentsCount: 0
        });

        // Due to latency compensation, calling this method in both environments
        // (client & server), make sure this if statement is ony executed on the
        // server side call
        if (Meteor.isServer) {
            var shortUrl = Bitly.shortenURL(post.url);
            if (post.url && shortUrl) {
                post.shortUrl = shortUrl;
            }
        }

        var postId = Posts.insert(post);

        return { _id: postId };
    },
    upvote: function (postId) {
        check(this.userId, String);
        check(postId, String);

        var affected = Posts.update({
            _id: postId,
            upVoters: {$ne: this.userId}
        }, {
            $addToSet: {upVoters: this.userId},
            $inc: {votes: 1}
        });
        if (!affected) {
            throw new Meteor.Error('invalid', "You weren't able to update that post");
        }
    }
});

validatePost = function (post) {
    var errors = {};

    if (!post.title) {
        errors.title = 'Please fill in a headline'
    }

    if (!post.url) {
        errors.url = 'Please fill in a URL'
    }

    return errors;
};