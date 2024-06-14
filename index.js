import express from 'express';
import { connect } from 'mongoose';
import 'dotenv/config';
import aboutRoute from './routes/about.js';
import userRoute from './routes/user.js';
import stockRoute from './routes/stock.js';




const app = express();

//Middleware to parser JSON bodies
app.use(express.json());

// Routes
app.use('/about', aboutRoute);
app.use('/user', userRoute);
app.use('/stock', stockRoute);



app.get('/', (req, res) => {
    res.send('Startsidan');
});

// Connect to DB start server
const startServer = async () => {
  try {
    await connect(process.env.DB_CONNECTION, {
    });
    console.log("Connected to the database");

    app.listen(3030, () => {
      console.log('Server is running on port 3030');
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

startServer();


// 
// import path from "path";
// import { fileURLToPath } from "url";
// import errorHandler from "./middlewares/errorHandler.js";
// import orderRouter from "./routes/order.js";
// import cartRouter from "./routes/cart.js";
// import checkoutRouter from "./routes/checkout.js";
// import orderHistoryRouter from "./routes/orderHistory.js";
// import statusRouter from "./routes/status.js";
// import notFoundMiddleware from "./middlewares/urlNotFound.js";


// app.use("/menu", orderRouter);
// app.use("/cart", cartRouter);
// app.use("/checkout", checkoutRouter);
// app.use("/orderHistory", orderHistoryRouter);
// app.use("/status", statusRouter);
// app.use(notFoundMiddleware);


// app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   const error = new Error("Page not found");
//   error.status = 404;
//   next(error);
// });

