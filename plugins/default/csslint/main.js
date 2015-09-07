/**
 * Interactive Linter Copyright (c) 2015 Miguel Castillo.
 *
 * Licensed under MIT
 */

define(function(require) {
    "use strict";

    var belty          = require("libs/belty");
    var groomer        = require("csslint/groomer");
    var defaultOptions = JSON.parse(require("text!csslint/default.json"));
    var settings       = JSON.parse(require("text!csslint/settings.json"));

    require("csslint/libs/csslint");

    function lint(text, options) {
        options = belty.extend({}, defaultOptions, options);
        var results = CSSLint.verify(text, options).messages;
        var i, length;

        for (i = 0, length = results.length; i < length; i++) {
            delete results[i].rule;
            groomer.groom(results[i]);
        }

        return results;
    }

    return belty.extend(settings, {
        lint: lint
    });
});
