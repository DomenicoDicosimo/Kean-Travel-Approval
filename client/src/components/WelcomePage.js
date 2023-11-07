import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

export default function WelcomePage() {
  // Access authentication state
  const { isLoaded: clerkIsLoaded, userId } = useAuth();
  const { user } = useUser();
  console.log(user);

  const addUserToDatabase = async () => {
    try {
      const response = await fetch('/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          DOB: '1999-01-01',
          sex: 'M',
          email: user.emailAddresses[0].emailAddress,
          password: '',
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          role: 'Student',
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('There was an error adding the user to the database:', error);
    }
  };

  React.useEffect(() => {
    addUserToDatabase();
  }, []);

  // Account for sign out while on page
  if (!clerkIsLoaded || !userId) {
    return null;
  }

  //   user.update({
  //     unsafeMetadata: {
  //       id: '1111111',
  //     },
  //   });
  return (
    <>
      <div>
        <h3></h3>
        <h1>
          Welcome {user.firstName} {user.lastName}!
        </h1>
      </div>
    </>
  );
}
