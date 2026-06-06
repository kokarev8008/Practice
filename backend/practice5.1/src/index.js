import fs from "node:fs/promises";
import path from "path";

const dataPath = path.join("backend", "practice5.1", "data", "users.json");
const outputPath = path.join("backend", "practice5.1", "output", "result.json");

const usersData = await getDataUsers();
const filtredUsers = usersData.filter((value) => value.age > 20);
const usersSorted = filtredUsers.sort((a, b) => a.age - b.age);

saveDataUsers(usersSorted);

async function saveDataUsers(users) {
    try {
        await fs.writeFile(outputPath, JSON.stringify(users, null, 2));    
    } catch (error) {
        console.log(error);
    }
}

async function getDataUsers() {
    try {
        const dataText = await fs.readFile(dataPath, "utf8");
    } catch (error) {
        console.log(error);
    }

    return JSON.parse(dataText);
}
