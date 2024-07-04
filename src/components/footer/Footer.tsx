import React, { useState } from 'react'
import "./Footer.css"
import { AppBar, BottomNavigation, Box, Divider } from '@mui/material';
import { HackathonTab, tabs } from './Tabs';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(
    tabs.findIndex((tab) => tab.path === location.pathname)
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <span className="footer">
          <Divider />
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {tabs[0].children.map((tab, index) => (
              tab.icon &&
              <MuiBottomNavigationAction
                sx={{
                  bgcolor: "white",
                }}
                key={tab.path}
                icon={
                  <tab.icon
                    size="1.5rem"
                  />
                }
                onClick={() => navigate(tab.path ?? '')}
              />
            ))}
          </BottomNavigation>
        </span>
      </AppBar>
    </Box>
  )
}

export default Footer;


