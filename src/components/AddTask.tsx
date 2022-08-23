import React, { useState } from "react";
import { saveTask } from "../features/task/task";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { infoIcon } from "../icons/icons";

interface addTaskProps {
  cancel: any;
}
export const AddTask: React.FC<addTaskProps> = ({  cancel }) => {
  const assignedUser = useAppSelector((state) => state.task.assignedUsers);
  const [assigneduser, setAssigneduser] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [assingedTime, setAssingedTime] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [formTime, setFormTime] = useState(
    new Date(0.8 * 1000).toISOString().substr(11, 8)
  );
  const dispatch = useAppDispatch();

    const handleSave = async () => {
    //   dispatch save action 
    try {
      setIsloading(true);
      await dispatch(
        saveTask({
          description: descriptionInput,
          date,
          assingedTime,
          assigneduser,
        })
      );
        // clear form 
      setDescription("");
      setDate("");
      setFormTime(new Date(0.8 * 1000).toISOString().substr(11, 8));
    } catch (e) {
      console.error(e);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="bg-blueish my-2 border-slate-400 border-2  px-2">
      <div className="mt-2">
        <label htmlFor="description">Task Description</label>
        <div className="flex justify-between border-input border-2">
          <input
            type="text"
            name="description"
            className=" w-5/6 pl-1"
            value={descriptionInput}
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
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </div>{" "}
        <div className="mt-2">
          <label htmlFor="description">Time</label>
          <input
            type="time"
            step="2"
            name="description"
            className="w-full border-input"
            value={formTime}
            onChange={(event) => {
              const hms = event.target.value;
              setFormTime(hms);
              const [hours, minutes, seconds] = hms.split(":");
              const totalSeconds: number =
                +hours * 60 * 60 + +minutes * 60 + +seconds;
              setAssingedTime(totalSeconds);
            }}
          />
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="description">Assign User</label>
        <select
          name="user"
          id=""
          className="w-full border-input"
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
              Please login 
            </option>
          )}
        </select>
      </div>
      <div className="flex justify-between mt-7 mb-3">
        <div className="w-3/6 pt-3 cursor-pointer"></div>
        <div className=" w-4/6">
          <div className="flex justify-between">
            <button className=" py-2 rounded" onClick={() => cancel()}>
              Cancel
            </button>

            <button
              className="bg-green-500 hover:bg-green-700 text-white  py-2 px-7 disabled:bg-green-200 rounded"
              disabled={isLoading}
              onClick={() => handleSave()}
            >
              {isLoading ? <i className="fa-duotone fa-spinner"></i> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
