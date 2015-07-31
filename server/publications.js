Meteor.publish('posts', function (findOptions) {
    check(findOptions, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, findOptions);
});

Meteor.publish('comments', function (postId) {
    check(postId, String);
    return Comments.find({ postId: postId });
});

Meteor.publish('notifications', function () {
    return Notifications.find({userId: this.userId, read: false});
});