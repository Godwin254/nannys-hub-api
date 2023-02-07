module.exports = (app) => {
      
      app.use(function(req, res, next){
            res.header("Access-Contol-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  
            next();
      });
      
      const mail = require('../controllers/mail.controller.js');
      app.post('/api/mail/send', mail.send);
}