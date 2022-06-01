import React, { useEffect, useState } from "react";
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';


export const Form = ()=>{
const [details,setDetails] = useState({
    Name : "",
    Age : "",
    Address : "",
    Department : "",
    Salary: "",
    Marital_Status : "",
});
let [userData,setuserData] = useState([]);
useEffect(()=>{
    axios.get("http://localhost:3001/users").then((res)=>{
        setuserData([...res.data]);
    }).catch((err)=> console.log(err))
},[])
console.log(userData);

function onDetails(e){
    //console.log(e.target.id,e.target.value)
    const {id,value} = e.target
    setDetails({
        ...details,
        [id] : value,
    })
}
const submitForm = (e)=>{
    e.preventDefault()
    //console.log(details)
    axios.post("http://localhost:3001/users", details).then((res)=>{
        console.log(res)
    }).catch((err)=>{console.log(err)});

}


//console.log(uuidv4())

    return (
        <>
        <form onSubmit={submitForm}>
            <label htmlFor="" ><h1>Name</h1></label>
            <input type="text" id="Name" onChange={onDetails}/>
            <label htmlFor=""><h1>Age</h1></label>
            <input type="Number" id="Age" onChange={onDetails}/>
            <label htmlFor=""><h1>Address</h1></label>
            <textarea type="text" id="Address" onChange={onDetails}/>    
            <br />
            <select id="Department" onChange={onDetails}>
                <option value="Civil">Civil</option>
                <option value="CS">CS</option>
                <option value="Mechanical">Mechanical</option>
            </select>
            <br />
            <input type="Number" id="Salary" onChange={onDetails}/>
            <br />
            <input type="checkbox" name="" id="Marital_Status" value="Male" onChange={onDetails}/><span>Male</span>
            <input type="checkbox" name="" id="Marital_Status" value="Female" onChange={onDetails}/><span>Female</span>

            <br />
            <input type="submit" />
        </form>
           <table >
               <thead >
                   <tr >
                   <th >Age</th>
                   <th >Name</th>
                   <th >Address</th>
                   <th >Department</th>
                   <th >salary</th>
                   <th >Marital_status</th>
                   </tr>
               </thead>
               <tbody >
                
                   {userData.map((e)=>{
                       //console.log(e.Name)
                       return (<tr key={e.id}>
                        <td  >{e.Name}</td>
                        <td >{e.Age}</td>
                        <td >{e.Address}</td>
                        <td >{e.Department}</td>
                        <td >{e.Marital_Status}</td>
                        <td >{e.Salary}</td>
                       </tr>)
                   })
                   }
                   
               </tbody>
           </table>
        </>
    )
}