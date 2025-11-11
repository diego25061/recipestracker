import { Card, Tag } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

interface RecipeCardProps {
    title: string
    author: string
    tags: string[]
    image: string
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ title, author, tags, image }) => (
    <Card
        hoverable
        cover={<img alt={title} src={image} />}
        actions={[<EyeOutlined key="view" />]}
    >
        <Card.Meta title={title} description={`by ${author}`} />
        <div style={{ marginTop: '0.5rem' }}>
            {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
    </Card>
)
