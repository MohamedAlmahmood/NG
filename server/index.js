const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');
const { Save } = require('@material-ui/icons');

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
    const Priority = req.body.Priority;
    const Status = req.body.Status;
    db.query(
        "INSERT INTO tasks.bosstable (bossName, bossTask, priority) VALUES (?,?,?)", 
        [BossName, BossInput, Priority, Status],
        (err, result)=>{
            if (err){
                console.log(err)
            }else{
                res.send("values inserted")}
        }
    )
})

app.put('/changeStatus', (req, res)=>{
    const id = req.body.id;
    const Status = req.body.Status;
    console.log(Status);
    db.query(
        "UPDATE tasks.bosstable SET status=? WHERE taskID=?",
        [Status, id],
        (err, result)=>{
            if (err){
                console.log(err)
            }else{
                res.send("Status updated")}
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

app.delete('/deleteboss/:id', (req, res)=>{
    const id = req.params.id //get the id from the parameters
    db.query("DELETE FROM tasks.bosstable WHERE taskID=?", id, (err, results)=>{
         if(err){
             console.log(err);
         }else{
            res.send(results)
         }
    })
})

app.delete('/deleteemployee/:id', (req, res)=>{
    const id = req.params.id //get the id from the parameters
    db.query("DELETE FROM tasks.employeetable WHERE taskID=?", id, (err, results)=>{
         if(err){
             console.log(err);
         }else{
            res.send(results)
         }
    })
})

app.post('/checkUserName', (req,res)=>{
    const username = req.body.Username;
    const password = req.body.Password;
    db.query("SELECT username, password FROM tasks.users WHERE username=? AND password=?",[username, password] , (err, results)=>{
        if(err){
            console.log(err);
        }else{
            console.log(results)
            console.log(results.length)
            if(results.length>0){
                res.send('1');
                
            }else{
                res.send('0');
            }
            
        }
   })
})