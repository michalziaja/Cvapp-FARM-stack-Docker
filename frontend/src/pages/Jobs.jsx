import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Tooltip,
  IconButton,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
  useColorModeValue,
  Text,
  Badge,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';
import { FaTrash, FaRegEdit } from 'react-icons/fa';
import axiosInstance from '../services/axios';
import { getColorSchemeForStatus, getColorSchemeForModalStatus } from '../components/Theme/StatusTheme';
import Cards from '../components/Cards/Cards';

export const Jobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [newOfferUrl, setNewOfferUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const [sortOrder, setSortOrder] = useState('desc'); // 
  const [sortBy, setSortBy] = useState( "created_at", 'job_position', "company_name", "site", "status"); // default sort by "created_at"

  const startIndex = (currentPage - 1) * entriesPerPage + 1;
  const endIndex = startIndex + entriesPerPage - 1;


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
        title: 'New Offer Added.',
        status: 'success',
        isClosable: true,
        duration: 1500,
      });
    } catch (error) {
      toast({
        position: 'top',
        title: 'Error.',
        status: 'error',
        isClosable: true,
        duration: 1800,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (data_id, newStatus) => {
    try {
      await axiosInstance.put(`data/${data_id}`, { status: newStatus });
      fetchJobsData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewOffer = async (data_id) => {
    try {
      const response = await axiosInstance.get(`data/${data_id}`);
      setJobDetails(response.data);
      setSelectedJob(data_id);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
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
        title: 'Offer Deleted.',
        status: 'error',
        isClosable: true,
        duration: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * entriesPerPage + 1;
    const endIndex = startIndex + entriesPerPage - 1;
    return jobsData.slice(startIndex - 1, endIndex);
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (columnName) => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    setSortBy(columnName);
    
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      if (sortBy === 'status') {
        const statusOrder = ['Saved', 'Send', 'Rejected', 'Accepted'];
        const indexA = statusOrder.indexOf(a.status);
        const indexB = statusOrder.indexOf(b.status);
        if (indexA !== -1 && indexB !== -1) {
          return sortOrder === 'asc' ? indexA - indexB : indexB - indexA;
        }
      } else {
        const valueA = a[sortBy].toUpperCase();
        const valueB = b[sortBy].toUpperCase();
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });
  };
  
  const getCurrentPageSortedData = () => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const sortedData = sortData(jobsData);
    return sortedData.slice(startIndex, endIndex);
  };

  return (
    
    <Box ml={{ base: 0, md: '240px' }} h="87vh" mr="30px" boxShadow="dark-lg" borderRadius="10px 10px 10px 10px" bgColor={useColorModeValue('gray.50', 'gray.600')}>
      <Box mt={5} p={5} colorcheme="white">
        <Cards jobsData={jobsData} fetchJobsData={fetchJobsData}/>
        <Box mb={5} mt={5}>
          <Box mt={12} display="flex">
            <InputGroup size='md' mr={2} ml={8} mt={2}>
              <InputLeftAddon fontSize='1.2em'>
                URL:
              </InputLeftAddon>
              <Input
                isInvalid
                focusBorderColor={useColorModeValue('teal.400', 'teal.300')}
                errorBorderColor={useColorModeValue('gray.400', 'gray.800')}
                placeholder="Paste Offer URL Here"
                variant="outline"
                colorScheme="teal"
                value={newOfferUrl}
                onChange={(e) => setNewOfferUrl(e.target.value)}
                mr={1}
                mb={5}
              />
            </InputGroup>
            <Button colorScheme="teal" onClick={handleAddOffer} mr={16} mt={2}>
              {loading ? <Spinner size="md" /> : 'ADD OFFER'}
            </Button>
          </Box>
        </Box>
        <Box ml={5} mr={8}>
        <Table variant="simple" colorScheme={useColorModeValue('blue.100', 'cyan.700')} size="sm">
          <Thead>
            <Tr>
              <Th width="3%"><Text fontSize="18">nr</Text></Th>
              <Th width="27%" onClick={() => handleSort('job_position')}><Text fontSize="18">Job Position</Text></Th>
              <Th width="15%" onClick={() => handleSort('company_name')}><Text fontSize="18">Company</Text></Th>
              <Th width="10%" onClick={() => handleSort('site')}><Text fontSize="18">Site</Text></Th>
              <Th width="10%" onClick={() => handleSort('created_at')}><Text fontSize="18">Added</Text></Th>
              <Th width="9%" onClick={() => handleSort('status')}><Text fontSize="18">Status</Text></Th>
              <Th width="7%"><Text fontSize="18">Link</Text></Th>
              <Th width="1%"><Text fontSize="18">Action</Text></Th>
            </Tr>
          </Thead>
          <Tbody>
            {getCurrentPageSortedData().map((job, index) => (
              <Tr key={job.data_id}>
                <Td>{(currentPage - 1) * entriesPerPage + index + 1}</Td>
                <Td>{job.job_position}</Td>
                <Td>{job.company_name}</Td>
                <Td>{job.site}</Td>
                <Td>{new Date(job.created_at).toLocaleDateString()}</Td>
                <Td>
                  <Select
                    variant="outline"
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
                  <Button as="a" variant="outline" href={job.offer_url} colorScheme="teal" target="_blank" size="sm">
                    <Text mr={2} ml={2}>Link</Text>
                  </Button>
                </Td>
                <Td>
                  <Tooltip label="View" placement="top">
                    <IconButton
                      variant="outline"
                      icon={<Icon as={FaRegEdit} />}
                      colorScheme="teal"
                      onClick={() => handleViewOffer(job.data_id)}
                      aria-label={`View offer ${job.data_id}`}
                      size="sm"
                      mr={2}
                    />
                  </Tooltip>
                  <Tooltip label="Delete" placement="top">
                    <IconButton
                      variant="outline"
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
        </Box>
        {/* Pagination */}
        <Box position="absolute" bottom="4" mr='5' >
          <Box display="flex" justifyContent="center" >
            <Button onClick={() => handlePageChange(currentPage - 1)} 
              isDisabled={currentPage === 1}
              bg={useColorModeValue('gray.200', 'gray.700')}>
              Previous
            </Button>
            <Text fontSize="26" mx={4}>
              {currentPage}
            </Text>
            <Button onClick={() => handlePageChange(currentPage + 1)} 
              isDisabled={getCurrentPageData().length < entriesPerPage}
              bg={useColorModeValue('gray.200', 'gray.700')}
              >
              Next
            </Button>
          </Box>
        </Box>
        
        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              {selectedJob && jobDetails && (
                <>
                  <Heading mb={2} mt={8}>
                    {jobDetails.job_position}
                  </Heading>
                  <Heading size="md" mb={8}>
                    <Badge fontSize="0.9em" variant="solid" colorScheme={getColorSchemeForModalStatus(jobDetails.status)}>
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
