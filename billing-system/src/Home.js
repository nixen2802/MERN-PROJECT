import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
	return (
		<div>
			<h1>Welcome to HRN Industries!!!</h1>
			<Link to={"/register"}>
				<button className="btn btn-outline-secondary">Register</button>
			</Link>
			<Link to={"/login"}>
				<button className="btn btn-outline-secondary">Login</button>
			</Link>
		</div>
	);
}
export default Home;
