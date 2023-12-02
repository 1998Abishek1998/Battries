import express, { NextFunction, Request, Response, json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors'
import 'express-async-errors';
import mongoose from 'mongoose';

import router from './routes';
import envConfig from './envConfig';
import cookieParser from 'cookie-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import handleError from './middlewares/handle-error';
import DependencyInjectionSetup from './shared/dependency-injection';

const app = express();
app.enable('trust proxy');

/************ INITIALIZE MIDDLEWARES ***********/


app.use(cors())
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ExpressMongoSanitize());

/************* CUSTOM CONFIG ******************/

app.use((req: Request, _res: Response, next: NextFunction) => {
  DependencyInjectionSetup.setup(req);
  next();
});
app.use('/api', router)
app.use(handleError)
app.use((_req, res) => {
  res.status(404).json({
    failed: true,
    message: 'url not found',
  });
});

/********** HANDLE EXCEPTIONS, START APP AND DB ********* */


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});


const server = app.listen(envConfig.PORT, async () => {
  console.log(`Server is running at http://localhost:${envConfig.PORT}`);
  
  await mongoose.connect(envConfig.DATABASE_URL).then(() => console.log('Db connected')).catch(e =>{
    console.log('Db error :', e);
    process.exit(1);
  }); 

});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(JSON.stringify(err));
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
