const express = require('express');
const cors = require('cors');
const { userRouter, studentRouter } = require('./routers/router');
const init = require('./sql/init');

const { PORT: port } = process.env;

// mysql start
require('./db/db');

init();
// mysql section end

// express section start
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use('/users', userRouter);
app.use('/students', studentRouter);

app.listen(port, () => {
  console.log(`Server running on port :${port}`);
});

// exportess section end
