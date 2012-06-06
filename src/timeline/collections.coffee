define ()->
  class Posts extends Backbone.extensions.Collection
    url: "/post"

    comparator: (post)->
      post.get "created"

  return {
    Posts
  }
