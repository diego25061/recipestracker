import { Tag } from 'antd'
//import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'


interface RecipeCardProps {
    id: number
    title: string
    author: string
    tags: string[]
    image: string
    onRecipeClick: (id: number) => void
    handleEdit?: (id: number) => void
    handleDelete?: (id: number) => void
    renderMode?: 'view' | 'editDelete'
}

const emotionCardStyle = css`
    text-align: center;
    background-color: white;
    border-radius: 8px;
    margin: 4px;
    display: flex;
    flex-direction: column;

    transition: transform 0.15s ease, box-shadow 0.15s ease;
    &:hover {
        transform: translateY(-2px);
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
                    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        cursor: pointer;
    }
`

const cardImgContainer = css`
    flex: 3;
    overflow: hidden;
    box-sizing: border-box;
`

const cardImg = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`

const cardInfo = css`
    flex: 2;
    margin: 20px;
    display: flex;
    flex-direction: column;
`

const cardInfoTitle = css`
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 8px;
    text-align: left;
`

const cardInfoAuthor = css`
    color: gray;
    font-style: italic;
    text-align: left;
    margin-bottom: 8px;
`

const cardTags = css`
    margin-top: auto;
    text-align: left;
`

const singleTagStyle = css`
    margin-top: 4px;
`

export const RecipeCard: React.FC<RecipeCardProps> = (
    { id, title, author, tags, image, onRecipeClick,/* handleEdit, handleDelete, renderMode = 'view' */ }
) => (<>
    {/*
    <Card
        key={id}
        hoverable
        cover={<img alt={title} src={image} />}
        style={{ margin: 4 }}
        onClick={() => onRecipeClick(id)}

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
    */}
    <div
        className={emotionCardStyle}
        onClick={() => onRecipeClick(id)}
    >
        <div className={cardImgContainer}>
            <img alt={title} className={cardImg} src={image} />
        </div>
        <div className={cardInfo}>
            <div className={cardInfoTitle}>{title}</div>
            <div className={cardInfoAuthor}>{`by ${author}`}</div>
            <div className={cardTags}>
                {tags.map(tag => <Tag className={singleTagStyle} key={tag}>{tag}</Tag>)}
            </div>

        </div>
    </div>
</>
)
