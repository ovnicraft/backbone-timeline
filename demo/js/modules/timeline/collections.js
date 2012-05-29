(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(function() {
    var Posts;
    Posts = (function() {
      __extends(Posts, Backbone.extensions.Collection);
      function Posts() {
        Posts.__super__.constructor.apply(this, arguments);
      }
      Posts.prototype.url = "/post";
      return Posts;
    })();
    return {
      Posts: Posts
    };
  });
}).call(this);
