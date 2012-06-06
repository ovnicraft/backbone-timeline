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
    var Post;
    Post = (function() {
      __extends(Post, Backbone.Model);
      function Post() {
        Post.__super__.constructor.apply(this, arguments);
      }
      Post.prototype.getCreatedTime = function() {
        var _ref;
        return (_ref = this.createdTime) != null ? _ref : this.createdTime = new bb.bookie.DateDiff(new Date(), new Date(this.get("created")));
      };
      return Post;
    })();
    return {
      Post: Post
    };
  });
}).call(this);
