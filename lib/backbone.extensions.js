(function() {
  var categories, ext;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  categories = ["models", "views", "collections"];
  ext = this.Backbone.extensions = {};
  ext.Application = (function() {
    function Application() {}
    Application.prototype.load = function() {
      var module_path, module_paths, name, s, _i, _len, _ref;
      module_paths = [];
      _ref = this.modules;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        module_path = "modules/" + name;
        define(module_path, (function() {
          var _j, _len2, _results;
          _results = [];
          for (_j = 0, _len2 = categories.length; _j < _len2; _j++) {
            s = categories[_j];
            _results.push("" + module_path + "/" + s);
          }
          return _results;
        })(), function() {
          var i, loaded, r, _ref2;
          loaded = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          r = {};
          for (i = 0, _ref2 = categories.length; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
            r[categories[i]] = loaded[i];
          }
          return r;
        });
        module_paths.push(module_path);
      }
      return require(module_paths, __bind(function() {
        var i, loaded_modules, _ref2;
        loaded_modules = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        for (i = 0, _ref2 = module_paths.length; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
          this[this.modules[i]] = loaded_modules[i];
        }
        return this.init();
      }, this));
    };
    return Application;
  })();
  ext.Model = (function() {
    __extends(Model, Backbone.Model);
    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }
    Model.prototype.serialize = function() {
      return _.extend(this.toJSON(), {
        _model_id: this.id,
        _model_cid: this.cid
      });
    };
    Model.prototype.attachFile = function($fileInput, options) {
      var url, _ref, _ref2;
      if (options == null) {
        options = {};
      }
      if ((options.name != null)) {
        $fileInput.attr("name", options.name);
      }
      url = this.url() + "attach/?format=json";
      if ((_ref = options.data) == null) {
        options.data = {};
      }
      if ((_ref2 = options.complete) == null) {
        options.complete = __bind(function() {
          return this.fetch();
        }, this);
      }
      return $fileInput.upload(url, options.data, options.complete);
    };
    return Model;
  })();
  ext.Collection = (function() {
    __extends(Collection, Backbone.Collection);
    function Collection() {
      Collection.__super__.constructor.apply(this, arguments);
    }
    Collection.prototype.model = ext.Model;
    Collection.prototype.initialize = function(models, options) {
      if (options == null) {
        options = {};
      }
      if (options.data != null) {
        this.data = options.data;
      }
      if (options.baseURL != null) {
        this.url = options.baseURL + this.url;
      }
      return Collection.__super__.initialize.call(this, models, options);
    };
    Collection.prototype.fetch = function(options) {
      var _ref;
      if (options == null) {
        options = {};
      }
      if ((_ref = options.data) == null) {
        options.data = {};
      }
      options.data = _.extend(options.data, this.data);
      return Collection.__super__.fetch.call(this, options);
    };
    Collection.prototype.serialize = function() {
      return this.map(function(model) {
        return model.serialize();
      });
    };
    return Collection;
  })();
  ext.View = (function() {
    __extends(View, Backbone.View);
    function View() {
      this.tmpl = __bind(this.tmpl, this);
      this.renderSubviews = __bind(this.renderSubviews, this);
      this.renderTemplates = __bind(this.renderTemplates, this);
      this.old_render = __bind(this.old_render, this);
      View.__super__.constructor.apply(this, arguments);
    }
    View.prototype.initialize = function(options) {
      var name, subview, tmpl, _ref, _ref2, _ref3;
      if (options == null) {
        options = {};
      }
      this.subviews = {};
      _ref = this.options.subviews;
      for (name in _ref) {
        subview = _ref[name];
        this.addSubview(name, subview);
      }
      delete this.options.subviews;
      if ((options.templates != null)) {
        this.templates = this.options.templates;
      }
      _ref2 = this.templates;
      for (name in _ref2) {
        tmpl = _ref2[name];
        if (typeof tmpl === "string") {
          this.templates[name] = $(tmpl);
        }
      }
      View.__super__.initialize.call(this, options);
      return (_ref3 = this.template) != null ? _ref3 : this.template = "#" + this.constructor.name;
    };
    View.prototype.addSubview = function(name, subview) {
      subview.parentView = this;
      return this.subviews[name] = subview;
    };
    View.prototype.removeSubview = function(name) {
      return delete this.subviews[name];
    };
    View.prototype.old_render = function() {
      if (!(this.model != null)) {
        return this;
      }
      this.renderTemplates();
      this.renderSubviews();
      return this.delegateEvents();
    };
    View.prototype.renderTemplates = function(data) {
      var t, _results;
      if (data == null) {
        data = this.serialize();
      }
      _results = [];
      for (t in this.templates) {
        _results.push(this.renderTemplate(t, data));
      }
      return _results;
    };
    View.prototype.renderTemplate = function(name, data) {
      var $attach;
      if (data == null) {
        data = this.serialize();
      }
      if (name === "root") {
        $attach = $(this.el);
      } else {
        $attach = this.$(name);
      }
      return $attach.html(this.tmpl(name)(data));
    };
    View.prototype.renderSubviews = function() {
      var name, subview, _ref;
      _ref = this.subviews;
      for (name in _ref) {
        subview = _ref[name];
        subview.render();
      }
      return this;
    };
    View.prototype.saveModel = function() {
      return this.model.save({}, {
        success: this.saveSuccess,
        error: this.saveError
      });
    };
    View.prototype.saveSuccess = function() {
      return console.log("save success");
    };
    View.prototype.saveError = function() {
      return console.log("save error");
    };
    View.prototype.serialize = function() {
      var _ref;
      return {
        view: this,
        data: (_ref = this.model) != null ? _ref.serialize() : void 0
      };
    };
    View.prototype.tmpl = function(name) {
      return _.template(this.templates[name].html());
    };
    return View;
  })();
  ext.CollectionView = (function() {
    __extends(CollectionView, ext.View);
    function CollectionView() {
      this.refresh = __bind(this.refresh, this);
      this.old_render = __bind(this.old_render, this);
      this.serialize = __bind(this.serialize, this);
      CollectionView.__super__.constructor.apply(this, arguments);
    }
    CollectionView.prototype.events = {
      'click [data-action=refresh]': 'refresh'
    };
    CollectionView.prototype.initialize = function(options) {
      var _ref;
      CollectionView.__super__.initialize.call(this, options);
      if (options == null) {
        options = {};
      }
      this.collection.bind("reset", __bind(function() {
        return this.render();
      }, this));
      this.collection.bind("add", __bind(function() {
        return this.render();
      }, this));
      if (options.refreshInterval != null) {
        this.refreshInterval = options.refreshInterval;
        delete options.refreshInterval;
      }
      if (options.itemViewClass != null) {
        this.itemViewClass = options.itemViewClass;
        delete options.itemViewClass;
      }
      if ((_ref = this.refreshInterval) == null) {
        this.refreshInterval = 0;
      }
      if (this.refreshInterval > 0) {
        return this.refresh();
      }
    };
    CollectionView.prototype.serialize = function() {
      return {
        view: this,
        colldata: this.collection.serialize()
      };
    };
    CollectionView.prototype.render = function(manage) {
      var view;
      view = manage(this);
      this.collection.each(__bind(function(model) {
        return view.insert(".items", new this.itemViewClass({
          model: model
        }));
      }, this));
      return view.render();
    };
    CollectionView.prototype.old_render = function() {
      this.renderTemplates();
      $(this.el).removeClass("loading");
      this.delegateEvents();
      return this;
    };
    CollectionView.prototype.refreshOptions = function() {
      return {};
    };
    CollectionView.prototype.refresh = function() {
      var options;
      $(this.el).addClass("loading");
      options = {
        success: __bind(function() {
          if (this.refreshInterval > 0) {
            return setTimeout(this.refresh, this.refreshInterval * 1000);
          }
        }, this),
        error: __bind(function() {
          if (this.refreshInterval > 0) {
            return setTimeout(this.refresh, this.refreshInterval * 1000);
          }
        }, this)
      };
      return this.collection.fetch(_.extend(options, this.refreshOptions()));
    };
    return CollectionView;
  })();
}).call(this);
