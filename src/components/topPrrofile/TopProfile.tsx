import React, { useState } from 'react'
import useUserStore from '../../state/UserStore';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Modal, Tooltip } from '@mui/material';

import { CiLogout } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import Register from '../register/Register';
import { IoCloseSharp } from 'react-icons/io5';
import { MdLockReset } from "react-icons/md";

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

const TopProfile = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [editAccountOpen, seteditAccountOpen] = useState(false)

    const {signOut, user} = useUserStore(); 

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        user ?
        <div className='top-profile'>
            <div>{user?.firstName}</div>
            {/* <img src={user.imgUrl} alt={`name`} className="top-profile-img" /> */}

            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>
                        <img src={user.imgUrl} alt={`name`} className="top-profile-img" />
                    </Avatar>
                </IconButton>
            </Tooltip>




            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                disableScrollLock
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    seteditAccountOpen(true);
                }}>
                    <ListItemIcon>
                        <FaUserEdit fontSize="small" />
                    </ListItemIcon>
                    Edit Account
                </MenuItem>
                <MenuItem onClick={() => {}}>
                    <ListItemIcon>
                        <MdLockReset fontSize="small" />
                    </ListItemIcon>
                    Reset password
                </MenuItem>
                <MenuItem onClick={signOut}>
                    <ListItemIcon>
                        <CiLogout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <Modal
                style={{ zIndex: 2001 }}
                open={editAccountOpen}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description">
                <Box sx={style}>
                    <div className='close-popup-btn'>
                        <IoCloseSharp size={30} onClick={() => seteditAccountOpen(false)} />
                    </div>
                    <Register editMode onLoginClicked={() => { }} onConfirm={() => { }} />
                </Box>
            </Modal>
        </div> : <></>
    )
}

export default TopProfile