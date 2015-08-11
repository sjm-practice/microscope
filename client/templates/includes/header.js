Template.header.helpers({
    activeClassForRoute: function (/* route names */) {
        // here are good explanations of how arguments is used
        // with slice/call here...
        // arguments - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
        // call - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
        //        http://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function (name) {
            return Router.current() && Router.current().route.getName() === name;
        });

        // neat JavaScript pattern:
        //   false && string returns false
        //   true && string returns string
        return active && 'active';
    }
});