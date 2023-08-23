const express = require('express');

const cors = require('cors');
const app = express();
//const connection = require('./config/dbConnection');
const userRouter = require('./routes/userRouter'); // import userRoutes
const bookmarkRouter = require('./routes/bookmarkRouter'); // import userRoutes
const loggedRouter = require('./routes/loggedRouter'); // import userRoutes

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter); 

app.use("/api/bookmark", bookmarkRouter); 

app.use("/api/logged", loggedRouter); 


const port = 4000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
