var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var app = express(); //express를 실행하여 app object를 초기화 합니다.

// express.static는 static폴더를 지정해 주는 express의 함수
// app.use는 HTTP method에 상관없이 무조건 실행되는 부분
// __dirname은 node.js에서 프로그램이 실행중인 파일의 위치를 나타내는 global variable
// static폴더가 설정되면 웹사이트 경로가 static 폴더에 연결됩니다.
app.use(express.static(__dirname + '/public'));

app.listen(3000, function(){ //3000번 포트를 사용합니다.
 console.log('Server On!'); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});