import React, { useState } from "react";
import { taskType } from "../interfaces/task";
import { TextInput, Label } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { saveTask } from "../features/task/task";
import { delIcon,infoIcon } from "../icons/icons";

export const Task: React.FC<taskType> = ({ time, user, handle, index }) => {
  const assignedUser = useAppSelector((state) => state.task.assignedUsers);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [assingedTime, setAssingedTime] = useState(0);
  const [assigneduser, setAssigneduser] = useState("");
  const dispatch = useAppDispatch()
  const handleSave = () => {
    dispatch(saveTask({description,date,assingedTime,assigneduser}))
  }
  return (
    <div className="bg-blueish my-2 border-slate-400 border-2  px-2">
      <div className="mt-2">
        {index}
        <label htmlFor="description">Task Description</label>
        <div className="flex justify-between border-input border-2">
          <input
            type="text"
            name="description"
            className=" w-5/6"
            onChange={(event) => setDescription(event.target.value)}
          />

          <div className="bg-white w-1/6 flex items-center justify-center">
            {infoIcon}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mt-2">
          <label htmlFor="description">Date</label>
          <input
            type="date"
            name="description"
            className=" w-5/6 border-input"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>{" "}
        <div className="mt-2">
          <label htmlFor="description">Time</label>
          <input
            type="time"
            step="2"
            name="description"
            className="w-full border-input"
            onChange={(event) => {
              const hms = event.target.value;
              const [hours, minutes, seconds] = hms.split(":");
              const totalSeconds:number = +hours * 60 * 60 + +minutes * 60 + +seconds;

              setAssingedTime(totalSeconds);
            }}
          />
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="description">Assign User</label>
        <select name="user" id="" className="w-full border-input"
        
            onChange={(event) => setAssigneduser(event.target.value)}
        
        >
          {assignedUser.length ? (
            assignedUser.map((user, index) => (
              <option value={user.id} key={index}>
                {user.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Please login and refresh the page
            </option>
          )}
        </select>
      </div>
      <div className="flex justify-between mt-7 mb-3">
        <div
          className="w-3/6 pt-3 cursor-pointer"
          onClick={() => handle && handle(index)}
        >
          {delIcon}
        </div>
        <div className=" w-4/6">
          <div className="flex justify-between">
            <button
              className=" py-2 rounded"
              onClick={() => handle && handle(index)}
            >
              Cancel
            </button>

            <button className="bg-green-500 hover:bg-green-700 text-white  py-2 px-7  rounded"
              onClick={() => handleSave()}
            
            
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
