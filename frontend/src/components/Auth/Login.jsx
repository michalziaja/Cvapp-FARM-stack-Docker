import signInImage from "../../assets/5signInImage.png";
import logo from '../../assets/logo6.png';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      toast({
        position: 'top',
        title: "Invalid email or password",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      position="relative"
      overflow="hidden"
    >
      <Flex
        position="absolute"
        top="1"
        left="1"
        right="1"
        bottom="1"
        zIndex="-1"
        //filter="blur(10px)"
        background={`url(${signInImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
      />
      
      <Flex
        direction="column"
        alignItems="center"
        background={useColorModeValue("gray.100", "gray.700")}
        p={10}
        rounded={10}
        zIndex="1"
      > 
        <Heading mb={6}>Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue('gray.300', 'gray.600')}
              type="email"
              size="lg"
              mt={6}
              {...register('email', {
                required: 'This is a required field',
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Password"
              background={useColorModeValue('gray.300', 'gray.600')}
              type="password"
              size="lg"
              mt={6}
              {...register('password', {
                required: 'This is a required field',
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            loadingText="Logging in..."
            width="100%"
            colorScheme="teal"
            variant="outline"
            mt={10}
            mb={2}
            type="submit"
          >
            Login
          </Button>
        </form>
        or
        <Button
          onClick={() => navigate('/register', { replace: true })}
          width="100%"
          colorScheme="teal"
          variant="outline"
          mt={2}
          mb={8}
        >
          Register
        </Button>
        <ThemeToggler showLabel={true} />
      </Flex>
    </Flex>
  );
};