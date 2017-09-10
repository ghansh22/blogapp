const mongoose = require('mongoose');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) =>{

  router.post('/newBlog',(req, res)=>{
    if(!req.body.title){
      res.json({
        success: false,
        message: 'title not found'
      });
    }else{
      if(!req.body.body){
        res.json({
          success: false,
          message: 'blog body not found'
        });
      }else{
        if(!req.body.createdBy){
          res.json({
            success: false,
            message: 'author not found'
          });
        }else{
          const blog = new Blog({
            title: req.body.title,
            body: req.body.body,
            createdBy: req.body.createdBy
          });
          blog.save((error)=>{
            if(error){
              if(error.errors){
                if(error.errors.title){
                  res.json({
                    success: false,
                    message: error.errors.title.message
                  });
                }else{
                  if(error.errors.body){
                    res.json({
                        success: false,
                        message: error.errors.body.message
                    });
                  }else{
                    res.json({
                        success: false,
                        message: error
                    });
                  }
                }
              }
            }else{
              res.json({
                success: true,
                message: 'Blog saved!'
              });
            }
          });
        }
      }
    }
  });

  router.get('/allBlogs',(req, res)=>{
    Blog.find({},(error,blogs)=>{
      if(error){
        res.json({
          success: false,
          message: error
        });
      }else{
        if(!blogs){
          res.json({
            success: false,
            message: 'No blogs found! Please create one.'
          });
        }else{
          res.json({
            success: true,
            blogs: blogs
          });
        }
      }
    }).sort({'_id': -1});
  });


  return router;
};