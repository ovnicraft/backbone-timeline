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
    var App;
    return App = (function() {
      __extends(App, Backbone.extensions.Application);
      function App() {
        App.__super__.constructor.apply(this, arguments);
      }
      App.prototype.modules = ["timeline"];
      App.prototype.init = function() {
        this.baseURL = prompt("Enter baseURL", "/mockups");
        this.posts = new this.timeline.collections.Posts([], {
          baseURL: this.baseURL
        });
        this.layout = new Backbone.LayoutManager({
          template: "#timeline",
          baseURL: this.baseURL,
          views: {
            ".editor": new this.timeline.views.PostEditorView(),
            ".posts": new this.timeline.views.PostListView({
              collection: this.posts
            })
          }
        });
        this.layout.$el.appendTo(".bb-timeline");
        return this.posts.fetch();
      };
      return App;
    })();
  });
}).call(this);
