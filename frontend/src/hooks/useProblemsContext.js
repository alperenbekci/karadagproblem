import { ProblemsContext } from "../context/ProblemsContext";
import { useContext } from "react";

export const useProblemsContext = () => {
  const context = useContext(ProblemsContext);

  if (!context) {
    throw Error(
      "useProblemsContext must be used inside a ProblemsContextProvider"
    );
  }

  return context;
};
