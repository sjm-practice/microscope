Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('notifications');
    }
});

var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

if (Meteor.isClient) {
    Router.onBeforeAction('dataNotFound', {only: 'postPage'});
    Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
}

Router.route('/', {
    name: 'home',
    controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});

Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function () {
        return [
            Meteor.subscribe('singlePost', this.params._id),
            Meteor.subscribe('comments', this.params._id)
        ];
    },
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function () {
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/feed.xml', {
    where: 'server',
    name: 'rss',
    action: function () {
        var feed = new RSS({
            title: 'New Microscope Posts',
            description: "the latest posts from Microscope, the smallest news aggregator."
        });

        Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function (post) {
            feed.item({
                title: post.title,
                description: post.body,
                author: post.author,
                date: post.submitted,
                url: '/posts/' + post._id
            });
        });

        this.response.write(feed.xml());
        this.response.end();
    }
});

Router.route('/api/posts', {
    where: 'server',
    name: 'apiPosts',
    action: function () {
        var data = Posts.find().fetch();
        this.response.write(JSON.stringify(data));
        this.response.end();
    }
});
