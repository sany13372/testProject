import {FC} from 'react';
import {Input, InputProps} from "antd";
import {ControllerRenderProps} from "react-hook-form";
import {FormInputType} from "@/store/types";


interface IValidField extends InputProps{
    placeholder:string
    errorType:string
    errorMessage:string
    field: ControllerRenderProps<FormInputType>
}
const ValidField:FC<IValidField> = ({field,placeholder,errorMessage,errorType,...props}) => {
    return (
        <div>
            <Input
                {...props}
                status={errorType ? "error" : ""}
                placeholder={placeholder}
                {...field}
            />
            {errorType === "required" && (
                <span>{errorMessage}</span>
            )}
        </div>
    );
}

export default ValidField;