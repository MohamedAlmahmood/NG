import './App.css';
import {useState} from "react";
import Axios from 'axios';
import myImage from './logo.png';
import { 
  Input, 
  Button,
  Dropdown,
  Menu,
  Form,
  TextArea,
  Image,
  Label,
} from 'semantic-ui-react'


const Home=(props)=> {
  const [BossName, setBossName] = useState("");
  const [EmployeeName, setEmployeeName] =useState("");

  const [BossInput, setBossInput] = useState("");
  const [EmployeeInput, setEmployeeInput] = useState("");

  const [BossInputsList, setBossInputsList] = useState([]);

  const [EmployeeTasksRequired, setEmployeeTasksRequired] = useState(0);
  const [EmployeeTasksCompleted, setEmployeeTasksCompleted] = useState(0);
  const [EmployeeInputsList, setEmployeeInputsList] = useState([]);

  const [Priority, setPriority] = useState("");
  const [Status, setStatus] = useState("Pending");
  
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
        status: Status,
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

  const deleteEmployeeTask = (id)=>{
    Axios.delete(`http://localhost:3001/deleteemployee/${id}`).then((response)=>{
      setEmployeeInputsList(EmployeeInputsList.filter((val)=>{
        return val.taskID!=id //show all the rows of the array where id is not the same as the id we are passing in the method. 
      }))
    });
  }

  const options = [
    { key: 1, text: 'Low', value: 'low' },
    { key: 2, text: 'Medium', value: 'medium' },
    { key: 3, text: 'High', value: 'high' },
  ]
  const statusOptions = [
    { key: 1, text: 'Pending', value: 'Pending' },
    { key: 2, text: 'In progress', value: 'In progress' },
    { key: 3, text: 'Completed', value: 'Completed' },
  ]

  const changeStatus = (id)=>{
    Axios.put('http://localhost:3001/changeStatus', {
      id: id,
      Status: Status,
    }).then((response)=>{
      alert('Status Updated!')
      setBossInputsList(
        BossInputsList.map((val)=>{
          //go through the database, if its the same employee using the id then keep everything the same but change the salary
          //else 
          return val.taskID==id ? {
            id: val.taskID,
            bossName: val.bossName,
            bossTask: val.bossTask,
            priority: val.priority,
            status: Status,
          }: val //else, keep the database the same
        })
      )
    })
  }


  return (
    <div className="App">
      <Image src={myImage} style={{width:'130px', height:'140px'}}/>
      <div className="AssigningTask">
        <Input placeholder='Your Name' onChange={(event)=> {setBossName(event.target.value)}}/>
        <Form>
          <TextArea style={{fontSize: 25}} placeholder='Assign Task...' onChange={(event)=> {setBossInput(event.target.value)}}/>
        </Form>
        <div style={{marginLeft: 350, marginTop: 10, marginBottom:10}}>
          <Menu compact>
            <Dropdown text='Priority' options={options} simple item onChange={(event)=> {setPriority(event.target.textContent)}}/>
          </Menu> 
        </div>
        <Button content='Submit' color='red' onClick={addBossTask}/>
        <Button content='Show All' secondary onClick={showBossTask} />

        <div className="preline">
          {BossInputsList.map((val,key)=>{
            return(
              <div className="showAllTasks">
              <div style={{float: 'right'}}>
                  <Label key='massive' size='massive'>
                    {val.priority}
                  </Label>
                </div>
                <h1 style={{fontSize: 40}}>{val.bossName}</h1>
                <p1>{val.bossTask}</p1>
          
                <div style={{marginTop: 30}}>
                  <Button negative onClick={()=> {deleteBossTask(val.taskID)}}> Delete </Button>
                </div>
                <div style={{marginLeft: 250}}>
                  <Menu compact>
                  <Button content='Submit' color='red' onClick={()=>{
                    changeStatus(val.taskID)
                  }}/>
                    <Dropdown text='Status' options={statusOptions} simple item onChange={(event)=> {setStatus(event.target.textContent)}}/>
                  </Menu> 
                  <Label as='a' color='red' tag>
                    {val.status}
                  </Label>
                </div>

              </div>
            )
          })}
        </div>
        
        
      </div>

      <hr/>

      <div className="responseTask">
        <Input placeholder='Your Name' onChange={(event)=> {setEmployeeName(event.target.value)}}/>
       <Form>
          <TextArea style={{fontSize: 25}} placeholder='Tasks Completed...' onChange={(event)=> {setEmployeeInput(event.target.value)}}/>
        </Form>
        <div className="tasksInput">
          <Input placeholder='Tasks Required' onChange={ (event)=> {setEmployeeTasksRequired(event.target.value)} }/>
          <Input placeholder='Tasks Completed' onChange={ (event)=> {setEmployeeTasksCompleted(event.target.value)} }/>
        </div>
        <Button content='Submit' color='red' onClick={addEmployeeTask}/>
        <Button content='Show All' onClick={showEmployeeTask}secondary /> 
        <div className="preline">
          {EmployeeInputsList.map((val,key)=>{
            return(
              <div className="showAllTasks">
                <h1 style={{fontSize: 40}}>{val.employeeName}</h1>
                <p1>{val.employeeTask}</p1>
                <br></br>
                <br></br>
                <div className="percentageCompleted">
                  <p2>Percentage Completed: </p2>
                  <p2>{(100/val.tasksReq)*val.tasksLeft}%</p2>
                </div>
                <div>
                  <Button negative onClick={()=> {deleteEmployeeTask(val.taskID)}}> Delete </Button>
                </div>
              </div>
              
            )
          })}
        </div>
        
      </div>

    </div>
  );
}

export default Home;
