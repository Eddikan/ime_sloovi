import React, { useEffect, useState } from "react";
import { taskType } from "../interfaces/task";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateTask, deleteTask } from "../features/task/task";
import { delIcon, editedIcon, editIcon, infoIcon } from "../icons/icons";

export const Task: React.FC<taskType> = ({
  time,
  description,
  date,
  assigned_user,
  task_id,
}) => {
  const assignedUser = useAppSelector((state) => state.task.assignedUsers);
  const [descriptionInput, setDescription] = useState("");
  const [thisdate, setDate] = useState("");
  const [assigneduser, setAssigneduser] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);
  const [isEditing, setisEditing] = useState(true);
  const [formTime, setFormTime] = useState(
    new Date(0.8 * 1000).toISOString().substr(11, 8)
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    // prepopulate form inputs when mounted
    setDescription(description);
    setDate(date);
    setAssigneduser(assigned_user);
    // format the time from seconds to something the html tag undetstands
    if (typeof time === "number") {
      setFormTime(new Date(time * 1000).toISOString().substr(11, 8));
    }
  }, []);
  const handleDelete = async () => {
    try {
      setisDeleting(true);
      await dispatch(deleteTask(task_id));
    } catch (e) {
      console.error(e);
    } finally {
      setisDeleting(false);
    }
  };
  const handleUpdate = async () => {
    try {
      setIsloading(true);

      await dispatch(
        updateTask({
          description: descriptionInput,
          date: thisdate,
          assingedTime: time,
          assigneduser,
          task_id,
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="bg-blueish my-2 border-slate-400 border-2  px-2">
      <div className="flex justify-end py-2">
        <div
          className="hover:cursor-pointer"
          onClick={() => setisEditing((prev) => !prev)}
        >
          {isEditing ? editIcon : editedIcon}
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="description">Task Description</label>
        <div className="flex justify-between border-input border-2">
          <input
            type="text"
            name="description"
            className=" w-5/6 pl-1"
            value={descriptionInput}
            disabled={isEditing}
            onChange={(event) => setDescription(event.target.value)}
          />

          <div
            className={
              " w-1/6 flex items-center justify-center" +
              (isEditing ? "  " : " bg-white ")
            }
          >
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
            disabled={isEditing}
            value={thisdate}
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
            disabled={isEditing}
            value={formTime}
            onChange={(event) => {
              const hms = event.target.value;
              setFormTime(hms);
            }}
          />
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="description">Assign User</label>
        <select
          name="user"
          id=""
          disabled={isEditing}
          className="w-full border-input"
          value={assigneduser}
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
        <div
          className="w-3/6 pt-3 cursor-pointer"
          onClick={() => handleDelete()}
        >
          {isDeleting ? <i className="fa-duotone fa-spinner"></i> : delIcon}
        </div>
        <div className=" w-4/6">
          <div className="flex justify-between">
            <button
              className=" py-2 rounded"
              onClick={() => setisEditing(false)}
            >
              Cancel
            </button>

            <button
              className="bg-green-500 hover:bg-green-700 text-white  py-2 px-7  disabled:bg-green-200  rounded"
              disabled={isLoading || isEditing}
              onClick={() => handleUpdate()}
            >
              {isLoading ? <i className="fa-duotone fa-spinner"></i> : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
