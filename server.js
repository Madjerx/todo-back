const express = require("express");
const cors = require("cors"); // to enable CORS for HTTP requests from my react app
const app = express();

var corOptions = {
  origin: "https://localhost:8081",
};

// //MiddleWare

app.use(cors(corOptions)); // enable for all route

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Routers

const router = require("./routes/taskRouter");

app.use("/api/tasks", router);

//Port

const PORT = process.env.PORT || 8080;

//Server

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
