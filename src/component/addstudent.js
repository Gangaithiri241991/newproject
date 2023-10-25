
import {  useNavigate } from 'react-router-dom'
import { Button, TextField} from '@mui/material'
import * as yup from "yup"
import { useFormik } from 'formik'

export const studentValiationSchema = yup.object({
  name : yup.string().required("Please fill the name details"),
  author :yup.string().required("please fill the author details")
  .min(5,"Hey please fill proper publication name"),
  publication :yup.string().required("Please specify your gender"),
  quantity:yup.string().required("It is not bad to tell your education")
})



function AddStudent({students, setStudents}) {
  const {values, 
    handleChange, 
    handleSubmit,
    handleBlur,
    errors,
    touched
  } = useFormik({
    initialValues: {
      name:"",
      author :"",
      publication :"",
      quantity:"",
      image:"",
      
    }, 
    validationSchema : studentValiationSchema,
    onSubmit :(newStudent) =>{
      console.log(newStudent);
      handleAddStudent(newStudent)
    }
  })

    const navigate = useNavigate()

    const handleAddStudent = async (newStudent)=>{

      try {

        const response = await fetch("https://librarybook-rsvy.onrender.com/students/add", {
          method:"POST",
          body:JSON.stringify(newStudent),
          headers:{
            "Content-Type":"application/json"
          },
        })
        const data = await response.json();

         console.log(data)
         setStudents([...students, data])
        navigate("/students")
        
      } catch (error) {
        console.log(error)
      }

    }
  return (
  
    <form onSubmit={handleSubmit}>
    <div className='form-group'>
        <h4>Add Books</h4>
        
        <TextField  label="Name" variant="outlined" Width="80px"  fullWidth sx={{ m: 1 }} 
        
         placeholder='Enter Name of Book'
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

        <TextField  label="Author" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter author of Book'
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
         placeholder='Enter publication of book'
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
         placeholder='Enter quantity of book'
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
          <TextField  label="image" variant="outlined" fullWidth sx={{ m: 1 }} 
         placeholder='Enter quantity of book'
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
        <Button  className='but'
        type="submit"
        variant="contained"
        >Add Book</Button>
        </div>
    </div>
    </form>
  
  )
}

export default AddStudent