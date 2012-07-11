define ["./models"], (models)->
  class Posts extends Backbone.extensions.Collection
    model: models.Post
    url: "/post/"

    comparator: (post)->
      post.get "created"

  return {
    Posts
  }
