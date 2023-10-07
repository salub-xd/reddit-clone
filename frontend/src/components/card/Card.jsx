import React, { useState } from 'react'
import './card.css'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    ModalContent,
    Modal,
    FormHelperText,
} from '@chakra-ui/react';
import {
    ArrowUpIcon,
    ArrowDownIcon,
    EditIcon,
    DeleteIcon
} from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import apiLink from '../../pages/apiLink/apiLink';
import { Tooltip } from '@chakra-ui/react';
import { postSchema } from '../../schemas';
import { useFormik } from 'formik';
const initialValues = { title: "", description: "" };

const Card = ({ post, userData, isAdmin }) => {

    const modal = useDisclosure();
    const modal1 = useDisclosure();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    
    // const navigate = useNavigate();
    const [updatedLikesPost, setUpdatedLikesPost] = useState();
    const [updatedPost, setUpdatedPost] = useState();
    let isToken = true;
    
    console.log('post ' + post.length)
    console.log(post._id);

    if (!localStorage.getItem("token")) {
        console.log("/login");
        // navigate('/login')
        isToken = false;
        console.log("/login");
    }

    const fetchLikes = async () => {
        console.log('Post likes')
        try {
            const res = await fetch(`${apiLink}/post/likes/${post._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
            })

            const resData = await res.json();
            console.log(resData);
            console.log(resData.likes);
            setUpdatedLikesPost(resData)

        } catch (err) {
            console.log(err);
        }
    };

    const editPost = async (title, description) => {
        console.log('Edit Post')
        try {
            const res = await fetch(`${apiLink}/post/${post._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description })
            })

            const resData = await res.json();
            console.log(resData);
            console.log(resData.postUser);

            if (resData.success) {
                setUpdatedPost(resData.postUser)
            }

        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = async () => {
        console.log('Delete Post')
        try {
            const res = await fetch(`${apiLink}/post/${post._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
            })

            const resData = await res.json();
            console.log(resData);
            console.log(resData.info);
            modal1.onClose();

            if (resData.success) {
                setUpdatedPost(null)
                window.location.reload();
            }

        } catch (err) {
            console.log(err);
        }
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: postSchema,
        onSubmit: (values, action) => {
            // console.log(values)
            editPost(values.title, values.description);
            action.resetForm();
            modal.onClose();

        }
    });

    return (
        <>

            <Modal finalFocusRef={finalRef} isOpen={modal1.isOpen} onClose={modal1.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        You really want to delete your post?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={modal1.onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' onClick={deletePost}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={modal.isOpen}
                onClose={modal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change your Display Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl id="title">
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='title' value={values.title} onChange={handleChange} onBlur={handleBlur} />
                            {errors.title && touched.title ? <FormHelperText color={'red'}>{errors.title}</FormHelperText> : null}
                        </FormControl>
                        <FormControl mt={4} id="description">
                            <FormLabel>Description</FormLabel>
                            <Input placeholder='description' value={values.description} onChange={handleChange} onBlur={handleBlur} />
                            {errors.description && touched.description ? <FormHelperText color={'red'}>{errors.description}</FormHelperText> : null}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button onClick={modal.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div className="cards">
                <div className="card">
                    <NavLink to={''}>
                        <div className="cardBox">
                            {isAdmin && (<> <div className='editIcon'>
                                <Tooltip label='Edit Post'><EditIcon color='blue.500' boxSize={5} onClick={modal.onOpen} /></Tooltip>
                            </div>
                                <div className='deleteIcon'>
                                    <Tooltip label='Delete Post'><DeleteIcon color='red.500' boxSize={5} onClick={modal1.onOpen} /></Tooltip>
                                </div></>)
                            }
                            <div className="cardText">
                                <NavLink>
                                    <img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" alt="" />
                                    <small>@{post.username || 'anonymous'}</small>
                                </NavLink>
                                <p><NavLink to={'https://www.google.com'} target='_blank'>{updatedPost?.title || post.title}</NavLink></p>
                                <p className='cardDesription'>{updatedPost?.title || post.description}</p>
                            </div>
                            {/* <div className="cardImg">
                                <img src="https://fastly.picsum.photos/id/429/200/300.jpg?hmac=6ShrHCg_ioSEwdK2j-TkxO08G50YITxb2h0Z42Y8piI" alt="" />
                            </div> */}
                            <div className="btn">
                                <NavLink to={!isToken && '/login'}>
                                    <button onClick={fetchLikes} className={updatedLikesPost ? updatedLikesPost?.updatedPost.likes.includes(userData?._id) ? `btnLiked` : '' : post.likes.includes(userData?._id) ? `btnLiked` : ''}><ArrowUpIcon /><small>{updatedLikesPost?.updatedPost.likes.length || post.likes?.length}</small></button>
                                    <button onClick={fetchLikes}><ArrowDownIcon /></button>
                                </NavLink>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Card
