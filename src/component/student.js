import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {  Paper } from '@mui/material';
import Navbar from './navbar';

const Student = ({students, setStudents}) => { 
  const navigate =  useNavigate()
  useEffect(()=>{
   //if(!localStorage.getItem("token")){
     // navigate("/login", {replace:true})
   //}
  })

    const deleteStudent = async (studentId)=>{
      try {
        const res = await fetch(`https://librarybook-rsvy.onrender.com/students/delete/${studentId}`, {
          method:"DELETE"
        });
        const {data} = await res.json()
        console.log(data)

          const removedStudent = students.filter(student=>student.id !== studentId);
          setStudents(removedStudent)
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
   <div style={{backgroundColor:"azure"}}>
    <h4>Books Details</h4>
    <div className='card-container'>
       
    {console.log(students)}
    
      {students?.map((stud, idx)=> {
        
return(
    
<Card sx={{ maxWidth: 200,height:200,backgroundColor:"aquamarine" ,transition:".3s",  boxShadow: "0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3)"}}key={idx}>

<CardContent>
<Typography gutterBottom variant="h5" component="div">
{stud.name}
</Typography>
<Typography variant="body2" color="text.primary">
Author:{stud.author}
</Typography>
<Typography variant="body2" color="text.primary">
publication:{stud.publication}
</Typography>
<Typography variant="body2" color="text.primary">
Quantity:{stud.quantity}
</Typography>
<Typography variant="body2" color="text.primary">
<img src={stud.image} height={"10%"} width={"10%"}/>
</Typography>


</CardContent>
<div className='edit-button'>
<CardActions>
 
<Button className="but" color="secondary" onClick={()=>navigate(`/edit/${stud._id}`)}>Edit</Button >{" "}
{console.log(stud)}
<Button  className="but" size="small" onClick={()=>deleteStudent(stud._id)}>Delete</Button>


</CardActions>
</div>
</Card>

          
               
      )})}
</div>
</div>

  )
}

export default Student