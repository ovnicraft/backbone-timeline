(function() {
  require(['app'], function(App) {
    window.App = new App();
    return window.App.load();
  });
}).call(this);
