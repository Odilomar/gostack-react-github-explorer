import { createContext } from "react";

interface EditSystem {
  idSystem: number;
  setIdSystem: (value: number) => void;
}

export const EditSystemContext = createContext<EditSystem | undefined>(
  undefined
);
