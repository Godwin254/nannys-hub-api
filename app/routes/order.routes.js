const { authJwt, filters } = require('../middlewares');
const controller = require('../controllers/order.controller');


module.exports = function(app){
      app.use(function(req, res, next){
            res.header("Access-Contol-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      
            next();
      });
      
      app.get('/api/orders', [authJwt.verifyToken, filters.paginate], controller.allOrders);
      app.get('/api/orders/:id', [authJwt.verifyToken], controller.orderById);
      app.post('/api/orders', controller.createOrder); //no auth - public client making requests
      app.patch('/api/orders/:id', [authJwt.verifyToken], controller.updateOrder);
      app.delete('/api/orders/:id', [authJwt.verifyToken], controller.deleteOrder);
}