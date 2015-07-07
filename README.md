# microscope
The app from the Discover Meteor book / tutorial (done as a  code along).

https://book.discovermeteor.com/

## Notes
* 'var' keyword, when declaring an object/item, limits the scope to the current file
    - declaring an object item without 'var' makes it global
* Meteor/Mongo
    - find returns a cursor (which is a reactive data source)
    - fetch transforms cursor in to an array
    - NOTE: a Meteor app however, can iterate over a cursor. so fetch is used when you explicitly would like the data in an array

## Feedback
* A minor misinterpretation of the text (Chapter 5, Routing). At first read, I thought the text implied a loading template was included.
    - "Thankfully, Iron Router comes with a built-in way to delay showing a template until the route calling it is ready, and show a loading template instead:"
    - upon further reading I realized you needed to assign/define the loading template
    - perhaps the initial wording could be changed a little to avoid that implication
