import express, { Express, Request, Response, NextFunction } from 'express'
import session from 'express-session'
import path from 'path'
import expressLayouts from 'express-ejs-layouts'
import methodOverride from 'method-override'

// Import router
import initRouter from './routes'

const app: Express = express()
const port: number = 3000

// Declare typescript
declare module 'express-session' {
    export interface SessionData {
        createFlash: boolean,
        updateFlash: boolean
    }
}

// Body parser & http method override
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Session
app.use(session({
    secret: 'sss',
    resave: false,
    saveUninitialized: false
}))

// Ejs
app.set('view engine', 'ejs')
app.set('views', 'src/views')

// Ejs layouts
app.use(expressLayouts)
app.set('layout extractScripts', true)

// Static file
app.use(
    '/bootstrap',
    express.static(path.join(__dirname, '../node_modules/bootstrap/dist'))
)
app.use('/public', express.static(path.join(__dirname, '../public')))

// Middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.locals.active = req.url
    next()
})

// Init router
initRouter(app)

app.listen(port, (): void => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
