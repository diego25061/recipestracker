

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt')
    return !!token
}
