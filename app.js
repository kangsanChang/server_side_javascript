var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'pug');
//Template Engine
app.set('views', './views')
//pug(jade) file을 저장할 곳 (사실 default)
app.locals.pretty = true;
//pug로 만든 html 코드가 한줄에 다 나오지 않고 개행과 들여쓰기가 된 형식으로 나옴
app.use(bodyParser.urlencoded({extended : false}))
//모든 url은 bodyParser를 거쳐서 사용 할 수 있도록 함
app.use(express.static('public'));
app.get('/topic/:id', function(req,res){
	//topic 뒤에 오는 값을 잡아서 id에 넣음
	var topics = [
		'JavaScript is ...',
		'Nodejs is...',
		'Express is...'
	];
	var output = `
		<a href="/topic?id=0">JavaScript</a><br>
		<a href="/topic?id=1">Nodejs</a><br>
		<a href="/topic?id=2">Express</a><br>
		<h1>${topics[req.params.id]}</h1>
	`//들어온 id 값에 따라 해당하는 topic을 배열에서 가져옴

	//query string으로 접근할때는 request 객체의 query 객체를 사용
	//path 방식(Semantic URL)을 사용할 때는 query 부분을 params(parameter)로 고침

	res.send(output);
	//res.send(topics[req.query.id]);
	//받아온 것을 알기 위해서는 request의 값으로 온 req가 필요
	// res.send(req.query.id + ',' + req.query.name);
	//http://localhost:3000/topic?id=haha&name=hoho 로 가면 haha,hoho나옴
	// '&'를 통해 복수의 쿼리를 구분
});

app.get('/form', function(req,res){
	res.render('form');
});

app.get('/form_receiver', function(req,res){
	var title = req.query.title;
	var des = req.query.description;
	res.send(title + ',' + des);
})

app.post('/form_receiver', function(req, res){
	var title = req.body.title;
	var des = req.body.description;
	res.send(title + ',' + des);
})

app.get('/topic/:id/:mode',function(req,res){
	//뒤에 더 params를 붙이려면 해당되는 router 만들어 주면 됨
	res.send(req.params.id + ',' + req.params.mode)
});

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
