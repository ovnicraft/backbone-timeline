define ()->
  class App extends Backbone.extensions.Application
    modules: ["timeline"]

    init:()->
      @baseURL = prompt("Enter baseURL", "/mockups")
      @posts = new @timeline.collections.Posts [], baseURL:@baseURL
      @layout = new Backbone.LayoutManager
        template: "#timeline"

        views:
          ".editor": new @timeline.views.PostEditorView()
          ".posts":  new @timeline.views.PostListView
                        collection:@posts
                        itemViewClass: @timeline.views.PostView

      @layout.$el.appendTo(".bb-timeline")
      @layout.render()
      @posts.fetch()
