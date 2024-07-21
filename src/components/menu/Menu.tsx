
import { useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaUserAlt, FaUserShield } from 'react-icons/fa';
import { Box, Modal } from '@mui/material';
import Login from '../login/Login';
import { IoCloseSharp } from 'react-icons/io5';
import "./Menu.css"
import useUserStore from '../../state/UserStore';
import Register from '../register/Register';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

interface MenuProps {
    onClose: () => void
}

export default function Menu(props: MenuProps) {
    const [loginOpen, setLoginOpen] = useState(false);
    const [loginDisplay, setLoginDisplay] = useState(true);
    const user = useUserStore(store => store.user);
    const signOut = useUserStore(store => store.signOut);

    const onSignOutClicked = () => {
        signOut();
        props.onClose()
        setLoginDisplay(true)
    }

    return (
        <Box sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
                <MenuItem onClick={() => user ? onSignOutClicked() : setLoginOpen(true)}>
                    <ListItemIcon>
                        <FaUserAlt fontSize="18" />
                    </ListItemIcon>
                    <ListItemText>{user ? "Sign Out" : "Sign In"}</ListItemText>
                </MenuItem>
                {/* <MenuItem>
                    <ListItemIcon>
                        <FaUserShield fontSize="18" />
                    </ListItemIcon>
                    <ListItemText>Manage</ListItemText>
                </MenuItem> */}
            </MenuList>
            <Modal
                style={{ zIndex: 2001 }}
                open={loginOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description">
                <Box sx={style}>
                    <div className='close-popup-btn'>
                        <IoCloseSharp size={30} onClick={() => setLoginOpen(false)} />
                    </div>
                    {
                        loginDisplay ?
                            <Login onRegisterClicked={() => setLoginDisplay(false)} onConfirm={() => { setLoginOpen(false); props.onClose() }} /> :
                            <Register onLoginClicked={() => setLoginDisplay(true)} onConfirm={() => { setLoginOpen(false); props.onClose() }} />
                    }
                </Box>
            </Modal>
        </Box>
    );
}