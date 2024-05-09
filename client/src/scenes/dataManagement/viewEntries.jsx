import React, { useState, useEffect } from 'react'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import axios from 'axios'
import url from '../../config/server-url.jsx'

import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box, useTheme, useMediaQuery } from '@mui/material'

const ViewEntries = () => {
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const [rolls, setRolls] = useState([])
  const theme = useTheme()
  const columnFlex = 1
  const columns = [
    { field: 'size', headerName: 'Size', flex: columnFlex },
    { field: 'loomNo', headerName: 'Loom No', flex: columnFlex },
    { field: 'rollNo', headerName: 'Roll No', flex: columnFlex },
    { field: 'inPercentage', headerName: 'In Percentage', flex: columnFlex },
    { field: 'lamination', headerName: 'Lamination', flex: columnFlex },
    { field: 'status', headerName: 'status', flex: columnFlex },
    { field: 'bopp', headerName: 'BOPP', flex: columnFlex },
    { field: 'rToRMp', headerName: 'R To R Mp', flex: columnFlex },
    {
      field: 'viewWeaverNames',
      headerName: 'Weaver Names',
      sortable: false,
      renderCell: params => (
        <Link
          to={`/viewWeaverNames/${encodeURIComponent(JSON.stringify(params.row.weaverNames))}`}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            width: '100%',
            height: '30px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: '30px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          View
        </Link>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: params => (
        <>
          <Link
            to={`/editEntry/${encodeURIComponent(JSON.stringify(params.row))}`}
            style={{
              backgroundColor: 'green',
              color: 'white',
              width: '100%',
              height: '30px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              textAlign: 'center',
              lineHeight: '30px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            Edit
          </Link>

          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              width: '100%',
              height: '30px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              marginLeft: '15px'
            }}
            onClick={() => handleDeleteRoll(params.row)}
          >
            Delete
          </button>
        </>
      )
    }
  ]

  const fetchData = async () => {
    try {
      const response = await axios.get(url + 'api/roll')

      console.log('Response = ')
      console.log(response.data)

      setRolls(response.data)
    } catch (error) {
      console.error('Error fetching rolls data:', error)
    }
  }

  const handleDeleteRoll = async rowData => {
    await axios.delete(url + `api/roll/${rowData['_id']}`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        <Header title='Roll Records' />
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

export default ViewEntries