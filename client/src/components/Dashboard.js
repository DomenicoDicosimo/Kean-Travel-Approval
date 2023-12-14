import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from './DisplayStudentTravelRegistrationFormDay';
import { useUser, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  Box,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import NavBar from './NavBar';

export default function Dashboard() {
  const { user } = useUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const userId = user?.id;


  const [data, setData] = useState([]);

  const loadUserSubmittedForms = useCallback(() => {
    if (email) {
      const url = `http://127.0.0.1:5000/get-user-submitted-forms?email=${email}`;
      axios
        .get(url, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => setData(res.data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [email]); // Dependency on email

  useEffect(() => {
    loadUserSubmittedForms();
  }, [loadUserSubmittedForms]);

  
  const [assignedForms, setAssignedForms] = useState([]);

  const fetchFormsForApproval = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/forms-for-approval?user_id=${userId}`)
      .then(response => {
        setAssignedForms(response.data.student_travel_forms);
      })
      .catch(error => console.error('Error fetching assigned forms:', error));
  }, [userId]);
  
  useEffect(() => {
    
    if (user) {
      fetchFormsForApproval();
    }
  }, [fetchFormsForApproval, user]);

  useEffect(() => {
    console.log('Assigned forms:', assignedForms);
  }, [assignedForms]);

  return (
    <>
      <NavBar />
      <SignedIn>
        <Grid
          height="calc(90vh)"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={3} >
          <GridItem display="flex" maxWidth="50vw" justifyContent="center" rowSpan={1} colSpan={1}>
            <Card maxH="xs" width="95%" padding="2" margin="5">
              <CardHeader textAlign="center">
                <Heading size="md">Assigned to Me</Heading>
              </CardHeader>
              <CardBody overflowY="scroll">
              <Stack divider={<StackDivider />} spacing="4">
                  {assignedForms.map((form, index) => (
                    <Box key={index}>
                      <Divider />
                      <Heading size="xs" textTransform="uppercase">
                        TRAVEL AUTORIZATION REQUEST (FORM A)
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Form Description
                      </Text>
                      <HStack>
                        <Link
                          to={`/display-student-travel-registration-form-day?formId=${
                            form.id || 'N/A'
                          }`}
                        >
                          <Wrap>
                            <WrapItem>
                              <Badge bg="blue.300" color="white">
                                EVENT: {form.event_name || 'N/A'}
                              </Badge>
                            </WrapItem>
                            <WrapItem>
                              <Badge bg="blue.500" color="white">
                                SUBMITTED BY:{' '}
                                {(form.first_name || '') + ' ' + (form.last_name || '')}
                              </Badge>
                            </WrapItem>
                            <WrapItem>
                              <Badge bg="red.500" color="white">
                                Departure Time:{' '}
                                {form.departure_time
                                  ? new Date(form.departure_time).toLocaleString()
                                  : 'N/A'}
                              </Badge>
                            </WrapItem>
                            <WrapItem>
                              <Badge
                                bg={form.role === 'faculty' ? 'purple.300' : 'yellow.300'}
                                color="white"
                              >
                                {form.role}
                              </Badge>
                            </WrapItem>
                          </Wrap>
                        </Link>
                      </HStack>
                      <Divider />
                    </Box>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem display="flex" justifyContent="center" rowSpan={1} colSpan={1}>
            <Card maxH="xs" width="95%" padding="2" margin="5">
              <CardHeader textAlign="center">
                <Heading size="md">Submitted & Pending Completion</Heading>
              </CardHeader>
              <CardBody overflowY="scroll">
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Divider />
                    <Heading size="xs" textTransform="uppercase">
                      Student Travel Registration Form - Overnight Trip (Form CCST-4B)
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Form Description
                    </Text>
                    <HStack>
                      <Wrap>
                        <WrapItem>
                          <Badge bg="blue.300" color="white">
                            Event: GMiS
                          </Badge>
                        </WrapItem>
                        <WrapItem>
                          <Badge bg="blue.500" color="white">
                            Submitted By: Jane Doe
                          </Badge>
                        </WrapItem>{' '}
                        <WrapItem>
                          <Badge bg="red.500" color="white">
                            Date Submitted: 11/15/2023
                          </Badge>
                        </WrapItem>
                        <WrapItem>
                          <Badge bg="yellow.300" color="white">
                            Student
                          </Badge>
                        </WrapItem>
                      </Wrap>
                    </HStack>
                    <Divider />
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem display="flex" justifyContent="center" rowSpan={1} colSpan={2}>
            <Card maxH="xs" width="100%" padding="2" margin="5">
              <CardHeader textAlign="center">
                <Heading size="md">Previously Submitted Forms</Heading>
              </CardHeader>
              <CardBody overflowY="scroll">
                <Stack divider={<StackDivider />} spacing="4">
                  {data.map((form, index) => (
                    <Box key={index}>
                      <Divider />
                      <Heading size="xs" textTransform="uppercase">
                        TRAVEL AUTORIZATION REQUEST (FORM A)
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        Form Description
                      </Text>
                      <HStack>
                        <Link
                          to={`/display-student-travel-registration-form-day?formId=${
                            form.form.id || 'N/A'
                          }&email=${email}`}
                        >
                          <Wrap>
                            <WrapItem>
                              <Badge bg="blue.300" color="white">
                                EVENT: {form.form.event_name || 'N/A'}
                              </Badge>
                            </WrapItem>
                            <WrapItem>
                              <Badge bg="blue.500" color="white">
                                SUBMITTED BY:{' '}
                                {(form.form.first_name || '') + ' ' + (form.form.last_name || '')}
                              </Badge>
                            </WrapItem>
                            <WrapItem>
                              <Badge bg="red.500" color="white">
                                Event Date:{' '}
                                {form.form.event_date
                                  ? formatDate(new Date(form.form.event_date))
                                  : 'N/A'}
                              </Badge>
                            </WrapItem>
                            <WrapItem>
                              <Badge
                                bg={form.role === 'faculty' ? 'purple.300' : 'yellow.300'}
                                color="white"
                              >
                                {form.role}
                              </Badge>
                            </WrapItem>
                          </Wrap>
                        </Link>
                      </HStack>
                      <Divider />
                    </Box>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
