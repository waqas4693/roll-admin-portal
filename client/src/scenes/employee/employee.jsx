import React, { useState, useRef } from 'react'
import url from 'config/server-url'
import axios from 'axios'
import PropTypes from 'prop-types'
import SaveIcon from '@mui/icons-material/Save'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CustomSnackbar from 'components/CustomSnackbar'

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

const Employee = () => {
  const snackbarRef = useRef()
  const [value, setValue] = useState(0)
  const [employee, setEmployee] = useState({
    name: '',
    fatherName: '',
    dob: '',
    cellNo: '',
    passportNo: '',
    passportStart: '',
    passportExpiry: '',
    aqamaId: '',
    aqamaStart: '',
    aqamaExpiry: '',
    workingDepartment: '',
    joiningDate: '',
    resigningDate: '',
    nationality: '',
    bankAccountNo: '',
    visaStatus: ''
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setEmployee({ ...employee, [name]: value })
  }

  const handleEmployeeSave = async () => {
    try {
      const formData = new FormData();
      Object.keys(employee).forEach(key => {
        formData.append(key, employee[key]);
      });

      const response = await axios.post(
        url + 'api/employee',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        snackbarRef.current.displaySnackBar('Employee Added', 'success')

        setEmployee({
          name: '',
          fatherName: '',
          dob: '',
          cellNo: '',
          passportNo: '',
          passportStart: '',
          passportExpiry: '',
          aqamaId: '',
          aqamaStart: '',
          aqamaExpiry: '',
          workingDepartment: '',
          joiningDate: '',
          resigningDate: '',
          nationality: '',
          bankAccountNo: '',
          visaStatus: ''
        });
      }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          centered
        >
          <Tab label='Add Employee' {...a11yProps(0)} />
          <Tab label='Edit Employee' {...a11yProps(1)} />
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
              <h2>Employee Details</h2>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Name'
                name='name'
                value={employee.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Father Name'
                name='fatherName'
                value={employee.fatherName}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='DOB'
                name='dob'
                value={employee.dob}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Cell No'
                name='cellNo'
                value={employee.cellNo}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Passport No'
                name='passportNo'
                value={employee.passportNo}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Passport Start'
                name='passportStart'
                value={employee.passportStart}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Passport Expiry'
                name='passportExpiry'
                value={employee.passportExpiry}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Aqama ID'
                name='aqamaId'
                value={employee.aqamaId}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Aqama Start'
                name='aqamaStart'
                value={employee.aqamaStart}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Aqama Expiry'
                name='aqamaExpiry'
                value={employee.aqamaExpiry}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Nationality'
                name='nationality'
                value={employee.nationality}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Bank Account No'
                name='bankAccountNo'
                value={employee.bankAccountNo}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Visa Status'
                name='visaStatus'
                value={employee.visaStatus}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Working Department'
                name='workingDepartment'
                value={employee.workingDepartment}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Employee Joining Date'
                name='joiningDate'
                value={employee.joiningDate}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size='small'
                label='Employee Resigning Date'
                name='resigningDate'
                value={employee.resigningDate}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<SaveIcon />}
                onClick={handleEmployeeSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Edit Employee
      </CustomTabPanel>
      <CustomSnackbar ref={snackbarRef} />
    </Box>
  )
}

export default Employee