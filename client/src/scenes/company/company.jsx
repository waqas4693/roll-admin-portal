import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SaveIcon from '@mui/icons-material/Save'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

function CustomTabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const Company = () => {
  const [value, setValue] = useState(0)
  const [company, setCompany] = useState({
    companyName: '',
    address: '',
    cellNo: '',
    email: '',
    vatNo: '',
    contactPersonNumber: '',
    companyStatus: '',
    startDate: '',
    endDate: ''
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setCompany({ ...company, [name]: value })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          centered
        >
          <Tab label='Add Company' {...a11yProps(0)} />
          <Tab label='Edit Company' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box
          sx={{
            marginY: '10px',
            padding: '20px',
            borderRadius: '5px',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Company Details</h2>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Company Name'
                name='companyName'
                value={company.companyName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Address'
                name='address'
                value={company.address}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Cell No'
                name='cellNo'
                value={company.cellNo}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Email'
                name='email'
                value={company.email}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='VAT No'
                name='vatNo'
                value={company.vatNo}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Contact Person Number'
                name='contactPersonNumber'
                value={company.contactPersonNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Company Status'
                name='companyStatus'
                value={company.companyStatus}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Start Date'
                name='startDate'
                value={company.startDate}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='End Date'
                name='endDate'
                value={company.endDate}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Edit Company
      </CustomTabPanel>
    </Box>
  )
}

export default Company
