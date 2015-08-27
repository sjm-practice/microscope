/**
 * Note, iron router can determine which controller to call for the route. Probably
 * either based on name (I hope not, but the book implies so), or matching up the
 * template (Router.route.name and PostslistController.template).
 *
 * https://github.com/iron-meteor/iron-router/blob/devel/Guide.md#creating-route-controllers
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
        return {sort: this.sort, limit: this.postsLimit()};
    },
    subscriptions: function () {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function () {
        return Posts.find({}, this.findOptions());
    },
    data: function () {
        var hasMore = this.posts().count() === this.postsLimit();
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? this.nextPath() : null
        };
    }
});

NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});

BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function () {
        return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
    }
});
