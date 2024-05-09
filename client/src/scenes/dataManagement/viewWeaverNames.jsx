import React, { useState, useEffect } from 'react'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'

import { useParams } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, useTheme, useMediaQuery } from '@mui/material'

const ViewWeaverNames = () => {
  const { weaverNamesArray } = useParams()

  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const [weaverNames, setWeaverNames] = useState([])
  const theme = useTheme()
  const columnFlex = 1
  const columns = [
    { field: 'missPrint', headerName: 'Miss Print', flex: columnFlex },
    { field: 'missPick', headerName: 'Miss Pick', flex: columnFlex },
    { field: 'freshBag', headerName: 'Fresh Bag', flex: columnFlex },
    { field: 'weight', headerName: 'Weight', flex: columnFlex }
  ]

  useEffect(() => {
    if (weaverNamesArray) {
        const decodedWeaverNamesArray = JSON.parse(decodeURIComponent(weaverNamesArray))
        console.log('decodedWeaverNamesArray = ');
        console.log(decodedWeaverNamesArray)
        setWeaverNames(decodedWeaverNamesArray)
      }
  }, [])

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        <Header title='Weaver Names' />
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
            rows={weaverNames}
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

export default ViewWeaverNames
