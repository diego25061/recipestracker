import { Alert, Button, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RecipeGrid } from '@/components/RecipeGrid';
import { useEffect, useState } from 'react';
import type { RecipeDetailsData } from '@/models/Recipe';
import { getUserRecipes } from '@/api/recipes';
import { PaddingContainer } from '@/components/layout/PaddingContainer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAuthStore } from '@/context/AuthContext';

const { Title } = Typography

export const MyRecipesPage: React.FC = () => {
    //const navigate = useNavigate();
    const [recipes, setRecipes] = useState<RecipeDetailsData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { isAuthenticated, jwt } = useAuthStore()

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
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
        }

        load()
    }, [])

    const handleEdit = (id: number) => {
        message.info(`Edit recipe #${id}`);
        // navigate(`/recipes/edit/${id}`);
    };

    const handleDelete = (id: number) => {
        message.success(`Recipe #${id} deleted (mock)`);
        // TODO: Remove from state later
    };

    const handleAddNew = () => {
        message.info('Redirecting to Create Recipe...');
        // navigate('/recipes/new');
    };

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
                        onClick={handleAddNew}
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
        </>
    );
};
