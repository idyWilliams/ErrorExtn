// This file has a deliberate error to test the extension
function test() {
  let x;
  console.log(x.length); // This will cause a TypeError: Cannot read property 'length' of undefined
}

test();
