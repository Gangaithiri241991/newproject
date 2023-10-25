import logo from './logo.svg';
import './App.css';
import NavBar from './component/navbar';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Home from './component/home'
import Student from './component/student'
import AddStudent from './component/addstudent';
import EditStudent from './component/editstudent';

import {useState,useEffect} from 'react'
function App() {

  const [students, setStudents] = useState([]);
  const navigate =  useNavigate()
  useEffect(()=>{
    const getStudentDetails = async()=>{
      const res = await fetch(`https://librarybook-rsvy.onrender.com/students/all`, {
        method: "GET",
        //headers : {
         // "x-auth-token" : localStorage.getItem("token")
       // }
      }); 
      const data = await res.json();
      setStudents(data.data)
    }
    //if(!localStorage.getItem("token")){
      //navigate("/login")
    //}else {
      
    //}
    getStudentDetails()
  }, [])
 
  return (
    <div className="App">
      <NavBar/>
      
      <Routes>
          <Route exact path="/" element ={<Home/>}/>
          <Route path="/students" element ={<Student
          students={students}
          setStudents={setStudents}
          />}/>
    
        <Route
          path="/add-student"
          element ={<AddStudent
            students={students}
            setStudents={setStudents}
          />}
          />

         <Route
         path="/edit/:id"
         element ={<EditStudent
             students={students}
            setStudents={setStudents}
         />}
         />
         </Routes>
    </div>
  );
}

export default App;

