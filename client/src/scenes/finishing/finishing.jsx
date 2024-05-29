import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import {
  Tabs,
  Tab,
  Typography,
  Box,
  MenuItem,
  Select,
  Button,
  IconButton,
  TextField,
  Grid,
  useTheme
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon
} from '@mui/icons-material'
import CustomSnackbar from 'components/CustomSnackbar'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

import { DataGrid, GridToolbar } from '@mui/x-data-grid'

import url from 'config/server-url'

function CustomTabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      // style={{ backgroundColor: '#FFFFFF' }}
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

const Finishing = () => {
  const snackbarRef = useRef()
  const theme = useTheme()

  const columnFlex = 1
  const columns = [
    {
      field: 'sizeWidth',
      headerName: 'Size Width',
      flex: columnFlex,
      renderCell: params => params.row.sizeWidth
    },
    {
      field: 'sizeHeight',
      headerName: 'Size Height',
      flex: columnFlex,
      renderCell: params => params.row.sizeHeight
    },
    {
      field: 'loomNo',
      headerName: 'Loom No',
      flex: columnFlex,
      renderCell: params => params.row.loomNo
    },
    {
      field: 'rollNo',
      headerName: 'Roll No',
      flex: columnFlex,
      renderCell: params => params.row.rollNo
    },
    {
      field: 'color',
      headerName: 'Color',
      flex: columnFlex,
      renderCell: params => params.row.color
    },
    {
      field: 'lamination',
      headerName: 'Lamination',
      flex: columnFlex,
      renderCell: params => params.row.lamination
    },
    {
      field: 'printStatus',
      headerName: 'Print Status',
      flex: columnFlex,
      renderCell: params => params.row.printStatus
    },
    {
      field: 'missPrint',
      headerName: 'Miss Print',
      flex: columnFlex,
      renderCell: params => params.row.missPrint
    },
    {
      field: 'missPick',
      headerName: 'Miss Pick',
      flex: columnFlex,
      renderCell: params => params.row.missPick
    },
    {
      field: 'freshBags',
      headerName: 'Fresh Bags',
      flex: columnFlex,
      renderCell: params => params.row.freshBags
    },
    {
      field: 'totalBags',
      headerName: 'Total Bags',
      flex: columnFlex,
      renderCell: params => params.row.totalBags
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: columnFlex,
      renderCell: params => params.row.weight
    },
    {
      field: 'bopp',
      headerName: 'BOPP',
      flex: columnFlex,
      renderCell: params => params.row.bopp
    },
    {
      field: 'rollToRoll',
      headerName: 'Roll to Roll',
      flex: columnFlex,
      renderCell: params => params.row.rollToRoll
    },
    {
      field: 'laminationDamage',
      headerName: 'Lamination Damage',
      flex: columnFlex,
      renderCell: params => params.row.laminationDamage
    }
  ]

  const columns2 = [
    {
      field: 'size',
      headerName: 'Size',
      flex: columnFlex,
      renderCell: params => params.row.sizeWidth
    },
    {
      field: 'missPrint',
      headerName: 'Miss Print',
      flex: columnFlex,
      renderCell: params => params.row.sizeHeight
    },
    {
      field: 'missPick',
      headerName: 'Miss Pick',
      flex: columnFlex,
      renderCell: params => params.row.loomNo
    },
    {
      field: 'freshBags',
      headerName: 'Fresh Bags',
      flex: columnFlex,
      renderCell: params => params.row.rollNo
    },
    {
      field: 'weight',
      headerName: 'Weight',
      flex: columnFlex,
      renderCell: params => params.row.color
    },
    {
      field: 'bopp',
      headerName: 'BOPP',
      flex: columnFlex,
      renderCell: params => params.row.lamination
    },
    {
      field: 'rollToRoll',
      headerName: 'Roll To Roll',
      flex: columnFlex,
      renderCell: params => params.row.printStatus
    }
  ]

  const [value, setValue] = useState(0)
  const [employees, setEmployees] = useState([])
  const [employeeRolls, setEmployeeRolls] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [session, setSession] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const sessions = ['Morning', 'Evening']

  const addRoll = () => {
    const newRoll = {
      sizeWidth: '',
      sizeHeight: '',
      loomNo: '',
      rollNo: '',
      color: '',
      lamination: '',
      printStatus: '',
      missPrint: '',
      missPick: '',
      freshBags: '',
      totalBags: 0,
      weight: '',
      bopp: '',
      rollToRoll: '',
      laminationDamage: ''
    }
    setEmployeeRolls([...employeeRolls, newRoll])
  }

  // Tab 2 State Variables
  const [selectedDateReport, setSelectedDateReport] = useState(null)
  const [sessionReport, setSessionReport] = useState('')
  const [rollRecords, setRollRecords] = useState([])
  const [sizeBasedReport, setSizeBasedReport] = useState([])

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  const handleRollChange = (index, property, value) => {
    const updatedRolls = employeeRolls.map((roll, i) => {
      if (i === index) {
        return { ...roll, [property]: value }
      }
      return roll
    })

    updatedRolls.forEach(roll => {
      if (
        roll.missPrint !== '' &&
        roll.missPick !== '' &&
        roll.freshBags !== '' &&
        roll.bopp !== '' &&
        roll.rollToRoll !== ''
      ) {
        roll.totalBags =
          parseInt(roll.missPrint) +
          parseInt(roll.missPick) +
          parseInt(roll.freshBags) +
          parseInt(roll.bopp) +
          parseInt(roll.rollToRoll)
      }
    })

    setEmployeeRolls(updatedRolls)
  }

  const removeRoll = index => {
    setEmployeeRolls(employeeRolls.filter((_, i) => i !== index))
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSessionChange = event => {
    setSession(event.target.value)
  }

  const handleEmployeeChange = event => {
    setSelectedEmployee(event.target.value)
  }

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(url + 'api/employee')
      setEmployees(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      const rollsData = employeeRolls.map(roll => ({
        ...roll,
        date: selectedDate,
        session,
        employeeId: selectedEmployee
      }))

      const response = await axios.post(url + 'api/roll', rollsData)

      if(response.status === 200){
        setEmployeeRolls([])
        snackbarRef.current.displaySnackBar('Roll Records Inserted', 'success')
      }
    } catch (error) {
      console.error('Error sending rolls data:', error)
    }
  }

  // Tab 2 Functions
  const handleSessionReportChange = event => {
    setSessionReport(event.target.value)
  }

  const handleDateReportChange = date => {
    setSelectedDateReport(date)
  }

  const calculateSizeBasedReport = () => {
    const newSizeBasedReport = [...sizeBasedReport]

    rollRecords.forEach(roll => {
      const {
        sizeWidth,
        sizeHeight,
        missPrint,
        missPick,
        freshBags,
        weight,
        bopp,
        rollToRoll
      } = roll
      const size = `${sizeWidth}x${sizeHeight}`

      let sizeReportIndex = newSizeBasedReport.findIndex(
        report => report.size === size
      )

      if (sizeReportIndex === -1) {
        newSizeBasedReport.push({
          size: size,
          missPrint: parseInt(missPrint) || 0,
          missPick: parseInt(missPick) || 0,
          freshBags: parseInt(freshBags) || 0,
          weight: parseFloat(weight) || 0,
          bopp: parseInt(bopp) || 0,
          rollToRoll: parseInt(rollToRoll) || 0
        })
      } else {
        newSizeBasedReport[sizeReportIndex].missPrint +=
          parseInt(missPrint) || 0
        newSizeBasedReport[sizeReportIndex].missPick += parseInt(missPick) || 0
        newSizeBasedReport[sizeReportIndex].freshBags +=
          parseInt(freshBags) || 0
        newSizeBasedReport[sizeReportIndex].weight += parseFloat(weight) || 0
        newSizeBasedReport[sizeReportIndex].bopp += parseInt(bopp) || 0
        newSizeBasedReport[sizeReportIndex].rollToRoll +=
          parseInt(rollToRoll) || 0
      }
    })

    setSizeBasedReport(newSizeBasedReport)
  }

  const fetchRollRecords = async () => {
    if (!selectedDateReport || !sessionReport) {
      alert('Please select both a date and a session')
      return
    }

    try {
      const formattedDate = selectedDateReport.toISOString().split('T')[0] // Format the date to YYYY-MM-DD
      const response = await axios.get(url + 'api/roll', {
        params: { date: selectedDateReport, session: sessionReport }
      })
      setRollRecords(response.data)
      calculateSizeBasedReport()

      console.log('Size based report = ')
      console.log(...sizeBasedReport)
    } catch (error) {
      console.error('Error fetching roll records:', error)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    calculateSizeBasedReport()
  }, [rollRecords])

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='finishing tabs'
          centered
        >
          <Tab label='Finishing' {...a11yProps(0)} />
          <Tab label='Search Employee' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box
          sx={{
            padding: '20px',
            marginBottom: '10px',
            borderRadius: '5px',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Pick Date'
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={params => <TextField {...params} />}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Select
            size='small'
            value={session}
            onChange={handleSessionChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Pick Session' }}
          >
            <MenuItem value='' disabled>
              Pick Session
            </MenuItem>
            {sessions.map((session, index) => (
              <MenuItem key={index} value={session}>
                {session}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {employeeRolls.map((roll, index) => (
          <Box
            key={index}
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
              <Grid item xs={11.5}>
                <h2>Roll Details</h2>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton
                  aria-label='delete'
                  sx={{ color: '#ff0000' }}
                  onClick={() => removeRoll(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  size='small'
                  label='Width'
                  type='number'
                  variant='outlined'
                  value={roll.sizeWidth}
                  onChange={e =>
                    handleRollChange(index, 'sizeWidth', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} container justify='center' alignItems='center'>
                <span
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    width: '100%',
                    fontSize: '1rem'
                  }}
                >
                  X
                </span>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  size='small'
                  label='Height'
                  type='number'
                  value={roll.sizeHeight}
                  onChange={e =>
                    handleRollChange(index, 'sizeHeight', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  size='small'
                  label='Loom No'
                  value={roll.loomNo}
                  onChange={e =>
                    handleRollChange(index, 'loomNo', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  size='small'
                  label='Roll No'
                  value={roll.rollNo}
                  onChange={e =>
                    handleRollChange(index, 'rollNo', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  size='small'
                  label='Color'
                  value={roll.color}
                  onChange={e =>
                    handleRollChange(index, 'color', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  label='Lamination'
                  value={roll.lamination}
                  onChange={e =>
                    handleRollChange(index, 'lamination', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  label='Print Status'
                  value={roll.printStatus}
                  onChange={e =>
                    handleRollChange(index, 'printStatus', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  type='number'
                  label='Miss Print'
                  value={roll.missPrint}
                  onChange={e =>
                    handleRollChange(index, 'missPrint', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  type='number'
                  label='Miss Pick'
                  value={roll.missPick}
                  onChange={e =>
                    handleRollChange(index, 'missPick', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  type='number'
                  label='Fresh Bags'
                  value={roll.freshBags}
                  onChange={e =>
                    handleRollChange(index, 'freshBags', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  label='Weight'
                  value={roll.weight}
                  onChange={e =>
                    handleRollChange(index, 'weight', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  type='number'
                  label='BOPP'
                  value={roll.bopp}
                  onChange={e =>
                    handleRollChange(index, 'bopp', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  size='small'
                  type='number'
                  label='Roll to Roll'
                  value={roll.rollToRoll}
                  onChange={e =>
                    handleRollChange(index, 'rollToRoll', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size='small'
                  label='Total Bags'
                  value={roll.totalBags}
                  onChange={e =>
                    handleRollChange(index, 'totalBags', e.target.value)
                  }
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size='small'
                  label='Lamination Damage'
                  value={roll.laminationDamage}
                  onChange={e =>
                    handleRollChange(index, 'laminationDamage', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box
          sx={{
            padding: '20px',
            marginBottom: '10px',
            borderRadius: '5px',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Select
            size='small'
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Employee' }}
          >
            <MenuItem value='' disabled>
              Select Employee
            </MenuItem>
            {employees.map((employee, index) => (
              <MenuItem key={index} value={employee}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>

          <Button variant='contained' startIcon={<AddIcon />} onClick={addRoll}>
            Add Roll
          </Button>
        </Box>
        <Box
          sx={{
            padding: '20px',
            borderRadius: '5px',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center'
          }}
        >
          <Button
            variant='contained'
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <>
          <h1>Roll Records</h1>
          <Box
            sx={{
              padding: '20px',
              marginBottom: '10px',
              borderRadius: '5px',
              position: 'relative',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Pick Date'
                value={selectedDateReport}
                onChange={handleDateReportChange}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Select
              size='small'
              value={sessionReport}
              onChange={handleSessionReportChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Pick Session' }}
            >
              <MenuItem value='' disabled>
                Pick Session
              </MenuItem>
              {sessions.map((session, index) => (
                <MenuItem key={index} value={session}>
                  {session}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant='contained'
              color='primary'
              startIcon={<SaveIcon />}
              onClick={fetchRollRecords}
            >
              Generate Report
            </Button>
          </Box>
          <Box
            my='20px'
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                boxShadow: 4,
                backgroundColor: theme.palette.background.normal
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.primary.main,
                color:
                  theme.palette.mode === 'light'
                    ? '#FFFFFF'
                    : theme.palette.background.main,
                border: 'none',
                borderRadius: 0,
                boxShadow: 5
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme.palette.background
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme.palette.background,
                color: theme.palette.secondary[100],
                borderTop: 'none'
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `${theme.palette.secondary} !important`
              }
            }}
          >
            <DataGrid
              autoHeight
              rows={rollRecords}
              columns={columns}
              getRowId={row => row._id}
              components={{
                Toolbar: GridToolbar
              }}
            />
          </Box>
          <h3>Size Based Report</h3>
          <Box
            my='20px'
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                boxShadow: 4,
                backgroundColor: theme.palette.background.normal
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.primary.main,
                color:
                  theme.palette.mode === 'light'
                    ? '#FFFFFF'
                    : theme.palette.background.main,
                border: 'none',
                borderRadius: 0,
                boxShadow: 5
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme.palette.background
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme.palette.background,
                color: theme.palette.secondary[100],
                borderTop: 'none'
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `${theme.palette.secondary} !important`
              }
            }}
          >
            <DataGrid
              autoHeight
              rows={sizeBasedReport}
              columns={columns2}
              getRowId={row => row.size}
              components={{
                Toolbar: GridToolbar
              }}
            />
          </Box>
        </>
      </CustomTabPanel>
      <CustomSnackbar ref={snackbarRef} />
    </Box>
  )
}

export default Finishing
