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
  const [setData] = useState([]);

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
  const testUserEmail = "janedoe@gmail.com"
  const testList = [
      {
          user_email: "janedoe@gmail.com",
          form_name: "TRAVEL AUTHORIZATION REQUEST (FORM A)",
          event_name: "NCUR",
          submitted_by: "Jane Doe",
          date_assigned: "11/12/2023",
          completion_date: "",
          currently_assigned_user: "janedoe@gmail.com",
          user_type: "STUDENT"
      },
      {
          user_email: "janedoe@gmail.com",
          form_name: "STUDENT TRAVEL REGISTRATION FORM - DAY TRIP (FORM CCST-4A)",
          event_name: "GMIS",
          submitted_by: "Jane Doe",
          date_assigned: "11/12/2023",
          completion_date: "11/15/2023",
          currently_assigned_user: "jacknicholson@gmail.com",
          user_type: "STUDENT"
      },
      {
          user_email: "janedoe@gmail.com",
          form_name: "STUDENT TRAVEL REGISTRATION FORM - DAY TRIP (FORM CCST-4A)",
          event_name: "GMIS",
          submitted_by: "Jane Doe",
          date_assigned: "11/12/2023",
          completion_date: "",
          currently_assigned_user: "BenDoverman@gmail.com",
          user_type: "FACULTY"
      },
  ]

    const assignedList = []

    const pendingCompletionList = []

    const prevSubmittedList = []

    // Append entries to appropriate lists based on logic
    for (let i = 0; i < testList.length; i++) {
        let form = testList[i];
        if (form["completion_date"] === "" && form["currently_assigned_user"] === testUserEmail)
            assignedList.push(form)
        else if (form["completion_date"] === "" && form["currently_assigned_user"] !== testUserEmail)
            pendingCompletionList.push(form)
        else
            prevSubmittedList.push(form)
    }
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
                            <Stack divider={<StackDivider/>} spacing="4" di>
                                <ul>{assignedList.map((item) => (
                                    <li key={item.user_email}><Box>
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
                                                <Badge bg="blue.300" color="white">{item.event_name}</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="blue.500" color="white">{item.submitted_by}</Badge>
                                            </WrapItem>                                            <WrapItem>
                                                <Badge bg="red.500" color="white">{item.date_submitted}</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="yellow.300" color="white">{item.user_type}</Badge>
                                            </WrapItem>
                                        </Wrap>
                                    </HStack>
                                    <Divider/>
                                </Box></li>
                                ))}</ul>
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
                                <ul>{pendingCompletionList.map((item) => (
                                    <li key={item.user_email}><Box>
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
                                                <Badge bg="blue.300" color="white">{item.event_name}</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="blue.500" color="white">{item.submitted_by}</Badge>
                                            </WrapItem>                                            <WrapItem>
                                                <Badge bg="red.500" color="white">{item.date_submitted}</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="yellow.300" color="white">{item.user_type}</Badge>
                                            </WrapItem>
                                        </Wrap>
                                    </HStack>
                                    <Divider/>
                                </Box></li>
                                ))}</ul>
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
                                    <ul>{prevSubmittedList.map((item) => (
                                        <li key={item.user_email}><Box>
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
                                                <Badge bg="blue.300" color="white">{item.event_name}</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="blue.500" color="white">{item.submitted_by}</Badge>
                                            </WrapItem>                                            <WrapItem>
                                                <Badge bg="red.500" color="white">{item.date_submitted}</Badge>
                                            </WrapItem>
                                            <WrapItem>
                                                <Badge bg="yellow.300" color="white">{item.user_type}</Badge>
                                            </WrapItem>
                                        </Wrap>
                                    </HStack>
                                    <Divider/>
                                </Box></li>
                                    ))}</ul>
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