const User = require('../models/user');
module.exports = (router) => {

/* ==================================================
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
          let user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
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
                  console.log('user saved!');
                  res.json({
                    success: false,
                    message: 'user saved!'
                  });
            }
          });
        }
      }
    }
  });
  return router;
}