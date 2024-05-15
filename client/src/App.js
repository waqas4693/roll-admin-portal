import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { themeSettings } from 'theme'
import Layout from 'scenes/layout'

// Screens Imports

import AddEntry from 'scenes/dataManagement/addEntry'
import ViewEntries from 'scenes/dataManagement/viewEntries'
import ViewWeaverNames from 'scenes/dataManagement/viewWeaverNames'
import SizedBasedReports from 'scenes/dataManagement/sizeBasedReports'

import Company from 'scenes/company/company'
import Finishing from 'scenes/finishing/finishing'
import Order from 'scenes/order/order'

function App () {
  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
              <Route element={<Layout />}>
                <Route path='/' element={<ViewEntries />} />

                <Route path='/addEntry' element={<AddEntry />} />
                <Route path='/viewEntries' element={<ViewEntries />} />
                <Route path='/sizeBasedReports' element={<SizedBasedReports />} />
                <Route path='/company' element={<Company />} />
                <Route path='/finishing' element={<Finishing />} />
                <Route path='/order' element={<Order />} />

                <Route path='/editEntry/:rollData' element={<AddEntry />} />
                <Route path='/viewWeaverNames/:weaverNamesArray' element={<ViewWeaverNames />} />
              </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App