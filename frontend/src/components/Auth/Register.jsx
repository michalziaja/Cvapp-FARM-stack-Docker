import signInImage from "../../assets/5signInImage.png";
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
import axiosInstance from "../../services/axios";

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await axiosInstance.post("/users/create", values);
      toast({
        position: 'top',
        title: "Account created successfully.",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      toast({
        position: 'top',
        title: `${err.response.data.detail}`,
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
      justifyContent="center"
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
        <Heading mb={6}>Register</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Email"
              background={useColorModeValue("gray.300", "gray.600")}
              type="email"
              size="lg"
              mt={6}
              {...register("email", {
                required: "This is required field",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.username}>
            <Input
              placeholder="Username"
              background={useColorModeValue("gray.300", "gray.600")}
              type="text"
              //variant="filled"
              size="lg"
              mt={6}
              {...register("username", {
                required: "This filed is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 24,
                  message: "Username must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <Input
              placeholder="Password"
              background={useColorModeValue("gray.300", "gray.600")}
              type="password"
              size="lg"
              mt={6}
              {...register("password", {
                required: "This is required field",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Password must be at most 24 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
            <Button 
            isLoading={isSubmitting}
            loadingText="Registration..."
            width="100%" 
            colorScheme="teal" 
            variant="outline" 
            mt={10}
            mb={2}
            type="submit"
            >
                Register
            </Button>
        </form>
            or
            <Button onClick={() => navigate("/login", {replace: true})} 
            width="100%" 
            colorScheme="teal" 
            variant="outline" 
            mt={2}
            mb={8}>
                Back to Login
            </Button>
            <ThemeToggler showLabel={true}/>
      </Flex>
    </Flex>
   
  );
};