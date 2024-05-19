import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

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
  const [value, setValue] = useState(0)
  const [employeeRolls, setEmployeeRolls] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [session, setSession] = useState('')
  const sessions = ['Morning', 'Evening']
  const employees = ['Employee 1', 'Employee 2', 'Employee 3']

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
      totalBags: '',
      weight: '',
      bopp: '',
      rollToRoll: '',
      laminationDamage: ''
    }
    setEmployeeRolls([...employeeRolls, newRoll])
  }

  const handleRollChange = (index, property, value) => {
    const updatedRolls = employeeRolls.map((roll, i) => {
      if (i === index) {
        return { ...roll, [property]: value }
      }
      return roll
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
              <DatePicker label='Pick Date' />
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
                {employee}
              </MenuItem>
            ))}
          </Select>

          <Button variant='contained' startIcon={<AddIcon />} onClick={addRoll}>
            Add Roll
          </Button>
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
                  variant='outlined'
                  value={roll.sizeWidth}
                  onChange={e =>
                    handleRollChange(index, 'sizeWidth', e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  size='small'
                  label='Height'
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
              <Grid item xs={2}>
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
            borderRadius: '5px',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center'
          }}
        >
          <Button variant='contained' startIcon={<SaveIcon />}>
            Submit
          </Button>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  )
}

export default Finishing