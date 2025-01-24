import React from "react";
import { Card, Typography, Button, Space } from "antd";
import { DollarCircleOutlined, LinkOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./ProjectCard.module.scss";
import {IProject} from "@/store/types";

const { Title, Paragraph, Text } = Typography;

interface IProjectCardProps {
    project: IProject;
}

const ProjectCard: React.FC<IProjectCardProps> = ({ project }) => {
    const { title, description, price, currency, socialLink } = project;

    return (
        <Link href={`/project/${project.id}`}>
            <Card hoverable className={styles.card}>
                <div className={styles.content}>
                    <Space direction="vertical">
                        <Title level={4} className={styles.title}>
                            {title}
                        </Title>
                        <Paragraph
                            ellipsis={{ rows: 2, expandable: true, symbol: "читать далее" }}
                            className={styles.description}
                        >
                            {description}
                        </Paragraph>
                    </Space>

                    <div className={styles.priceWrapper}>
                        <DollarCircleOutlined className={styles.priceIcon} />
                        <Text className={styles.priceText}>
                            {price} {currency}
                        </Text>
                    </div>

                    {socialLink && (
                        <Button
                            type="link"
                            icon={<LinkOutlined />}
                            className={styles.socialLink}
                        >
                            Социальная сеть
                        </Button>
                    )}
                </div>
            </Card>
        </Link>
    );
};

export default ProjectCard;
