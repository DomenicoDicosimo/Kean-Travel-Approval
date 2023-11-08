import React from 'react';
import {
    ClerkProvider, SignUp,
} from "@clerk/clerk-react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import WelcomePage from "./components/WelcomePage";

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
                    <Route path="/" element={<WelcomePage />} />
                        <Route
                        path="/sign-up/*"
                        element={<SignUp routing="path" path="/sign-up" />}
                        />
                    </Routes>
                  <NavBar/>
              </BrowserRouter>
            </ChakraProvider>
        </ClerkProvider>
      </>
  );
}
/*
function ClerkProviderWithRoutes() {
    const navigate = useNavigate();
    return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={
        <>
          <WelcomePage />
        </>
        }/>
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route
          path="/sign-out"
          element={<SignOutButton routing="path" path={"/sign-out"}/>}
        />
        <Route
          path="/database"
          element={
          <>
            <SignedIn>
              <DatabaseTestPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function DatabaseTestPage() {
    const [message, setMessage] = useState('');
    const [names, setNames] = useState([]);
    useEffect(() => {
        // default endpoint
        axios
          .get('http://127.0.0.1:5000/')
          .then((response) => {
            setMessage(response.data.message);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });

        // staff endpoint - testing db connection
        axios
          .get('http://127.0.0.1:5000/staff')
          .then((response) => {
            const staffNames = response.data.map((staff) => staff.name);
            setNames(staffNames);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      }, []);

  return (
      <div>
          <h3>Hello from React</h3>
          <h3>{message}</h3>

          {names.map((name, index) => (
            <p key={index}>{name}</p>
          ))}
      </div>
  );
}
*/
export default App;
