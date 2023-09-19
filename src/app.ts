import express, { Express, Request, Response, NextFunction } from 'express'
import path from 'path'
import expressLayouts from 'express-ejs-layouts'
import methodOverride from 'method-override'

// Import router
import initRouter from './routes'

const app: Express = express()
const port: number = 3000

/// Body parser & http method override
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

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
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.active = req.url
    next()
})

// Init router
initRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
