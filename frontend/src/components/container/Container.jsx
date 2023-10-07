import React, { useEffect, useState } from 'react'
import './container.css'
import PostBar from '../postBar/PostBar'
import Card from '../card/Card'
import apiLink from '../../pages/apiLink/apiLink'
import Spinner from '../spinner/Spinner'

const Container = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const [error, setError] = useState();
    const [postData, setPostData] = useState([]);
    const [userData, setUserData] = useState();
    
    useEffect(() => {
        const fetchAllPost = async () => {
            console.log('Get')
            try {
                if (localStorage.getItem("token")) {
                    const res = await fetch(`${apiLink}/post/fetchAllDetails`, {
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
                        console.log(postData);

                    } else {
                        setIsError(true);
                    }

                    if (res.status === 404) {
                        setError(resData.error);
                        setIsError(true);

                    }

                } else {

                    const res = await fetch(`${apiLink}/post/fetchAll`, {
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
                        setIsLoading(false);
                        console.log(postData);

                    } else {
                        setIsError(true);
                    }

                    if (res.status === 404) {
                        setError(resData.error);
                        setIsError(true);

                    }
                }

            } catch (err) {
                console.log(err)
            }
        }

        fetchAllPost();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='container'>
            <PostBar />
            {isLoading && <Spinner />}
            {isError && error ? <p>{error}</p> : null}
            {!isError && postData.map((post) => {
                return <Card key={post._id} post={post} userData={userData} />
            })}
        </div>
    )
}

export default Container
