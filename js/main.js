// Author: Antonio Pierro <antonio.pierro@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
//        ui: 'libs/jquery-ui/jquery.ui.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-optamd3-min',
        mustache: "libs/mustache/mustache-wrap",
        text: 'libs/require/text'
    }
});

require([
    // Load my app module and pass it to my definition function
    "app"
    ], function(App){
        App.initialize();
});
