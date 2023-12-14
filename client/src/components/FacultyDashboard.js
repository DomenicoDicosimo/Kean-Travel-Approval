import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { useUser } from '@clerk/clerk-react';
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Alert,
  AlertIcon,
  AlertTitle,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import DisplayForms from './displayForms.js';

const FacultyDashboard = () => {
  const { user, isLoaded } = useUser();
  const [dayTripForms, setDayTripForms] = useState([]);
  /* const [ethicsForms, setEthicsForms] = useState([]); */
  const [userRole, setUserRole] = useState(null);
  const [isFetchingRole, setIsFetchingRole] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isLoaded && user) {
      axios
        .get(`http://127.0.0.1:5000/get-user-role?user_id=${user.id}`)
        .then((response) => {
          setUserRole(response.data.role);
          if (response.data.role === 'Faculty') {
            axios
              .get('http://127.0.0.1:5000/student-travel-registration-form-day')
              .then((res) => setDayTripForms(res.data))
              .catch((err) => console.error('Error fetching student forms:', err));

            /*   axios.get('http://127.0.0.1:5000/travel-authorization-forms')
                        .then(res => setEthicsForms(res.data))
                        .catch(err => console.error('Error fetching ethics forms:', err)); */
          }
        })
        .catch((error) => console.error('Error fetching user role:', error))
        .finally(() => setIsFetchingRole(false));
    } else if (isLoaded) {
      setIsFetchingRole(false);
    }
  }, [user, isLoaded]);

  const handleFormClick = (form) => {
    setSelectedForm(form);
    onOpen();
  };

  const renderFormCard = (form, type) => {
    //hard coded color
    const colorScheme = form.status === 'Approved' ? 'green' : 'yellow';

    return (
      <Card key={form.id} p={5} shadow="md" borderWidth="1px" onClick={() => handleFormClick(form)}>
        <VStack align="start">
          <Text fontWeight="bold">{form.title}</Text>
          <Text fontSize="sm">{type === 'Student' ? form.first_name : form.name}</Text>
          <Text fontSize="sm">{form.description}</Text>
          <HStack spacing={4}>
            <Tag colorScheme={type === 'Student' ? 'blue' : 'green'}>
              {type === 'Student' ? 'Day Trip Form' : 'Ethics Form'}
            </Tag>
            {/* Hard-coded color display until we get status from table*/}
            <Tag colorScheme={colorScheme}>{colorScheme === 'yellow' ? 'Pending' : 'Approved'}</Tag>
          </HStack>
        </VStack>
      </Card>
    );
  };

  if (!isLoaded || isFetchingRole) {
    return (
      <Box p={5}>
        <Text>Checking access permissions...</Text>
      </Box>
    );
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
            <Heading size="md" mb={4}>
              Day Trip Forms
            </Heading>
            <Stack spacing={3}>{dayTripForms.map((form) => renderFormCard(form, 'Student'))}</Stack>
          </GridItem>
          <GridItem colSpan={2}>
            {/*  <Heading size="md" mb={4}>Travel Ethics Forms</Heading> */}
            <Stack spacing={3}>
              {/*   {ethicsForms.map(form => renderFormCard(form, 'ethics'))} */}
            </Stack>
          </GridItem>
        </Grid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent maxW="80vw" maxH="80vh" overflow="auto">
          {' '}
          {/* Custom size */}
          <ModalHeader>Form Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DisplayForms formData={selectedForm} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FacultyDashboard;
