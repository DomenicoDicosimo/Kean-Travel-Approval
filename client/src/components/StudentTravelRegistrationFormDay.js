import React, { useState } from 'react';
import NavBar from "./NavBar";
import {
    Box,
    Input,
    FormControl,
    FormLabel,
    Button,
    Flex,
    Stack,
    HStack

  } from "@chakra-ui/react";

export default function Forms() {
 
  const [formData, setFormData] = useState({
    event_name: '',
    host_organization: '',
    departure_time: '',
    approximate_return_time: '',
    minimum_age_requirement: '',
    first_name: '',
    last_name: '',
    kuid: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    current_address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/submit-student-travel-registration-form-day', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };


  return (
    <>
      <NavBar />
      <Box p={4}>
        <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="event_name">Event Name</FormLabel>
                <Input type="text" id="event_name" name="event_name" placeholder="Event Name" onChange={handleInputChange} value={formData.event_name} />
              </FormControl>
              {/* <FormControl isRequired>
                <FormLabel htmlFor="date">Date</FormLabel>
                <Input type="date" id="date" name="date" onChange={handleInputChange} />
              </FormControl> */}
            </HStack>

            <FormControl >
            <FormControl isRequired>
                <FormLabel htmlFor="host_organization">Host Organization/Department</FormLabel>
                <Input type="text" id="host_organization" name="host_organization" placeholder="Host/Organization" onChange={handleInputChange} value={formData.host_organization} />
              </FormControl>
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="departure_time">Departure Time</FormLabel>
                <Input type="datetime-local" id="departure_time" name="departure_time" placeholder="Departure Time" onChange={handleInputChange} value={formData.departure_time} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="approximate_return_time">Approximate Return Time</FormLabel>
                <Input type="datetime-local" id="approximate_return_time" name="approximate_return_time" placeholder="Approximate Return Time" onChange={handleInputChange} value={formData.approximate_return_time} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="minimum_age_requirement">Minimum Age Requirement</FormLabel>
                <Input type="text" id="minimum_age_requirement" name="minimum_age_requirement" placeholder="Minimum Age Requirement" onChange={handleInputChange} value={formData.minimum_age_requirement} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input type="text" id="first_name" name="first_name" placeholder="First Name" onChange={handleInputChange} value={formData.first_name} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input type="text" id="last_name" name="last_name" placeholder="Last Name" onChange={handleInputChange} value={formData.last_name} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="kuid">KUID</FormLabel>
                <Input type="text" id="kuid" name="kuid" placeholder="KUID" onChange={handleInputChange} value={formData.kuid} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input type="email" id="email" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                <Input type="text" id="phone_number" name="phone_number" placeholder="Phone Number" onChange={handleInputChange} value={formData.phone_number} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="date_of_birth">Date of Birth</FormLabel>
                <Input type="date" id="date_of_birth" name="date_of_birth" onChange={handleInputChange} value={formData.date_of_birth} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="current_address">Current Address</FormLabel>
                <Input type="text" id="current_address" name="current_address" placeholder="Current Address" onChange={handleInputChange} value={formData.current_address} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input type="text" id="city" name="city" placeholder="City" onChange={handleInputChange} value={formData.city} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="state">State</FormLabel>
                <Input type="text" id="state" name="state" placeholder="State" onChange={handleInputChange} value={formData.state} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="zip">ZIP Code</FormLabel>
                <Input type="text" id="zip" name="zip" placeholder="ZIP Code" onChange={handleInputChange} value={formData.zip} />
              </FormControl>
            </HStack>
            <Flex justify="space-between">
              <Button type="submit" colorScheme="teal">Submit</Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </>
  );
}
