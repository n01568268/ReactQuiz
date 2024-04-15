import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import "../styles/Main.css";

export default function Main() {
  // const inputRef = useRef(null)
  const dispatch = useDispatch();
  const name = localStorage.getItem("name");

  function startQuiz() {
    if (name) {
      dispatch(setUserId(name));
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/greetings"; // Redirects user back to the Greeting page
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>
      <p>Welcome, {name}!</p> {/* Displaying the user's name */}
      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>
          Each question has three options. You can choose only one options.
        </li>
        <li>You can review and change answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>
      <div className="start">
        <Link className="btn" to={"quiz"} onClick={startQuiz}>
          Start
        </Link>
        <button className="btn" onClick={logOut}>
          Log Out
        </button>{" "}
        {/* Log Out Button */}
      </div>
    </div>
  );
}
