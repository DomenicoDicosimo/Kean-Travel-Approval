import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/test')
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div>
      <h3>Hello from React</h3>
      <h3>{message}</h3>
    </div>
  );
}

export default App;
