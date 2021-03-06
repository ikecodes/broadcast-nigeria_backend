import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 😁');
  process.exit(1);
});

import app from './app.js';

const LocalDB = process.env.LOCAL_DATABASE;
const DB = process.env.DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('successfully connected to database 😁');
  });

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 😁');
  server.close(() => {
    process.exit(1);
  });
});
