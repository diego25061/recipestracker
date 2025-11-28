import { LocalMemoryApi } from '@/mock/memoryDataService'
import type { LoginResult } from '@/models/Auth'

///API functions called from the react components

//To switch to a real remote server call just fill the functions with http calls using axios or any other library.
//Another option is to create a similar structure using interfaces and a new class that inherits said
//interface (similar to dependency implementation for DI libraries)
export const apiLogin = async (username: string, password: string): Promise<LoginResult> => {
    return LocalMemoryApi.login(username,password)
}