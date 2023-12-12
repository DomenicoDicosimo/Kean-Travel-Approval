import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { Spinner } from '@chakra-ui/react';
import { useUser } from '@clerk/clerk-react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Heading,
  Flex,
  Container,
} from '@chakra-ui/react';

const UploadReceipt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user } = useUser();
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    if (user) {
      formData.append('user_id', user.id);
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload_receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const renderReceipt = (receipt) => {
    const fileExtension = receipt.file_path.split('.').pop().toLowerCase();
    const filename = receipt.file_path.split('\\').pop();
    if (['jpg', 'jpeg', 'png', 'pdf'].includes(fileExtension)) {
      return (
        <a
          href={`http://127.0.0.1:5000/uploads/${filename}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {filename}
        </a>
      );
    } else {
      return <span>Unsupported file format</span>;
    }
  };

  useEffect(() => {
    if (user) {
      const fetchReceipts = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://127.0.0.1:5000/get_receipts?user_id=${user.id}`);
          setReceipts(response.data.receipts);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching receipts:', error);
          setIsLoading(false);
        }
      };

      fetchReceipts();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" centerContent>
        <Flex direction={['column', 'column', 'row']} my={8} width="full" alignItems="start">
          <Box flex="1" pr={[0, 0, 6]}>
            <Heading mb={4}>Upload Receipt</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Receipt File</FormLabel>
                <Input type="file" onChange={handleFileChange} p={1} />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">
                Upload
              </Button>
            </form>
          </Box>

          {/* Show spinner when loading info */}
          <Box flex="1" pl={[0, 0, 6]} width="full">
            <Heading mb={4}>Uploaded Receipts</Heading>
            {isLoading ? (
              <Spinner />
            ) : receipts.length > 0 ? (
              <List spacing={3}>
                {receipts.map((receipt) => (
                  <ListItem key={receipt.id} boxShadow="base" p={4} rounded="md">
                    {renderReceipt(receipt)}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box>No receipts</Box>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default UploadReceipt;