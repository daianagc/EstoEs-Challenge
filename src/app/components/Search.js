"use client";

import { FormControl, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "../styles/search.module.css";
import { Suspense } from "react";

export const CustomSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    term ? params.set("query", term) : params.delete("query");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Suspense>
      <div className={styles.search}>
        <FormControl variant="outlined" className={styles.control}>
          <TextField
            placeholder="Search for project name"
            className={styles.input}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={styles.icon} />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </div>
    </Suspense>
  );
};
