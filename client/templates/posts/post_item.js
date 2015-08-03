Template.postItem.helpers({
    domain: function () {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    ownPost: function () {
        return this.userId === Meteor.userId();
    },
    showDiscussButton: function () {
        // On this reusable template, only show the 'Discuss' button/link
        // when on the posts list page.
        return Router.current().route.getName() === 'postsList';
    }
});

Template.postItem.events({
    'click .upvote': function (e) {
        e.preventDefault();
        Meteor.call('upvote', this._id);
    }
});