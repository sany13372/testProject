import styles from "@/app/project/[id]/ProjectPage.module.scss";
import {Control, Controller, FieldErrors, UseFormHandleSubmit} from "react-hook-form";
import ValidField from "@/UI/ValidField";
import {Button} from "antd";
import {Dispatch, FC, SetStateAction} from "react";
import {FormInputType, IFormFields} from "@/store/types";

interface IFormUpdateProject {
    formFields:IFormFields[]
    handleSubmit:UseFormHandleSubmit<FormInputType, undefined>
    handleSave:(data:FormInputType) => void
    control:Control<FormInputType, any>
    errors:FieldErrors<FormInputType>
    setIsEditing:Dispatch<SetStateAction<boolean>>
}
export const FormUpdateProject:FC<IFormUpdateProject> = ({formFields,handleSubmit,handleSave,setIsEditing,errors,control}) => {
    return (
        <form onSubmit={handleSubmit(handleSave)} className={styles.form}>
            {formFields.map(({ name, placeholder, type, label }) => (
                <div key={name} className={styles.formGroup}>
                    <label>{label}:</label>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <ValidField
                                placeholder={placeholder}
                                type={type}
                                errorType={errors[name]?.type ?? ""}
                                errorMessage={errors[name]?.message ?? ""}
                                field={field}
                            />
                        )}
                    />
                </div>
            ))}
            <div className={styles.buttons}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                    Отмена
                </Button>
            </div>
        </form>
    )
}