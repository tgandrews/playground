var contents = [];
contents.push('\r\n"use strict";');
contents.push('\n"use strict";');

var useStrictRegExp = /((?!{)\r?\n)['"]use strict['"];/g;

for (var i = 0; i < contents.length; ++i) {
  var content = contents[i];
  console.log('before', content);
  var replaced = content.replace(useStrictRegExp, '$1');
  console.log('after', replaced);
}
