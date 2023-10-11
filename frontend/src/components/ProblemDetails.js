import { useProblemsContext } from "../hooks/useProblemsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProblemDetails = ({ problem }) => {
  const { dispatch } = useProblemsContext();

  const handleClick = async () => {
    const response = await fetch("/api/problems/" + problem._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PROBLEM", payload: json });
    }
  };

  return (
    <div className="problem-details">
      <h4>{problem.title}</h4>
      <p>
        <strong>Load </strong>
        {problem.load}
      </p>
      <p>
        <strong>Number </strong>
        {problem.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default ProblemDetails;
