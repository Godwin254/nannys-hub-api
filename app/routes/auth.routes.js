const { verifySignUp } = require('../middlewares');
const controller = require ('../controllers/auth.controller');


module.exports = (app) => {
     app.use(function(req, res, next){
          res.header("Access-Contol-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

          next();
     });

     app.post("/api/auth/signup", controller.signup);

     app.post("/api/auth/login", controller.login);
}