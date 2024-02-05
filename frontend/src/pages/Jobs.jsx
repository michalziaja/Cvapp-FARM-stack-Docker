import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardBody,
  Heading,
  Input,
  Button,
  Badge,
  Table,
  Text,
  InputGroup,
  InputLeftAddon,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Icon,
  Select,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { FaEye, FaTrash } from 'react-icons/fa';
import axiosInstance from "../services/axios";
import { getColorSchemeForStatus, getColorSchemeForModalStatus } from "../components/Theme/StatusTheme";
import Cards from '../components/Cards/Cards';


export const Jobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [newOfferUrl, setNewOfferUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);  
  const toast = useToast();


  const fetchJobsData = async () => {
    try {
      const response = await axiosInstance.get('data/');
      const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setJobsData(sortedData);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  const handleAddOffer = async () => {
    try {
      setLoading(true);
      const encodedUrl = encodeURIComponent(newOfferUrl);
      await axiosInstance.post(`selenium/get_url?url=${encodedUrl}`);
      fetchJobsData();
      setNewOfferUrl('');
      toast({
        position: 'top',
        title: "New Offer Added.",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
    } catch (error) {
      toast({
        position: 'top',
        title: "Error.",
        status: "error",
        isClosable: true,
        duration: 1800,
      });
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (data_id, newStatus) => {
    try {
      await axiosInstance.put(`data/${data_id}`, { status: newStatus });
      fetchJobsData();
    } catch (error) {
      console.error('Błąd podczas zmiany statusu:', error);
    }
  };

  const handleViewOffer = async (data_id) => {
    try {
      const response = await axiosInstance.get(`data/${data_id}`);
      setJobDetails(response.data);
      setSelectedJob(data_id);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów ogłoszenia:', error);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
    setJobDetails(null);
  };

  const handleDeleteOffer = async (data_id) => {
    try {
      await axiosInstance.delete(`data/${data_id}`);
      fetchJobsData();
      toast({
        position: 'top',
        title: "Offer Deleted.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    } catch (error) {
      console.error('Błąd podczas usuwania ofertowego:', error);
    }
  };

  return (
    <Box ml={{ base: 0, md: '240px' }} 
      h="87vh" mr="30px"
      
      boxShadow='dark-lg' 
      borderRadius="10px 10px 10px 10px" 
      bgColor={useColorModeValue("gray.50", "gray.600")}>
      <Box mt={5} p={5} colorcheme='white'>
        <Cards jobsData={jobsData} fetchJobsData={fetchJobsData}/>
        
        <Heading mb={4} mt={10}></Heading>
        <Box mb={5} mt={4} >
          {/* <Heading mb={6}>Job Offers</Heading> */}
          {/* <Badge mb={6} colorScheme='teal' variant='solid' ml='1' fontSize='2em'>Job Offers</Badge> */}
          
          
        
          <Box mt={3} display="flex">
            <InputGroup size='md'>
              <InputLeftAddon fontSize='1.2em'>
                URL:
              </InputLeftAddon>
              <Input
                isInvalid
                focusBorderColor={useColorModeValue("teal.400", "teal.300")}
                errorBorderColor={useColorModeValue("gray.400", "gray.800")}
                placeholder="Offer URL"
                variant="outline"
                colorScheme="teal"
                value={newOfferUrl}
                onChange={(e) => setNewOfferUrl(e.target.value)}
                mr={4}
                mb={5}
              />
            </InputGroup>
            <Button colorScheme="teal" onClick={handleAddOffer}>
              {loading ? <Spinner size="md" /> : 'ADD OFFER'}
            </Button>
          </Box>
        </Box>
        
        <Table variant="simple" colorScheme={useColorModeValue("blue.100", "cyan.700")} size="sm">
          <Thead>
            <Tr>
              <Th>nr</Th>
              <Th>Job Position</Th>
              <Th>Company</Th>
              <Th>Site</Th>
              <Th>Date Added</Th>
              <Th>Status</Th>
              <Th>Link</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobsData.map((job, index) => (
              <Tr key={job.data_id}>
                <Td>{index + 1}</Td>
                <Td>{job.job_position}</Td>
                <Td>{job.company_name}</Td>
                <Td>{job.site}</Td>
                <Td>{new Date(job.created_at).toLocaleDateString()}</Td>
                <Td>
                  <Select
                    variant='outline'
                    size="sm"
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.data_id, e.target.value)}
                    bg={getColorSchemeForStatus(job.status)}
                  >
                    <option value="Saved">Saved</option>
                    <option value="Send">Send</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </Select>
                </Td>
                
                <Td>
                  <Button
                    as="a"
                    variant='outline'
                    href={job.offer_url}
                    colorScheme="teal"
                    target="_blank"
                    size="sm"
                    //rel="noopener noreferrer"
                  >
                    Link
                  </Button>
                </Td>
                <Td>
                  <Tooltip label="View" placement="top">
                    <IconButton
                      variant='outline'
                      icon={<Icon as={FaEye} />}
                      colorScheme="teal"
                      onClick={() => handleViewOffer(job.data_id)}
                      aria-label={`View offer ${job.data_id}`}
                      size="sm"
                      mr={2}
                    />
                  </Tooltip>
                  <Tooltip label="Delete" placement="top">
                    <IconButton
                      variant='outline'
                      icon={<Icon as={FaTrash} />}
                      colorScheme="red"
                      onClick={() => handleDeleteOffer(job.data_id)}
                      aria-label={`Delete resume ${job.data_id}`}
                      size="sm"
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Offer Details</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              {selectedJob && jobDetails && (
                <>
                  <Heading mb={2} mt={8}>
                    {jobDetails.job_position}
                  </Heading>
                  <Heading size="md" mb={8}>
                    <Badge fontSize='0.9em' variant='solid' colorScheme={getColorSchemeForModalStatus(jobDetails.status)}>
                      {jobDetails.status}
                    </Badge>
                  </Heading>
                  <Box mb={1} fontSize="xl">
                    <strong>Company:</strong> {jobDetails.company_name}
                  </Box>
                  <Box mb={1} fontSize="xl">
                    <strong>Site:</strong> {jobDetails.site}
                  </Box>
                  <Box mb={1} fontSize="xl">
                    <strong>Date Added:</strong> {new Date(jobDetails.created_at).toLocaleDateString()}
                  </Box>
                  <Box mb={8} fontSize="xl">
                    <strong>Status Updated:</strong> {new Date(jobDetails.updated_at).toLocaleDateString()}
                  </Box>
                </>
              )}
            </ModalBody>

          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};