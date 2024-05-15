import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Finishing = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box mt='1.5rem' mx='2.5rem' pb='3.5rem'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Finishing" />
        <Tab label="Search Existing Employee" />
      </Tabs>
    </Box>
  )
}

export default Finishing