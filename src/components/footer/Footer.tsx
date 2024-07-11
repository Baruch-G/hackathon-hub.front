import React, { useState } from 'react';
import './Footer.css';
import { AppBar, BottomNavigation, Box, Divider } from '@mui/material';
import { HackathonTab, tabs } from './Tabs';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState(
    tabs[0].children.findIndex((tab) => tab.path === location.pathname)
  );

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
      <AppBar
      >
        <span className="footer">
          <Divider />
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {tabs[0].children.map((tab: HackathonTab, index: number) => (
              tab.icon &&
              <MuiBottomNavigationAction
                sx={{
                  "&.Mui-selected": { color: "#1A434E" },
                  bgcolor: 'white'
                }}
                key={tab.path}
                icon={
                  <tab.icon size="1.5rem" />
                }
                onClick={() => navigate(tab.path ?? '')}
              />
            ))}
          </BottomNavigation>
        </span>
      </AppBar>
    </Box>
  );
}

export default Footer;
