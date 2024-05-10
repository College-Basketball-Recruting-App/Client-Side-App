import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { UserContext } from '@/context/userContext';
import { FiAlignJustify } from "react-icons/fi";
import "@/app/app.css";
import { UserProvider } from '@/context/userContext';

const LeftNavbar = ({}) => {
    const { user, handleSignout } = useContext(UserContext);
    const SignOutClick = () =>{
        handleSignout()
    }

    return (
        <UserProvider>
        <Navbar expand="lg" className="navLogo">
            {user && 
                <NavDropdown title={<span><FiAlignJustify size={72}/></span>} id="basic-nav-dropdown">
                    <NavDropdown.Item href={`/`} className='sideNavDropdownOption'>Home</NavDropdown.Item>
                    <NavDropdown.Item href={`/`} className='sideNavDropdownOption'>Top 100 Recruits</NavDropdown.Item>
                    <NavDropdown.Item href={`/Team`} className='sideNavDropdownOption'>{user.team}</NavDropdown.Item>
                    {!user.isCoach && 
                    <NavDropdown.Item href={`/Profile`} className='sideNavDropdownOption'>Profile</NavDropdown.Item>
                    }
                    {/* Corrected: Pass handleSignOut without invoking it */}
                    <NavDropdown.Item onClick={SignOutClick} className='sideNavDropdownOption'>Sign Out</NavDropdown.Item>
                </NavDropdown>
            }
        </Navbar>
        </UserProvider>
    );
};

export default LeftNavbar;
