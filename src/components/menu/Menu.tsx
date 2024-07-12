
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
// import zIndex from '@mui/material/styles/zIndex';

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

export default function Menu() {
    const [loginOpen, setLoginOpen] = useState(false);
    return (
        <Box sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
                <MenuItem onClick={() => setLoginOpen(true)}>
                    <ListItemIcon>
                        <FaUserAlt fontSize="18" />
                    </ListItemIcon>
                    <ListItemText>Sign In</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <FaUserShield fontSize="18" />
                    </ListItemIcon>
                    <ListItemText>Manage</ListItemText>
                </MenuItem>
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
                    <Login />
                </Box>
            </Modal>
        </Box>
    );
}