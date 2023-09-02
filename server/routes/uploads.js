// const express = require('express');
// const fs = require('fs');
// const util = require('util');
// const unlinkFile = util.promisify(fs.unlink);
// const router = express.Router();
// const multer = require('multer');
// const isAuth = require('../middlewares/isAuth');
// const { uploadFile, getFileStream } = require('../utils/s3');

// const upload = multer({ dest: 'uploads' });

// // @route   POST /upload/image
// // @desc    Upload product images
// // @access  protected

// router.post('/image', isAuth, upload.single('image'), async (req, res) => {
//   const file = req.file;
//   try {
//     console.log("req.file", req.file);
//     const result = await uploadFile(file);
//     await unlinkFile(file.path);
//     res.status(200).json({ imagePath: result.Key });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ errors: { msg: 'Server error' } });
//   }
// });

// // @route   GET /upload/image/:key
// // @desc    Get image with key
// // @access  protected
// // router.get('/image/:key', async (req, res) => {
// //   try {
// //     console.log("req.params.key", req.params);
// //     const fileBuffer = await getFileStream(req.params.key);

// //     res.status(200).send(fileBuffer);
// //     fileBuffer.pipe(res);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ errors: { msg: 'Server error' } });
// //   }
// // });



// // router.get('/image/:key', async (req, res) => {
// //   try {
// //     const fileStream = await getFileStream(req.params.key);
    
// //     fileStream.on('error', (error) => {
// //       console.error('Error retrieving file stream:', error);
// //       res.status(500).json({ errors: { msg: 'Error retrieving file' } });
// //     });

// //     fileStream.pipe(res);
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ errors: { msg: 'Server error' } });
// //   }
// // });




// router.get('/image/:key', async (req, res) => {
//   try {
//     const fileStream = await getFileStream(req.params.key);
    
//     const buffers = [];
    
//     fileStream.on('data', (chunk) => {
//       buffers.push(chunk);
//     });

//     fileStream.on('end', () => {
//       const fileBuffer = Buffer.concat(buffers);
//       res.set('Content-Type', 'image/jpeg/png'); // Set the appropriate content type
//       res.send(fileBuffer);
//     });

//     fileStream.on('error', (error) => {
//       console.error('Error retrieving file stream:', error);
//       res.status(500).json({ errors: { msg: 'Error retrieving file' } });
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ errors: { msg: 'Server error' } });
//   }
// });

// module.exports = router;


// routes/upload.js
const express = require('express');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const router = express.Router();
const multer = require('multer');
const isAuth = require('../middlewares/isAuth');
const { uploadFiles, getFileStream } = require('../utils/s3');

const upload = multer({ dest: 'uploads' });

// @route   POST /upload/images
// @desc    Upload product images
// @access  protected

router.post('/images', isAuth, upload.array('images', 4), async (req, res) => {
  const files = req.files;

  if (!files || files.length !== 4) {
    return res.status(400).json({ errors: { msg: 'Please upload 4 images' } });
  }

  try {
    const result = await uploadFiles(files);
    await Promise.all(files.map((file) => unlinkFile(file.path)));

    res.status(200).json({ imagePaths: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: { msg: 'Server error' } });
  }
});

router.get('/image/:key', async (req, res) => {
  try {
    const fileStream = await getFileStream(req.params.key);

    const buffers = [];

    fileStream.on('data', (chunk) => {
      buffers.push(chunk);
    });

    fileStream.on('end', () => {
      const fileBuffer = Buffer.concat(buffers);
      res.set('Content-Type', 'image/jpeg/png'); // Set the appropriate content type
      res.send(fileBuffer);
    });

    fileStream.on('error', (error) => {
      console.error('Error retrieving file stream:', error);
      res.status(500).json({ errors: { msg: 'Error retrieving file' } });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ errors: { msg: 'Server error' } });
  }
});

module.exports = router;
