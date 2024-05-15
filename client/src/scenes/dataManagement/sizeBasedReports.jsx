import React, { useState, useEffect } from 'react'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import axios from 'axios'
import url from '../../config/server-url.jsx'

import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, useTheme, useMediaQuery } from '@mui/material'

const SizedBasedReports = () => {
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const [rolls, setRolls] = useState([])
  const theme = useTheme()
  const columnFlex = 1
  const columns = [
    { field: 'size', headerName: 'Size', flex: columnFlex },
    { field: 'missPrint', headerName: 'Miss Print', flex: columnFlex },
    { field: 'missPick', headerName: 'Miss Pick', flex: columnFlex },
    { field: 'freshBag', headerName: 'Fresh Bag', flex: columnFlex },
  ]

  const fetchData = async () => {
    try {
      const response = await axios.get(url + 'api/roll/sizeBasedReports')
      const dataForGrid = Object.entries(response.data).map(([size, counts]) => ({
        id: size,
        size,
        ...counts
      }));

      setRolls(dataForGrid);

      console.log('Report Data Size Based = ');
      console.log(dataForGrid);

    } catch (error) {
      console.error('Error fetching rolls data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        <Header title='All Students' />
      </FlexBetween>

      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          '& > div': {
            gridColumn: isNonMediumScreens ? undefined : 'span 12'
          }
        }}
      >
        <Box
          gridColumn='span 12'
          gridRow='span 3'
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
            rows={rolls}
            columns={columns}
            getRowId={row => row._id}
            components={{
              Toolbar: GridToolbar
            }}
            autoHeight
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SizedBasedReports