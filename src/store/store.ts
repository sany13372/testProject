import { create } from 'zustand'
import {IProject} from "@/store/types";

const defaultProjects:IProject[] = [
    {
        "id": "1",
        "title": "Инновационный проект",
        "description": "Уникальная возможность для бизнеса, откройте новый рынок!",
        "price": 7350,
        "currency": "USD",
        "socialLink": "https://example.com/1"
    },
    {
        "id": "2",
        "title": "Технологическое будущее",
        "description": "Представляем вам технологический стартап, который изменит индустрию.",
        "price": 4725,
        "currency": "USD",
        "socialLink": "https://example.com/2"
    },
    {
        "id": "3",
        "title": "Революционный стартап",
        "description": "Откройте для себя новый подход в производстве и маркетинге.",
        "price": 6850,
        "currency": "USD",
        "socialLink": "https://example.com/3"
    },
    {
        "id": "4",
        "title": "Эко-инициатива",
        "description": "Создайте будущее с экологически чистыми решениями, которые спасут планету.",
        "price": 7920,
        "currency": "USD",
        "socialLink": "https://example.com/4"
    },
    {
        "id": "5",
        "title": "Креативная лаборатория",
        "description": "Идеи, которые вдохновляют. Вдохновитесь новыми проектами.",
        "price": 5300,
        "currency": "USD",
        "socialLink": "https://example.com/5"
    },
]


interface IProjectStore{
    projects:IProject[]
    setProjects:(val:IProject[]) => void
    openModal:boolean
    setOpenModal:(val:boolean) => void
}

export const useProjectStore = create<IProjectStore>((set) => ({
    projects: defaultProjects,
    setProjects:(val) => set({projects:val}),
    openModal:false,
    setOpenModal:(val) => set({openModal:val}),
}))
