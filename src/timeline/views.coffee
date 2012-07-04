define ()->
  class PostView extends Backbone.extensions.View
    tagName: "li"

  class PostEditorView extends Backbone.extensions.View
    events:
      "click .js-send": "sendPost"

    sendPost: (event)->
      $data = @$(".js-data")
      if $data
        data = $data.val() or $data.text()
        if data
          @collection.create {data:data, context:@context}, wait:true

    initialize: (options)->
      super options
      if options.context?
        @context = options.context
        delete options.context
      if options.collection?
        @collection = options.collection

  class PostListView extends Backbone.extensions.CollectionView
    infiniteScroll:true
    itemViewClass:PostView

    initialize: (options)->
      super options
      if options.context?
        @context = options.context
        delete options.context

    render: (manage)->
      super manage

      if app.session.isActive()
        @setView ".editor", new PostEditorView 
          context:@context
          collection:@collection
          
      return manage(@).render()

  return {
    PostView
    PostListView
    PostEditorView
  }
