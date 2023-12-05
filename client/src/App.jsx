import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import {path} from "./constants/constants";
import EmailVerify from "./pages/EmailVerify";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path={path.HOME} exact element={<Main />} />}
			<Route path={path.SIGNUP} exact element={<Signup />} />
			<Route path={path.LOGIN} exact element={<Login />} />
			<Route path={path.HOME} element={<Navigate replace to={path.LOGIN} />} />
			<Route path={path.VERIFY_EMAIL} element={<EmailVerify />} />
		</Routes>
	);
}

export default App;
