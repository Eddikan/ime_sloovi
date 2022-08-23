interface meta {
    handle?: (index?: number) => void,
    index?: number;
}


export interface taskType extends meta {
    description: string,
    date: string,
    time: string,
    user: string,


}
export interface loginPayload {
    email: string,
    password: string,
}
type assignedUser = {
    id: string,
    name: string,
}
export interface appState {
    tasks: taskType[],
    assignedUsers: assignedUser[],
};