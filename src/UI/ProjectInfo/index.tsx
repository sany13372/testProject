import {FC, ReactNode} from "react";
import {Button,Typography} from "antd";
import Link from "next/link";
import styles from './ProjectInfo.module.scss'
import {IProject} from "@/store/types";
const {Text} = Typography

const InfoRow = ({ label, value }: { label: string; value: ReactNode }) => (
    <div className={styles.infoRow}>
        <Text strong>{label}:</Text> {value}
    </div>
);

interface IProjectInfo{
    project: IProject;
    onEdit: () => void;
    onDelete: () => void
}

export const ProjectInfo:FC<IProjectInfo> = ({ project, onEdit, onDelete }) => (
    <div className={styles.projectInfo}>
        <InfoRow label="Описание" value={project.description} />
        <InfoRow label="Цена" value={`${project.price} ${project.currency}`} />
        {project.socialLink &&
            <InfoRow
                label="Ссылка"
                value={<a href={project.socialLink} target="_blank" rel="noopener noreferrer">{project.socialLink}</a>}
            />
        }
        <div className={styles.buttons}>
            <Link href={"/"}>
                <Button type="link">Вернуться назад к проектам</Button>
            </Link>
            <Button type="primary" onClick={onEdit}>Редактировать</Button>
            <Button danger onClick={onDelete}>Удалить</Button>
        </div>
    </div>
);

