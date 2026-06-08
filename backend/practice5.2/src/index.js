import express from "express";
import taskRouter from "./routers/taskRouter.js";

const PORT = 3000;
const hostName = "127.0.0.1";

const app = express();

app.use(express.json());
app.use(taskRouter);

app.listen(PORT, hostName, () => console.log("server is started. Domen: http://" + hostName + ":" + PORT));

