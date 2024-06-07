import {useContext, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {DevicesContext} from '../../contexts/DevicesContext';
import {DeviceForm} from '../../features/CRUD/Device Form/DeviceForm';
import {Device} from '../../models/device';
import {Button} from '../../shared/components/button/Button';
import {Layout} from '../../shared/components/layout/Layout';
import axios from 'axios';
import React from 'react';
import { ServerStatusContext } from '../../App';

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
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
    if (
        !idInput.current!.value ||
        !nameInput.current!.value ||
        !priceInput.current!.value ||
        !brandInput.current!.value ||
        !imageInput.current!.value
    ) {
        throw new Error('All fields should be filled in!');
    }

    const deviceID = parseInt(idInput.current!.value);
    const deviceName = nameInput.current!.value;
    const devicePrice = parseInt(priceInput.current!.value);
    const deviceBrand = brandInput.current!.value;
    const deviceImage = imageInput.current!.value;

    return new Device(deviceID, deviceName, devicePrice, deviceBrand, deviceImage);
}

export function EditDevicePage() {
    document.title = 'Edit Device';

    const idInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const priceInput = useRef<HTMLInputElement>(null);
    const brandInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const deviceContext = useContext(DevicesContext)!;
    const isServerOnline = React.useContext(ServerStatusContext);

    const {deviceId} = useParams();
    if (!deviceId) {
        navigate('/');
        return;
    }

    const givenDevice = deviceContext.devices.find(
        (device: Device) => device.getId() === parseInt(deviceId),
    );

    const handleOnClickWrapper = () => {
        try {
            const inputDevice = handleOnClick(
                idInput,
                nameInput,
                priceInput,
                brandInput,
                imageInput,
            );
            if (isServerOnline){
                const URL = `http://51.20.86.64:5001/api/devices/${inputDevice.getId()}`;
                axios.put(URL, inputDevice)
                    .then(response => {
                        deviceContext.removeDevice(inputDevice.getId());
                        deviceContext.addDevice(new Device(
                            response.data.id,
                            response.data.name,
                            response.data.price,
                            response.data.brand,
                            response.data.image
                        ));
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('Error updating device:', error);
                    });}
            else{
                deviceContext.removeDevice(inputDevice.getId());
                deviceContext.addDevice(inputDevice);

                const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
                pendingApiCalls.push({
                    method: 'PUT',
                    url: URL,
                    data: inputDevice
                });
                localStorage.setItem('pendingApiCalls', JSON.stringify(pendingApiCalls));
                navigate('/');
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <Layout>
            <div className='main=page-container'>
                <DeviceForm
                    idInput={idInput}
                    nameInput={nameInput}
                    priceInput={priceInput}
                    brandInput={brandInput}
                    imageInput={imageInput}
                    givenDevice={givenDevice}
                />

                <Button
                    type='submit'
                    buttonText='Edit Device'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}
