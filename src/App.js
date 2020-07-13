import React from 'react';
import 'materialize-css'
import './index.css';
import { CreateNote } from './components/CreateNote';
import { Alert } from './components/Alert'
import { StateAlert } from './AlertContext/StateAlert';

function App() {

  return (
    <StateAlert>
      <div className='container'>
        <Alert />
        <CreateNote />
      </div>
    </StateAlert>
  );
}

export default App;