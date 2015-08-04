Template.registerHelper('pluralize', function (qty, baseWord) {
    if (qty === 1) {
        return '1 ' + baseWord;
    } else {
        return qty + ' ' + baseWord + 's';
    }
});
