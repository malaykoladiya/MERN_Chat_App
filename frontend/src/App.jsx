// Importing necessary dependencies from react-router-dom and App.css
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// Importing the necessary components for the pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

// Importing the Toaster component from react-hot-toast
import { Toaster } from "react-hot-toast";

// Importing the useAuthContext hook from the AuthContext
import { useAuthContext } from "./context/AuthContext";

// Defining the App component
function App() {
	// Accessing the authUser from the AuthContext using the useAuthContext hook
	const { authUser } = useAuthContext();

	return (
		// Rendering the main container div with padding, height, and flex properties
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				{/* Rendering the Route component for the home page */}
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />

				{/* Rendering the Route component for the login page */}
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />

				{/* Rendering the Route component for the signup page */}
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>

			{/* Rendering the Toaster component */}
			<Toaster />
		</div>
	);
}

// Exporting the App component as the default export
export default App;