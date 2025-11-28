import { type FC } from "react"
import { css } from "@emotion/css"

const imageSize: number = 32;

const commentBlock = css`
    display: flex;
    flex-direction: column;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    border-radius: 6px;
    padding: 8px 8px 16px 8px;
    margin: 12px;
`

const commentHeader = css`
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
`

const commentHeaderImgContainer = css`
    width: ${imageSize}px;
    height: ${imageSize}px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 6px;
    background-color: #58a1ff;
    text-align: center;
    font-weight: 700;
    color: white;
`

const headerImg = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`

const commentHeaderTitle = css`
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    margin-left: 10px;
`

const commentContent = css`
    display: flex;
    padding-left: 8px;
    flex: 1;
    color: #515151;
`

interface CommentBlockProps {
    title: string
    textContent: string
    imageUrl?: string
}

export const CommentBlock: FC<CommentBlockProps> = ({ title, textContent, imageUrl }) => (
    <div className={commentBlock}>
        <div className={commentHeader}>
            <div className={commentHeaderImgContainer}>
                <img alt={(title.length > 0) ? title.charAt(0) : '?'} className={headerImg} src={imageUrl} />
            </div>
            <div className={commentHeaderTitle}>
                {title}
            </div>
        </div>
        <div className={commentContent}>
            {textContent}
        </div>
    </div>
)
