const express = require('express');
const app = express();
const port = 3000;

const memberRouter = require('./routes/members');
const noteRouter = require('./routes/notes');
const favoriteRouter = require('./routes/favorites');

app.use(express.json());
app.use('/', memberRouter);
app.use('/notes', noteRouter);
app.use('/favorites', favoriteRouter);

app.listen(port, () => {
  console.log(`${port} 포트에서 서버 실행 중`);
});
