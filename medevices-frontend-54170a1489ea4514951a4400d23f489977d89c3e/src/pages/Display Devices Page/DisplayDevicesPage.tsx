import {useContext, useEffect, useState} from 'react';
import {DevicesContext} from '../../contexts/DevicesContext';
import {DeviceCard} from '../../features/Display Devices/DeviceCard';
import {Device} from '../../models/device';
import {Button} from '../../shared/components/button/Button';
import {Layout} from '../../shared/components/layout/Layout';
import './DisplayDevicesPage.css';
import React from 'react';
import axios from 'axios';
import { AuthContext } from '../Login Page/LoginPage';

export function DisplayDevicesPage() {
    document.title = 'Display Devices';

    let [isAscending, setIsAscending] = useState<boolean>(true);
    let [isAscendingById, setIsAscendingById] = useState<boolean>(true);
    const auth = useContext(AuthContext);

    const devicesContext = useContext(DevicesContext)!;

    let allDevices: Device[] = devicesContext.devices;
    const removeMethod = devicesContext.removeDevice;

    useEffect(() => {
        allDevices.sort((firstDevice, secondDevice) => {
            return firstDevice.getPrice() - secondDevice.getPrice();
        });
        if (!isAscending) allDevices.reverse();
    }, [isAscending]);

    useEffect(() => {
        allDevices.sort((a, b) => (a.getId() > b.getId() ? 1 : -1));
        if (!isAscendingById) allDevices.reverse();
    }, [isAscendingById]);

    const [page, setPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
            if (scrollBottom < 100 && !isLoading) { 
                loadMoreData();
            }
        };
    
        const debounce = (func: any, delay: number) => {
            let timer: ReturnType<typeof setTimeout>;
            return function (this: any) {
                const context = this;
                const args = arguments;
                clearTimeout(timer);
                timer = setTimeout(() => func.apply(context, args), delay);
            };
        };
    
        const debouncedScrollHandler = debounce(handleScroll, 1000);
    
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => window.removeEventListener('scroll', debouncedScrollHandler);
    }, [isLoading, auth]);
    
    const [fetchedDevicesIds, setFetchedDevicesIds] = React.useState<number[]>([]);

    const loadMoreData = async () => {
        setIsLoading(true);
        try {
            const nextPage = page + 1;
            const username = localStorage.getItem('username');
            axios.get(`http://localhost:5001/api/devicesof/${username}?page=${nextPage}`)
                .then((response) => {
                    console.log('Next page of devices fetched:', response.data);
                    const newDevices = response.data.map((deviceData: any) => new Device(deviceData.id, deviceData.name, deviceData.price, deviceData.brand, deviceData.image));

                    const filteredNewDevices = newDevices.filter((device: Device) => !fetchedDevicesIds.includes(device.getId()));

                    setFetchedDevicesIds([...fetchedDevicesIds, ...filteredNewDevices.map((device: Device) => device.getId())]);
                    filteredNewDevices.forEach((device: Device) => {
                        devicesContext.addDevice(device);
                    });
                    
                    setPage(nextPage);
                })
                .catch((error) => {
                    console.error('Error fetching next page of devices:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
          console.error('Error fetching next page of devices:', error);
        }
      };

    return (
        <Layout>
            <div className='main-page-container'>
                <Button
                    onClick={() => setIsAscendingById(!isAscendingById)}
                    buttonText={`Sort ${isAscendingById ? 'ascending' : 'descending'} by ID`}
                    type='button'
                    className='sort-button'
                />

                <Button
                    onClick={() => setIsAscending(!isAscending)}
                    buttonText={`Sort ${isAscending ? 'ascending' : 'descending'} by price`}
                    type='button'
                    className='sort-button'
                />

                <div className='all-devices' data-testid='devices-list'>
                {allDevices.map((device) => (
                        <DeviceCard
                            givenDevice={device}
                            removeMethod={removeMethod}
                            key={device.getId()}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
