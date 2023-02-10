
const Order = require('../models/orders.model');

exports.allOrders = async (req, res, next) => {

      const {page, limit} = req.pagination;
      const filterData = req.filterData;

      try{
            const orders = await Order.find(filterData).skip((page - 1) * limit).limit(limit);
            const count = await Order.countDocuments();

            const data = {
                  limit,
                  page,
                  count,
                  totalPages: Math.ceil(orders.length / limit),
                  results: orders
            }

            res.status(200).send({status: "ok", data});

      }catch(error){
            return res.status(500).send({message: "Error occured while retrieving orders"});
      }
     
}


exports.orderById = (req, res) => {
      Order.findById(req.params.id, (err, order) => {
            if(err){
                  res.status(500).send({message: err});
                  return;
            }
      
            res.status(200).send(order);
      });
}

exports.createOrder = (req, res) => {
      
      try{
            //fullname, email, phone, message, nannyId, paid
            //const orderData = req.body;
            const order = new Order(req.body);

            order.save((err, order) => {
                  if(err){
                        res.status(500).send({message: err});
                        return;
                  }
            
                  res.status(201).send({status: "ok", data: order, message: "Order created successfully"});
            });
      }catch(err){
            res.status(500).send({message: err});
      }
}

exports.updateOrder = async (req, res) => {
            
      try{
            //const orderData = req.body;
            //const id = req.params.id;

            const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
            res.status(200).send({ status: "ok", data: order, message: "Order updated successfully" });
      }catch(err){
            res.status(500).send({message: err});
      }
}

exports.deleteOrder = (req, res) => {
      try{
            const id = req.params.id;

            Order.findByIdAndDelete(id, (err, order) => {
                  if(err){
                        res.status(500).send({message: err});
                        return;
                  }
                  //store deleted object in trash
                  
                  res.status(200).send({status: "ok", data: order, message: "Order deleted successfully"});
            })
      }catch(err){
            res.status(500).send({message: err});
      }
}

