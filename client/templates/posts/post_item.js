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
        // when on the 'home' 'new' 'best' post pages.
        return _.contains(['home', 'bestPosts', 'newPosts'], Router.current().route.getName());
    },
    upvotedClass: function () {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upVoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    }
});

Template.postItem.events({
    'click .upvotable': function (e) {
        e.preventDefault();
        Meteor.call('upvote', this._id);
    }
});