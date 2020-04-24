import React, {useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  useEffect(() => {
    getDB();
  }, []);

  const getDB = async() => {
    const res = await axios.get('/get/db');
      console.log(res.data);
  }
    return (
        <div>
            하이
        </div>
    );
}

export default App;
