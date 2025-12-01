import type { UserViewData } from "./User"

//main models, this is what you would find in a relational database
export interface Recipe {
    id: number
    authorId: number

    title: string
    tags: string[]
    imageUrl: string

    ingredients?: string[]
    description?: string
    steps?: string[]
    comments?: RecipeComment[]
    favoritedBy?: number[]
}

export interface RecipeComment {
    commentId: number
    userId: number
    text: string
}

//DTOs
export interface RecipeCommentViewData extends RecipeComment {
    authorData: UserViewData
}

export interface RecipeDetailsData extends Recipe {
    isFavorite?: boolean
    authorData: UserViewData
    comments?: RecipeCommentViewData[]
}

export interface CreateRecipeDto {
    title: string
    tags: string[]
    imageUrl: string

    ingredients: string[]
    description?: string
    steps: string[]
}

export type RecipeUpdateData = Omit<Recipe, 'id' | 'comments' | 'favoritedBy'>
