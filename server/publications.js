Meteor.publish('posts', function (findOptions) {
    check(findOptions, {
        sort: Object,
        limit: Number
    });
    return Posts.find({}, findOptions);
});

Meteor.publish('singlePost', function (id) {
    check(id, String);
    return Posts.find(id);
});

Meteor.publish('comments', function (postId) {
    check(postId, String);
    return Comments.find({ postId: postId });
});

Meteor.publish('notifications', function () {
    return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('currentUser', function () {
    return Meteor.users.find(this.userId, {fields: {createdAt: 1, intercomHash: 1}});
});
