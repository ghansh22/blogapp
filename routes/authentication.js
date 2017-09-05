const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

module.exports = (router) => {

/*===================================================
register route
===================================================*/
  router.post('/register',(req, res)=>{
    if(!req.body.email){
      console.log('email not provided')
      res.json({
        success: false,
        message: 'email is not provided!'
      });
    }else{
      if(!req.body.username){
        console.log('username not provided')
        res.json({
          success: false,
          message: 'username is not provided!'
        });
      }else{
        if(!req.body.password){
          console.log('password not provided')
          res.json({
            success: false,
            message: 'password is not provided!'
          });
        }else{
          // generate random code 
          let randomCode = generateRandomeCode();
          console.log(randomCode);

          let user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            randomCode: randomCode
          });

          // save to database
          user.save((error)=>{
            if(error){
              if(error.code === 11000){
                console.log('username/email already exixts');
                res.json({
                  success: false,
                  message: 'username/email already exixts'
                });
              }else{
                if(error.errors){
                  if(error.errors.email){
                    console.log(error.errors.email.message);
                    res.json({
                      success: false,
                      message: error.errors.email.message
                    });
                  }else{
                    if(error.errors.username){
                      console.log(error.errors.username.message);
                      res.json({
                        success: false,
                        message: error.errors.username.message
                      });
                    }else{
                      if(error.errors.password){
                        console.log(error.errors.password.message);
                        res.json({
                          success: false,
                          message: error.errors.password.message
                        });
                      }else{
                        console.log('something went wrong: '+error);
                        res.json({
                          success: false,
                          message: 'something went wrong: '+error
                        });
                      }
                    }
                  }
                }else{
                  console.log('something went wrong: '+error);
                  res.json({
                    success: false,
                    message: 'something went wrong: '+error
                  });
                }
              }
            }else{
              letsMail(req.body.email,randomCode);

              // generate token
              // const token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '24h'});
              // res.json({
              //   success: true,
              //   message: 'Token created',
              //   token: token,
              //   user: {username: user.username}
              // });

              console.log('user saved!');
                res.json({
                  success: true,
                  message: 'Account registered! Please check your email: '+req.body.email+' for activation code!'
                });
            }
          });
        }
      }
    }
  });

  router.get('/activateUser',(req, res)=>{
    if(!req.query.activatingCode){
      res.json({
        success:false,
        message: 'Please provide activation code.'
      });
    }else{
      if(!req.query.email){
        res.json({
          success:false,
          message: 'email not found.'
        });
      }else{
        User.findOne({email:req.query.email }, (error, user)=>{
          if(error){
            res.json({
              success: false,
              message: error
            });
          }else{
            if(!user){
              console.log('user is not found');
              console.log(user);
              res.json({
                success: false,
                message: 'user is not found'
              });
            }else{
              if(user.activation === true){
                res.json({
                  success: false,
                  message:'Your account is already activated!'
                })
              }else{
                if(req.query.activatingCode !== user.randomCode){
                  res.json({
                    success: false,
                    message: 'Please enter correct activation code.'
                  });
                 }else{
                  User.update({email: req.query.email},{
                    activation: true
                  },(error)=>{
                    if(error){
                      res.json({
                        success: false,
                        message: error
                      });
                    }else{
                      return res.json({
                        success: true,
                        message: 'Your account is now activated!'
                      });
                    }
                  });
                } 
              }
            }
          }
        });
      }
    }
  });
  return router;
}



function generateRandomeCode() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function letsMail(recipentEmail,randomCode){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'gnbaviskar2@gmail.com',
      pass: 'password'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  let HelperOptions = {
    from: '"blogApp" <gnbaviskar2@gmail.com>',
    to: recipentEmail,
    subject: 'Email Address verification',
    text: 'Please activate your account using following code: '+randomCode
  };
  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("The message was sent!");
    console.log(info);
  });
}
