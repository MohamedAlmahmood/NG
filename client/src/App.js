import './App.css';
import {useState} from "react";
import Axios from 'axios';
import { 
  Input, 
  Button
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


  const addBossTask = ()=>{
    Axios.post('http://localhost:3001/addBossTask', {
      BossName: BossName,
      BossInput: BossInput,
    }).then( ()=>{
      setBossInputsList([...BossInputsList, {
        bossName: BossName,
        bossTask: BossInput,
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
    
  }


  return (
    <div className="App">
      <div className="AssigningTask">
        <Input placeholder='Your Name' onChange={(event)=> {setBossName(event.target.value)}}/>
        <Input placeholder='Assign Task...' onChange={(event)=> {setBossInput(event.target.value)}}/>
        <Button content='Submit' primary onClick={addBossTask}/>
        <Button content='Show All' secondary onClick={showBossTask} />
        {BossInputsList.map((val,key)=>{
          return(
            <div className="showBossTasks">
              <h1>By: {val.bossName}</h1>
              <p1>{val.bossTask}</p1>
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
        <Button content='Show All' secondary />
      </div>

    </div>
  );
}

export default App;
