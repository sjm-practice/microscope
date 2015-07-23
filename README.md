# microscope
The app from the Discover Meteor book / tutorial (done as a  code along).

https://book.discovermeteor.com/

## Notes
* 'var' keyword, when declaring an object/item, limits the scope to the current file
    - declaring an object item without 'var' makes it global
* Meteor/MongoDB
    - find returns a cursor (which is a reactive data source)
    - fetch transforms cursor in to an array
    - NOTE: a Meteor app however, can iterate over a cursor. so fetch is used when you explicitly would like the data in an array
* Errors section (validatePost)
    - notice that validatePost is called by client, and server method
    - this prevents unvalidated posts from being entered by a client or server call
    - although safe, this didn't seem very DRY to me
        - my initial inclination would have been to call from server method only, but is a better user experience to call from client as well (immediate user feedback)

## Feedback
* A minor misinterpretation of the text (Chapter 5, Routing). At first read, I thought the text implied a loading template was included.
    - "Thankfully, Iron Router comes with a built-in way to delay showing a template until the route calling it is ready, and show a loading template instead:"
    - upon further reading I realized you needed to assign/define the loading template
    - perhaps the initial wording could be changed a little to avoid that implication
* Near commit 7-1 (submit post): helpful explanation is given for the event handler code, but I think it would have been helpful to explain the second parameter to Router.go as well (I went to the docs to look it up).
* Adding Security (commit 7-2)
    - I got slightly different behavior than described in the book. When trying to create a post with no user logged in, my browser showed my 404 not found page (not_found.html). The book states/shows a blank browser page (nav bar only, no body). My console did show the insert failed: access denied message
    - shouldn't/couldn't an exception be thrown in this case?
* I don't see where css class .not-found and .access-denied are defined (in the source).
    - the access-denied message is not displayed formatted
