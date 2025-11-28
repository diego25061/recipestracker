import { LocalMemoryApi } from '@/mock/memoryDataService'
import type { RecipeComment, RecipeDetailsData } from '@/models/Recipe'

///API functions called from the react components

//To switch to a real remote server call just fill the functions with http calls using axios or any other library.
//Another option is to create a similar structure using interfaces and a new class that inherits said
//interface (similar to dependency implementation for DI libraries)
export const getPublicRecipes = async (): Promise<RecipeDetailsData[]> => {
    return LocalMemoryApi.fetchPublicRecipes()
}

export const getUserRecipes = async (token:string): Promise<RecipeDetailsData[]> => {
    return LocalMemoryApi.fetchUserRecipes(token)
}

export const fetchRecipeDetails = async (recipeId: number, userId?: number): Promise<RecipeDetailsData | undefined> => {
    return LocalMemoryApi.fetchRecipeDetails(recipeId, userId)
}

export const postRecipeComment = async (userId: number, recipeId: number, text: string): Promise<RecipeComment> => {
    return LocalMemoryApi.postComment(userId, recipeId, text)
}

export const setFavoriteRecipe = async (userId: number, recipeId: number, newVal: boolean): Promise<boolean> => {
    return LocalMemoryApi.setFavoriteRecipe(userId, recipeId, newVal)
}
