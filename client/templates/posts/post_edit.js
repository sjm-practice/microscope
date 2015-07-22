/**
 * For simple, straight forward edits such as the update and delete below, it
 * is okay practice to do the update and remove operations here, with the allow
 * set up.
 *
 * When the database operations become more than simple, it is better practice
 * to set up a server method. (i.e., if adding preventing a duplicate URL on
 * edit, like done on create, the below update code could/should be moved to
 * a server method.
 *
 * For further explanation/examples see:
 *      https://book.discovermeteor.com/chapter/editing-posts
 *      (Method Calls vs Client-side Data Manipulation note section)
 *      https://book.discovermeteor.com/chapter/allow-and-deny
 */
Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Posts.update(currentPostId, { $set: postProperties }, function (error) {
            if (error) {
                displayClientError(error.reason);
            } else {
                Router.go('postPage', { _id: currentPostId });
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId, function (error) {
                if (error) {
                    displayClientError(error.reason);
                } else {
                    Router.go('postsList');
                }
            });
        }
    }
});