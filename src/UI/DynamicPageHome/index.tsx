import {Button, Typography} from "antd";
import ModalCreate from "@/UI/ModalCreate";
import {useProjectStore} from "@/store/store";
import ProjectCard from "@/UI/ProjectCard";
const { Title } = Typography;


 const DynamicPageHome = () => {
    const projects = useProjectStore((store) => store.projects)
    const setOpenModal = useProjectStore((store) => store.setOpenModal)
    const openHandle = () => setOpenModal(true)
    return (
        <>
            <div>
                <Title level={2}>
                    Проекты
                </Title>
                <Button type="primary" onClick={openHandle}>
                    Создать проект
                </Button>
            </div>
            <section>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                ) : (
                    <Title level={4}>
                        На данный момент список проектов пуст
                    </Title>
                )}
            </section>
            <ModalCreate />
        </>
    )
}

export default DynamicPageHome