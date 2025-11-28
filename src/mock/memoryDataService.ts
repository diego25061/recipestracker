import type { RecipeDetailsData, Recipe, RecipeComment, RecipeInputData, RecipeUpdateData } from "@/models/Recipe"
import { users } from "./users"
import type { UserViewData } from "@/models/User"
import type { LoginResult, LoginUserData } from "@/models/Auth"
import { InMemoryDB } from "./memoryDb"

interface ApiActionsRecipes {
    fetchRecipeDetails: (userId: number, recipeId: number) => Promise<RecipeDetailsData | undefined>
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

    private getUsername = (userId: number): string => {
        return users.find(u => u.id === userId)?.username ?? 'Unknown'
    }

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

    private userIdFromToken = (token: string): number => parseInt(token.substring(0, token.indexOf('_') ?? 0))

    //public controllers?
    public fetchPublicRecipes = async (): Promise<RecipeDetailsData[]> => {
        //throw 'ctmre'
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

    public setFavoriteRecipe = async (userId: number, recipeId: number, newValue: boolean): Promise<boolean> => {
        return asTimedPromise<boolean>((resolve) => {
            const recipe = InMemoryDB.recipes.find(r => r.id === recipeId)
            if (!recipe) {
                throw ('recipe not found')
            }

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


    //....... to do

    public fetchRecipeDetails = async (recipeId: number, userId?: number): Promise<RecipeDetailsData | undefined> => {
        return asTimedPromise((resolve) => {
            const rec = InMemoryDB.recipes.find(x => x.id === recipeId)
            if (!rec) {
                resolve(undefined)
                return
            }
            const fullRecipe: RecipeDetailsData = {
                ...rec,
                authorData: this.getUserViewData(rec.authorId),
                isFavorite: userId ? this.isFavoritedByUser(rec, userId) : undefined,
                comments: rec.comments?.map(x => ({
                    ...x,
                    authorData: this.getUserViewData(x.userId)
                }))
            }
            resolve(fullRecipe)
        })
    }

    //list recipes created by user
    /*
    public listMyRecipes = async (userId: number): Promise<RecipeDetailsData[]> => {
        return asTimedPromise<RecipeDetailsData[]>((resolve) => {
            resolve(
                InMemoryDB.recipes
                    .filter(r => r.authorId === userId)
                    .map(r => ({
                        ...r,
                        isFavorite: this.isFavoritedByUser(r, userId)
                    }))
            )
        })
    }

    public listFavorites = async (userId: number): Promise<RecipeDetailsData[]> => {
        return asTimedPromise<RecipeDetailsData[]>((resolve) => {
            resolve(
                InMemoryDB.recipes
                    .filter(r => this.isFavoritedByUser(r, userId))
                    .map(r => ({
                        ...r,
                        isFavorite: true
                    }))
            )
        })
    }*/

    public createRecipe = async (recipe: RecipeInputData): Promise<Recipe> => {
        return asTimedPromise<Recipe>((resolve) => {
            const newRecipe: Recipe = {
                ...recipe,
                id: this.nextRecipeId++,
                comments: [],
                favoritedBy: []
            }

            InMemoryDB.recipes.push(newRecipe)
            resolve(newRecipe)
        })
    }

    public updateRecipe = async (recipeId: number, data: RecipeUpdateData): Promise<Recipe | undefined> => {
        return asTimedPromise<Recipe | undefined>((resolve) => {
            const id = InMemoryDB.recipes.findIndex(r => r.id === recipeId)

            if (id === -1) {
                resolve(undefined)
                return
            }

            InMemoryDB.recipes[id] = {
                ...InMemoryDB.recipes[id],
                ...data
            }

            resolve(InMemoryDB.recipes[id])
        })
    }

    public deleteRecipe = async (recipeId: number): Promise<boolean> => {
        return asTimedPromise<boolean>((resolve) => {
            InMemoryDB.recipes = InMemoryDB.recipes.filter(r => r.id !== recipeId)
            resolve(InMemoryDB.recipes.every(x => x.id !== recipeId))
        })
    }

    public postComment = async (userId: number, recipeId: number, text: string): Promise<RecipeComment> => {
        return asTimedPromise((resolve) => {
            const recipe = InMemoryDB.recipes.find(r => r.id === recipeId)
            if (!recipe) {
                throw 'recipe not found'
            }

            const comment: RecipeComment = {
                commentId: this.nextCommentId++,
                userId,
                text
            }

            recipe.comments = recipe.comments ?? []
            recipe.comments.push(comment)

            resolve(comment)
        })
    }



}

export const LocalMemoryApi = new InMemoryApi()