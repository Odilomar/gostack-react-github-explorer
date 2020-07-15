import { createContext } from "react";

interface ShowListComponent {
  showList: boolean;
  setShowList: (value: boolean) => void;
}

export const ShowListContext = createContext<ShowListComponent | undefined>(
  undefined
);
