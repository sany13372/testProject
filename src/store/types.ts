
export interface IProject{
    id:string
    title:string
    description:string
    price:number
    currency:string
    socialLink?:string
}

export type FormInputType = Omit<IProject, 'id'>;


export interface IFormFields{
    name: keyof FormInputType;
    placeholder: string;
    type: string;
    label:string
}