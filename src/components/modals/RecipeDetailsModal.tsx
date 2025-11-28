import { Modal, Space, Tag, Input, Button, Image, Typography, App } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import type { RecipeDetailsData } from '@/models/Recipe'
import {
    fetchRecipeDetails,
    postRecipeComment,
    setFavoriteRecipe
} from '@/api/recipes'
import { useAuthStore } from '@/context/AuthContext'
import { notifyError, notifySuccess } from '@/utils/notifications'
import { LoadingSpinner } from '../LoadingSpinner'
import { css } from '@emotion/css'
import { CommentBlock } from '../RecipeCommentBlock'
import { isDefinedNotEmpty } from '@/utils/common'
const { Title } = Typography;


interface RecipeDetailsModalProps {
    recipeId: number
    onClose: () => void
}

const subtitleMargin = css`
    margin-top: 4px;
    margin-bottom: 4px !important;
`

const listStyle = css`
    margin: 0;
    padding: 4px 0px 4px 32px;
    >li::marker{
        font-weight: bold;
    }
`

const listItemStyle = css`
    margin: 0;
    padding: 4px 8px;
`

const infoContainer = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
`

const infoSideIngredients = css`
    flex: 4;
`

const infoSideSteps = css`
    flex: 7;
`

const commentAddSection = css` 
    display: flex;
    padding: 0px 12px;
`

const titleContainer = css`
    display: flex;
`
const titleText = css`
    margin-top: 4px;
    margin-bottom: 8px !important;
    flex: 1;
`
const titleFavoriteBtn = css`
    font-size: 16px;
    margin-top: 4px;
`

export const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({ recipeId, onClose }) => {
    const [recipe, setRecipe] = useState<RecipeDetailsData | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [canPost, setCanPost] = useState(true)
    const [favorite, setFavorite] = useState<boolean | undefined>(undefined)
    const [commentText, setCommentText] = useState('')
    const { notification: notificationInstance } = App.useApp()

    const { isAuthenticated, jwt } = useAuthStore()

    const loadRecipe = useCallback(async () => {
        setLoading(true)
        try {
            const data = await fetchRecipeDetails(jwt, recipeId)
            setRecipe(data)
            setFavorite(data?.isFavorite ?? false)
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }, [recipeId, jwt])

    useEffect(() => {
        if (!recipeId) {
            setRecipe(undefined)
            return
        }
        loadRecipe()
    }, [recipeId, loadRecipe])

    const handleAddComment = async () => {
        const comment = commentText.trim()
        if (!recipe || !comment || !isDefinedNotEmpty(jwt)) return
        try {
            setCanPost(false)
            await postRecipeComment(jwt, recipe.id, comment)
            notifySuccess(
                notificationInstance,
                'Comment posted',
            )
            //loading the full recipe again ensures the comments list is shown consistently. appending
            //the newly added is an option with drawbacks
            loadRecipe()
        } catch (err) {
            console.error(err)
            notifyError(
                notificationInstance,
                'Error posting comment',
                'Please try again later'
            )
        } finally {
            setCanPost(true)
        }

        setCommentText('')
    }

    const handleToggleFavorite = async () => {
        if (!recipe || favorite === undefined || !isDefinedNotEmpty(jwt)) return

        try {
            const updated = await setFavoriteRecipe(jwt, recipe.id, !favorite)
            setFavorite(updated)
        } catch (err) {
            console.error(err)
            notifyError(
                notificationInstance,
                'Error setting favorite',
                'Please try again later'
            )
        }
    }

    return (
        <Modal
            open={!!recipeId}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            {loading && <LoadingSpinner />}
            {recipe && (
                <Space direction='vertical' style={{ width: '100%' }}>

                    <Image
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        width='100%'
                        height={250}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                    <div className={titleContainer}>
                        <Title className={titleText} level={3}>
                            {recipe.title}
                        </Title>
                        {isAuthenticated &&
                            <Button className={titleFavoriteBtn} type='text' onClick={handleToggleFavorite}>
                                {favorite ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
                            </Button>
                        }
                    </div>
                    {recipe.description && <p>{recipe.description}</p>}
                    <Title level={5} className={subtitleMargin}>Tags</Title>
                    <span>
                        {recipe.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </span>

                    <div className={infoContainer}>
                        <div className={infoSideIngredients}>
                            <Title level={5} className={subtitleMargin}>Ingredients</Title>
                            {recipe.ingredients ? (
                                <ul className={listStyle}>
                                    {recipe.ingredients.map((ing, i) => (
                                        <li className={listItemStyle} key={i}>{ing}</li>
                                    ))}
                                </ul>
                            ) : '-'}
                        </div>
                        <div className={infoSideSteps}>
                            <Title level={5} className={subtitleMargin}>Steps</Title>
                            {recipe.steps ? (
                                <div>

                                    <ol className={listStyle}>
                                        {recipe.steps.map((step, i) => (
                                            <li className={listItemStyle} key={i}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            ) : '-'}
                        </div>
                    </div>


                    <div>
                        <Title level={5} className={subtitleMargin}>Comments</Title>
                        {recipe.comments?.length ?? 0 > 0 ? (
                            <>
                                {recipe.comments?.map(c =>
                                    <CommentBlock
                                        textContent={c.text}
                                        key={c.commentId}
                                        title={c.authorData.username}
                                        imageUrl={c.authorData.profilePicUrl} />
                                )}
                            </>
                        ) : (
                            <p style={{ marginLeft: 16 }}>No comments yet</p>
                        )}
                    </div>
                    {
                        isAuthenticated ?
                            <div className={commentAddSection}>
                                <Input
                                    placeholder='Add a comment...'
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <Button
                                    type='primary'
                                    onClick={handleAddComment}
                                    style={{ marginLeft: 12 }}
                                    disabled={!canPost}>
                                    Post
                                </Button>
                            </div> :
                            <em style={{ color: '#515151' }}>Log in to add comments</em>
                    }

                </Space>
            )}
        </Modal>
    )
}
