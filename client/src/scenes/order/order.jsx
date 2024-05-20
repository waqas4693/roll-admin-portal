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
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

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

const Order = () => {
  const [value, setValue] = useState(0)
  const [order, setOrder] = useState({
    companyName: '',
    size: '',
    quantity: '',
    colour: '',
    lamination: '',
    costPrice: '',
    salePrice: '',
    weight: '',
    print: '',
    description: ''
  })

  const [companies, setCompanies] = useState([
    'Company A',
    'Company B',
    'Company C'
  ])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setOrder({ ...order, [name]: value })
  }

  const handleSelectChange = e => {
    setOrder({ ...order, companyName: e.target.value })
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
          <Tab label='Add Order' {...a11yProps(0)} />
          <Tab label='Edit Order' {...a11yProps(1)} />
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
              <h2>Order Details</h2>
            </Grid>
            <Grid item xs={6}>
              <FormControl size='small' fullWidth>
                <InputLabel>Select Company</InputLabel>
                <Select
                  value={order.companyName}
                  label='Select Company'
                  onChange={handleSelectChange}
                >
                  {companies.map((company, index) => (
                    <MenuItem key={index} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Size'
                name='size'
                value={order.size}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Quantity'
                name='quantity'
                value={order.quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Colour'
                name='colour'
                value={order.colour}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Lamination'
                name='lamination'
                value={order.lamination}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Cost Price'
                name='costPrice'
                value={order.costPrice}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Sale Price'
                name='salePrice'
                value={order.salePrice}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Weight'
                name='weight'
                value={order.weight}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size='small'
                label='Print'
                name='print'
                value={order.print}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size='small'
                label='Description'
                name='description'
                value={order.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
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
        Edit Order
      </CustomTabPanel>
    </Box>
  )
}

export default Order
