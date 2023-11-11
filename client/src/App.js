import React from 'react';
import PropTypes from 'prop-types';
import {ClerkProvider, SignIn, SignUp, useUser} from "@clerk/clerk-react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import GroupTravel from "./components/GroupTravel"
import WelcomePage from "./components/WelcomePage";
import Forms from "./components/StudentTravelRegistrationFormDay";
import TestDatabase from "./components/TestDatabase";


if(!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function PrivateRoute({ children }) {
    const { isSignedIn } = useUser();
    return isSignedIn ? children : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};


function AuthRedirect({ to }) {
    const { isSignedIn } = useUser();
    return isSignedIn ? <Navigate to={to} replace /> : null;
}

AuthRedirect.propTypes = {
    to: PropTypes.string.isRequired,
};


function App() {
  return (
      <>
        <ClerkProvider publishableKey={clerkPubKey}>
            <ChakraProvider>
              <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PrivateRoute><WelcomePage /></PrivateRoute>} />
                        <Route path="/sign-up/*" element={<> <AuthRedirect to="/" />
                        <div style={{marginTop: 100, display: "flex", justifyContent: "space-evenly"}}>
                         <SignUp />
                         </div>
                         </>} />
                        <Route path="/login/*" element={<><AuthRedirect to="/"/>
                        <div style={{marginTop: 100, display: "flex", justifyContent: "space-evenly"}}>
                        <SignIn />
                        </div></>} />
                        <Route path="/test-database/*" element={<TestDatabase/>}></Route>
                        <Route path="/group-travel/*" element={<GroupTravel/>}></Route>
                        <Route path="/forms/*" element={<Forms/>}></Route>
                    </Routes>
              </BrowserRouter>
            </ChakraProvider>
        </ClerkProvider>
      </>
  );
}

export default App;
