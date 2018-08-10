//routes/home.js

var express = require("express");
var router = express.Router(); // express.Router()를 사용해서 router함수를 초기화

// Home 

// app.use는 route과 callback함수를 받는다고 했는데, 
// 우리가 사용할 callback 함수는 express가 제공하는 router함수 

// app.get에서 router.get으로 바뀐 것만 빼면 이전코드와 동일합니다. 
// "/"에 get 요청이 오는 경우를 router함수에 설정해 줍니다.
router.get("/", function(req, res){ 
 res.redirect("/contacts");
});

// module.exports에 담긴 object(여기서는 router object)가 module이 되어 
// require시에 사용됩니다.
module.exports = router;