const Multer  = require('multer')
const path = require('path')

const storage  = Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(global.appRoot,'static/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })

const multer = new Multer({
    storage    
})

module.exports = multer;