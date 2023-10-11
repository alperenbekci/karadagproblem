import { createContext, useReducer } from "react";

export const ProblemsContext = createContext();

export const problemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROBLEMS":
      return {
        problems: action.payload,
      };
    case "CREATE_PROBLEM":
      return {
        problems: [action.payload, ...state.problems],
      };
    case "DELETE_PROBLEM":
      return {
        problems: state.problems.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ProblemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(problemsReducer, {
    problems: null,
  });

  return (
    <ProblemsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProblemsContext.Provider>
  );
};
