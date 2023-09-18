import {ErrorRequestHandler, Request, Response, NextFunction} from 'express'

class ExceptionController {
    static handle404 = (req: Request, res: Response): void => {
        res.status(404).render('error/404', {active: '', title: '404'})
    }

    static handle500 = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): void => {
        console.error(err)
        res.status(500).send('Internal Server Error')
    }

}

export default ExceptionController