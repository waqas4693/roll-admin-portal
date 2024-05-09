import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import url from '../../config/server-url.jsx'
const ContinueLogin = ({ handleAuthentication }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleLogin = async (token, email) => {
    // try {
    
      const response = await axios.post(url + 'api/studentLogin/continueLogin', {
        token,
        email,
      });
    console.log('response',response.message)

      if (response.status === 200) {
        console.log('we reached');
        // Redirect to the dashboard
        handleAuthentication(true);
        navigate('/dashboard');
      } 
    
    // } catch (error) {
    //   console.error('Error:', error.response.status);
    //   if (error.response.status === 403) {
    //     console.log('forbidden error')
    //     setOpenDialog(true); // Open the dialog
    //   }
    // }
  };

  useEffect(() => {
    handleLogin(localStorage.getItem('token'), localStorage.getItem('email'));
  }, []);

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      {/* <Link to="/admin-login" className="form-button">
        Admin
      </Link> */}
      <Link to="/student-login" className="form-button">
        Student
      </Link>
      

      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Session Has Been Expired "}</DialogTitle>
          <DialogTitle id="alert-dialog-title">{"Please Login again!!! "}</DialogTitle>
          <DialogActions>
          <Button style={{ color: "white" }} onClick={handleClose}>
  Close
</Button>

          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ContinueLogin;
