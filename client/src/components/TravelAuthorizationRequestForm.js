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
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    kean_id: '',
    title: '',
    location: '',
    email: '',
    ext: '',
    departure_time: '',
    return_date: '',
    destination: '',
    conference_name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/travel-authorization-reuqest-form', {
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
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input type="text" id="name" name="name" placeholder="Name" onChange={handleInputChange} value={formData.name} />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input type="text" id="address" name="address" placeholder="Address" onChange={handleInputChange} value={formData.address} />
            </FormControl>

            <HStack spacing={4}>
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

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="kean_id">Kean ID</FormLabel>
                <Input type="text" id="kean_id" name="kean_id" placeholder="Kean ID" onChange={handleInputChange} value={formData.kean_id} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input type="text" id="title" name="title" placeholder="Title" onChange={handleInputChange} value={formData.title} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input type="text" id="location" name="location" placeholder="Location" onChange={handleInputChange} value={formData.location} />
              </FormControl>
            </HStack>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input type="email" id="email" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="ext">Ext</FormLabel>
                <Input type="text" id="ext" name="ext" placeholder="Ext" onChange={handleInputChange} value={formData.ext} />
              </FormControl>
            </HStack>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="departure_time">Departure Time</FormLabel>
                <Input type="datetime-local" id="departure_time" name="departure_time" placeholder="Departure Time" onChange={handleInputChange} value={formData.departure_time} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="return_date">Return Date</FormLabel>
                <Input type="datetime-local" id="return_date" name="return_date" placeholder="Return Date" onChange={handleInputChange} value={formData.return_date} />
              </FormControl>
            </HStack>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="destination">Destination</FormLabel>
                <Input type="text" id="destination" name="destination" placeholder="Destination" onChange={handleInputChange} value={formData.destination} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="conference_name">Conference Name</FormLabel>
                <Input type="text" id="conference_name" name="conference_name" placeholder="Conference Name" onChange={handleInputChange} value={formData.conference_name} />
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
