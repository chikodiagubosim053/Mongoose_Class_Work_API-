const router = require('express').Router();
const upload = require('../middlewares/multer.js');

const { createPost, getAllPosts, getOnePost  }  = require('../controllers/postController.js');
 

router.post('/newPost/:userId', upload.array('media', 15), createPost);

router.get('/allPosts', getAllPosts);

router.get('/onePost/:id', getOnePost);



module.exports = router;