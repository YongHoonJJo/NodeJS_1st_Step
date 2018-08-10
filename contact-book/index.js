var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); // 1
var app = express();

// DB setting ...

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// bodyParser로 stream의 form data를 req.body에 옮겨 담습니다. 
// 2번은 json data를, 
// 3번은 urlencoded data를 분석해서 req.body를 생성합니다.
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// DB schema // 4
// mongoose.Schema 함수를 사용해서 schema object를 생성
// 사용할 Data의 형태를 object로 생성한 다음 mongoose.Schema함수에 넣습니다. 
// contact schema를 살펴보면 name, email, phone의 항목들을 가지고 있으며 새 항목 모두 타입은 String입니다.
// name은 값이 반드시 입력되어야 하며(required), 값이 중복되면 안됩니다(unique).
var contactSchema = mongoose.Schema({
 name:{type:String, required:true, unique:true}, 
 email:{type:String},
 phone:{type:String}
});

// mongoose.model함수를 사용하여 contact schema의 model을 생성
// mongoose.model함수의 첫번째 parameter는 mongoDB에서 사용될 document의 이름
// 두번째는 mongoose.Schema 로 생성된 오브젝트
// 이로써 mongoDB와 프로그램을 연결해 주는 model이 생성된다.
var Contact = mongoose.model("contact", contactSchema); //5

// Routes
// Home // 6
// "/"에 get 요청이 오는 경우 : /contacts로 redirect합니다.
app.get("/", function(req, res){
 res.redirect("/contacts");
});


// Contacts - Index // 7
// "/contacts"에 get 요청이 오는 경우 :
// 에러가 있다면 에러를 json형태로 표시하고, 
// 에러가 없다면 검색 결과를 받아 views/contacts/index.ejs를render합니다.
app.get("/contacts", function(req, res){
 Contact.find({}, function(err, contacts){ // 모델.find(검색조건, callback_함수) 형태
  if(err) return res.json(err);
  res.render("contacts/index", {contacts:contacts});
 })
});
// 모델.find 함수는 DB에서 검색조건에 맞는 모델(여기서는 Contact) data를 찾고 callback_함수를 호출하는 함수입니다
// 모델.find의 검색조건은 Object 형태로 전달되는데 빈 Object({})를 전달하는 경우(=검색조건 없음) DB에서 해당 모델의 모든 data를 return
// 모델.find의 callback_함수는 function(에러, 검색결과)의 형태
// 첫번째 parameter인 에러(여기서는 err)는 error가 있는 경우에만 내용이 전달됩니다. 즉 if(err)로 에러가 있는지 없는지를 알 수 있음.
// 두번째 parameter인 검색결과(여기서는 contacts)는 한개 이상일 수 있기 때문에 검색결과는 항상 array이며 심지어 검색 결과가 없는 경우에도 빈 array[]를 전달
// 검색결과가 array임을 나타내기 위해 parameter이름으로 contact의 복수형인 contacts를 사용.

// res.render는 ejs파일을 html로 만들어 client(브라우저)로 return하는 함수입니다. 첫번째 인자는 ejs파일의 위치, 두번째 인자는 ejs에서 사용할 수 있는 object입니다. 
// {contacts:contacts}에서 첫번째 contacts는 ejs에서 사용할 key이고 두번째 contacts는 Contact.find({}, function(err, contacts){ ... })에서 콜백함수(function(err, contacts){ ... })로 넘겨진 DB에서 읽어온 contact 리스트입니다.
// 즉 contacts/index.ejs에서 DB에서 읽어온 contact 리스트를 사용하기 위해서 {contacts:contacts}를 넘겨주는 것입니다.
// 또한 contacts/index.ejs의 <% %> 안의 코드에서 사용되고 있는 contacts가 이때 넘겨받은 contact 리스트를 사용하는 부분입니다.


// Contacts - New // 8
// "/contacts/new"에 get 요청이 오는 경우 :
// 새로운 주소록을 만드는 form이 있는 views/contacts/new.ejs를render합니다.
app.get("/contacts/new", function(req, res){
 res.render("contacts/new");
});

// Contacts - create // 9
// "/contacts"에 post 요청이 오는 경우 :
// "/contacts/new"에서 폼을 전달받는 경우
// 모델.create은 DB에 data를 생성하는 함수
// 첫번째 parameter로 생성할 data의 object(여기서는 req.body)를 받고, 두번째 parameter로 callback 함수를 받음.
// 모델.create 의 callback 함수는 첫번째 parameter로 error를 받고, 두번째 parameter로 생성된 data를 받습니다.
// 에러없이 contact data가 생성되면 /contacts로 redirect합니다
app.post("/contacts", function(req, res){
 Contact.create(req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});


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

// Port setting
app.listen(3000, function(){
    console.log("server on!");
});