
import {  useNavigate, useParams } from 'react-router-dom'
import { studentValiationSchema } from './addstudent.js';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

function EditStudent({students, setStudents}) {
  const {id} = useParams();
  const studendData = students.find(stud => stud._id === id);
  const {values, 
    handleChange, 
    handleSubmit,
    handleBlur,
    errors,
    touched
  } = useFormik({
    initialValues: {
      name: studendData.name,
      author :studendData.author,
      publication :studendData.publication,
      quantity:studendData.quantity,
      image:studendData.image,
    
    }, 
    validationSchema : studentValiationSchema,
    onSubmit :(updatedStudent) =>{
      console.log(updatedStudent);
      updateStudent(updatedStudent);
    }
  })
    const navigate =  useNavigate()

    const updateStudent = async (updatedStudent)=>{
      try {
      //fetch and update data 
      const response = await fetch(`https://librarybook-rsvy.onrender.com/students/edit/${id}`,{
        method:"PUT",
        body:JSON.stringify(updatedStudent),
        headers:{
          "Content-Type":"application/json"
        }
      });
      
      const {data} = await response.json()
      console.log(data)
                //update the studenet
      const studIndex = students.findIndex((stud)=>stud._id === id);

    //    console.log(updatedStudent)
      students[studIndex] = data
      setStudents([...students])
      navigate("/students")
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
   
    <form onSubmit={handleSubmit}>
    <div className='form-group'>
        <h3>Add Book</h3>
        
        <TextField  label="Name" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Name of book'
         type="text"
         value={values.name}
         onChange={handleChange}
         onBlur={handleBlur}
         name="name"
         />
         {touched.name && errors.name ? 
          <div style={{color:"crimson"}}>
           {errors.name} 
          </div>  : ""}

        <TextField  className="textint" label="author" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Author of Book'
         type="text"
         value={values.author}
         onChange={handleChange}
         onBlur={handleBlur}
         name="author"
         />
          {touched.author && errors.author ? 
          <div style={{color:"crimson"}}>
           {errors.author} 
          </div>  : ""}

        <TextField  label="Publication" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Publication of book'
         type="text"
         value={values.publication}
         onChange={handleChange}
         onBlur={handleBlur}
         name="publication"
         />
          {touched.publication && errors.publication ? 
          <div style={{color:"crimson"}}>
           {errors.publication} 
          </div>  : ""}

        <TextField  label="Quantity" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Quantity of Book'
         type="text"
         value={values.quantity}
         onChange={handleChange}
         onBlur={handleBlur}
         name="quantity"
         />
          {touched.quantity && errors.quantity ? 
          <div style={{color:"crimson"}}>
           {errors.quantity} 
          </div>  : ""}
          <TextField  label="Image" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter Image of Book'
         type="text"
         value={values.image}
         onChange={handleChange}
         onBlur={handleBlur}
         name="image"
         />
          {touched.image && errors.image ? 
          <div style={{color:"crimson"}}>
           {errors.image} 
          </div>  : ""}
       <div>
        <Button
        type="submit"
        variant="contained"
        >updateBook</Button>
        </div>
    </div>
    </form>

  )
}

export default EditStudent