
export interface LoginResult {
    jwt: string
    userData: LoginUserData
}

export interface LoginUserData {
    userId: number
    userFullName: string
    userProfilePicture?: string
}