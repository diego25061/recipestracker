import type { Recipe } from "@/models/Recipe";
import type { User } from "@/models/User";
import { recipes as seedRecipes } from "./recipes"
import { users as seedUsers } from "./users"

export const STORAGE_KEY = 'recipe-tracker-db-v1'

export class InMemoryDb {

    recipes: Recipe[] = []
    users: User[] = []

    constructor() {
        const loaded = this.loadFromStorage()
        if (!loaded) {
            this.recipes = [...seedRecipes]
            this.users = [...seedUsers]
            this.saveToStorage()
        }
    }

    saveToStorage = () => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    recipes: this.recipes,
                    users: this.users
                })
            )
        } catch (err) {
            console.error('Failed to save DB', err)
        }
    }

    loadFromStorage = (): boolean => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return false

            const parsed = JSON.parse(raw)

            if (Array.isArray(parsed.recipes)) this.recipes = parsed.recipes
            if (Array.isArray(parsed.users)) this.users = parsed.users

            return true
        } catch (err) {
            console.error('Failed to load DB', err)
            return false
        }
    }
}


export const InMemoryDB = new InMemoryDb()