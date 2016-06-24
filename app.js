var express = require('express');
var app = express();
app.set('view engine', 'pug');
//Template Engine
app.set('views', './views')
//pug(jade) file을 저장할 곳 (사실 default)
app.locals.pretty = true;
//pug로 만든 html 코드가 한줄에 다 나오지 않고 개행과 들여쓰기가 된 형식으로 나옴
app.use(express.static('public'));
app.get('/template', function(req, res){
	res.render('temp', {time:Date()});
	// express에서 보낼때는 send 를 썼지만 template engine에서만들 파일 읽을때 redner이용
	// template으로 들어오면 views 안에서 temp를 찾아서 render
});
app.get('/',function(req, res){
	res.send('HELL JOSEON');
});
app.get('/dynamic', function(req,res){
	var happy = "happy";
	var list = '';
	var time = Date();
	for(var i=0 ; i<10 ; i++){
		list = list + '<li>coding</li>';
	}
	var output = `
	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <title></title>
	</head>
	<body>
	  hello Dynamic!!!! ${happy}
		${list}
		${time}
	</body>
	</html>`// text formatting by `(grave accent)
	//text formatting 시 ${_var}를 통해 쉽게 변수를 써줄 수 있고 개행이 편하다.
	res.send(output);
})

app.get('/gogh',function(req,res){
	res.send("Hello Gogh!, <img src='/gogh.jpg'>");
	// localhost:3000/gogh가 기본 주소가 됨 그곳에서 /gogh.jpg 찾음
});
app.get('/login',function(req,res){
	res.send('Login please...');
});
// use, get 같은 친구들을 router라고 부른다.

app.listen(3000, function(){
	console.log('connected 3000 port!')
});
