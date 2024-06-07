import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import './RegisterPage.css';
import { Brand } from '../../models/brand';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    selectedBrand: '',
    newBrandName: ''
  });
  const [brands, setBrands] = useState([]);
  const [isOtherBrand, setIsOtherBrand] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const URL = 'http://51.20.86.64:5001/api/brandsUnregistered'
        const response = await axios.get(URL);
        const brands = response.data.map((brand: any) => new Brand(brand.brand_id, brand.name));
        setBrands(brands);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBrandChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData({ ...formData, selectedBrand: value, newBrandName: '' });
    setIsOtherBrand(value === 'other')
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        brandName: isOtherBrand ? formData.newBrandName : formData.selectedBrand
      };
      const response = await axios.post('http://51.20.86.64:5001/api/register', dataToSend);
      console.log('Registration form submitted:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-page-container">
      <Typography variant="h5" component="h1" gutterBottom>
        Register
      </Typography>
      <form className="register-form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormControl variant="outlined" margin="normal" fullWidth required>
          <InputLabel>Can you find your brand name here?</InputLabel>
          <Select
            value={formData.selectedBrand}
            onChange={handleBrandChange}
            label="Can you find your brand name here?"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {brands.map((brand : Brand) => (
              <MenuItem key={brand.getId()} value={brand.getName()}>{brand.getName()}</MenuItem>
            ))}
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        {isOtherBrand && (
          <TextField
            label="New Brand Name"
            variant="outlined"
            margin="normal"
            type="text"
            name="newBrandName"
            value={formData.newBrandName}
            onChange={handleChange}
            required
          />
        )}
        <Button variant="contained" type="submit" className="buttons">Register</Button>
        <RouterLink to="/">
          <Button className='buttons'>Back to Home</Button>
        </RouterLink>
      </form>
    </div>
  );
};

export default RegisterPage;
