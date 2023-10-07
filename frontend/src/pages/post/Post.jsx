import { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Textarea,
  FormHelperText,
  Text
} from '@chakra-ui/react';
import apiLink from '../apiLink/apiLink';
import { useFormik } from 'formik';
import { postSchema } from '../../schemas';
const initialValues = { title: "", description: "" };

export default function Post() {
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState();

  const post = async (title, description) => {
    console.log('Post')
    try {

      const res = await fetch(`${apiLink}/post/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description })
      })

      const resData = await res.json();
      console.log(resData);
      if (resData.success) {
        setIsError(false);
        window.location.reload();
      } else {
        setIsError(true);
      }

      if (res.status === 404) {
        setError(resData.error);
        setIsError(true);
      }

    } catch (err) {
      console.log(err)
    }

  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: postSchema,
    onSubmit: (values, action) => {
      console.log(values)
      post(values.title, values.description);
      action.resetForm();

    }
  })

  return (
    <Flex
      minH={'100vh'}
      align={''}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} width={'xl'} py={12} px={6}>
        <Stack align={'left'}>
          <Heading fontSize={'4xl'}>Create Post</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input type="text" name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} placeholder='Title' />
              {errors.title && touched.title ? <FormHelperText color={'red'}>{errors.title}</FormHelperText> : null}
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea type="text" name='description' value={values.description} onChange={handleChange} onBlur={handleBlur} placeholder='Description (optional)' />
            </FormControl>
            {isError && error ? <Text color={'red'}>{error}</Text> : null}
            <Stack spacing={6}>
              <Button
                onClick={handleSubmit}
                bg={'#FF5700'}
                color={'white'}
                _hover={{
                  bg: '#FF8b60',
                }}>
                Post
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}