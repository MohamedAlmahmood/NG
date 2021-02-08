import './App.css';
import { 
  Input, 
  Button
} from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      <div className="AssigningTask">
        <Input fluid icon='' placeholder='Assign Task...' />
        <Button content='Submit' primary />
        <Button content='Show All' secondary />
      </div>

      <hr/>

      <div className="responseTask">
        <Input fluid icon='' placeholder='What tasks did you complete today?' />
        <Button content='Submit' primary />
        <Button content='Show All' secondary />
      </div>

    </div>
  );
}

export default App;
