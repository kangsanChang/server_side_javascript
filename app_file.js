var express = require('express'); //node_modules에 있는 express 가져옴
var app = express();  //application 객체 만들기
var bodyParser = require('body-parser') //post로 온 data를 사용하기 위해 이용
var fs = require('fs');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended : false}))
app.set('views', './views_file');
app.set('view engine', 'pug');
app.listen(3000, function(req,res){
  console.log('Connected, 3000 port!');
});
app.get('/topic/new', function(req,res){
  res.render('new');
});

app.get('/topic',function(req,res){
  fs.readdir('data', function(err, files){
    //readdir은 file system의 경로에서 파일의 목록을 읽어주는 함수이다.
    // callback function의 parameter 에는 err객체와 읽어온 file들의 목록이 담겨있는 files가 있다.
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error!");
    }
    res.render('view',{topics:files});
    // render 의 두번째 인자는 그 template에 주입하고 싶은 data 적어줌
    //읽어온 file (files) 을 topics라는 변수로 template engine에서 사용가능하게 함
  })
});

app.get('/topic/:id', function(req,res){
  //바뀔 수 있는 정보는 : 을 통해 적어줌
  var id = req.params.id;
  fs.readdir('data', function(err, files){ //특정한 parameter로 갈때도 목록은 필요
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error!");
    }
    fs.readFile('data/'+id, 'utf8', function(err,data){
      if(err){
        console.log(err);
        res.status(500).send("Internal Server Error!");
      }
        res.render('view', {topics: files, title: id, description: data});
        //filename이 id값 인 애를 title이란 변수로 보냄
    });
  });
});

app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.send('Success!');
  });
});
