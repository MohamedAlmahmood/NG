const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'tasks',
});

app.listen(3001, ()=>{
    console.log("server running on port 3001")
})

app.post('/addBossTask', (req, res)=>{
    const BossName = req.body.BossName;
    const BossInput = req.body.BossInput;
    db.query(
        "INSERT INTO tasks.bosstable (bossName, bossTask) VALUES (?,?)", 
        [BossName, BossInput],
        (err, result)=>{
            if (err){
                console.log(err)
            }else{
                res.send("values inserted")}
        }
    )
})

app.get('/showBossTasks', (req,res)=>{
    db.query(
        "SELECT * FROM tasks.bosstable", (err, result)=>{
            if (err){
                console.log(err)
            }else {
                res.send(result);
            }
        }
    )
})

app.post('/addEmployeeTask', (req,res)=>{
    const EmployeeName= req.body.EmployeeName;
    const EmployeeInput= req.body.EmployeeInput;
    const EmployeeTasksRequired= req.body.EmployeeTasksRequired;
    const EmployeeTasksCompleted= req.body.EmployeeTasksCompleted;
    
    db.query(
        "INSERT INTO tasks.employeetable (employeeName, employeeTask, tasksReq, tasksLeft) VALUES (?,?,?,?)",
        [EmployeeName, EmployeeInput, EmployeeTasksRequired, EmployeeTasksCompleted], 
        (err, result)=>{
            if (err){
                console.log(err)
            }else{
                res.send("values inserted")}
        }
    )
})

app.get('/showEmployeeTasks', (req,res)=>{
    db.query(
        "SELECT * FROM tasks.employeetable", (err, result)=>{
            if (err){
                console.log(err)
            }else {
                res.send(result);
            }
        }
    )
})