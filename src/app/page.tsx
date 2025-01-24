'use client'
import styles from "./page.module.scss";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/UI/LoadingSpinner";


const PageHome = dynamic(() => import("@/UI/DynamicPageHome"), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});

export default function Home() {

  return (
      <div className={styles.page}>
          <PageHome/>
      </div>
  );
}
