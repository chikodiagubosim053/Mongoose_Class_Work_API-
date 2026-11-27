const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
require('./database/database');
const userRouter = require('./router/userRouter.js')
const postRouter = require('./router/postRouter.js')


const app = express();
app.use(express.json());
app.use(userRouter);
app.use(postRouter);



app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});

