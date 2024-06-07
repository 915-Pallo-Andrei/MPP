import { addBrand, deleteBrand, getBrandById, getBrands, getBrandsUnregistered, getDevicesByBrand, updateBrand } from '../controlers/brandsController';
import { addDevice, deleteDevice, getDeviceById, getDevices, getDevicesByUser, updateDevice } from '../controlers/deviceController';
import { validateLogin, validateRegister } from '../controlers/registrationController';
const express = require('express');

const router = express.Router();

// Routes for devices
router.get('/devices', getDevices);
router.get('/devices/:id', getDeviceById);
router.get('/devicesof/:username', getDevicesByUser);
router.post('/addDevice', addDevice);
router.delete('/devices/:id', deleteDevice);
router.put('/devices/:id', updateDevice);

// Routes for brands
router.get('/brands', getBrands);
router.get('/devicesfor/:brandid', getDevicesByBrand);
router.get('/brands/:id', getBrandById);
router.get('/brandsUnregistered', getBrandsUnregistered);
router.post('/addBrand', addBrand);
router.delete('/brands/:id', deleteBrand);
router.put('/brands/:id', updateBrand);

// Routes for registration
router.post('/register', validateRegister);
router.post('/login', validateLogin);

export default router;

