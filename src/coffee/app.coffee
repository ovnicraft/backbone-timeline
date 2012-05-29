define ()->
  class App extends Backbone.extensions.Application
    modules: ["timeline"]

    init:()->
      @baseURL = prompt("Enter baseURL", "/mockups")
      @posts = new @timeline.collections.Posts [], baseURL:@baseURL
      @layout = new Backbone.LayoutManager
        template: "#timeline"
        baseURL:@baseURL

        views:
          ".editor": new @timeline.views.PostEditorView()
          ".posts":  new @timeline.views.PostListView
                        collection:@posts

      @layout.$el.appendTo(".bb-timeline")
      @posts.fetch()
