import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { SocketProvider } from "./context/SocketProvider.jsx";
import { useCookies } from "react-cookie";
import Signin from "./pages/Signin";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  // Inside your sign-in function
  const [cookies, setCookie] = useCookies(["token"]);

  // After successful authentication
  // setCookie('doooo', 'ssdbdshbdshds', { path: '/' }); // Replace `authToken` with your actual token

  console.log(cookies, "cookiescookies");

  const isAuthenticated = document.cookie.includes("token");
  // const isAuthenticated = false;

  // console.log(isAuthenticated, 'isAuthenticated');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated} // Assuming isAuthenticated is defined elsewhere
                component={Chat}
              />
            }
          ></Route>
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
