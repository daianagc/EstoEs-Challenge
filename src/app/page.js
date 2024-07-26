import { Suspense } from "react";
import { CustomSearch } from "./components/Search";
import CustomTable from "./components/Table";

export default function Home() {
  return (
    <main>
      <Suspense>
        <CustomSearch />
      </Suspense>
      <CustomTable />
    </main>
  );
}
