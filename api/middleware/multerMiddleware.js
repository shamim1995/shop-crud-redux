import multer from 'multer'
import path from "path"

const __dirname = path.resolve()
// multer
const uploadImage = ({

    fields


}) => {




    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname == 'photo' || file.fieldname == 'gallery') {
                cb(null, path.join(__dirname, 'api/public/images/products'))
            }
    
        },
        filename: (req, file, cb) => {
    
            if (file.fieldname == 'photo' || file.fieldname == 'gallery') {
                let extName = path.extname(file.originalname)
                let fileName = Date.now() + '-' + Math.round(Math.random() * 1000000) + '' + extName
    
                cb(null, fileName)
            }
    
        }
    
    });
    const upload = multer({
        storage: storage,
        limits: (1024 * 1024),
        fileFilter: (req, file, cb) => {
    
            if (file.fieldname == "photo" || file.fieldname == 'gallery') {
                if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/webp') {
                    cb(null, true)
                } else {
                    cb(alert('File Name Invalid'))
                }
            } else {
                cb(console.log('check File'))
            }
    
    
    
        }
    
    
    }).fields([
        ...fields,
    ])

    return upload
}

export default uploadImage;
