import { useEffect } from "react";
import { useProblemsContext } from "../hooks/useProblemsContext";

// components
import ProblemDetails from "../components/ProblemDetails";
import ProblemForm from "../components/ProblemForm";

const Home = () => {
  const { problems, dispatch } = useProblemsContext();

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch("/api/problems");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PROBLEMS", payload: json });
      }
    };

    fetchProblems();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="problems">
        {problems &&
          problems.map((problem) => (
            <ProblemDetails problem={problem} key={problem._id} />
          ))}
      </div>
      <ProblemForm />
    </div>
  );
};

export default Home;
