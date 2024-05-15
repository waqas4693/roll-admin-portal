import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AddEntry = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box mt='1.5rem' mx='2.5rem' pb='3.5rem'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Add Employee" />
        <Tab label="Search Employee" />
      </Tabs>
    </Box>
  )
}

export default AddEntry


// import React, { useState, useEffect } from 'react'
// import Tabs from '@mui/material/Tabs'
// import Tab from '@mui/material/Tab'
// import axios from 'axios'
// import url from '../../config/server-url.jsx'

// import { useParams } from 'react-router-dom'
// import { Box, Button, Grid, TextField } from '@mui/material'

// const AddEntry = () => {
//   const [value, setValue] = useState(0);
//   const [newRollData, setNewRollData] = useState({
//     sizeWidth: 0,
//     sizeHeight: 0,
//     loomNo: '',
//     rollNo: '',
//     inPercentage: '',
//     lamination: '',
//     status: '',
//     bopp: '',
//     rToRMp: '',
//     weaverNames: []
//   })

//   const [openSnackbar, setOpenSnackbar] = useState(false)
//   const [snackbarMessage, setSnackbarMessage] = useState('')
//   const [taskType, setTaskType] = useState(0)
//   const [incomingRollId, setIncomingRollId] = useState('')

//   const { rollData } = useParams()

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = event => {
//     const { name, value } = event.target
//     setNewRollData(prevState => ({
//       ...prevState,
//       [name]: value
//     }))
//   }

//   const handleWeaverNameChange = (index, key, value) => {
//     const updatedWeaverNames = [...newRollData.weaverNames]
//     updatedWeaverNames[index][key] = value
//     setNewRollData({
//       ...newRollData,
//       weaverNames: updatedWeaverNames
//     })
//   }

//   const handleAddWeaverName = () => {
//     setNewRollData({
//       ...newRollData,
//       weaverNames: [
//         ...newRollData.weaverNames,
//         { missPrint: '', missPick: '', freshBag: '', weight: '' }
//       ]
//     })
//   }

//   const handleRemoveWeaverName = index => {
//     const updatedWeaverNames = [...newRollData.weaverNames]
//     updatedWeaverNames.pop()
//     setNewRollData({
//       ...newRollData,
//       weaverNames: updatedWeaverNames
//     })
//   }

//   const handleSubmit = async () => {
//     if (taskType === 0) {
//       axios
//         .post(url + 'api/roll', newRollData)
//         .then(response => {
//           console.log('Response:', response.data)
//         })
//         .catch(error => {
//           console.error('Error:', error)
//         })
//     } else {
//       await axios.put(url + `api/roll/${incomingRollId}`, newRollData);
//     }
//   }

//   useEffect(() => {
//     if (rollData) {
//       const decodedRollData = JSON.parse(decodeURIComponent(rollData))
//       setIncomingRollId(decodedRollData['_id'])
//       setNewRollData(decodedRollData)
//       setTaskType(1)
//     }
//   }, [])

//   return (
//     <Box mt='1.5rem' mx='2.5rem' pb='3.5rem'>
//       <Box
//         mt='20px'
//         px='20px'
//         pb='20px'
//         mb='40px'
//         sx={{
//           width: '100%',
//           backgroundColor: '#FFFFFF',
//           boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Grid item xs={12} sm={12}>
//             <h2>Roll Details</h2>
//           </Grid>
//           <Grid item xs={5} sm={2.5}>
//             <TextField
//               size='small'
//               type='number'
//               name='sizeWidth'
//               label='Size Width'
//               variant='outlined'
//               value={newRollData.sizeWidth}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid
//             item
//             xs={2}
//             sm={1}
//             container
//             justify='center'
//             alignItems='center'
//           >
//             <span
//               style={{
//                 display: 'block',
//                 textAlign: 'center',
//                 width: '100%',
//                 fontSize: '1rem'
//               }}
//             >
//               X
//             </span>
//           </Grid>
//           <Grid item xs={5} sm={2.5}>
//             <TextField
//               size='small'
//               type='number'
//               name='sizeHeight'
//               label='Size Height'
//               variant='outlined'
//               value={newRollData.sizeHeight}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               size='small'
//               type='text'
//               name='loomNo'
//               label='Loom No'
//               variant='outlined'
//               value={newRollData.loomNo}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               size='small'
//               type='text'
//               name='rollNo'
//               label='Roll No'
//               variant='outlined'
//               value={newRollData.rollNo}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               size='small'
//               type='text'
//               name='bopp'
//               label='BOPP'
//               variant='outlined'
//               value={newRollData.bopp}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               size='small'
//               type='text'
//               name='rToRMp'
//               label='R to R Mp'
//               variant='outlined'
//               value={newRollData.rToRMp}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       <Box
//         mt='20px'
//         px='20px'
//         pb='20px'
//         mb='40px'
//         sx={{
//           width: '100%',
//           backgroundColor: '#FFFFFF',
//           boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Grid item xs={12} sm={12}>
//             <h2>Color & Status</h2>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               size='small'
//               type='text'
//               name='inPercentage'
//               label='In Percentage'
//               variant='outlined'
//               value={newRollData.inPercentage}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               size='small'
//               type='text'
//               name='lamination'
//               label='Lamination'
//               variant='outlined'
//               value={newRollData.lamination}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               size='small'
//               type='text'
//               name='status'
//               label='Status'
//               variant='outlined'
//               value={newRollData.status}
//               onChange={handleInputChange}
//               fullWidth
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       <Box
//         mt='20px'
//         px='20px'
//         pb='20px'
//         mb='40px'
//         sx={{
//           width: '100%',
//           backgroundColor: '#FFFFFF',
//           boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             justifyContent='center'
//             alignItems='center'
//             sx={{ display: 'grid' }}
//           >
//             <Button variant='contained' onClick={handleAddWeaverName}>
//               Add Weaver
//             </Button>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             justifyContent='center'
//             alignItems='center'
//             sx={{ display: 'grid' }}
//           >
//             <Button
//               color='secondary'
//               variant='contained'
//               onClick={handleRemoveWeaverName}
//             >
//               Remove Weaver
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {newRollData.weaverNames.map((weaverName, index) => {
//         return (
//           <Box
//             key={index}
//             mt='20px'
//             px='20px'
//             pb='20px'
//             mb='40px'
//             sx={{
//               width: '100%',
//               backgroundColor: '#FFFFFF',
//               boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
//             }}
//           >
//             <Grid
//               container
//               rowSpacing={2}
//               columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//             >
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   size='small'
//                   type='text'
//                   label='Miss Print'
//                   variant='outlined'
//                   value={weaverName['missPrint']}
//                   onChange={e =>
//                     handleWeaverNameChange(index, 'missPrint', e.target.value)
//                   }
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   size='small'
//                   type='text'
//                   label='Miss Pick'
//                   variant='outlined'
//                   value={weaverName['missPick']}
//                   onChange={e =>
//                     handleWeaverNameChange(index, 'missPick', e.target.value)
//                   }
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   size='small'
//                   type='text'
//                   label='Fresh Bag'
//                   variant='outlined'
//                   value={weaverName['weight']}
//                   onChange={e =>
//                     handleWeaverNameChange(index, 'weight', e.target.value)
//                   }
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   size='small'
//                   type='text'
//                   label='Weight'
//                   variant='outlined'
//                   value={weaverName['freshBag']}
//                   onChange={e =>
//                     handleWeaverNameChange(index, 'freshBag', e.target.value)
//                   }
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         )
//       })}

//       <Box
//         mt='20px'
//         px='20px'
//         pb='20px'
//         mb='40px'
//         sx={{
//           width: '100%',
//           backgroundColor: '#FFFFFF',
//           boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             justifyContent='center'
//             alignItems='center'
//             sx={{ display: 'grid' }}
//           >
//             <Button variant='contained' onClick={handleSubmit}>
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   )
// }

// export default AddEntry