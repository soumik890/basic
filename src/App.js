import { useState } from 'react';
import './App.css';
import Axios from 'axios'
function App() {

const[Name, setName]=useState("")
const[Age, setAge]=useState(0)
const[Position, setPosition]=useState("")
const[Salary, setSalary]=useState(0)

const [emp_list, setemp_list] = useState([])


const [newName, setnewName] = useState("")
const [newAge, setnewAge] = useState(0)
const [newPosition, setnewPosition] = useState("")
const [newSalary, setnewSalary] = useState(0)


const addemp=()=>{
  Axios.post('https://crud-352905.de.r.appspot.com/create',
  {
  emp_name:Name, 
  emp_age:Age, 
  emp_position:Position, 
  emp_salary:Salary
  }).then(()=>{
    setemp_list([...emp_list,{

      emp_name:Name, 
      emp_age:Age, 
      emp_position:Position, 
      emp_salary:Salary

    }])

  })

  document.getElementById("id1").value = "";
  document.getElementById("id2").value = "";
  document.getElementById("id3").value = "";
  document.getElementById("id4").value = "";
}

const getEmp=()=>{
  Axios.get('https://crud-352905.de.r.appspot.com/getemp',
  {
  }).then((res)=>{
    setemp_list(res.data)
  })
}


const updateEmpName=(id)=>{
  Axios.put('https://crud-352905.de.r.appspot.com/updatenam',{emp_name:newName,id:id}).then(
    (res)=>{
    setemp_list(
      emp_list.map((val)=>{
      return val.id==id? {
        id:val.id, 
        emp_name:newName,
        emp_age:val.emp_age,
        emp_position:val.emp_position,
        emp_salary:val.emp_salary
        }
         : val
      })
    )
  }
)
document.getElementById("id5").value = "";
}



const updateEmpAge=(id)=>{

  Axios.put('https://crud-352905.de.r.appspot.com/updateage',{emp_age:newAge,id:id}).then(
    (res)=>{
    setemp_list(
      emp_list.map((val)=>{
      return val.id==id? {
        id:val.id, 
        emp_name:val.emp_name,
        emp_age:newAge,
        emp_position:val.emp_position,
        emp_salary:val.emp_salary
        }
         : val
      })

    )
  }
)

document.getElementById("id6").value = "";
}


const updateEmpPosition=(id)=>{

  Axios.put('https://crud-352905.de.r.appspot.com/updatepos',{emp_position:newPosition,id:id}).then(
    (res)=>{
    setemp_list(
      emp_list.map((val)=>{
      return val.id==id? {
        id:val.id, 
        emp_name:val.emp_name,
        emp_age:val.emp_age,
        emp_position:newPosition,
        emp_salary:val.emp_salary
        }
         : val
      })

    )
  }
)

document.getElementById("id7").value = "";

}



const updateEmpSalary=(id)=>{
  Axios.put('https://crud-352905.de.r.appspot.com/updatesal',{emp_sal:newSalary,id:id}).then(
    (res)=>{
    setemp_list(
      emp_list.map((val)=>{
      return val.id==id? {
        id:val.id, 
        emp_name:val.emp_name,
        emp_age:val.emp_age,
        emp_position:val.emp_position,
        emp_salary:newSalary
        }
         : val
      })

    )
    })
    document.getElementById("id8").value = "";
}


const deleteEmp=(id)=>{
  Axios.delete(`https://crud-352905.de.r.appspot.com/delete/${id}`).then((res)=>{
  setemp_list(emp_list.filter((item)=>{

    return item.id!=id

  }))



  })

}
  return (
    <div className="App">
      <div className='info'>
      <label>Name:</label>
      <input type="text" id='id1' onChange={(event)=>{
        setName(event.target.value)
      }}/>
      <br></br>
      <label>Age:</label>
      <input type="number" id='id2' onChange={(event)=>{
        setAge(event.target.value)
      }}/>
      <br></br>
      <label>Position:</label>
      <input type="text" id='id3' onChange={(event)=>{
        setPosition(event.target.value)
      }}/>
      <br></br>
      <label>Salary:</label>
      <input type="number" id='id4' onChange={(event)=>{
        setSalary(event.target.value)
      }}/>
      <br></br>
      <button id='button1' className='button1' onClick={addemp}>Add Employee!!</button>
      <br></br>
      <button id='button2' className='button2' onClick={getEmp}>Show All Employees!!</button>
      <br />
      {emp_list.map((val)=>{

        return <div className='emp_style'>
        <div>
        <h3>Name:{val.emp_name}</h3>
        <h3>Age:{val.emp_age}</h3>
        <h3>Position:{val.emp_position}</h3>
        <h3>Salary:{val.emp_salary}</h3>
        </div>
        <div>



        <input type="text" placeholder='Edit Name' id='id5' onChange={(event)=>{
        setnewName(event.target.value)}}/>
        <button onClick={()=>updateEmpName(val.id)}>Update</button>




        <input type="number" placeholder='Edit Age' id='id6' onChange={(event)=>{
        setnewAge(event.target.value)}}/>
        <button onClick={()=>updateEmpAge(val.id)}>Update</button>




        <input type="text" placeholder='Edit Position' id='id7' onChange={(event)=>{
        setnewPosition(event.target.value)}}/>
        <button onClick={()=>updateEmpPosition(val.id)}>Update</button>




        <input type="number" placeholder='Edit Salary' id='id8' onChange={(event)=>{
        setnewSalary(event.target.value)}}/>
        <button onClick={()=>updateEmpSalary(val.id)}>Update</button>

        </div>
        <button onClick={()=>deleteEmp(val.id)}>Delete Employee!!</button>
        </div>

      })}
      </div>
    </div>
  );
}

export default App;
