var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var app = express(); //express를 실행하여 app object를 초기화 합니다.

app.get('/',function (req,res) { // '/' 위치에 'get'요청을 받는 경우,
    res.send('Hello World!'); // "Hello World!"를 보냅니다.
    console.log(res);
});

app.listen(3000, function(){ //3000번 포트를 사용합니다.
 console.log('Server On!'); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});