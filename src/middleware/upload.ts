import multer, {StorageEngine, FileFilterCallback, Multer} from 'multer'

const storage: StorageEngine = multer.diskStorage({
    destination: (req, file: Express.Multer.File, cb): void => {
        cb(null, 'public/images')
    },
    filename: function (req, file: Express.Multer.File, cb): void {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})

const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback): void => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload: Multer = multer({storage, fileFilter})

export default upload