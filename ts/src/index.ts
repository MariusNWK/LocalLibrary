import "./pre-start"; // Must be the first import

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";

import EnvVars from "@shared/EnvVars";

import { NodeEnvs } from "@shared/enums";

import indexRouter from "./routes/index";

/**
 * Module dependencies.
 */

const debug = require("debug")("locallibrary:server");
const http = require("http");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

// **** Init express **** //

const app = express();

// **** Set basic express settings **** //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.cookieProps.secret));

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Show routes called in console during development
if (EnvVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan("dev"));
}

app.use("/", indexRouter);

app.get("/", (request, response) => {
  response.send("Hého");
});

export default app;

// *** Generator *** //

/*

import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@shared/EnvVars';
import server from './server';


// **** Start server **** //

const msg = ('Express server started on port: ' + EnvVars.port.toString());
server.listen(EnvVars.port, () => logger.info(msg));

*/
