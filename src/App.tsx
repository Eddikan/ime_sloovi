import React, { useEffect, useState } from "react";
import "./App.css";
import "./input.css";
import { Task } from "./components/Task";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { login, LOGOUT } from "./features/auth/auth";
import { CLEAR, getAllTasks } from "./features/task/task";
import { getUserDropDown } from "./features/task/task";
import { AddTask } from "./components/AddTask";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [logginIn, setlogginIn] = useState(false);

  const dispatch = useAppDispatch();
  // get tasks from store,format and reverse the list
  const allTasks = useAppSelector((state) => state.task.tasks)
    .map((task) => {
      return {
        description: task.task_msg,
        date: task.task_date,
        time: task.task_time,
        user: task.assigned_user,
        task_msg: "",
        task_date: "",
        task_time: "",
        assigned_user: task.assigned_user,
        task_id: task.id,
        id: "",
      };
    })
    .reverse();

  const cancelAdd = () => {
    setShowAdd(false);
  };

  useEffect(() => {
    // dispatch redux actions when mounted
    dispatch(getUserDropDown());
    dispatch(getAllTasks());
  }, []);

  const handleLogin = async () => {
    try {
      setlogginIn(true);
      await dispatch(
        login({ email: "smithwills1989@gmail.com", password: "12345678" })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setlogginIn(false);
    }
  };
  return (
    <main className="bg-slate-100 min-h-screen  px-2 pt-28">
      <div className="flex justify-between my-2 w-3/6">
        <button
          className="bg-green-500 hover:bg-green-700 text-white disabled:bg-green-200 py-2 px-7  rounded"
          disabled={logginIn}
          onClick={() => handleLogin()}
        >
          {" "}
          Login
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white  py-2 px-7  rounded"
          onClick={() => {
            dispatch(LOGOUT());
            dispatch(CLEAR());
          }}
        >
          {" "}
          Logout
        </button>
      </div>

      <div className=" w-80">
        <div className="border-slate-400 border-2 px-1 flex justify-between">
          <div className="w-5/6 flex items-center">
            TASKS
            <span className="text-slate-600 ml-1">{allTasks.length}</span>
          </div>
          <div
            className="w-1/6 flex justify-center text-2xl p-0 py-1 border-slate-400 border-l-2 hover:cursor-pointer"
            onClick={() => {
              setShowAdd((prevState) => !prevState);
            }}
          >
            {showAdd ? (
              <i className="fa-solid fa-minus"></i>
            ) : (
              <i className="fa-solid fa-plus"></i>
            )}
          </div>
        </div>
        <div>{showAdd && <AddTask cancel={cancelAdd} />}</div>
        <p className="text-xl">Available Tasks</p>
        {allTasks.map((task) => (
          <Task {...task} key={task.task_id} />
        ))}
      </div>
    </main>
  );
}

export default App;
