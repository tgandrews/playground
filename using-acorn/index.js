var acorn = require('acorn');
var fs = require('fs');

var comments = [];
var code = fs.readFileSync('../caller/getCaller.js');
var options = {
  ecmaVersion: 6,
  sourceType: "module",
  locations: true,
  onComment: function onComment(block, text, start, end, lineStart, lineEnd) {
    comments.push({ block, text, start, end, lineStart, lineEnd });
  }
};

var ast = acorn.parse(code, options);
var children = ast.body;
for (var i = 0; i < children.length; i++) {
  var child = children[i];
  if (child.type === 'FunctionDeclaration') {
    const params = child.params;
    const maxChildLength = params.map(param => param.name.length).sort().reverse()[0]
    console.log(maxChildLength);
    const paramComments = child.params.reduce((comment, paramNode) => {
      return `${comment}\n* @param ${padString(paramNode.name, maxChildLength)} {type} Description`;
    }, '*');
    const comment = `/**
* ${child.id.name} - Description
${paramComments}
*
* @returns {type} Description
**/`;
    console.log(comment);
  }
}
console.log(comments);


function padString(str, length) {
  return `${str}${' '.repeat(length - str.length)}`;
}
