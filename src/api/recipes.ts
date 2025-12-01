import { LocalMemoryApi } from '@/mock/memoryDataService'
import type { CreateRecipeDto, RecipeComment, RecipeDetailsData } from '@/models/Recipe'

///API functions called from the react components

//To switch to a real remote server call just fill the functions with http calls using axios or any other library.
//Another option is to create a similar structure using interfaces and a new class that inherits said
//interface (similar to dependency implementation for DI libraries)
export const getPublicRecipes = async (): Promise<RecipeDetailsData[]> => {
    return LocalMemoryApi.fetchPublicRecipes()
}

export const getUserRecipes = async (token: string): Promise<RecipeDetailsData[]> => {
    return LocalMemoryApi.fetchUserRecipes(token)
}

export const getRecipeDetails = async (token: string | null, recipeId: number): Promise<RecipeDetailsData | undefined> => {
    return LocalMemoryApi.fetchRecipeDetails(token, recipeId)
}

export const postRecipeComment = async (token: string, recipeId: number, text: string): Promise<RecipeComment> => {
    return LocalMemoryApi.postComment(token, recipeId, text)
}

export const setFavoriteRecipe = async (token: string, recipeId: number, newVal: boolean): Promise<boolean> => {
    return LocalMemoryApi.setFavoriteRecipe(token, recipeId, newVal)
}

export const postRecipe = async (token: string, recipeData: CreateRecipeDto): Promise<RecipeDetailsData> => {
    return LocalMemoryApi.createRecipe(token, recipeData)
}

export const updateRecipe = async (token: string, recipeId: number, recipeData: CreateRecipeDto): Promise<RecipeDetailsData> => {
    return LocalMemoryApi.updateRecipe(token, recipeId, recipeData)
}