import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import { signUpSchema } from '../../schemas';
import apiLink from '../apiLink/apiLink';
const initialValues = { name: "", username: "", email: "", password: "" };

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(true);
    const [Error, setError] = useState("");
    const Navigate = useNavigate();

    const register = async (name, username, email, password) => {
        console.log("User Register");
        try {
            const res = await fetch(`${apiLink}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, username, email, password })
            });

            const resData = await res.json();
            console.log(res);
            console.log(resData);
            if (resData.success) {
                localStorage.setItem("token",(resData.jwtToken));
                setIsError(false);
                Navigate('/');
                window.location.reload();
            } else {
                setIsError(true);

            }

            // if (res.status === 201) {
            //     setMyUser(resData);
            //     setIsError(false)
            // } 
            if (res.status === 403 || res.status === 404) {
                setError(resData.error);
                setIsError(true);
            }

        } catch (err) {
            console.log(err);
            // setError(err);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            console.log(values)
            register(values.name, values.username, values.email, values.password);
            if (!isError) {
                action.resetForm();
            }
        }
    });
    console.log(values);
    console.log(errors);

    return (
        <Flex
            minH={'100vh'}
            align={''}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'left'}>
                    <Heading fontSize={'4xl'} textAlign={'left'}>
                        Sign up
                    </Heading>
                    {/* <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text> */}
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.name && touched.name ? <FormHelperText color={'red'}>{errors.name}</FormHelperText> : null}
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="username">
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" name='username' value={values.username} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.username && touched.username ? <FormHelperText color={'red'}>{errors.username}</FormHelperText> : null}
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email ? <FormHelperText color={'red'}>{errors.email}</FormHelperText> : null}
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && touched.password ? <FormHelperText color={'red'}>{errors.password}</FormHelperText> : null}
                        </FormControl>
                        {isError && Error ? <Text paddingTop={'3'} color={'red'}>{Error}</Text> : null}
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={handleSubmit}
                                loadingText="Submitting"
                                bg={'#FF5700'}
                                color={'white'}
                                _hover={{
                                    bg: '#FF8b60',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link color={'blue.400'}> <NavLink to='/login'>Login</NavLink> </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}