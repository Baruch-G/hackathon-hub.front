import React, { useEffect, useState } from 'react';
import './Footer.css';
import { AppBar, BottomNavigation, Box, Divider } from '@mui/material';
import { HackathonTab, tabs } from './Tabs';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(
    tabs[0].children.findIndex((tab) => tab.path === location.pathname)
  );

  useEffect(() => {
    const pathIndex = tabs[0].children.findIndex((tab) => tab.path === location.pathname);
    if (value !== pathIndex) {
      setValue(pathIndex)
    }
  }, [location])

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
                  "&.Mui-selected": { color: "#054475" },
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
