import React, {useEffect, useState} from 'react'
import NavBar from "./NavBar";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
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
    Divider,
    Badge, HStack, Wrap, WrapItem
} from "@chakra-ui/react";
import axios from "axios";


export default function Dashboard() {
  const url = "http://127.0.0.1:5000/get-user-submitted-forms";
  const [data, setData] = useState([]);

  const loadUserSubmittedForms = () => {
    console.log(axios.get(url, {headers: {'Content-Type': 'application/json'}})
        .then((res) => setData(res.data)));
  };

  useEffect(() => {
    loadUserSubmittedForms();
  }, []);
  window.onload = {
      loadUserSubmittedForms
  }
    return (
        <>
            <NavBar/>
            <p>{data}</p>
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
                            <Stack divider={<StackDivider/>} spacing="4" di>
                                <Box>
                                    <Divider/>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Travel Authorization Request (Form A)
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Form Description
                                    </Text>
                                    <HStack>
                                        <Wrap>
                                            <WrapItem>
                                                <Badge bg="blue.300" color="white">Event: NCUR</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="blue.500" color="white">Submitted By: Jane Doe</Badge>
                                            </WrapItem>                                            <WrapItem>
                                                <Badge bg="red.500" color="white">Date Submitted: 11/12/2023</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="yellow.300" color="white">Student</Badge>
                                            </WrapItem>
                                        </Wrap>
                                    </HStack>
                                    <Divider/>
                                </Box>
                                <Box>
                                    <Divider/>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Student Travel Registration Form - Day Trip (Form CCST-4A)
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Form Description
                                    </Text>
                                    <HStack>
                                        <Wrap>
                                            <WrapItem>
                                                <Badge bg="blue.300" color="white">Event: GMiS</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="blue.500" color="white">Submitted By: Jane Doe</Badge>
                                            </WrapItem>                                            <WrapItem>
                                                <Badge bg="red.500" color="white">Date Submitted: 11/15/2023</Badge>
                                            </WrapItem>
                                        </Wrap>
                                    </HStack>
                                    <Divider/>
                                </Box>
                            </Stack>
                        </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem display="flex" justifyContent="center" rowSpan={1} colSpan={1}>
                        <Card maxH="xs" width="95%"  padding="2" margin="5">
                            <CardHeader textAlign="center">
                            <Heading size="md">
                                Submitted & Pending Completion
                            </Heading>
                        </CardHeader>
                            <CardBody overflowY="scroll">
                            <Stack divider={<StackDivider/>} spacing='4'>
                                <Box>
                                    <Divider/>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Student Travel Registration Form - Overnight Trip (Form CCST-4B)
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Form Description
                                    </Text>
                                    <HStack>
                                        <Wrap>
                                            <WrapItem>
                                                <Badge bg="blue.300" color="white">Event: GMiS</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="blue.500" color="white">Submitted By: Jane Doe</Badge>
                                            </WrapItem>                                            <WrapItem>
                                                <Badge bg="red.500" color="white">Date Submitted: 11/15/2023</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="yellow.300" color="white">Student</Badge>
                                            </WrapItem>
                                        </Wrap>
                                    </HStack>
                                    <Divider/>
                                </Box>
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
                                <Box>
                                    <Divider/>
                                    <Heading size='xs' textTransform='uppercase'>
                                       Travel Authorization Request (Form A)
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Form Description
                                    </Text>
                                    <HStack>
                                        <Wrap>
                                            <WrapItem>
                                                <Badge bg="blue.300" color="white">Event: NCUR</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="blue.500" color="white">Submitted By: Jane Doe</Badge>
                                            </WrapItem>                                            <WrapItem>
                                                <Badge bg="red.500" color="white">Date Submitted: 11/15/2023</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="purple.300" color="white">Faculty</Badge>
                                            </WrapItem>
                                        </Wrap>
                                    </HStack>
                                    <Divider/>
                                </Box>
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