
export interface User {
    id: number
    username: string
    profilePicUrl?: string

    loginUser: string
    pwd: string
}

export type UserViewData = Pick<User, 'id' | 'username' | 'profilePicUrl'>