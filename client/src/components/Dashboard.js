import React, {useEffect, useState, useCallback} from 'react'
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import {useUser, RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Grid,
    GridItem,
    Heading,
    Stack,
    StackDivider,
    Text,
    Badge, HStack, Wrap, WrapItem
} from "@chakra-ui/react";
import axios from "axios";


export default function Dashboard() {
    const {user} = useUser();
    const navigate = useNavigate(); //new
    const email = user?.emailAddresses[0]?.emailAddress;

  const [data, setData] = useState([]);

    const loadUserSubmittedForms = useCallback(() => {
        if (email) {
            const url = `http://127.0.0.1:5000/get-user-submitted-forms?email=${email}`;
            axios.get(url, { headers: { 'Content-Type': 'application/json' } })
                 .then((res) => setData(res.data))
                 .catch((error) => console.error("Error fetching data:", error));
        }
    }, [email]); // Dependency on email

  useEffect(() => {
    loadUserSubmittedForms();
  }, [loadUserSubmittedForms]);

    return (
        <>
            <NavBar/>    
            <SignedIn>
                <Grid height="calc(90vh)"
                      templateRows="repeat(2, 1fr)"
                      templateColumns="repeat(2, 1fr)"
                      gap={3}>
                    <GridItem display="flex" maxWidth="50vw" justifyContent="center" rowSpan={1} colSpan={1}>
                        <Card maxH="xs" width="95%" padding="2" margin="5">
                            <CardHeader textAlign="center">
                            <Heading size="md">
                                Assigned to Me
                            </Heading>
                        </CardHeader>
                            <CardBody  overflowY="scroll">
                            <Stack divider={<StackDivider/>} spacing="4">
                                 <Box as="button" onClick={() => navigate('/travel-authorization-form')} textAlign="left" border="1px" p={4} _hover={{ bg: 'gray.100' }} borderRadius="md" borderColor="gray.300">                
                                    <HStack divider={<StackDivider />} spacing="4">
                                        <Heading size='xs' textTransform='uppercase'>
                                            Travel Authorization Request
                                        </Heading>
                                    </HStack>             
                                </Box>
                                <Box as="button" onClick={() => navigate('/student-travel-registration-form-day')} textAlign="left" border="1px" p={4} _hover={{ bg: 'gray.100' }} borderRadius="md" borderColor="gray.300">                                   
                                    <HStack divider={<StackDivider />} spacing="4">
                                        <Heading size='xs' textTransform='uppercase'>
                                            Student Travel Registration Form - Day Trip (Form CCST-4A)
                                        </Heading>                                
                                    </HStack>                                            
                                </Box>
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
                            <Stack divider={<StackDivider/>} spacing='4'>
                                {data.map((form, index) => (
                                    <Box key={index} as="button" onClick={() => navigate('/display-student-travel-registration-form-day')} textAlign="left" border="1px" p={4} _hover={{ bg: 'gray.100' }} borderRadius="md" borderColor="gray.300">
                                       
                                        <Heading size='xs' textTransform='uppercase'>
                                            Student Travel Registration Form - Overnight Trip (Form CCST-4B)
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>Form Description</Text>
                                        <HStack>
                                            <Wrap>
                                                <WrapItem>
                                                    <Badge bg="blue.300" color="white">EVENT: {form.form.event_name || 'N/A'}</Badge>
                                                </WrapItem>
                                                <WrapItem>
                                                    <Badge bg="blue.500" color="white">SUBMITTED BY: {(form.form.first_name || '') + " " + (form.form.last_name || '')}</Badge>
                                                </WrapItem>
                                                <WrapItem>
                                                    <Badge bg="red.500" color="white">Departure Time: {form.form.departure_time ? new Date(form.form.departure_time).toLocaleString() : 'N/A'}</Badge>
                                                </WrapItem>
                                                <WrapItem>
                                                    <Badge bg={form.role === 'faculty' ? 'purple.300' : 'yellow.300'} color="white">{form.role}</Badge>
                                                </WrapItem>
                                            </Wrap>
                                        </HStack>
                                        
                                    </Box>
                                ))}
                            </Stack>
                        </CardBody>
                    </Card>
                </GridItem>

                   <GridItem display="flex" justifyContent="center" rowSpan={1} colSpan={2}>
                        <Card maxH="xs" width="100%" padding="2" margin="5">
                            <CardHeader textAlign="center">
                                <Heading size="md">
                                    Previously Submitted Forms
                                </Heading>
                            </CardHeader>
                            <CardBody overflowY="scroll">
                                <Stack divider={<StackDivider/>} spacing='4'>
                                    {data.map((form, index) => (
                                        <Box key={index} textAlign="left" border="1px" p={4} _hover={{ bg: 'gray.100' }} borderRadius="md" borderColor="gray.300">                                   
                                            <Heading size='xs' textTransform='uppercase'>
                                                TRAVEL AUTORIZATION REQUEST (FORM A)
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                Form Description
                                            </Text>
                                            <HStack>
                                                <Wrap>
                                                    <WrapItem>
                                                        <Badge bg="blue.300" color="white">EVENT: {form.form.event_name || 'N/A'}</Badge>
                                                    </WrapItem>
                                                    <WrapItem>
                                                        <Badge bg="blue.500" color="white">SUBMITTED BY: {(form.form.first_name || '') + " " + (form.form.last_name || '')}</Badge>
                                                    </WrapItem>
                                                    <WrapItem>
                                                        <Badge bg="red.500" color="white">Departure Time: {form.form.departure_time ? new Date(form.form.departure_time).toLocaleString() : 'N/A'}</Badge>
                                                    </WrapItem>
                                                    <WrapItem>
                                                        <Badge  bg={form.role === 'faculty' ? 'purple.300' : 'yellow.300'} color="white">{form.role}</Badge>
                                                    </WrapItem>
                                                </Wrap>
                                            </HStack>
                                        </Box>
                                    ))}
                                </Stack>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>

            </SignedIn>
            <SignedOut>
                <RedirectToSignIn/>
            </SignedOut>
        </>
    )
}
