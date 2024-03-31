import styles from "./page.module.css";
import { MyClientComponent } from "@/components/client-component";
import { MyFetchComponent } from "@/components/fetch-component";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.show}>
        <div>
          <MyClientComponent />
          <MyFetchComponent />
        </div>
      </div>
    </main>
  );
}
