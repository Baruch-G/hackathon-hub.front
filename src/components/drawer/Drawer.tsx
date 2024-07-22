import React, { Children, ReactNode } from 'react'
import Drawer from "@mui/material/Drawer";
import "./Drawer.css"
import { IoCloseSharp } from 'react-icons/io5';

interface SideDrrawerProps {
  open: boolean,
  // onClose: () => void;
  children: ReactNode
}

export const SideDrawer = (props: SideDrrawerProps) => {
  return (
    <Drawer
      anchor="left"
      className='side-drawer'
      open={props.open}
      // onClose={props.onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div className='drawer-content'>
      
        {props.children}
      </div>
    </Drawer>
  )
}
