const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
const http = require("http");
const chatServer = http.createServer(app);
const io = socket(chatServer);
const chatPort = 3001;
const cors = require("cors");
const { host } = require("./config/config");
const port = host.port;
// const errorHandler = require("./middlewares/error-handler");
// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger-output");

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// chat
app.use("/css", express.static("./static/css"));
app.use("/js", express.static("./static/js"));

io.on("connection", (socket) => {
  socket.on("newUser", (name) => {
    console.log(name + "님이 접속하셨습니다.");
    socket.name = name;
    io.sockets.emit("update", {
      type: "connect",
      name: "SERVER",
      message: name + "님이 접속하셨습니다.",
    });
  });

  socket.on("message", (data) => {
    data.name = socket.name;
    console.log("서버2", data);
    socket.broadcast.emit("update", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.name + "님이 나가셨습니다.");
    socket.broadcast.emit("update", {
      type: "disconnect",
      name: "SERVER",
      message: socket.name + "님이 나가셨습니다.",
    });
  });
});

// cors
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: "true",
    // cors options
  })
);

// router
const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);

// errorHandler
// app.use(errorHandler);

// swagger
// app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

chatServer.listen(chatPort, () => {
  console.log(`running http://localhost:${chatPort}`);
});

module.exports = app;
