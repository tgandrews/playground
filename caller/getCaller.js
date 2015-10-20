'use strict';

function getCallStack() {
  try {
    throw new Error();
  } catch (e) {
    const stack = e.stack;
    const lines = stack.split('\n');
    const callstack = [];
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const match = /at ([\w\d:\s\[\]\.]+) \(.*\:(\d+):.*$/.exec(l);
      if (!match) {
        continue;
      }
      const methodName = match[1];
      const lineNumber = parseInt(match[2], 10);
      callstack.push({ name: methodName, lineNumber: lineNumber });
    }
    return callstack;
  }
}

function getCaller() {
  return getCallStack()[2];
}

function  caller() {
  const calledMethod = getCaller();

  const expectedName  = 'caller';
  const expextedLineNumber = 29;
  if (calledMethod.name === expectedName && calledMethod.lineNumber === expextedLineNumber) {
    console.log('WIN');
  } else {
    console.log('FAILED WITH', caller);
  }
}


module.exports = getCaller;


caller();
