import apiLink from '../apiLink/apiLink';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    useColorModeValue,
    Text,
    FormHelperText
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas';
import { useState } from 'react';
const initialValues = { email: "", password: "" };

export default function Login() {
    const [isError, setIsError] = useState(true);
    const [Error, setError] = useState("");
    const Navigate = useNavigate();
    const login = async (email, password) => {
        console.log("login");
        try {
            const res = await fetch(`${apiLink}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });
            const resData = await res.json();
            console.log(res);
            console.log(resData);
            if (resData.success) {
                localStorage.setItem("token", (resData.jwtToken));
                setIsError(false);
                Navigate('/');
                window.location.reload();
            } else {
                setIsError(true);

            }
            
            if (res.status === 403 || res.status === 404) {
                setError(resData.error);
                setIsError(true);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, action) => {
            console.log(values)
            login(values.email, values.password);
            if (!isError) {
                action.resetForm();
            }
        }
    });

    return (
        <Flex
            minH={'100vh'}
            align={''}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} width={'400px'} py={12} px={6}>
                <Stack align={'left'}>
                    <Heading fontSize={'4xl'}>Sign In</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4} >
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email ? <FormHelperText color={'red'}>{errors.email}</FormHelperText> : null}
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            {errors.password && touched.password ? <FormHelperText color={'red'}>{errors.password}</FormHelperText> : null}
                            {isError && Error ? <Text paddingTop={'5'} color={'red'}>{Error}</Text> : null}
                        </FormControl>
                        <Stack spacing={6}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'center'}
                                justify={'center'}>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                onClick={handleSubmit}
                                type='submit'
                                bg={'#FF5700'}
                                color={'white'}
                                _hover={{
                                    bg: '#FF8b60',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={4}>
                            <Text align={'center'}>
                                New to Redit? <Link color={'blue.400'}> <NavLink to='/register'>Register</NavLink> </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}