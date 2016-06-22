var fs = require("fs");

//Sync
console.log('sync first');
var data = fs.readFileSync('text.txt', {encoding : "utf8"});
console.log(data);
console.log('sync end')

//Async
//Call back function을 통해 event가 끝난 후 알려줄 방법을 정한다.
//첫 번째 인자로 err인 경우, 성공인 경우 data를 로그에 찍음.
console.log('async first');
fs.readFile('data.txt', {encoding:'utf8'}, function(err,data){
  console.log('inner callback')
  console.log(data);
})
console.log('async end');
