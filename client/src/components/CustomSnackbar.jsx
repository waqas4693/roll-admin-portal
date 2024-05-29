import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const CustomSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  useImperativeHandle(ref, () => ({
    displaySnackBar (newMessage, newSeverity) {
      setMessage(newMessage)
      setSeverity(newSeverity)
      setOpen(true)
    }
  }))

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  )
})

export default CustomSnackbar
