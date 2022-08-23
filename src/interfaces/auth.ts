export interface loginPayload {
    email: string,
    password: string,
}

export interface user {
    by_default: string
    company_id: string
    icon: string
    is_first: number
    status: string
    token: string
    user_id: string
    want_login: string
}
export interface appState {
    user: user,
    token: string,
    error: any,
};