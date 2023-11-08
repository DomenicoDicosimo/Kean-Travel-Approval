import React, {useEffect, useState} from 'react'
import axios from "axios";
import NavBar from "./NavBar";

export default function TestDatabase() {
    const [message, setMessage] = useState('');
    const [names, setNames] = useState([]);
    useEffect(() => {
        // default endpoint
        axios
          .get('http://127.0.0.1:5000/')
          .then((response) => {
            setMessage(response.data.message);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });

        // staff endpoint - testing db connection
        axios
          .get('http://127.0.0.1:5000/staff')
          .then((response) => {
            const staffNames = response.data.map((staff) => staff.name);
            setNames(staffNames);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      }, []);
    return (
        <>
            <NavBar/>
            <div>
              <h3>Hello from React</h3>
              <h3>{message}</h3>

              {names.map((name, index) => (
                <p key={index}>{name}</p>
              ))}
            </div>
          );
        </>
    )
}