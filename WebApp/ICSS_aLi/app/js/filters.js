/// <reference path="../Angular/angular/angular.js" />

var routeFilters = angular.module("routeFilters", []);

routeFilters.filter("titleCase", function () {
    var titleCaseFilt = function (input) {
        var wordsInInput = input.split(' ');
        //angular.forEach(wordsInInput, function (word) {
        //    word = word.charAt[0].toUpperCase() + word.slice(1);
        //});
        for (var i = 0; i < wordsInInput.length; i++) {
            wordsInInput[i] = wordsInInput[i].charAt(0).toUpperCase() + wordsInInput[i].slice(1);
        }
        return wordsInInput.join(' ');
    };
    return titleCaseFilt;
});

routeFilters.filter("searchForFilter", function () {
    // All filters must return a function. The first parameter
    // is the data that is to be filtered, and the second is an
    // argument that may be passed with a colon (searchFor:searchString)

    return function (arr, searchForText) {
        //debugger
        if (!searchForText) {
            return arr;
        }

        var result = [];

        searchForText = searchForText.toLowerCase();
        // Using the forEach helper method to loop through the OBJECTS array
        angular.forEach(arr, function (item) {
            //debugger
            //sender, body, subject
            if (item &&
                (item.sender
                && item.sender.toString().toLowerCase().indexOf(searchForText) !== -1)
                ||
                (item.body
                && item.body.toString().toLowerCase().indexOf(searchForText) !== -1)
                ||
                (item.subject
                && item.subject.toString().toLowerCase().indexOf(searchForText) !== -1)
                ) {
                result.push(item);
            }

            /*
            var setElementTraced = false;
            //loop in elements in each object
            angular.forEach(item, function (itemIn) {
                //if not element already filtered
                if (setElementTraced == false) {
                    if (itemIn && itemIn.toString().toLowerCase().indexOf(searchForText) !== -1) {
                        result.push(item);
                        setElementTraced = true;
                    }
                }
            });
            */
        });

        return result;
    };
});