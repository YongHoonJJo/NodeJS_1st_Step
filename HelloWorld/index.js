var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var app = express(); //express를 실행하여 app object를 초기화 합니다.

app.set("view engine","ejs"); // ejs를 사용하기 위해서 express의 view engine에 ejs를 set하는 코드
app.use(express.static(__dirname + '/public'));


// query를 통해서 이름을 받는 코드
// 모든 query들은 req.query에 저장된다. 
app.get("/hello", function(req,res){
    res.render("hello", {name:req.query.nameQuery});
}); 

// route parameter를 통해 이름을 받는 코드
//  콜론(:)으로 시작되는 route는 해당 부분에 입력되는 route가 req.params에 저장됨
// 예를들어 /hello/Kim을 입력하면 "/hello/:nameParam"에 의해 세미콜론이 있는 route의 2번째 부분 즉, 
// Kim이 req.params.nameParam에 저장됨.
// ejs파일을 사용하기 위해서는 res.render 함수를 사용해야 하며, 첫번째 parameter로 ejs의 이름을
// 두번째 parameter로 ejs에서 사용될 object를 전달함.
// res.render함수는 ejs를 /views 폴더에서 찾으므로 views폴더의 이름은 변경되면 안된다.
app.get("/hello/:nameParam", function(req,res){ 
    res.render("hello", {name:req.params.nameParam});
});

app.listen(3000, function(){ //3000번 포트를 사용합니다.
 console.log('Server On!'); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});