import {FC} from "react";
import {Button,Typography} from "antd";
import Link from "next/link";
import styles from './LoadingMessage.module.scss'

const {Title} = Typography
interface ILoadingMessageProps {
    isLoading: boolean;
    message: string;
}

const LoadingMessage: FC<ILoadingMessageProps> = ({ isLoading, message }) => {
    if (!isLoading) return null;
    return (
        <div className={styles.loader}>
            <Title level={4}>
                {message}
            </Title>
            <Link href={"/"}>
                <Button type="link">Вернуться назад</Button>
            </Link>
        </div>
    );
};

export default LoadingMessage;