/*
 * Author: author Antonio Pierro
 * email: antonio.pierro@gmail.com
 */
define([
    'jquery',
    'underscore', 
    'backbone',
    'views/app'
], function($, _, Backbone, todoView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/:page': 'defaultAction',
      
      // Default
      '*actions': 'defaultAction'
    },
    defaultAction: function(page){
      todoView.showTasks(parseInt(page, 10));
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
