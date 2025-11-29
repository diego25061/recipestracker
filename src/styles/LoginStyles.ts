import { Colors } from "@/styles/Colors"
import { css } from "@emotion/css"

export const loginLayoutStyle = css`
    min-height: 100vh;
`

export const loginContentStyle = css`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const loginCardStyle = css`
    width: 380px;
    border-radius: 12px;
`

export const loginFooterStyle = css`
    text-align: center;
    color: #fff;
    background-color: ${Colors.footer};
` 