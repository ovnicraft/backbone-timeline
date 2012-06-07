define ()->
  class PostView extends Backbone.extensions.View

  class PostEditorView extends Backbone.extensions.View

  class PostListView extends Backbone.extensions.CollectionView
    itemViewClass:PostView

    render: (manage)->
      super manage
      @setView ".editor", new PostEditorView()
      return manage(@).render()

  return {
    PostView
    PostListView
    PostEditorView
  }
