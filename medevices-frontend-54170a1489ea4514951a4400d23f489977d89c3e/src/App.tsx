import {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {DevicesContextProvider} from './contexts/DevicesContext';
import {Device} from './models/device';
import './App.css';
import {AddDevicePage} from './pages/Add Device Page/AddDevicePage';
import {ChartPage} from './pages/Chart Page/ChartPage';
import {EditDevicePage} from './pages/Edit Device Page/EditDevicePage';
import axios from 'axios';
import { io } from 'socket.io-client';
import Alert from '@mui/material/Alert';
import { Brand } from './models/brand';
import { BrandContextProvider} from './contexts/BrandsContext';
import { DisplayDevicesPage } from './pages/Display Devices Page/DisplayDevicesPage';
import { DisplayBrandsPage } from './pages/Display Brands Page/DisplayBrandsPage';
import { AddBrandPage } from './pages/Add Brand Page/AddBrandPage';
import { EditBrandPage } from './pages/Edit Brand Page/EditBrandPage';
import { ApiCall } from './models/apiCall';
import LoginPage, { AuthContext } from './pages/Login Page/LoginPage';
import RegisterPage from './pages/Register Page/RegisterPage';
import React from 'react';


export const ServerStatusContext = createContext<boolean>(true);

function App() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isServerOnline, setIsServerOnline] = useState(true);
    const isAuthenticated = React.useContext(AuthContext);

    const page = 0;

    useEffect(() => {
        const socket = io('http://localhost:5001', { transports : ['websocket'] });
        socket.on('newDevice', (newDevice: any) => {
          console.log('Received new device from server:', newDevice);
        //   Adding the device only to the database, the context will be updated by the fetchDevices function 
        //   when the coresponing API call is made for its page
        //   const device = new Device(newDevice.id, newDevice.name, newDevice.price, newDevice.brand, newDevice.image);
        //   setDevices((prevDevices) => [...prevDevices, device]);
        });

        socket.on('connect_error', () => {
            setIsServerOnline(false);
        });

        return () => {
          socket.close();
        }

      }, []);
    
      useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));
    
        return () => {
          window.removeEventListener('online', () => setIsOnline(true));
          window.removeEventListener('offline', () => setIsOnline(false));
        };
      }, []);

    const fetchDevices = async () => {
        const username = localStorage.getItem('username');
        axios.get(`http://localhost:5001/api/devicesof/${username}?page=${page}`)
            .then(response => {
                const devices = response.data.map((device: any) => new Device(device.id, device.name, device.price, device.brand, device.image));
                if (page === 0)
                    {setDevices(devices);}
                else
                    {setDevices(prevDevices => [...prevDevices, ...devices]);}
                localStorage.setItem('devices', JSON.stringify(devices));
                setIsServerOnline(true);
            })
            .catch(error => {
                console.error('Error fetching devices:', error);
                const storedDevices = JSON.parse(localStorage.getItem('devices') || '[]');
                const devices = storedDevices.map((device: any) => new Device(device.id, device.name, device.price, device.brand, device.image));
                setDevices(devices);
                setIsServerOnline(false);
            });
    }

    const fetchBrands = () => {
        axios.get("http://localhost:5001/api/brands")
            .then(response => {
                console.log('Brands:', response.data);
                const brands = response.data.map((brand: any) => new Brand(brand.brand_id, brand.name));
                setBrands(brands);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
                setIsServerOnline(false);
            });
    }

    useEffect(() => {
        fetchDevices();
        fetchBrands();
    }, [isServerOnline, isAuthenticated]);

    console.log('Devices:', devices);
    console.log('Brands:', brands);
    
    const addDevice = (newDevice: Device) => {
        setDevices(prevState => [...prevState, newDevice]);
    };

    const removeDevice = (deviceId: number) => {
        setDevices((prevState: Device[]) =>
            prevState.filter((device) => device.getId() != deviceId),
        );
    };

    const addBrand = (newBrand: Brand) => {
        setBrands(prevState => [...prevState, newBrand]);
    }

    const removeBrand = (brandId: number) => {
        setBrands((prevState: Brand[]) =>
            prevState.filter((brand) => brand.getId() != brandId),
        );
    }

    useEffect(() => {
        if (isOnline && isServerOnline) {
            const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
            pendingApiCalls.forEach((apiCall: ApiCall) => {
                axios({
                    method: apiCall.method,
                    url: apiCall.url,
                    data: apiCall.data
                })
                .then(response => {
                    console.log('API call successful:', apiCall.method, response.data);
                })
                .catch(error => {
                    console.error('Error executing API call:', error);
                });
            });
            localStorage.removeItem('pendingApiCalls');
            setDevices([]);
        }
    }, [isOnline, isServerOnline]);

    if (!isOnline) {
        return <Alert severity="warning">You are currently offline. Please check your internet connection.</Alert>;
      }

    return (
        <DevicesContextProvider
            deviceContext={{ devices, addDevice, removeDevice }}
        >
            <BrandContextProvider brandContext={{ brands, addBrand, removeBrand }}>
                <ServerStatusContext.Provider value={isServerOnline}>
                    <AuthContext.Provider value={isAuthenticated}>
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={<DisplayDevicesPage />} />
                                <Route path='/addDevice' element={<AddDevicePage />} />
                                <Route path='/editDevice/:deviceId'element={<EditDevicePage />}/>

                                <Route path='/brands' element={<DisplayBrandsPage/>} />
                                <Route path='/addBrand' element={<AddBrandPage />} />
                                <Route path='/editBrand/:brandId' element={<EditBrandPage />} />

                                <Route path='/statistics' element={<ChartPage />} />

                                <Route path='/register' element={<RegisterPage/>} />
                                <Route path='/login' element={<LoginPage/>} />
                            </Routes>
                        </BrowserRouter>
                    </AuthContext.Provider>
                </ServerStatusContext.Provider>
            </BrandContextProvider>
        </DevicesContextProvider>
    );
}

export default App;
