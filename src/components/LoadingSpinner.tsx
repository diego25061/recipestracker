import { css } from "@emotion/css"
import { Spin } from "antd"

const styles = css`
    text-align: center;
    padding: 64px;
`

interface LoadingSpinnerProps {
    style?: React.CSSProperties
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ style } ) =>
    <div className={styles} style={style}>
        <Spin size="large" />
    </div>