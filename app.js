require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT_NUMBER;

const memberRouter = require('./routes/memberRoutes');
const noteRouter = require('./routes/noteRoutes');
const favoriteRouter = require('./routes/favoriteRoutes');

app.use(express.json());
app.use(cookieParser());

app.use('/', memberRouter);
app.use('/notes', noteRouter);
app.use('/favorites', favoriteRouter);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중!`);
});
