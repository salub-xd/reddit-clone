import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Stack,
  Text,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  Modal,
  FormHelperText
} from '@chakra-ui/react';
import apiLink from '../apiLink/apiLink';
import Spinner from '../../components/spinner/Spinner';
import { useFormik } from 'formik';
import { updateSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
const initialValues = { name: "", username: "", email: "", password: "" };

function UserSettings() {

  const navigate = useNavigate();
  const modal1 = useDisclosure();
  const modal2 = useDisclosure();
  const modal3 = useDisclosure();
  const modal4 = useDisclosure();
  const modal5 = useDisclosure();
  const modal6 = useDisclosure();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [isError, setIsError] = useState(true);
  const [error, setError] = useState();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    localStorage.removeItem("token");
    navigate('/');
    window.location.reload();

  }

  useEffect(() => {
    const fetchDetails = async () => {
      console.log('Geting User Details')
      try {
        const res = await fetch(`${apiLink}/auth/fetch`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
          },
        })

        const resData = await res.json();
        console.log(resData);
        if (resData.success) {
          setIsError(false);
          setUserData(resData.userInfo);
          setIsLoading(false);
          console.log(userData)

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

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  const userUpdater = async (name, username, email, password) => {
    console.log('Updating User Details')
    try {

      const requestBody = {};
      if (name?.length >= 4) {
        requestBody.name = name;
      }
      if (username?.length >= 4) {
        requestBody.username = username;
      }
      if (email?.length >= 4) {
        requestBody.email = email;
      }
      if (password?.length >= 4) {
        requestBody.password = password;
      }

      console.log(requestBody?.username);

      const res = await fetch(`${apiLink}/auth/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: JSON.stringify(requestBody)
      })

      const resData = await res.json();
      console.log(resData);
      if (resData.success) {
        setIsError(false);
        setUserData(resData.userInfo);
        setIsLoading(false);
        console.log(userData)
        window.location.reload();
        navigate('/');

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

  const userDelete = async () => {
    console.log('Updating User Details')
    try {

      const res = await fetch(`${apiLink}/auth/${userData._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
      })

      const resData = await res.json();
      console.log(resData);
      if (resData.success) {
        setIsError(false);
        setUserData(resData.userInfo);
        setIsLoading(false);
        console.log(userData)
        logout();
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
    validationSchema: updateSchema,
    onSubmit: (values, action) => {
      console.log(values)
      userUpdater(values.name, values.username, values.email, values.password);
      action.resetForm();

    }
  });

  console.log(values);
  return (
    <>
      {/* <Button onClick={modal1.onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modal1.isOpen}
        onClose={modal1.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your Display Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id='name'>
              <FormLabel>Display Name</FormLabel>
              <Input type="text" placeholder='Display name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
              {errors.name && touched.name ? <FormHelperText color={'red'}>{errors.name}</FormHelperText> : null}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={modal1.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modal2.isOpen}
        onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your Username</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id='username'>
              <FormLabel>Username</FormLabel>
              <Input ref={initialRef} placeholder='Username' type="text" name='username' value={values.username} onChange={handleChange} onBlur={handleBlur} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={modal2.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modal3.isOpen}
        onClose={modal3.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your Email </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id='email'>
              <FormLabel>Email Address</FormLabel>
              <Input ref={initialRef} placeholder='Email Address' type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={modal3.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modal4.isOpen}
        onClose={modal4.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input ref={initialRef} placeholder='Password' type="text" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={modal4.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal finalFocusRef={finalRef} isOpen={modal5.isOpen} onClose={modal5.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You really want to logout?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={modal5.onClose}>
              No
            </Button>
            <Button colorScheme='red' onClick={logout}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal finalFocusRef={finalRef} isOpen={modal6.isOpen} onClose={modal6.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You really want to Delete Account?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={modal6.onClose}>
              No
            </Button>
            <Button colorScheme='red' onClick={userDelete}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isError && error ? <Stack alignItems={'center'}>
        <Text>{error}</Text>
        <Button mb={'2'} backgroundColor={'#bbdfff'} color={''} fontSize={'sm'} onClick={modal5.onOpen} height={'8'} >Logout</Button>
      </Stack> : <Box p={4} minH={'100vh'} my={5} display={'flex'} alignItems="center" flexDirection={'column'} maxW={'-webkit-max-content'}  >
        {isLoading ? <Spinner /> : (<>
          <Stack width="50%">
            <Heading as="h2" size="lg" mb={4} textAlign={'left'}>
              User Settings
            </Heading>
          </Stack>
          <Stack boxShadow='xs' p='6' rounded='md' bg='#e3f4ff' width="50%">
            <Stack pb={'5'} >
              <Text color={'gray'} textTransform={'uppercase'} fontSize={'sm'}>Display name</Text>
              <Text color={'black'} paddingBottom={'3'}>{userData?.name}</Text>
              <Button backgroundColor={'#bbdfff'} color={''} fontSize={'sm'} height={'8'} onClick={modal1.onOpen} >Edit</Button>
            </Stack>
            <Stack pb={'5'} >
              <Text color={'gray'} textTransform={'uppercase'} fontSize={'sm'}>Username</Text>
              <Text color={'black'} paddingBottom={'3'}>{userData?.username}</Text>
              <Button backgroundColor={'#bbdfff'} color={''} fontSize={'sm'} onClick={modal2.onOpen} height={'8'}>Edit</Button>
            </Stack>
            <Stack pb={'5'} >
              <Text color={'gray'} textTransform={'uppercase'} fontSize={'sm'}>Email</Text>
              <Text color={'black'} paddingBottom={'3'}>{userData?.email}</Text>
              <Button backgroundColor={'#bbdfff'} color={''} fontSize={'sm'} onClick={modal3.onOpen} height={'8'}>Edit</Button>
            </Stack>
            <Text color={'gray'} textTransform={'uppercase'} fontSize={'sm'}>Password</Text>
            <Button mb={'2'} backgroundColor={'#bbdfff'} color={''} fontSize={'sm'} onClick={modal4.onOpen} height={'8'} >Change Password</Button>
            <Text color={'gray'} textTransform={'uppercase'} fontSize={'sm'}>Logout</Text>
            <Button mb={'2'} backgroundColor={'#bbdfff'} color={''} fontSize={'sm'} onClick={modal5.onOpen} height={'8'} >Logout</Button>
            <Text color={'gray'} textTransform={'uppercase'} fontSize={'sm'}>Delete Account</Text>
            <Button mb={'2'} backgroundColor={'red.500'} color={'white'} fontSize={'sm'} onClick={modal6.onOpen} height={'8'} >Delete Account</Button>
          </Stack>
        </>)}
      </Box>}

    </>
  );
}

export default UserSettings;