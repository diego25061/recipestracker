import { App, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
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

const cardBorderRadius = 8

const emotionCardStyle = css`
    text-align: center;
    background-color: white;
    border-radius: ${cardBorderRadius}px;
    margin: 4px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px;
    
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    &:hover {
        transform: translateY(-2px);
        box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
                    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
        cursor: pointer;
    }

    position: relative;
`

const cardImgContainer = css`
    flex: 3;
    overflow: hidden;
    box-sizing: border-box;
    max-height: 150px;
`

const cardImg = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: ${cardBorderRadius}px ${cardBorderRadius}px 0px 0px;
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
const actionButtonStyle = css`
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0px;
    top: 0px;

    color: #231818;
    font-size: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    width: 40px;
    height: 40px;
    background-color: #ffffffaf;
    margin: 4px;
    border-radius: 2px;

    &:hover {
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        transform: translateY(-1px);
        cursor: pointer;
    }
`

const editButtonStyle = css`
    margin-right: 44px;
    border-radius: 2px 0px 0px 2px; 
`

const deleteButtonStyle = css`
    color: #cb0000;
    background-color: #ffafaf7f;
    border-radius: 0px 6px 2px 0px; 
`

export const RecipeCard: React.FC<RecipeCardProps> = (
    { id, title, author, tags, image, onRecipeClick, handleEdit, handleDelete, renderMode = 'view' }
) => {
    const { modal } = App.useApp();

    const showConfirm = () => {
        modal.confirm({
            title: `Do you want to delete recipe '${title}'?`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDelete?.(id)
            },
            onCancel() {},
        });
    }

    return <>
        <div
            className={emotionCardStyle}
            onClick={() => onRecipeClick(id)}
        >
            {renderMode === 'editDelete' && <div className={`${actionButtonStyle} ${editButtonStyle}`}>
                <EditOutlined
                    key="edit"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        handleEdit?.(id)
                    }}
                />
            </div>}
            {renderMode === 'editDelete' && <div className={`${actionButtonStyle} ${deleteButtonStyle}`}>
                <DeleteOutlined
                    key="delete"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        showConfirm()
                    }}
                />
            </div>}
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
}
