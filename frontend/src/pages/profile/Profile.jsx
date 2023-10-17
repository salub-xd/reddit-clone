import React, { useEffect, useState } from 'react'
import './profile.css'
import Card from '../../components/card/Card'
import apiLink from '../apiLink/apiLink'
import { Stack, Text } from '@chakra-ui/react'
import Spinner from '../../components/spinner/Spinner'

const Profile = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const [error, setError] = useState();
    const [userData, setUserData] = useState();
    const [postData, setPostData] = useState([]);
    const isAdmin = true;
    console.log('postData' + postData);
    useEffect(() => {
        const fetchDetails = async () => {
            console.log('Geting User Details')
            try {
                const res = await fetch(`${apiLink}/auth/fetchDetails`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem("token")
                    },
                })

                const resData = await res.json();
                console.log(resData);
                if (resData.success) {
                    console.log(resData.post);
                    setIsError(false);
                    setPostData(resData.post);
                    setUserData(resData.userInfo);
                    setIsLoading(false);
                    console.log(postData)

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

    return (
        <div className='profile-container'>
            {isLoading ? <Spinner /> : <Stack my={8} p={2} backgroundColor={'white'} shadow={8} minW={40} borderRadius={'full'}>
                <Text display={'flex'} justifyContent={'center'} textAlign={'center'} color={'red'} fontSize={20} p={1}  >{userData?.name}</Text>
                <Text textAlign={'center'} color={'gray'} fontSize={15} p={1} >@{userData?.username}</Text>
            </Stack>}
            {isError && error ? <p>{error}</p> : postData.length === 0 && <p>There are no posts</p>}
            {!isError && postData.map((post) => {
                return <Card key={post.id} post={post} isAdmin={isAdmin} />
            })}
        </div>
    )
}

export default Profile
