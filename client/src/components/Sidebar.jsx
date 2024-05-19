import React, { Image, useState, useEffect } from 'react'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider
} from '@mui/material'
import EmployeeIcon from '@mui/icons-material/People'
import CompanyIcon from '@mui/icons-material/Storefront'
import FinishingReportsIcon from '@mui/icons-material/AssignmentTurnedIn'
import OrdersIcon from '@mui/icons-material/ShoppingCart'
import LoomsIcon from '@mui/icons-material/SettingsEthernet'
import MaterialIcon from '@mui/icons-material/Build'
import OrderTrackingIcon from '@mui/icons-material/AssignmentTurnedIn'
import ReportsIcon from '@mui/icons-material/Description'
import GalleryIcon from '@mui/icons-material/PhotoLibrary'
import DispatchIcon from '@mui/icons-material/LocalShipping'
import FlexBetween from './FlexBetween'
import CompanyLogo from '../assets/logo.jpg'

import { ChevronLeft, PublicOutlined } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { text: 'Employee', icon: <EmployeeIcon />, path: '/employee' },
  { text: 'Company', icon: <CompanyIcon />, path: '/company' },
  { text: 'Finishing', icon: <FinishingReportsIcon />, path: '/finishing' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/order' },
  { text: 'Looms', icon: <LoomsIcon />, path: '' },
  { text: 'Material', icon: <MaterialIcon />, path: '' },
  { text: 'Order Tracking', icon: <OrderTrackingIcon />, path: '' },
  { text: 'Reports', icon: <ReportsIcon />, path: '' },
  { text: 'Gallery', icon: <GalleryIcon />, path: '' },
  { text: 'Dispatch', icon: <DispatchIcon />, path: '' }
  // { text: 'View Entries', icon: <GroupsOutlined />, path: '/viewEntries' },
  // { text: 'Size Based Reports', icon: <GroupsOutlined />, path: '/sizeBasedReports' }
]

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile
}) => {
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
                  {/* <Typography variant='h4' fontWeight='bold'>
                    DataManagement
                  </Typography> */}
                  <img
                    src={CompanyLogo}
                    alt='Company Logo'
                    height='100%'
                    width='100%'
                  />
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
                        backgroundColor:
                          active === path.substring(1)
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          active === path.substring(1)
                            ? theme.palette.primary
                            : theme.palette.secondary[100],
                        paddingLeft: 0
                      }}
                    >
                      <ListItemIcon sx={{ ml: '1rem', color: '#FFFFFF' }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText sx={{ color: '#FFFFFF' }} primary={text} />
                    </ListItemButton>
                  </ListItem>
                  {index !== navItems.length - 1 && (
                    <Divider
                      variant='middle'
                      sx={{ backgroundColor: '#FFFFFF70' }}
                    />
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
