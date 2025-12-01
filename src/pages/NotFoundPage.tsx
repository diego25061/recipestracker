import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Oops! The page you are looking for does not exist."
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    Go Home
                </Button>
            }
        />
    );
};
