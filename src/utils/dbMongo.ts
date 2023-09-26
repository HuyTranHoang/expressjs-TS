import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'

const uri: string =
    'mongodb+srv://huyth:Rrh7QlDbA5JrIiNx@huyth.myi7vyd.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
const dbName = 'c2202_nodejs'
let mongoConnectPool: Db

const collections: { products?: Collection } = {}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function mongoConnect() {
    try {
        await client.connect()
        mongoConnectPool = client.db(dbName)
        console.log('MongoDB connected')

        collections.products = mongoConnectPool.collection('products')
    } catch (err) {
        console.log(err)
    }
}

const getDb = () => {
    if (mongoConnectPool) return mongoConnectPool
    throw 'No database found'
}

export default client
export { mongoConnect, getDb, collections }
