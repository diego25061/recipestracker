import { Row, Col } from 'antd'
import { RecipeCard } from './RecipeCard'

interface Recipe {
    id: number
    title: string
    author: string
    tags: string[]
    image: string
}

interface RecipeGridProps {
    recipes: Recipe[]
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => (
    <Row gutter={[16, 16]} justify="start">
        {recipes.map(recipe => (
            <Col key={recipe.id} xs={24} sm={12} md={8} lg={6}>
                <RecipeCard {...recipe} />
            </Col>
        ))}
    </Row>
)