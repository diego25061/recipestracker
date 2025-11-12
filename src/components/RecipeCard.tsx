import { Card, Popconfirm, Tag } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

interface RecipeCardProps {
    id: number
    title: string
    author: string
    tags: string[]
    image: string
    handleEdit?: (id: number) => void
    handleDelete?: (id: number) => void
    renderMode?: 'view' | 'editDelete'
}

export const RecipeCard: React.FC<RecipeCardProps> = (
    { id, title, author, tags, image, renderMode = 'view', handleEdit , handleDelete}
) => (
    <Card
        hoverable
        cover={<img alt={title} src={image} />}
        style={{ margin: 4 }}

        actions={renderMode === 'editDelete' ? [
            <EditOutlined
                key="edit"
                onClick={() => handleEdit?.(id)}
            />,
            <Popconfirm
                key="delete"
                title="Delete this recipe?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete?.(id)}
            >
                <DeleteOutlined />
            </Popconfirm>,
        ] : []}
    >
        <Card.Meta title={title} description={`by ${author}`} />
        <div style={{ marginTop: '0.5rem' }}>
            {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
    </Card>
)
