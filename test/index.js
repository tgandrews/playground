var die = function () {
  console.log('die');
  throw new Error('Test');
}

try {
  die();
}
catch (e) {
  console.log('catch');
  // die();
}
finally {
  console.log('finally');
}