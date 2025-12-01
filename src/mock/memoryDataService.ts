import type { RecipeDetailsData, Recipe, RecipeComment, CreateRecipeDto, UpdateRecipeDto } from "@/models/Recipe"
import { users } from "./users"
import type { UserViewData } from "@/models/User"
import type { LoginResult, LoginUserData } from "@/models/Auth"
import { InMemoryDB } from "./memoryDb"
import { isDefinedNotEmpty } from "@/utils/common"

interface ApiActionsRecipes {
    fetchRecipeDetails: (token: string | null, recipeId: number) => Promise<RecipeDetailsData | undefined>
}

const asTimedPromise = <T>(
    func: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => void,
    delay: number = 340
): Promise<T> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                func(resolve, reject)
            } catch (err) {
                reject(err)
            }
        }, delay)
    })
}

export class InMemoryApi implements ApiActionsRecipes {

    private nextCommentId = 1000
    private nextRecipeId = 1000

    private getUserViewData = (userId: number): UserViewData => {
        const u = users.find(u => u.id === userId)
        if (!u) throw 'user not found'
        return {
            id: u.id,
            username: u.username,
            profilePicUrl: u.profilePicUrl
        }
    }

    private isFavoritedByUser = (recipe: Recipe, userId: number): boolean =>
        recipe.favoritedBy?.some(x => x === userId) ?? false


    private getAllRecipes = (): RecipeDetailsData[] => {
        return InMemoryDB.recipes
            .map(r => ({
                ...r,
                authorData: this.getUserViewData(r.authorId),
                comments: r.comments?.map(c => ({ ...c, authorData: this.getUserViewData(c.userId) }))
            }))
    }

    private userIdFromToken = (token: string): number => {
        const userId = parseInt(token.substring(0, token.indexOf('_') ?? 0))
        if (!users.find(u => u.id === userId)) throw 'user not found: invalid token'
        return userId
    }

    private getRecipeDetails = (token: string | null, recipeId: number): RecipeDetailsData | undefined => {
        const rec = InMemoryDB.recipes.find(x => x.id === recipeId)
        if (!rec) {
            return undefined
        }
        return {
            ...rec,
            authorData: this.getUserViewData(rec.authorId),
            isFavorite: isDefinedNotEmpty(token) ? this.isFavoritedByUser(rec, this.userIdFromToken(token)) : undefined,
            comments: rec.comments?.map(x => ({
                ...x,
                authorData: this.getUserViewData(x.userId)
            }))
        } satisfies RecipeDetailsData
    }

    //public controllers?
    public fetchPublicRecipes = async (): Promise<RecipeDetailsData[]> => {
        return asTimedPromise<RecipeDetailsData[]>((resolve) => {
            const recs: RecipeDetailsData[] = this.getAllRecipes()
            resolve(recs)
        })
    }

    public fetchUserRecipes = async (token: string): Promise<RecipeDetailsData[]> => {
        return asTimedPromise<RecipeDetailsData[]>((resolve) => {
            const userId = this.userIdFromToken(token)
            const recs: RecipeDetailsData[] = this.getAllRecipes()
                .filter(x => x.authorId === userId)
            resolve(recs)
        })
    }

    public fetchFavoriteRecipes = async (token: string): Promise<RecipeDetailsData[]> => {
        return asTimedPromise<RecipeDetailsData[]>((resolve) => {
            const userId = this.userIdFromToken(token)
            const recs: RecipeDetailsData[] = this.getAllRecipes()
                .filter(x => x.favoritedBy?.some(x => x === userId))
            resolve(recs)
        })
    }

    public setFavoriteRecipe = async (token: string, recipeId: number, newValue: boolean): Promise<boolean> => {
        return asTimedPromise<boolean>((resolve) => {
            const recipe = InMemoryDB.recipes.find(r => r.id === recipeId)
            if (!recipe) {
                throw ('recipe not found')
            }

            const userId = this.userIdFromToken(token)
            recipe.favoritedBy = recipe.favoritedBy ?? []
            if (newValue === false) {
                recipe.favoritedBy = recipe.favoritedBy.filter(id => id !== userId)
                resolve(false)
            } else {
                recipe.favoritedBy.push(userId)
                resolve(true)
            }
        })
    }

    public login = async (username: string, password: string): Promise<LoginResult> => {
        return asTimedPromise<LoginResult>((resolve) => {
            const user = InMemoryDB.users.find(x => x.loginUser === username)

            if (!user) {
                //should use ambiguous messages here
                throw ('invalid user')
            }
            //simple text comparison for test purposes, in a proper backend you would use 
            //a hashing with a library like bcrypt
            if (user.pwd !== password) {
                throw ('invalid username or password')
            }

            const userData = {
                userId: user.id,
                userFullName: user.username,
                userProfilePicture: user.profilePicUrl
            } satisfies LoginUserData

            //using a test token for this emulated backend, jwt doesnt work here and there wouldnt be much sense in using it as
            //the secret would be leaked in the browser js code
            //a token should be generated using jwt.sign with the jsonwebtoken library in a proper backend
            const token = `${user.id}_K7aToyGnmyxFX+GHzMOsArYMibNqtWn3J9DxJvN2CczFIwc12/dAty4eV5tRtvPeLEC2cSiRtrtGBHuET8buSQ==`
            resolve({
                jwt: token,
                userData
            })
        })
    }


    public fetchRecipeDetails = async (token: string | null, recipeId: number): Promise<RecipeDetailsData | undefined> => {
        return asTimedPromise((resolve) => {
            resolve(this.getRecipeDetails(token, recipeId))
        })
    }

    public postComment = async (token: string, recipeId: number, text: string): Promise<RecipeComment> => {
        return asTimedPromise((resolve) => {
            const recipe = InMemoryDB.recipes.find(r => r.id === recipeId)
            if (!recipe) {
                throw 'recipe not found'
            }

            const comment: RecipeComment = {
                commentId: this.nextCommentId++,
                userId: this.userIdFromToken(token),
                text
            }

            recipe.comments = recipe.comments ?? []
            recipe.comments.push(comment)

            resolve(comment)
        })
    }

    public createRecipe = async (token: string, recipe: CreateRecipeDto): Promise<RecipeDetailsData> => {
        return asTimedPromise<RecipeDetailsData>((resolve) => {
            const newRecipe: Recipe = {
                id: this.nextRecipeId++,
                authorId: this.userIdFromToken(token),

                title: recipe.title,
                tags: recipe.tags,
                imageUrl: recipe.imageUrl,
                ingredients: [...recipe.ingredients],
                description: recipe.description,
                steps: [...recipe.steps],
                comments: [],
                favoritedBy: [],
            }

            InMemoryDB.recipes.push(newRecipe)
            resolve(this.getRecipeDetails(token, newRecipe.id)!)
        })
    }

    public updateRecipe = async (
        token: string,
        recipeId: number,
        data: UpdateRecipeDto
    ): Promise<RecipeDetailsData> => {
        return asTimedPromise<RecipeDetailsData>((resolve) => {
            const index = InMemoryDB.recipes.findIndex(r => r.id === recipeId)

            if (index === -1) {
                throw 'recipe not found'
            }


            const existing = InMemoryDB.recipes[index]

            if (this.userIdFromToken(token) !== existing.authorId) {
                throw 'unauthorized'
            }

            const updated: Recipe = {
                ...existing,
                title: data.title ?? existing.title,
                tags: data.tags ? [...data.tags] : existing.tags,
                imageUrl: data.imageUrl ?? existing.imageUrl,
                ingredients: data.ingredients ? [...data.ingredients] : existing.ingredients,
                description: data.description ?? existing.description,
                steps: data.steps ? [...data.steps] : existing.steps
            }

            InMemoryDB.recipes[index] = updated
            const details = this.getRecipeDetails(token, updated.id)!
            resolve(details)
        })
    }

    public deleteRecipe = async (token: string, recipeId: number): Promise<boolean> => {
        return asTimedPromise<boolean>((resolve) => {
            const recipe = InMemoryDB.recipes.find(r => r.id === recipeId)

            if (!recipe) {
                throw 'recipe not found'
            }

            if (this.userIdFromToken(token) !== recipe.authorId) {
                throw 'unauthorized'
            }
            
            InMemoryDB.recipes = InMemoryDB.recipes.filter(r => r.id !== recipeId)
            resolve(InMemoryDB.recipes.every(x => x.id !== recipeId))
        })
    }

}

export const LocalMemoryApi = new InMemoryApi()