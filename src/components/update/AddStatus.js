import axios from 'axios';
import React, { useState } from 'react'
import cookies from 'react-cookies';

export const AddStatus = (props) => {

    const [msg, setMsg] = useState('');
    

    const handleAddStatus = (e) => {

        e.preventDefault();
        const url = `${process.env.REACT_APP_API}/${props.id}/${cookies.load('id')}`;
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
          window.location.reload();
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
