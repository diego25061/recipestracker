import { Alert, App, Button, message, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { RecipeGrid } from '@/components/RecipeGrid'
import { useCallback, useEffect, useState } from 'react'
import type { RecipeDetailsData } from '@/models/Recipe'
import { getUserRecipes } from '@/api/recipes'
import { PaddingContainer } from '@/components/layout/PaddingContainer'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useAuthStore } from '@/context/AuthContext'
import { AddRecipeModal } from '@/components/modals/AddRecipeModal'
import { notifySuccess } from '@/utils/notifications'

const { Title } = Typography

export const MyRecipesPage: React.FC = () => {
    //const navigate = useNavigate()
    const [recipes, setRecipes] = useState<RecipeDetailsData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setModalOpen] = useState(false)
    const { isAuthenticated, jwt } = useAuthStore()
    const { notification: notificationInstance } = App.useApp()

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
        message.info(`Edit recipe #${id}`)
    }

    const handleDelete = (id: number) => {
        message.success(`Recipe #${id} deleted (mock)`)
    }

    const onRecipeCreated = (recipe: RecipeDetailsData) => {
        setModalOpen(false)
        notifySuccess(
            notificationInstance,
            `Recipe '${recipe.title}' created`,
        )
        loadRecipes(false)
    }

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
                        onClick={() => setModalOpen(true)}
                    >
                        Add New Recipe
                    </Button>
                </div>

            </PaddingContainer>

            {loading && <LoadingSpinner />}

            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ margin: 16 }}
                />
            )}

            <RecipeGrid
                recipes={recipes}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                renderMode='editDelete'
            />

            <AddRecipeModal open={isModalOpen} onClose={() => { setModalOpen(false) }} onSuccessfulRecipeCreation={onRecipeCreated} />
        </>
    )
}
