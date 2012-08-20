define () ->

  class PostView extends Backbone.Marionette.ItemView
    template: "#PostView"
    className: "PostView"
    tagName: "li"
    events:
      "click .remove" : "deletePost"

    initialize: ->
      if app.session.isOwner @model.get("user").id
        @bindTo app.session.user, "change:profile_pic_url", @render

    serializeData: ->
      $.extend @model.toJSON(),
        createdTime : @model.getCreatedTime()

    deletePost: ->
      @$el.slideUp =>
        @model.destroy()

    onRender: ->
      time = @model.getCreatedTime()
      @$el.find(".date").text time.toString()

      time.onChange = (diff, remainingTime) =>
        @$el.find(".date").text remainingTime.toString()

  class PostEditorView extends Backbone.Marionette.ItemView
    template: "#PostEditorView"
    className: "PostEditorView"
    events:
      "click .js-send": "sendPost"
      "charsleft textarea": "checkSubmitButton"

    sendPost: (event) ->
      $data = @$(".js-data")
      if $data.length
        data = $data.val() or $data.text()
        if data
          @collection.create {data:data, context:@options.context}, wait:true
          $data.val("").focus()

    checkSubmitButton: (event, invalid) ->
      @$el.find("button[type=submit]").prop "disabled", invalid

    onRender: ->
      @$el.find("textarea").characterCounter
        maxlength: 140
        target: @$el.find "#character-count-holder"

  class PostListView extends Backbone.extensions.CollectionView
    tagName: "ul"
    className: "PostListView post-list sidebar-list"
    infiniteScroll: true
    itemView: PostView
    template: ->

    initialize: (options) ->
      super options

      @loadMoreConfig =
        tagName : "li"
        loadMore : "Cargar m&aacute;s comentarios"
        loadingMore : """<img src="#{app.STATIC_URL}img/loading-small.gif" /> Cargando comentarios&hellip;"""

    appendHtml: (collectionView, itemView, index) ->
      if index == 0
        @$el.prepend itemView.$el
      else
        @$el.find(">:eq(#{index - 1})").after itemView.$el

    onItemAdded: ->
      @$el.show().prev(".alert").remove?()

    onRender: ->
      if @collection.isFetching
        return @$el.show().html """
          <li class="loading"><img src="#{app.STATIC_URL}img/loading-small.gif" /></li>
          """

      @$el.find("> .loading").remove?()

      if @collection.length == 0
        @$el.hide().before '<div class="alert">¡S&eacute; el primero en comentar!</div>'
      else
        @$el.prev(".alert").remove?()

  class TimelineView extends Backbone.Marionette.Layout
    template: "#TimelineView"
    className: "TimelineView"
    regions:
      editor: ".editor"
      timeline: ".timeline"

    onRender: ->
      if app.session.isActive()
        @editor.show new PostEditorView context:@options.context, collection:@options.collection
      @timeline.show new PostListView collection:@options.collection

  return {
    PostView
    PostListView
    PostEditorView
    TimelineView
  }
