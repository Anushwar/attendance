const express = require('express');
const cors = require('cors');
const { adminRouter, authRouter, teacherRouter } = require('./routers/router');
const init = require('./sql/init');
const morgan = require('morgan')

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

app.use('/admins', adminRouter);
app.use('/teachers', teacherRouter);
app.use('/auth', authRouter);


morgan.token('body', (req) => JSON.stringify(req.body, null, 4));
app.use(morgan('REQUEST TYPE::method\nEND POINT::url\nSTATUS::status, TIME::response-time ms, CONTENT-LENGTH::res[content-length]\nBODY:\n:body'));

app.listen(port, () => {
  console.log(`Server running on port :${port}`);
});

// exportess section end
