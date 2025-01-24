"use client";

import { useState, useEffect } from "react";
import { Typography } from "antd";
import { useForm } from "react-hook-form";
import {useRouter} from "next/navigation";
import styles from "./ProjectPage.module.scss";
import { useProjectStore } from "@/store/store";
import {ProjectInfo} from "@/UI/ProjectInfo";
import {FormInputType, IFormFields, IProject} from "@/store/types";
import {FormUpdateProject} from "@/UI/FormUpdateProject";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/UI/LoadingSpinner";

const { Title } = Typography;

const DynamicLoadingMessage = dynamic(() => import("@/UI/LoadingMessage"), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});

const formFields:IFormFields[] = [
    { name: "title", placeholder: "Введите название проекта", type: "text", label: "Название" },
    { name: "description", placeholder: "Введите описание проекта", type: "textarea", label: "Описание" },
    { name: "price", placeholder: "Введите цену проекта", type: "number", label: "Цена" },
    { name: "currency", placeholder: "Введите валюту", type: "text", label: "Валюта" },
    { name: "socialLink", placeholder: "Введите ссылку на проект", type: "text", label: "Ссылка" },
];

const ProjectPage = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
    const [params, setParams] = useState<{ id: string } | null>(null);
    const projects = useProjectStore((store) => store.projects);
    const setProjects = useProjectStore((store) => store.setProjects);
    const [project, setProject] = useState<IProject | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { control, handleSubmit, reset, formState: { errors },setError,getValues } = useForm<FormInputType>();
    const router = useRouter()

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await paramsPromise;
            setParams(resolvedParams);
        };
        unwrapParams();
    }, [paramsPromise]);

    useEffect(() => {
        if (params?.id && projects) {
            const projectData = projects.find((pr) => pr.id === params.id);
            if (projectData) {
                setProject(projectData);
                reset(projectData);
            }
        }
    }, [params, projects, reset]);

    const handleSave = (data: FormInputType) => {
        const values = getValues();
        const errOpt = { type: "required", message: "Заполните поле, оно обязательно!" };
        const fieldsToValidate: ("title" | "description")[] = ['title', 'description'];
        const invalidFields:(keyof FormInputType)[] = fieldsToValidate.filter(field => !String(values[field as keyof FormInputType]).trim());

        if (invalidFields.length > 0) {
            invalidFields.forEach(field => setError(field, errOpt));
            return;
        }

        const updatedProject = {
            ...data,
            id: project?.id || "",
            price: data.price || 0,
            socialLink: data.socialLink?.trim() || "",
        };
        setProject(updatedProject);

        const updatedProjects = projects.map((item) =>
            item.id === params?.id ? updatedProject : item
        );
        setProjects(updatedProjects);

        setIsEditing(false);
    };

    const handleDelete = () => {
        setProjects(projects.filter((pr) => pr.id !== params?.id));
        router.push("/");
    };

    const getLoadingMessage = () => {
        if (!projects) return "Загрузка данных проектов...";
        if (!params) return "Загрузка данных маршрута...";
        if (!project) return "Проект не найден или загружается...";
        return "";
    };

    if (!projects || !params || !project) {
        return <DynamicLoadingMessage isLoading={true} message={getLoadingMessage()} />;
    }

    return (
        <div className={styles.container}>
            <Title level={2}>Проект: {project.title}</Title>
            {isEditing ? (
                <FormUpdateProject formFields={formFields} handleSubmit={handleSubmit} handleSave={handleSave} control={control} errors={errors} setIsEditing={setIsEditing}/>
            ) : (
                <ProjectInfo project={project} onDelete={handleDelete} onEdit={() => setIsEditing(true)}/>
            )}
        </div>
    );
};

export default ProjectPage;
