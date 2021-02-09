import './App.css';
import {useState} from "react";
import Axios from 'axios';
import { 
  Input, 
  Button,
  Dropdown,
  Menu,
} from 'semantic-ui-react'


function App() {
  const [BossName, setBossName] = useState("");
  const [EmployeeName, setEmployeeName] =useState("");

  const [BossInput, setBossInput] = useState("");
  const [EmployeeInput, setEmployeeInput] = useState("");

  const [BossInputsList, setBossInputsList] = useState([]);

  const [EmployeeTasksRequired, setEmployeeTasksRequired] = useState(0);
  const [EmployeeTasksCompleted, setEmployeeTasksCompleted] = useState(0);
  const [EmployeeInputsList, setEmployeeInputsList] = useState([]);

  const [Priority, setPriority] = useState("");
  

  const addBossTask = ()=>{
    Axios.post('http://localhost:3001/addBossTask', {
      BossName: BossName,
      BossInput: BossInput,
      Priority: Priority,
    }).then( ()=>{
      setBossInputsList([...BossInputsList, {
        bossName: BossName,
        bossTask: BossInput,
        priority: Priority,
      }])
    })
  }

  const addEmployeeTask = ()=>{
    Axios.post('http://localhost:3001/addEmployeeTask', {
      EmployeeName: EmployeeName,
      EmployeeInput: EmployeeInput,
      EmployeeTasksRequired: EmployeeTasksRequired,
      EmployeeTasksCompleted: EmployeeTasksCompleted,
    }).then(()=>{
      setEmployeeInputsList([...EmployeeInputsList, {
        employeeName: EmployeeName,
        employeeTask: EmployeeInput,
        tasksReq: EmployeeTasksRequired,
        tasksLeft: EmployeeTasksCompleted,
      }])
    })
  }

  const showBossTask = ()=>{
    Axios.get('http://localhost:3001/showBossTasks').then((response)=>{
      setBossInputsList(response.data);
    })
  }

  const showEmployeeTask = ()=>{
    Axios.get('http://localhost:3001/showEmployeeTasks').then((response)=>{
      setEmployeeInputsList(response.data);
    })
  }

  const deleteBossTask = (id)=>{
    Axios.delete(`http://localhost:3001/deleteboss/${id}`).then((response)=>{
      setBossInputsList(BossInputsList.filter((val)=>{
        return val.taskID!=id //show all the rows of the array where id is not the same as the id we are passing in the method. 
      }))
    });
  }

  const options = [
    { key: 1, text: 'Low', value: 'low' },
    { key: 2, text: 'Medium', value: 'medium' },
    { key: 3, text: 'High', value: 'high' },
  ]


  return (
    <div className="App">
      <div className="AssigningTask">
        <Input placeholder='Your Name' onChange={(event)=> {setBossName(event.target.value)}}/>
        <Input placeholder='Assign Task...' onChange={(event)=> {setBossInput(event.target.value)}}/>
        <div style={{marginLeft: 350, marginTop: 10, marginBottom:10}}>
          <Menu compact>
            <Dropdown text='Priority' options={options} simple item onChange={(event)=> {setPriority(event.target.textContent)}}/>
          </Menu> 
        </div>
        <Button content='Submit' primary onClick={addBossTask}/>
        <Button content='Show All' secondary onClick={showBossTask} />
        
        
        {BossInputsList.map((val,key)=>{
          return(
            <div className="showAllTasks">
              <h1>By: {val.bossName}</h1>
              <p1>{val.bossTask}</p1>
              <div style={{marginLeft: 600}}>
                <p2>Priority: {val.priority}</p2>
              </div>
              <div>
                <Button negative onClick={()=> {deleteBossTask(val.taskID)}}> Delete </Button>
              </div>
            </div> 
          )
        })}
      </div>

      <hr/>

      <div className="responseTask">
        <Input placeholder='Your Name' onChange={(event)=> {setEmployeeName(event.target.value)}}/>
        <Input placeholder='What tasks did you complete today?' onChange={ (event)=> {setEmployeeInput(event.target.value) }}/>
        <div className="tasksInput">
          <Input placeholder='Tasks Required' onChange={ (event)=> {setEmployeeTasksRequired(event.target.value)} }/>
          <Input placeholder='Tasks Completed' onChange={ (event)=> {setEmployeeTasksCompleted(event.target.value)} }/>
        </div>
        <Button content='Submit' primary onClick={addEmployeeTask}/>
        <Button content='Show All' onClick={showEmployeeTask}secondary /> 
        {EmployeeInputsList.map((val,key)=>{
          return(
            <div className="showAllTasks">
              <h1>By: {val.employeeName}</h1>
              <p1>{val.employeeTask}</p1>
              <br></br>
              <br></br>
              <div className="percentageCompleted">
                <p2>Percentage Completed: </p2>
                <p2>{(100/val.tasksReq)*val.tasksLeft}%</p2>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
