define ()->
  class PostView extends Backbone.extensions.View
    tagName: "li"
    template : "#PostView"
    className : "PostView"
    events :
      "click .remove" : "deletePost"

    initialize : ->
      _.bindAll @
      super()

      if app.session.isActive() and app.session.user.id == @model.get("user").id
        app.session.user.on "change:profile_pic_url", @onChange

    cleanup : ->
      if app.session.isActive() and app.session.user.id == @model.get("user").id
        app.session.user.off "change:profile_pic_url", @onChange

    deletePost : ->
      @model.destroy()
      @$el.slideUp =>
        @remove()

    onChange : ->
      @render()

    render : (manage) ->
      manage(@).render().then =>
        time = @model.getCreatedTime()
        @$el.find(".date").text time.toString()

        time.onChange = (diff, remainingTime) =>
          @$el.find(".date").text remainingTime.toString()

  class PostEditorView extends Backbone.extensions.View
    template : "#PostEditorView"
    className : "PostEditorView"
    events:
      "click .js-send": "sendPost"

    sendPost: (event)->
      $data = @$(".js-data")
      if $data
        data = $data.val() or $data.text()
        if data
          @collection.create {data:data, context:@context}, wait:true
          $data.val("").focus()

    initialize: (options)->
      _.bindAll @
      
      super options
      if options.context?
        @context = options.context
        delete options.context
      if options.collection?
        @collection = options.collection

      @$el.on "charsleft", "textarea", @checkSubmitButton

    cleanup : ->
      @$el.off "charsleft", "textarea", @checkSubmitButton

    checkSubmitButton : (event, invalid) ->
      @$el.find("button[type=submit]").prop "disabled", invalid

    render : (manage) ->
      manage(@).render().then =>
        @$el.find("textarea").characterCounter
          maxlength : 140
          target : @$el.find("#character-count-holder")


  class PostListView extends Backbone.extensions.CollectionView
    template : "#PostListView"
    className : "PostListView"
    infiniteScroll:true
    itemViewClass:PostView

    initialize: (options)->
      super options

      @loadMoreConfig =
        tagName : "li"
        loadMore : "Cargar m&aacute;s comentarios"
        loadingMore : """<img src="#{app.STATIC_URL}img/loading-small.gif" /> Cargando comentarios&hellip;"""

      if options.context?
        @context = options.context
        delete options.context

    renderModel : (model, bulk = false) ->
      @$el.find(".items").show()
      super model, bulk
      @$el.find(".alert").remove?()

    render: (manage)->
      super manage

      if app.session.isActive()
        @setView ".editor", new PostEditorView 
          context:@context
          collection:@collection
          
      return manage(@).render().then =>
        if @collection.isFetching
          @$el.find(".items").html """<li class="loading"><img src="#{app.STATIC_URL}img/loading-small.gif" /></li>"""
        else if @collection.length == 0
          @$el.find(".items").hide().before '<div class="alert">¡S&eacute; el primero en comentar!</div>'
        else
          @$el.find(".alert").remove?()

  return {
    PostView
    PostListView
    PostEditorView
  }
