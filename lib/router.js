Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('notifications');
    }
});

/**
 * Note, iron router can determine which controller to call for the route. Probably
 * either based on name (I hope not, but the book implies so), or matching up the
 * template (Router.route.name and PostslistController.template).
 *
 * It is also possible to specifically set the controller using the 'controller' option.
 */
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function () {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function () {
        return {sort: {submitted: -1}, limit: this.postsLimit()};
    },
    waitOn: function () {
        return Meteor.subscribe('posts', this.findOptions());
    },
    posts: function () {
        return Posts.find({}, this.findOptions());
    },
    data: function () {
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            nextPath: hasMore ? nextPath : null
        };
    }
});


/**
 * Organize routes in order of decreasing specificity. (more specific
 * routes first, less specific routes later)
 */
Router.route('/posts/:_id', {
    name: 'postPage',
    data: function () { return Posts.findOne(this.params._id); },
    waitOn: function () { return Meteor.subscribe('comments', this.params._id); }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () { return Posts.findOne(this.params._id); }
});

Router.route('/submit', { name: 'postSubmit' });

Router.route('/:postsLimit?', {
    name: 'postsList'
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

Router.onBeforeAction('dataNotFound', { only: 'postPage' });
Router.onBeforeAction(requireLogin, { only: 'postSubmit' });

