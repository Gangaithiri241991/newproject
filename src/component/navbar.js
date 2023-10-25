import React from 'react'
import Button from '@mui/material/Button'
import {NavLink,useNavigate} from 'react-router-dom'
export default function Navbar(){
  
    return(
        <div className='navbar-style'>
       <NavLink to="/"><li><Button variant='contained'>home</Button></li></NavLink>
       <NavLink to="/students"><li><Button  variant='contained'>Book-Details</Button></li></NavLink>
       <NavLink to="/add-student"><li><Button  variant='contained'>AddBooks</Button></li></NavLink>
       
     
        </div>

    )
}