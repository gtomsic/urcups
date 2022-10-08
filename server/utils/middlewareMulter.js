const multer = require('multer')
const { v4: uuid } = require('uuid')

const fileStorageEngine = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads')
   },
   filename: (req, file, cb) => {
      cb(null, uuid() + file.originalname)
   },
})

const upload = multer({ storage: fileStorageEngine })

/* 
To sing singleUpload 
app.post('/single', upload.single('image'), (req, res)=> {
  // Code here
  console.log(req.file)
}) 
To sing multipleUpload 
app.post('/multiple', upload.array('images', 20), (req, res)=> {
  // Code here
  console.log(req.files)
}) 
*/

module.exports = { upload }
