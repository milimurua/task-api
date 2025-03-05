const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
const whiteList = ['http://localhost:5500']
const option ={
    origin: (origin, callback) => {
        if(whiteList.includes(origin)) {
            callback(null, true);
        }else{
            callback(new Error('no permitido'));
        }
    }
}
app.use(cors()); // Permitir solicitudes desde cualquier origen

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});