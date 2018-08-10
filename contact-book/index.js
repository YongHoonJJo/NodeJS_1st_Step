var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); 
var methodOverride = require("method-override"); // 1 
var app = express();

   
// DB Setting...

// 환경변수에 저장된 값을 사용하여 mongoDB에 접속
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });
var db = mongoose.connection; // mongoose의 db object를 가져와 db변수에 대입

// db가 성공적으로 연결된 경우 "DB connected"를 출력
db.once("open", function(){
 console.log("DB connected");
});

// db연결중 에러가 있는 경우 "DB ERROR : " 과 에러를 출력
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});


// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// bodyParser로 stream의 form data를 req.body에 옮겨 담습니다. 
// 2번은 json data를, 
// 3번은 urlencoded data를 분석해서 req.body를 생성합니다.
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// _method의 query로 들어오는 값으로 HTTP method를 바꿉니다. 
// 예를들어 http://example.com/category/id?_method=delete를 받으면 
/// _method의 값인 delete을 읽어 해당 request의 HTTP method를 delete으로 바꿉니다.
app.use(methodOverride("_method")); 


// Routes
// DB schema, routes 부분의 코드가 없어지고 routes에는 app.use가 추가
// 분리된 routes은 index.js의 app.use 안에서 직접 require를 하고 있고,
// DB schema는 route안에서만 사용되기 때문에 index.js에서는require를 하지 않고, 해당 route안에서 require됩니다.
/*** app.use("route", callback_함수)는 해당 route에 요청이 오는 경우에만 callback 함수를 호출합니다. ***/
app.use("/", require("./routes/home")); 
app.use("/contacts", require("./routes/contacts")); 


// Port setting
app.listen(3000, function(){
    console.log("server on!");
});