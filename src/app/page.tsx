'use client'
import {Button,Typography} from "antd";
import styles from "./page.module.scss";
import {useProjectStore} from "@/store/store";
import ModalCreate from "@/UI/ModalCreate";
import ProjectCard from "@/UI/ProjectCard";

const { Title } = Typography;

export default function Home() {
  const projects = useProjectStore((store) => store.projects)
  const setOpenModal = useProjectStore((store) => store.setOpenModal)
  const openHandle = () => setOpenModal(true)
  return (
      <div className={styles.page}>
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
      </div>
  );
}
