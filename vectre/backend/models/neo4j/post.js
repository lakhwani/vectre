const _ = require('lodash');

const Post = module.exports = function (_node) {
    _.extend(this, {
        "postID": _node.properties["postID"],
        "author": _node.properties["author"],
        "text": _node.properties["text"],
        "imageURL": _node.properties["imageURL"] ? _node.properties["imageURL"] : null,
        "edited": _node.properties["edited"],
        "parent": _node.properties["parent"] ? _node.properties["parent"] : null,
        "timestamp": _node.properties["timestamp"]
    })
};