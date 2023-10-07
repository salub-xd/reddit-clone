import React from 'react'
import { NavLink } from 'react-router-dom'
import './postBar.css'
import { Tooltip } from '@chakra-ui/react'
import { EditIcon, LinkIcon } from '@chakra-ui/icons';

const PostBar = () => {
    return (
        <div className='postBar'>
            <div className="bar">
                <div className="userDetails">
                    <img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" alt="" />
                </div>
                <div className="formPost">
                    <NavLink to={'/post'}>
                        <input type="text" placeholder='Create Post' />
                    </NavLink>
                </div>
                <div className="formBtn">
                    <NavLink to={'/post'}>
                        <Tooltip label='Create Media Post'><button> <EditIcon boxSize={5} /> </button></Tooltip>
                    </NavLink>
                    <NavLink to={'/post'}>
                        <Tooltip label='Create Link Post'><button> <LinkIcon boxSize={5} /> </button></Tooltip>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default PostBar
