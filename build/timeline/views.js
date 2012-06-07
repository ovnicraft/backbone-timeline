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
    var PostEditorView, PostListView, PostView;
    PostView = (function() {
      __extends(PostView, Backbone.extensions.View);
      function PostView() {
        PostView.__super__.constructor.apply(this, arguments);
      }
      return PostView;
    })();
    PostEditorView = (function() {
      __extends(PostEditorView, Backbone.extensions.View);
      function PostEditorView() {
        PostEditorView.__super__.constructor.apply(this, arguments);
      }
      return PostEditorView;
    })();
    PostListView = (function() {
      __extends(PostListView, Backbone.extensions.CollectionView);
      function PostListView() {
        PostListView.__super__.constructor.apply(this, arguments);
      }
      PostListView.prototype.itemViewClass = PostView;
      PostListView.prototype.render = function(manage) {
        PostListView.__super__.render.call(this, manage);
        this.setView(".editor", new PostEditorView());
        return manage(this).render();
      };
      return PostListView;
    })();
    return {
      PostView: PostView,
      PostListView: PostListView,
      PostEditorView: PostEditorView
    };
  });
}).call(this);
