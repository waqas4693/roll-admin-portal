import React, { useState, useEffect } from 'react'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Divider
} from '@mui/material'
import {
  ChevronLeft,
  PublicOutlined,
  GroupsOutlined
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'

const navItems = [
  { text: 'Add Entry', icon: <PublicOutlined />, path: '/addEntry' },
  { text: 'View Entries', icon: <GroupsOutlined />, path: '/viewEntries' },
  { text: 'Size Based Reports', icon: <GroupsOutlined />, path: '/sizeBasedReports' }

]

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname])

  const handleItemClick = (text, path) => {
    navigate(path)
    setActive(path.substring(1))
  }

  return (
    <Box component='nav'>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant='persistent'
          anchor='left'
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.special,
              boxSizing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth
            }
          }}
        >
          <Box width='100%'>
            <Box m='1.5rem 2rem 2rem 3rem'>
              <FlexBetween color='#FFFFFF'>
                <Box display='flex' alignItems='left' gap='0.5rem'>
                  <Typography variant='h4' fontWeight='bold'>
                    DataManagement
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List sx={{ paddingLeft: 0 }}>
              {navItems.map(({ text, icon, path }, index) => (
                <React.Fragment key={text}>
                  <ListItem>
                    <ListItemButton
                      onClick={() => handleItemClick(text, path)}
                      sx={{
                        backgroundColor: active === path.substring(1) ? theme.palette.secondary[300] : 'transparent',
                        color: active === path.substring(1) ? theme.palette.primary : theme.palette.secondary[100],
                        paddingLeft: 0
                      }}
                    >
                      <ListItemIcon sx={{ ml: '1rem', color: '#FFFFFF' }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: '#FFFFFF' }}
                        primary={text}
                      />
                    </ListItemButton>
                  </ListItem>
                  {index !== navItems.length - 1 && (
                    <Divider variant='middle' sx={{ backgroundColor: '#FFFFFF70' }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar