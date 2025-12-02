import { Alert, App, Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RecipeGrid } from '@/components/RecipeGrid'
import { useCallback, useEffect, useState } from 'react'
import type { RecipeDetailsData } from '@/models/Recipe'
import { deleteRecipe, getUserRecipes } from '@/api/recipes'
import { PaddingContainer } from '@/components/layout/PaddingContainer'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useAuthStore } from '@/context/AuthContext'
import { AddEditRecipeModal } from '@/components/modals/AddEditRecipeModal'
import { notifySuccess } from '@/utils/notifications'

const { Title } = Typography

export const MyRecipesPage: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeDetailsData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isCreationModalOpen, setCreationModalOpen] = useState(false)
    const [isEditionModalOpen, setEditionModalOpen] = useState(false)
    const { isAuthenticated, jwt } = useAuthStore()
    const { notification: notificationInstance } = App.useApp()
    const [editigRecipeId, setEditingRecipeId] = useState<number>(0)

    const loadRecipes = useCallback(async (showLoading: boolean) => {
        try {
            setLoading(showLoading)
            if (isAuthenticated) {
                const data = await getUserRecipes(jwt!)
                setRecipes(data)
            } else {
                throw 'not authenticated'
            }
        } catch (err) {
            console.error(err)
            setError("Could not load recipes")
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated, jwt])

    useEffect(() => {
        loadRecipes(true)
    }, [loadRecipes])

    const handleEdit = (id: number) => {
        setEditingRecipeId(id)
        setEditionModalOpen(true)
    }

    const handleDelete = async (recipeId: number) => {
        try {
            setLoading(true)
            if (isAuthenticated) {
                await deleteRecipe(jwt!, recipeId)
                loadRecipes(false)
            } else {
                throw 'not authenticated'
            }
        } catch (err) {
            console.error(err)
            setError("Could not load recipes")
        } finally {
            setLoading(false)
        }
    }

    const onRecipeCreated = (recipe: RecipeDetailsData) => {
        setCreationModalOpen(false)
        notifySuccess(
            notificationInstance,
            `Recipe '${recipe.title}' created`,
        )
        loadRecipes(false)
    }

    const onRecipeEdited = (recipe: RecipeDetailsData) => {
        setEditionModalOpen(false)
        notifySuccess(
            notificationInstance,
            `Recipe '${recipe.title}' modified`,
        )
        loadRecipes(false)
    }

    const loadedRecipes = loading ? <LoadingSpinner /> : (
        !error && recipes && recipes.length > 0 ?
            <RecipeGrid
                recipes={recipes}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                renderMode='editDelete'
            /> :
            <Title level={4} style={{ margin: '4rem' }}>
                You haven't created any recipes yet
            </Title>
    )

    return (
        <>
            <PaddingContainer >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Title level={3} style={{ margin: 0 }}>
                        My Recipes
                    </Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setCreationModalOpen(true)}
                    >
                        Add New Recipe
                    </Button>
                </div>

            </PaddingContainer>

            {error ? 
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ margin: '4rem' }}
                /> : loadedRecipes
            }

            <AddEditRecipeModal
                open={isCreationModalOpen}
                onClose={() => { setCreationModalOpen(false) }}
                onSuccessfulRecipeCreation={onRecipeCreated} />

            <AddEditRecipeModal
                open={isEditionModalOpen}
                editId={editigRecipeId}
                onClose={() => { setEditionModalOpen(false) }}
                onSuccessfulRecipeEdit={onRecipeEdited} />
        </>
    )
}
