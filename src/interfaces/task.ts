export interface taskType {
  description: string;
  date: string;
  time: string | number;
  user: string;
  task_msg: string;
  task_date: string;
  task_time: string;
  assigned_user: string;
  task_id: string;
  id: string;
}
export interface loginPayload {
  email: string;
  password: string;
}
type assignedUser = {
  id: string;
  name: string;
};
export interface appState {
  tasks: taskType[];
  assignedUsers: assignedUser[];
}
export interface taskPayload {
  description: string;
  date: string;
  assingedTime: number | string;
  assigneduser: string;
}
export interface updateTaskType extends taskPayload {
  task_id: string;
}
