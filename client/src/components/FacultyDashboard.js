import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "./NavBar";
import { useUser } from "@clerk/clerk-react";
import {
    Box,
    Card,
    Grid,
    GridItem,
    Heading,
    Stack,
    Text,
    VStack,
    HStack,
    Tag,
    Alert,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react';

const FacultyDashboard = () => {
    const { user, isLoaded } = useUser(); // Use isLoaded to check if user data has loaded
    const [dayTripForms, setDayTripForms] = useState([]);
    const [ethicsForms, setEthicsForms] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [isFetchingRole, setIsFetchingRole] = useState(true);

    useEffect(() => {
        if (isLoaded && user) {
            axios.get(`http://127.0.0.1:5000/get-user-role?user_id=${user.id}`)
                .then(response => {
                    setUserRole(response.data.role);
                    if (response.data.role === 'Faculty') {
                        axios.get('http://127.0.0.1:5000/student-travel-registration-form-day')
                            .then(res => setDayTripForms(res.data))
                            .catch(err => console.error('Error fetching student forms:', err));

                        axios.get('http://127.0.0.1:5000/travel-authorization-forms')
                            .then(res => setEthicsForms(res.data))
                            .catch(err => console.error('Error fetching ethics forms:', err));
                    }
                })
                .catch(error => console.error('Error fetching user role:', error))
                .finally(() => setIsFetchingRole(false));
        } else if (isLoaded) {
            setIsFetchingRole(false);
        }
    }, [user, isLoaded]);

    const renderFormCard = (form, type) => {
        const studentName = type === 'student' ? form.first_name : form.name;
        return (
            <Card key={form.id} p={5} shadow="md" borderWidth="1px">
                <VStack align="start">
                    <Text fontWeight="bold">{form.title}</Text>
                    <Text fontSize="sm">{studentName}</Text>
                    <Text fontSize="sm">{form.description}</Text>
                    <HStack spacing={4}>
                        <Tag colorScheme={type === 'student' ? 'blue' : 'green'}>
                            {type === 'student' ? 'Day Trip Form' : 'Ethics Form'}
                        </Tag>
                        <Tag colorScheme={form.status === 'pending' ? 'yellow' : 'green'}>
                            {form.status}
                        </Tag>
                    </HStack>
                </VStack>
            </Card>
        );
    };

    if (!isLoaded || isFetchingRole) {
        return <Box p={5}><Text>Checking access permissions...</Text></Box>;
    }

    if (userRole !== 'Faculty') {
        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle>Access Not Allowed</AlertTitle>
            </Alert>
        );
    }

    return (
        <>
            <NavBar />
            <Box p={5}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem colSpan={2}>
                        <Heading size="md" mb={4}>Day Trip Forms</Heading>
                        <Stack spacing={3}>
                            {dayTripForms.map(form => renderFormCard(form, 'student'))}
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Heading size="md" mb={4}>Travel Ethics Forms</Heading>
                        <Stack spacing={3}>
                            {ethicsForms.map(form => renderFormCard(form, 'ethics'))}
                        </Stack>
                    </GridItem>
                </Grid>
            </Box>
        </>
    );
};

export default FacultyDashboard;
