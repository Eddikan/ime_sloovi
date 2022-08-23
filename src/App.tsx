import React, { useEffect, useState } from "react";
import "./App.css";
import "./input.css";
import {Task} from "./components/Task";
import {taskType} from "./interfaces/task"
import { useAppDispatch,useAppSelector } from "./store/hooks";
import { login, LOGOUT } from "./features/auth/auth";
import {  CLEAR, getAllTasks } from "./features/task/task";
import { getUserDropDown } from "./features/task/task";

import axios from "axios";

function App() {

  const [task, setTask] = useState<taskType[]>([{
     description: 'desc',
    date: "today",
    time: "9am",
    user: "Eddy",
  }])
  const increaseTask = () => {
    setTask(prevTask => [...prevTask, {
       description: 'desc',
    date: "today",
    time: "9am",
      user: "Eddy",
    
    }])
    
  }
  const handDeleteTask = (index?: number) => {
    if (typeof(index) === "number") {
      
    let olditems = [...task]
    olditems.splice(index, 1)
    setTask(olditems)
    }

  }
  const dispatch = useAppDispatch()
  const selector = useAppSelector(state => state.auth)
  const company_id = useAppSelector(state => state.auth.user.company_id)
  const allTasks = useAppSelector(state => state.task.tasks)

  useEffect(() => {
    dispatch(getUserDropDown())
    dispatch(getAllTasks())
  },[])
  return (
    <main className="bg-slate-100 min-h-screen  px-2 pt-28">
      <div className="flex justify-between my-2">

  <button className="bg-green-500 hover:bg-green-700 text-white  py-2 px-7  rounded" onClick={()=> dispatch(login({email:'smithwills1989@gmail.com', password:'12345678'}))}> Login</button>
        <button className="bg-red-500 hover:bg-red-700 text-white  py-2 px-7  rounded" onClick={() => { dispatch(LOGOUT()); dispatch(CLEAR())}}> Logout</button>
      <button onClick={()=> console.log(selector)}> selector</button>
      </div>
    
      <div className=" w-80">
        <div className="border-slate-400 border-2 px-1 flex justify-between">
          <div className="w-5/6 flex items-center">
            TASKS
            <span className="text-slate-600 ml-1">{ allTasks.length}</span>
          </div>
          <div className="w-1/6 flex justify-center text-2xl p-0  border-slate-400 border-l-2 hover:cursor-pointer"
          
          onClick={()=>increaseTask()}
          
          >
            +
          </div>
        </div>
        {
          task.map((task, index) => (
            <Task {...task} handle={handDeleteTask} index={index} key={index}  />
            
          ))
        }
      </div>
    </main>
  );
}

export default App;
