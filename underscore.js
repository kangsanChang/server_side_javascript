var _ = require("underscore");
// require 함수는 underscore 모듈을 가져와서 그 객체를 리턴한다.
// underscore 변수는 관례적으로 _ 를 쓴다.

var arr = [3,6,9,1,12];

console.log(arr[0]);
console.log(_.first(arr));
console.log(arr[arr.length - 1]);
console.log(_.last(arr));


