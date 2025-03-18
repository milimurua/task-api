const { Client } = require('pg')
const { password } = require('pg/lib/defaults')

async function getConnection(){
    const client = new Client({
        host: 'localhosto',
        port: 5432,
        user: '${DB_NAME}',
        password: '${DB_USER}',
        database: 'task'    
    })
    await client.connect()
    return client
}

export default getConnection;

