define ()->
  class Posts extends Backbone.extensions.Collection
    url: "/post"

  return {
    Posts
  }
