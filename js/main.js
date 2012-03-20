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
        text: 'libs/require/text'
    }
});

require([
    'views/app'
    ], function(AppView){
        var app_view = new AppView;
});
