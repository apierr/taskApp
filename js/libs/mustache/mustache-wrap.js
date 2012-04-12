/*
 * Author: Antonio Pierro <antonio.pierro@gmail.com>
 * 
 * I added this file because 
 * I would like to use Mustache instead of underscore.js 
 * for my templating engine in a Backbone View.
 */
define(['libs/mustache/mustache'], function(){
  // Tell Require.js that this module returns a reference to Mustache
  return Mustache;
});