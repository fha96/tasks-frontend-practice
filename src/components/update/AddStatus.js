import axios from 'axios';
import React, { useContext, useState } from 'react'
import cookies from 'react-cookies';
import { TaskContext } from "../../context/TasksContext";


export const AddStatus = (props) => {
    const {getTasks} = useContext(TaskContext);

    const [msg, setMsg] = useState('');
    

    const handleAddStatus = (e) => {

        e.preventDefault();
        const url = `https://white-board-v2.herokuapp.com/status/${props.id}/${cookies.load('id')}`;
       let data = {
            description:e.target.status.value,
            name: cookies.load('userName')
        }
        axios.post(url,data,{
            headers:{
                Authorization: `Bearer ${cookies.load('token')}`
            }
        }).then(resolve => {
          setMsg('added');
            getTasks();
        } ).catch(rejected => alert(rejected.response.data));
    }


  return (
    <div>
        <form onSubmit={handleAddStatus}>
            <input type='text' placeholder='Status' id='status'/>
            <input type='submit' value='add' />
        </form>
        {
            msg&&
            <span>{msg}</span>
        }
      
    </div>
  )
}
