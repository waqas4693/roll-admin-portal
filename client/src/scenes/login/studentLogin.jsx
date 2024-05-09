import React, { useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import logoImage from '../../assets/logo.png' // Import the image here
import url from '../../../src/config/server-url'

const defaultTheme = createTheme()

const StudentLogin = ({ handleAuthentication }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post(url + 'api/studentLogin/loginUsers', {
        email,
        password
      })
      
      localStorage.setItem('email', response.data.user.email)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.user.role)
      localStorage.setItem('_id', response.data.user._id)
      localStorage.setItem('admin_id', response.data.userData._id)

      const userRole = response.data.user.role

      if (userRole === 'admin') {
        localStorage.setItem('admin_name', response.data.userData.adminname)
      } else if (userRole === 'student') {
        localStorage.setItem('student_name', response.data.userData.studentName)
      } else if (userRole === 'superAdmin') {
        localStorage.setItem(
          'superadmin_name',
          response.data.userData.superadminname
        )
      }

      handleAuthentication(true) // Authenticate the user after successful login
    } catch (error) {
      setError('Login failed. Please check your email and password.')
      console.error(error)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar src={logoImage} sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component='h1'
              variant='h5'
              style={{ fontWeight: 'bold' }}
            >
              EduSupplements
            </Typography>

            <Box
              // component='form'
              // noValidate
              // onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              {error && (
                <Typography
                  variant='body2'
                  color='error'
                  align='center'
                  style={{ marginBottom: '15px' }}
                >
                  {error}
                </Typography>
              )}
              <TextField size='small'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField size='small'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default StudentLogin