const {authJwt, filters} = require('../middlewares');
const controller = require('../controllers/nanny.controller');


module.exports = function(app){
      app.use(function(req, res, next){
            res.header("Access-Contol-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
            //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      
            next();
      });
      
      app.get('/api/nannies', [filters.paginate, filters.dynamicFilter], controller.allNannies);
      app.get('/api/nannies/:id', controller.nannyById);
      app.post('/api/nannies/apply', controller.createNanny);
      app.patch('/api/nannies/:id', controller.updateNanny);
      app.delete('/api/nannies/:id', [authJwt.verifyToken], controller.deleteNanny);
}