(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(["./views", "./collections"], function(views, collections) {
    var TimelineLayout;
    return TimelineLayout = (function() {
      __extends(TimelineLayout, Backbone.LayoutManager);
      function TimelineLayout() {
        TimelineLayout.__super__.constructor.apply(this, arguments);
      }
      return TimelineLayout;
    })();
  });
}).call(this);
