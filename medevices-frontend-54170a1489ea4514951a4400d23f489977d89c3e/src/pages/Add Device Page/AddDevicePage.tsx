import {useContext, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {DevicesContext} from '../../contexts/DevicesContext';
import {DeviceForm} from '../../features/CRUD/Device Form/DeviceForm';
import {Device} from '../../models/device';
import {Button} from '../../shared/components/button/Button';
import {Layout} from '../../shared/components/layout/Layout';
import axios from 'axios';
import React from 'react';
import { ServerStatusContext } from '../../App';

function handleOnClick(
    idInput : React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    priceInput: React.RefObject<HTMLInputElement>,
    brandInput: React.RefObject<HTMLInputElement>,
    imageInput: React.RefObject<HTMLInputElement>,
): Device {
    if (
        !idInput.current ||
        !nameInput.current ||
        !priceInput.current ||
        !brandInput.current ||
        !imageInput.current
    ) {
        throw new Error('Null references!');
    }

    const deviceId = parseInt(idInput.current!.value);
    const deviceName = nameInput.current!.value;
    const devicePrice = parseInt(priceInput.current!.value);
    const deviceBrand = brandInput.current!.value;
    const deviceImage = imageInput.current!.value;


    return new Device(deviceId, deviceName, devicePrice, deviceBrand, deviceImage);
}

export function AddDevicePage() {
    document.title = 'Add Device';

    const idInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const priceInput = useRef<HTMLInputElement>(null);
    const brandInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const deviceContext = useContext(DevicesContext)!;
    const isServerOnline = React.useContext(ServerStatusContext);

    useEffect(() => {
        if (idInput.current) {
            const maxId = Math.max(...deviceContext.devices.map(device => device.getId()));
            const nextId = maxId + 1;
            idInput.current.value = nextId.toString();
        }
    }, []);

    const handleOnClickWrapper = () => {
        try {
            const inputDevice = handleOnClick(
                idInput,
                nameInput,
                priceInput,
                brandInput,
                imageInput,
            );
            
            if(isServerOnline){
                axios.post('http://localhost:5001/api/addDevice', inputDevice)
                .then(response => {
                    deviceContext.addDevice(response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error adding device:', error);
                });}
            else{
                deviceContext.addDevice(inputDevice);
                const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
                pendingApiCalls.push({
                    method: 'POST',
                    url: 'http://localhost:5001/api/addDevice',
                    data: inputDevice
                });
                localStorage.setItem('pendingApiCalls', JSON.stringify(pendingApiCalls));
                navigate('/');
            }
        } catch (error) {
            console.error('Error handling input:', error);
        }
    };
    return (
        <Layout>
            <div className='main=page-container'>
                <div className='main-title'>Add Device</div>

                <DeviceForm
                    idInput={idInput}
                    nameInput={nameInput}
                    priceInput={priceInput}
                    brandInput={brandInput}
                    imageInput={imageInput}
                />

                <Button
                    type='submit'
                    buttonText='Add Device'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}
