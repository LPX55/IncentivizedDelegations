import styles from "../styles/Home.module.css";
import ValidatorsTable from "../components/main/validators";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, connector, isConnected } = useAccount()

  return (
    <div className="max-w-6xl">
      <main className={styles.main}>
        <ValidatorsTable />
      </main>
    </div>
  );
}
