import {   Button, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { recipes } from '../mock/recipes';
import { RecipeGrid } from '@/components/RecipeGrid';
  
const { Title } = Typography

export const MyRecipesPage: React.FC = () => {
    //const navigate = useNavigate();

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
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: 24 }}>
                <div className='responsive-width-larger'>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Title level={3} style={{ margin: 0 }}>
                            🍳 My Recipes
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
                </div>
            </div>
            <RecipeGrid
                recipes={recipes}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                renderMode='editDelete'
            />
        </>
    );
};
