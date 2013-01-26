require([
    "js/libs/jquery/jquery.js", 
    "js/libs/requirejs/require.js", 
    "js/libs/underscore/underscore.js",
    "js/libs/backbone/backbone.js",
    "js/src/editor/transforms.js",
    "js/src/editor/inputHandler.js"
    ], 
    function($) {
        new inputHandler(jQuery);
    }
);