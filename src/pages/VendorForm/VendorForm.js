import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AllotteeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: null,
    state: '',
    city: '',
    area: '',
    pincode: '',
    mobile: '',
    address: '',
    profileimage: null,
    idproof: '',
    idproofno: null,
    pancardno: '',
    pancard: null,
    openingbal: '',
    crdr: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/users/allottee', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save allottee');
      }

      // Handle successful response
      setFormData({
        name: '',
        email: '',
        gender: '',
        dob: null,
        state: '',
        city: '',
        area: '',
        pincode: '',
        mobile: '',
        address: '',
        profileimage: null,
        idproof: '',
        idproofno: null,
        pancardno: '',
        pancard: null,
        openingbal: '',
        crdr: '',
      });
      alert('Allottee saved successfully');
    } catch (error) {
      console.error('Error saving allottee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };



  return (
    <div>
      <div style={{paddingBottom: '10px'}}>
      <Typography variant="h3" gutterBottom>
        Vendor Form
      </Typography>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography variant="h5" gutterBottom>
    PERSONAL DETAILS
      </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Container component="main" className="p-5">
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} className="pb-2">
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Vendor Name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(date) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      dob: date,
                    }))
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile"
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Home Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel
                id="demo-simple-select-label"
                className="fw-bold pb-2"
              >
                Profile Image
              </InputLabel>
              <input type="file" name="profileimage" onChange={handleChange} />
            </Grid>
          </Grid>

        </form>
      </Container>        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography variant="h5" gutterBottom>
    COMPANY/FIRM DETAILS
      </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Container component="main" className="p-5">
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} className="pb-2">
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Company/Firm Name"
                
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Company/Firm Owner Name"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Opening Balance"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Credit/Debit</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Credit</MenuItem>
                  <MenuItem value="female">Debit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Company/Firm GST No."
                
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Company/Firm Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Active</MenuItem>
                  <MenuItem value="female">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">--Select State--</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">--Select City</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Area</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">--Select Area--</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pincode</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="male">--Select Pincode--</MenuItem>
     
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Company/Firm Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>


        </form>
      </Container>       </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
                  <Typography variant="h5" gutterBottom>
    BANK ACCOUNT DETAILS
      </Typography>

        </AccordionSummary>
        <AccordionDetails>
        <Container component="main" className="p-5">
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} className="pb-2">
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Bank Name"
                
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Account Holder Name"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Account Number"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="IFSC Code"
                
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Company/Firm Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

        </form>
      </Container>        </AccordionDetails>
      </Accordion>
    </div>
    <Button   type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
    </div>
  );
};

export default AllotteeForm;

