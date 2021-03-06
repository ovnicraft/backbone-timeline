// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function() {
    var PostEditorView, PostListView, PostView;
    PostView = (function(_super) {

      __extends(PostView, _super);

      function PostView() {
        return PostView.__super__.constructor.apply(this, arguments);
      }

      PostView.prototype.tagName = "li";

      PostView.prototype.template = "#PostView";

      PostView.prototype.className = "PostView";

      PostView.prototype.events = {
        "click .remove": "deletePost"
      };

      PostView.prototype.initialize = function() {
        _.bindAll(this);
        PostView.__super__.initialize.call(this);
        if (app.session.isActive() && app.session.user.id === this.model.get("user").id) {
          return app.session.user.on("change:profile_pic_url", this.onChange);
        }
      };

      PostView.prototype.cleanup = function() {
        if (app.session.isActive() && app.session.user.id === this.model.get("user").id) {
          return app.session.user.off("change:profile_pic_url", this.onChange);
        }
      };

      PostView.prototype.deletePost = function() {
        var _this = this;
        this.model.destroy();
        return this.$el.slideUp(function() {
          return _this.remove();
        });
      };

      PostView.prototype.onChange = function() {
        return this.render();
      };

      PostView.prototype.render = function(manage) {
        var _this = this;
        return manage(this).render().then(function() {
          var time;
          time = _this.model.getCreatedTime();
          _this.$el.find(".date").text(time.toString());
          return time.onChange = function(diff, remainingTime) {
            return _this.$el.find(".date").text(remainingTime.toString());
          };
        });
      };

      return PostView;

    })(Backbone.extensions.View);
    PostEditorView = (function(_super) {

      __extends(PostEditorView, _super);

      function PostEditorView() {
        return PostEditorView.__super__.constructor.apply(this, arguments);
      }

      PostEditorView.prototype.template = "#PostEditorView";

      PostEditorView.prototype.className = "PostEditorView";

      PostEditorView.prototype.events = {
        "click .js-send": "sendPost"
      };

      PostEditorView.prototype.sendPost = function(event) {
        var $data, data;
        $data = this.$(".js-data");
        if ($data) {
          data = $data.val() || $data.text();
          if (data) {
            this.collection.create({
              data: data,
              context: this.context
            }, {
              wait: true
            });
            return $data.val("").focus();
          }
        }
      };

      PostEditorView.prototype.initialize = function(options) {
        _.bindAll(this);
        PostEditorView.__super__.initialize.call(this, options);
        if (options.context != null) {
          this.context = options.context;
          delete options.context;
        }
        if (options.collection != null) {
          this.collection = options.collection;
        }
        return this.$el.on("charsleft", "textarea", this.checkSubmitButton);
      };

      PostEditorView.prototype.cleanup = function() {
        return this.$el.off("charsleft", "textarea", this.checkSubmitButton);
      };

      PostEditorView.prototype.checkSubmitButton = function(event, invalid) {
        return this.$el.find("button[type=submit]").prop("disabled", invalid);
      };

      PostEditorView.prototype.render = function(manage) {
        var _this = this;
        return manage(this).render().then(function() {
          return _this.$el.find("textarea").characterCounter({
            maxlength: 140,
            target: _this.$el.find("#character-count-holder")
          });
        });
      };

      return PostEditorView;

    })(Backbone.extensions.View);
    PostListView = (function(_super) {

      __extends(PostListView, _super);

      function PostListView() {
        return PostListView.__super__.constructor.apply(this, arguments);
      }

      PostListView.prototype.template = "#PostListView";

      PostListView.prototype.className = "PostListView";

      PostListView.prototype.infiniteScroll = true;

      PostListView.prototype.itemViewClass = PostView;

      PostListView.prototype.initialize = function(options) {
        var _ref;
        PostListView.__super__.initialize.call(this, options);
        this.loadMoreConfig = {
          tagName: "li",
          loadMore: "Cargar m&aacute;s comentarios",
          loadingMore: "<img src=\"" + app.STATIC_URL + "img/loading-small.gif\" /> Cargando comentarios&hellip;"
        };
        this.showEditor = true;
        if (((_ref = this.options) != null ? _ref.showEditor : void 0) != null) {
          this.showEditor = this.options.showEditor;
        }
        if (options.context != null) {
          this.context = options.context;
          return delete options.context;
        }
      };

      PostListView.prototype.renderModel = function(model, bulk) {
        var _base;
        if (bulk == null) {
          bulk = false;
        }
        this.$el.find(".items").show();
        PostListView.__super__.renderModel.call(this, model, bulk);
        return typeof (_base = this.$el.find(".alert")).remove === "function" ? _base.remove() : void 0;
      };

      PostListView.prototype.render = function(manage) {
        var _this = this;
        PostListView.__super__.render.call(this, manage);
        if (app.session.isActive() && this.showEditor) {
          this.setView(".editor", new PostEditorView({
            context: this.context,
            collection: this.collection
          }));
        }
        return manage(this).render().then(function() {
          var message, _base;
          if (_this.collection.isFetching) {
            return _this.$el.find(".items").html("<li class=\"loading\"><img src=\"" + app.STATIC_URL + "img/loading-small.gif\" /></li>");
          } else if (_this.collection.length === 0) {
            message = _this.showEditor ? "¡S&eacute; el primero en comentar!" : "No hay comentarios";
            return _this.$el.find(".items").hide().before("<div class=\"alert\">" + message + "</div>");
          } else {
            return typeof (_base = _this.$el.find(".alert")).remove === "function" ? _base.remove() : void 0;
          }
        });
      };

      return PostListView;

    })(Backbone.extensions.CollectionView);
    return {
      PostView: PostView,
      PostListView: PostListView,
      PostEditorView: PostEditorView
    };
  });

}).call(this);
