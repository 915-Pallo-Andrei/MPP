import {useNavigate} from 'react-router-dom';
import {DeviceCardPropsType} from '../../types/DeviceCardProps.types';

import './DeviceCard.css';
import axios from 'axios';
import React from 'react';
import { ServerStatusContext } from '../../App';


export function DeviceCard({givenDevice, removeMethod}: DeviceCardPropsType) {
    // let path: string = 'assets/' + givenDevice.getImage();
    const isServerOnline = React.useContext(ServerStatusContext);
    const navigate = useNavigate();
    let isAuthenticated = localStorage.getItem('token') !== null;


    const handleCardOnClick = () => {
        if(isAuthenticated){
        navigate('/editDevice/' + givenDevice.getId());
        }
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
            if (isServerOnline) {
                const URL = (`http://51.20.86.64:5001/api/devices/${givenDevice.getId()}`)
                axios.delete(URL)
                    .then(() => {
                        removeMethod(givenDevice.getId());
                    })
                    .catch(error => {
                        console.error('Error deleting device:', error);
                    });
            } else {
                removeMethod(givenDevice.getId());

                const pendingApiCalls = JSON.parse(localStorage.getItem('pendingApiCalls') || '[]');
                pendingApiCalls.push({
                    method: 'DELETE',
                    url: URL,
                });
                localStorage.setItem('pendingApiCalls', JSON.stringify(pendingApiCalls));
            }
    };
    
    return (
        <div
            className='card'
            data-testid='device-card'
            onClick={handleCardOnClick}
        >
           {isAuthenticated && ( <button
                className='remove-button'
                data-testid='remove-button'
                onClick={handleRemoveClick}
            >
                X
            </button> )}
            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    
                    <img src={givenDevice.getImage()} alt='device image' />
                </div>

                <div className='device-info'>
                    <div className='device-id'>ID: {givenDevice.getId()}</div>
                    <div className='name'>{givenDevice.getName()}</div>
                    <div className='brand'>Brand: {givenDevice.getBrand()}</div>
                    <div className='price'>Price: {givenDevice.getPrice()}</div>
                </div>
            </div>
        </div>
    );
}
