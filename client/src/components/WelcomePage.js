import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import NavBar from './NavBar';
import { Box, FormControl, FormLabel, Input, Button, VStack, Text, Select } from '@chakra-ui/react';

export default function WelcomePage() {
  const { user } = useUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [DOB, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      console.log(user);
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.emailAddresses[0]?.emailAddress || '');
      setUserId(user.id || '');
      setPassword('');

      checkIfUserExists(user.id);
    }
  }, [user]);

  const checkIfUserExists = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/check-user-exists?id=${user.id}`);
      const data = await response.json();

      if (response.ok) {
        setIsNewUser(!data.userExists);
      } else {
        console.error('Error checking user existence');
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUserToDatabase = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          DOB,
          sex,
          email: user.emailAddresses[0]?.emailAddress,
          password,
          street,
          city,
          state,
          zip,
          role,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem('userFormSubmitted', 'true');
        setIsNewUser(false);
      } else {
        console.error('Error submitting new user info.');
      }
    } catch (error) {
      console.error('There was an error adding the user to the database:', error);
    }
  };

  return (
    <>
      <NavBar />
      <Box p={4} spacing={4} bg="gray.100" w="50%" mx="auto" borderRadius="lg">
        <VStack spacing={4} align="stretch">
          <Text>
            {firstName} {lastName}
          </Text>
          <Text>Email: {email}</Text>
          <Text>User ID: {userId}</Text>

          {isLoading ? (
            <Text>Loading...</Text>
          ) : isNewUser ? (
            <form onSubmit={addUserToDatabase}>
              <FormControl>
                <FormLabel>
                  Please enter this additional information if you just created your account.
                </FormLabel>
              </FormControl>

              <FormControl id="DOB">
                <FormLabel>Date of Birth</FormLabel>
                <Input type="date" value={DOB} onChange={(e) => setDob(e.target.value)} />
              </FormControl>

              <FormControl id="sex">
                <FormLabel>Sex</FormLabel>
                <Select
                  placeholder="Select sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </Select>
              </FormControl>

              <FormControl id="street">
                <FormLabel>Street</FormLabel>
                <Input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
              </FormControl>

              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </FormControl>

              <FormControl id="state">
                <FormLabel>State</FormLabel>
                <Input type="text" value={state} onChange={(e) => setState(e.target.value)} />
              </FormControl>

              <FormControl id="zip">
                <FormLabel>Zipcode</FormLabel>
                <Input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
              </FormControl>

              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Select role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                </Select>
              </FormControl>

              <Button mt={4} colorScheme="blue" type="submit">
                Submit{' '}
              </Button>
            </form>
          ) : (
            <Text>Welcome, {user?.firstName}!</Text>
          )}
        </VStack>
      </Box>
    </>
  );
}
