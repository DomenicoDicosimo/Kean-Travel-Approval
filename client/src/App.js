import React from 'react';
import {
    ClerkProvider, SignIn, SignUp,
} from "@clerk/clerk-react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import GroupTravel from "./components/GroupTravel"
import WelcomePage from "./components/WelcomePage";
import TestDatabase from "./components/TestDatabase";

if(!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
      <>
        <ClerkProvider publishableKey={clerkPubKey}>
            <ChakraProvider>
              <BrowserRouter>
                  <Routes>
                        <Route
                        path="/"
                        element={<WelcomePage />} />
                        <Route
                        path="/sign-up/*"
                        element={
                            <div style={{marginTop: 100, display: "flex", justifyContent: "space-evenly"}}>
                                <SignUp routing="path" path="/sign-up" afterSignUpUrl='/'/>
                            </div>}
                        />
                        <Route
                        path="/login/*"
                        element={
                            <div style={{marginTop: 100, display: "flex", justifyContent: "space-evenly"}}>
                            <SignIn routing="path" path="/login" afterSignInUrl='/'/>
                            </div>}
                        />
                        <Route
                        path="/test-database/*"
                        element={<TestDatabase/>}>
                        </Route>
                        <Route
                        path="/group-travel/*"
                        element={<GroupTravel/>}>
                        </Route>
                    </Routes>
              </BrowserRouter>
            </ChakraProvider>
        </ClerkProvider>
      </>
  );
}

export default App;
