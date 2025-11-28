import type { Recipe } from "@/models/Recipe";
import type { User } from "@/models/User";
import { recipes } from "./recipes";
import { users } from "./users";

class InMemoryDb {

    recipes: Recipe[] = []
    users: User[] = []

    constructor()
    {
        this.recipes.push(...recipes)
        this.users.push(...users)
    }
}


export const InMemoryDB = new InMemoryDb()