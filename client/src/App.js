import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { ChakraProvider } from '@chakra-ui/react';

import Dashboard from './components/Dashboard';
import DisplayStudentTravelRegistrationFormDay from './components/DisplayStudentTravelRegistrationFormDay';
import GroupTravel from './components/GroupTravel';
import StudentTravelRegistrationFormDay from './components/StudentTravelRegistrationFormDay';
import TestDatabase from './components/TestDatabase';
import TravelAuthorizationRequestForm from './components/TravelAuthorizationRequestForm';
import UploadReceipt from './components/UploadReceipt';
import FacultyDashboard from './components/FacultyDashboard';
import WelcomePage from './components/WelcomePage';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
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
  const [usingUniversityTransport, setUsingUniversityTransport] = useState('');
  const [isUnderage, setIsUnderage] = useState(false);
  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        <ChakraProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <WelcomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sign-up/*"
                element={
                  <>
                    {' '}
                    <AuthRedirect to="/" />
                    <div
                      style={{ marginTop: 100, display: 'flex', justifyContent: 'space-evenly' }}
                    >
                      <SignUp />
                    </div>
                  </>
                }
              />
              <Route
                path="/login/*"
                element={
                  <>
                    <AuthRedirect to="/" />
                    <div
                      style={{ marginTop: 100, display: 'flex', justifyContent: 'space-evenly' }}
                    >
                      <SignIn />
                    </div>
                  </>
                }
              />
              <Route path="/test-database/*" element={<TestDatabase />}></Route>
              <Route path="/group-travel/*" element={<GroupTravel />}></Route>
              <Route
                path="/student-travel-registration-form-day"
                element={
                  <StudentTravelRegistrationFormDay
                    usingUniversityTransport={usingUniversityTransport}
                    setUsingUniversityTransport={setUsingUniversityTransport}
                    setIsUnderage={setIsUnderage}
                  />
                }
              />
              <Route
                path="/travel-authorization-form"
                element={<TravelAuthorizationRequestForm />}
              />
              <Route
                path="/display-student-travel-registration-form-day"
                element={
                  <DisplayStudentTravelRegistrationFormDay
                    usingUniversityTransport={usingUniversityTransport}
                    isUnderage={isUnderage}
                  />
                }
              />
              <Route path="/upload-receipts" element={<UploadReceipt />} />
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/faculty-dashboard" element={<FacultyDashboard />}></Route>
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </ClerkProvider>
    </>
  );
}

export default App;
