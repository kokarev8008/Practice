import fs from "fs/promises";
import path from "path";
import { Task } from "../Task.js";

const dataPath = path.join("backend", "practice5.2", "data", "task.json");

class TaskController {
    async getAllTasks(req, res) {
        const data = await fs.readFile(dataPath, "utf8");
        res.status(200).send(data);
    } 
    
    async getTaskById(req, res) {
        const task = this._getTaskById(req.params["id"]);
        
        if (task === undefined)
            res.status(404).send({message: "invalid Id"});
        else
            res.status(200).send(task);
    }

    async createTask(req, res) {
        if (req.body.title === undefined || req.body.title === "") {
            res.status(400).send({message: "title is an empty"})
            return;
        }

        const task = new Task(req.body.id, req.body.title, req.body.completed, req.body.createdAt);
        
        const data = await fs.readFile(dataPath, "utf8");

        if (data.length !== 0 || data !== undefined || data !== null) {
            const dataArray = JSON.parse(data);
            dataArray.push(task);
            const newData = JSON.stringify(dataArray, null, 2);

            await fs.writeFile(dataPath, newData);
           
        } else {
            const dataArray = [task];
            const newData = JSON.stringify(dataArray);
            await fs.writeFile(dataPath, newData);
        }

        res.status(200).send({message: "new task is created"});
    }

    async patchTask(req, res) {
        if ((req.body.title === undefined) && (req.body.completed === undefined)) {
            res.status(404).send({message: "not found"});
            return;
        }        

        const data = await fs.readFile(dataPath, "utf8");
        const dataArray = JSON.parse(data);
        
        const task = dataArray.find((value) => value["id"] == req.params["id"]); 
        const index = dataArray.indexOf(task);
        
        task["title"] = req.body.title === undefined ? task["title"] : req.body.title;
        task["completed"] = req.body.completed === undefined ? task["completed"] : req.body.completed;

        dataArray[index] = task;
        
        const patchedArray = JSON.stringify(dataArray, null, 2);

        await fs.writeFile(dataPath, patchedArray);

        res.status(200).send({message: "task is patched"});
    }

    async deleteTask(req, res) {
        console.log(this._getTaskById(req.params.id));
        
        if (await this._getTaskById(req.params.id) === undefined) {
            res.status(404).send({message: "invalid id"});
            return;
        }

        const data = await fs.readFile(dataPath, "utf8");
        const dataArray = JSON.parse(data);
        
        const newDataArray = dataArray.filter((item) => item["id"] !== req.params.id);

        await fs.writeFile(dataPath, JSON.stringify(newDataArray, null, 2));

        res.status(200).send({message: "deleted"});
    }

    async _getTaskById(id) {
        const data = await fs.readFile(dataPath, "utf8");
        const dataArray = JSON.parse(data);
        
        const task = dataArray.find((value) => value["id"] == id);      
        
        return task;
    }
    
}

export default new TaskController();