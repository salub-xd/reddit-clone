import React, { useEffect, useState } from 'react'
import "./navbar.css"
import { NavLink } from "react-router-dom";
// import SearchIcon from '@mui/icons-material/Search';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import MenuIcon from '@mui/icons-material/Menu';
// import CancelIcon from '@mui/icons-material/Cancel';
import { Tooltip } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, EmailIcon, ChevronDownIcon, ExternalLinkIcon, ChatIcon, AddIcon, SettingsIcon }
    from '@chakra-ui/icons';
import apiLink from '../../pages/apiLink/apiLink';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [userClick, setUserClick] = useState(false);
    const [isUserLogin, setIsUserLogin] = useState(true);
    const [isUser, setIsUser] = useState();
    const [usernames, setUsernames] = useState();
    const [search, setSearch] = useState('');
    // const Navigate = useNavigate();

    const onChange = (event)=>{
        setSearch(event.target.value);
        console.log(event.target.value);
        console.log(search);
        if(usernames.includes(search)){
            console.log('includes '+search);
        }
        
    }

    useEffect(() => {
        // eslint-disable-next-line
        if (localStorage.getItem('token')) {
            // Navigate('/');
            setIsUserLogin(true);

            const fetchUser = async () => {
                console.log('Fetching user')
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
                    console.log(resData.userInfo.name);
                    // postLikes = resData.likes;
                    setIsUser(resData.userInfo.name)

                } catch (err) {
                    console.log(err);
                }
            };

            fetchUser();


        } else {
            setIsUserLogin(false);
        }

        const fetchUser = async () => {
            console.log('fetchUsers usernames')
            try {
                const res = await fetch(`${apiLink}/auth/fetchUsers`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const resData = await res.json();
                if (resData.success) {
                    console.log(resData);
                    console.log(resData.usernames);
                    setUsernames(resData.usernames)
                }

            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [])

    return (
        <>
            <header>
                <div id="navbar" className="navbar">
                    <nav>
                        <div className="logo"><NavLink to="/" ><img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" alt="" /></NavLink></div>
                        <ul>
                            <li className='rLogo'><NavLink to="/">reddit</NavLink></li>
                            <li className='rHome'><NavLink className={({ isActive }) => isActive ? "menu_active" : "non-active-class"} to="/">Home</NavLink></li>
                            <li className='rSearch'><input type="text" name='search' value={search} onChange={onChange} placeholder='Search Reddit' /></li>
                            <li className='rPopular'><NavLink className={({ isActive }) => isActive ? "menu_active" : "non-active-class"} to="/popular"><Tooltip label='Popular'>
                                <ExternalLinkIcon boxSize={5} /></Tooltip></NavLink></li>
                            <li className='rChat'><NavLink className={({ isActive }) => isActive ? "menu_active" : "non-active-class"} to="/chat"><Tooltip label='Chat'><ChatIcon boxSize={5} /></Tooltip></NavLink></li>
                        </ul>
                        {/* <NavLink to="/"> */}
                        <div onClick={() => { setClick(!click) }} className="toggle_btn">
                            {!click}  <div className='toggleIcons'>{!click ? <HamburgerIcon boxSize={6} color='black' /> : <CloseIcon boxSize={5} color='red.500' />}</div>
                        </div>
                        {/* </NavLink> */}
                    </nav>
                    <div className="right">
                        <ul>
                            <li><NavLink className={({ isActive }) => isActive ? "menu_active" : "non-active-class"} to="/post"><Tooltip label='Add Post'><AddIcon boxSize={5} /></Tooltip></NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "menu_active" : "non-active-class"} to="/notification"><Tooltip label='Notification'><EmailIcon boxSize={5} /></Tooltip></NavLink></li>

                            {/* <li><NavLink className={({ isActive }) => isActive ? "menu_active" : "non-active-class"} to=""><ChevronDownIcon />
                                <div className='iconSetting'><div><NavLink to='/user'>User</NavLink></div><div> <NavLink to='/setting'>Setting</NavLink></div></div>
                            </NavLink></li> */}
                            {isUserLogin ? <>
                                <li className='rUser' onClick={() => { setUserClick(!userClick) }} ><NavLink >
                                    <div className='iconSetting'>
                                        <div className="rUserLogo"><NavLink><img src="https://www.redditinc.com/assets/images/site/reddit-logo.png" alt="" /></NavLink></div>
                                        <div><NavLink>{isUser}</NavLink></div>
                                        <ChevronDownIcon /></div>
                                </NavLink></li>
                            </> : <>
                                <li className='rLogin'><NavLink className={({ isActive }) => isActive ? "menu_active" : "non-active-class"} to="/login">Login</NavLink></li>
                            </>
                            }
                        </ul>
                    </div>
                </div>
                <div className={userClick ? `userSettings open` : `userSettings`}>
                    <div className="box">
                        <NavLink to={'/profile'}><p onClick={() => { setUserClick(!userClick) }}><ExternalLinkIcon /><NavLink to={'/profile'}>Profile</NavLink></p></NavLink>
                        <NavLink to={'/settings'}> <p onClick={() => { setUserClick(!userClick) }}><SettingsIcon /><NavLink to={'/settings'}>Settings</NavLink></p></NavLink>
                    </div>
                </div>
                <div className={click ? `dropdown_menu open` : `dropdown_menu`}>

                    {/* <div className="pages">
                        <NavLink to="/"><small>Home</small></NavLink>
                        <NavLink to="/movies"><small>Movies</small></NavLink>
                        <NavLink to="/series"><small>Series</small></NavLink>
                        <NavLink to="/lastest"><small>Latest</small></NavLink>
                        <NavLink to="/mylist"><small>My List</small></NavLink>
                    </div> */}
                    <ul>
                        {/* <NavLink to="/search">
                            <SearchIcon />
                            <li className='rSearch'><input type="text" placeholder='Search Reddit' /></li>
                        </NavLink> */}
                        <NavLink to="/user">
                            <ExternalLinkIcon />
                            <li className="gt">Profile</li>
                        </NavLink>
                        <NavLink to="/post">
                            <AddIcon />
                            <li className="ct">Post</li>
                        </NavLink>
                        <NavLink to="/chat">
                            <ChatIcon />
                            <li className="ct">Chat</li>
                        </NavLink>
                        <NavLink to="/notications">
                            <EmailIcon />
                            <li className="ct">Notications</li>
                        </NavLink>
                        <NavLink to="/settings">
                            <SettingsIcon />
                            <li className="ct">Settings</li>
                        </NavLink>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Navbar
