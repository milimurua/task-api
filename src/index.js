import express from 'express';
import routerApi from './routes/index.js';
import cors from 'cors';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler.js';

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost:5500'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) { // Permitir solicitudes sin origen (como herramientas de desarrollo)
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
};

app.use(cors(options)); // Permitir solicitudes desde orígenes en la whiteList

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
