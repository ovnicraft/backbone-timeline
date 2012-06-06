define ()->
  class Post extends Backbone.Model
    getCreatedTime : ->
      @createdTime ?= new bb.bookie.DateDiff new Date(), new Date(this.get "created")

  return {
    Post
  }
