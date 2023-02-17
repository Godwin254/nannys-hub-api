const Nanny = require('../models/nanny.model');
const { sendEmail, helper } = require('../utils');

exports.allNannies = async (req, res, next) => {

      const {page, limit} = req.pagination;
      const filterData = req.filterData;

      //console.log("filteredData",filterData)
      console.log(` page: ${page}, limit: ${limit} `);

      try{
            const nannies = await Nanny.find(filterData).skip((page - 1) * limit).limit(limit);
            const count = await Nanny.countDocuments();
            
            const data = {
                  limit,
                  page,
                  totalPages: Math.ceil(nannies.length / limit),
                  count,
                  results: nannies
            }

            res.status(200).send({status: "ok", data});
            
      }catch(error){
            return res.status(500).send({message: "Error occured while retrieving nannies"});
      }
     
}

exports.nannyById = (req, res) => {
      Nanny.findById(req.params.id, (err, nanny) => {
            if(err){
                  res.status(500).send({message: err});
                  return;
            }
      
            res.status(200).send(nanny);
      });
}

exports.createNanny = async (req, res) => {

      try{
            const {firstname, lastname, email, phone, address, coords, gender, age, empStatus, salary, jobOptions, availability, agreementOptions, message} = req.body;
            const location = await helper.reverseGeocode(coords);
            const nannyData = {
                  firstname, lastname, email, phone, address, location ,gender,age,empStatus, salary, jobOptions, availability, agreementOptions,message
            }
            const nanny = new Nanny(nannyData)

            nanny.save((err, nanny) => {
                  if(err){
                        res.status(500).send({message: err.message});
                        return;
                  }

                  const mail = {
                        email: nanny.email,
                        subject: "REGISTARTION FOR NANNY ROLE",
                        message: `Hi ${nanny.firstname}, Your application for a nanny role has been recieved\nClick on the link below to verify your application.\nLINK: ${process.env.CLIENT_URL}/nanny/verify/${nanny._id}`
                  }

                  sendEmail(mail);
            
                  res.status(201).send({status: "ok", data: nanny, message: "Nanny created successfully"});
            });
      }catch(err){
            res.status(500).send({message: err.message});
      }
}

exports.updateNanny = (req, res) => {
      
      try{
            const nannyData = req.body;
            const id = req.params.id;

            Nanny.findByIdAndUpdate(id, nannyData, {new: true}, (err, nanny) => {
                  if(err){
                        res.status(500).send({message: err});
                        return;
                  }

                  //send an email to the nanny if the application is approved
                  if (nanny.approved === true) {
                        const mail = {
                              email: nanny.email,
                              subject: "NANNY ROLE APPROVAL",
                              message: `Hi ${nanny.firstname}, Your application for a nanny role has been approved`
                        }
            
                        sendEmail(mail);
                  }

                  //send an email to the nanny if nanny is booked
                  if (nanny.booked === true) {
                        const mail = {
                              email: nanny.email,
                              subject: "NEW GIG ALERT",
                              message: `Hi ${nanny.firstname},\nYou have a new client interested to hire you.`
                        }
            
                        sendEmail(mail);
                  }

                  //send an email to the nanny if nanny has verified
                  if (nanny.verified === true) {
                        const mail = {
                              email: nanny.email,
                              subject: "NANNY VERIFICATION SUCCESS",
                              message: `Hi ${nanny.firstname},\nYour application has been successfully verified.\nYou will be notified when a client books you for a nanny gig.`
                        }
            
                        sendEmail(mail);
                  }


                  res.status(200).send({status: "ok", data: nanny, message: "Nanny updated successfully"});
            });

            
      }catch(err){
            res.status(500).send({message: err});
      }
}

exports.deleteNanny = (req, res) => {
      try{
            const id = req.params.id;

            Nanny.findByIdAndDelete(id, (err, nanny) => {
                  if(err){
                        res.status(500).send({message: err});
                        return;
                  }
                  //store deleated object in trash
                  //await Trash.create(nanny);
            
                  res.status(200).send({status: "ok", data: nanny, message: "Nanny deleted successfully"});
            });
      }catch(err){
            res.status(500).send({message: err});
      }
}
