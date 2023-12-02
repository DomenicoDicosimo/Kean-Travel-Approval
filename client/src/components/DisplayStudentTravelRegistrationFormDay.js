/* eslint-disable  */
import React, { useState, useEffect, useCallback } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Flex,
  Stack,
  HStack,
  Collapse,
  Text,
  Button,
} from '@chakra-ui/react';

export default function DisplayStudentTravelRegistrationFormDay({ formId, userEmail }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const url = `http://127.0.0.1:5000/get-user-submitted-forms/${formId}?email=${userEmail}`;
    axios
      .get(url)
      .then((res) => setFormData(res.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [formId, userEmail]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <Box p={4} spacing={4} bg="gray.100" w="50%" mx="auto" borderRadius="lg">
        <Stack>
          <FormControl>
            <FormLabel>Student Travel Registration Form - Day Trip (Student)</FormLabel>
            <Text>{formData.form.event_name}</Text>
          </FormControl>
          37
          <FormLabel style={{ color: 'blue' }}>
            2. RELEASE AND INDEMNIFICATION AGREEMENT FOR STUDENT TRAVEL
          </FormLabel>
        </Stack>
      </Box>
    </>
  );
}
