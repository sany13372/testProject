import { FC, useState } from 'react';
import { Button, Modal } from "antd";
import { useProjectStore } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import styles from './ModalCreate.module.scss';
import ValidField from "@/UI/ValidField";
import {FormInputType} from "@/store/types";


type StepField = {
    name: keyof FormInputType;
    placeholder: string;
    required?: boolean;
    type?: string;
};

type StepsType = StepField[][];
const ModalCreate: FC = () => {
    const steps:StepsType = [
        [
            { name: "title", placeholder: "Название проекта", required: true },
            { name: "description", placeholder: "Краткое описание", required: true },
        ],
        [
            { name: "price", placeholder: "Количество финанса проекта", type: "number" },
            { name: "currency", placeholder: "Валюта", required: true },
        ],
        [
            { name: "socialLink", placeholder: "Ссылка на соц сеть (не обязательно)" },
        ],
    ];

    const setProjects = useProjectStore(store => store.setProjects);
    const projects = useProjectStore(store => store.projects);
    const open = useProjectStore(store => store.openModal);
    const setOpen = useProjectStore(store => store.setOpenModal);

    const [activeStep, setActiveStep] = useState(0);
    const { control, handleSubmit, formState: { errors }, setError, getValues, reset } = useForm<FormInputType>({
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            currency: "",
            socialLink: ""
        },
    });

    const validateStep = () => {
        const values = getValues();
        const currentFields = steps[activeStep];

        let valid = true;
        currentFields.forEach(({ name, required }) => {
            if (required && !String(values[name as keyof FormInputType])?.trim()) {
                setError(name as keyof FormInputType, { type: "required", message: "Заполните поле, оно обязательно!" });
                valid = false;
            } else {
                setError(name as keyof FormInputType, { type: "" });
            }
        });
        return valid;
    };

    const onSubmit = (data: FormInputType) => {
        const id = String(Date.now());
        const newProject = {
            ...data,
            id,
            price: Number(String(data.price).trim()) || 0,
            socialLink: data.socialLink?.trim() || "",
        };
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        handleCancel();
    };


    const handleCancel = () => {
        setOpen(false);
        setActiveStep(0);
        reset();
    };

    const nextStep = () => validateStep() && setActiveStep(prev => prev + 1);

    const prevStep = () => setActiveStep(prev => prev - 1);

    return (
        <Modal
            open={open}
            title="Создание проекта"
            onCancel={handleCancel}
            footer={null}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.content}>
                    {steps[activeStep].map(({ name, placeholder, type }) => (
                        <Controller
                            key={name}
                            name={name as keyof FormInputType}
                            control={control}
                            render={({ field }) => (
                                <ValidField
                                    type={type}
                                    placeholder={placeholder}
                                    errorType={errors[name as keyof FormInputType]?.type ?? ""}
                                    errorMessage={errors[name as keyof FormInputType]?.message ?? ""}
                                    field={{ ...field}}
                                />
                            )}
                        />
                    ))}
                </div>
                <div className={styles.footer}>
                    <h4>Шаг {activeStep + 1} из {steps.length}</h4>
                    <div>
                        {activeStep > 0 && <Button onClick={prevStep}>Вернуться назад</Button>}
                        {activeStep === steps.length - 1 ? (
                            <Button onClick={() => validateStep() && handleSubmit(onSubmit)()}
                            >Создать проект</Button>
                        ) : (
                            <Button onClick={nextStep}>Следующий шаг</Button>
                        )}
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ModalCreate;