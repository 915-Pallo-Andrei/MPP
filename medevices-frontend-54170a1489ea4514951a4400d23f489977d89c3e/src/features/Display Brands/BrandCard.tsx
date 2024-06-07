import { useNavigate } from "react-router-dom";
import { BrandCardPropsType } from "../../types/BrandCardProps.types";
import axios from "axios";
import './BrandCard.css';
import { useContext, useEffect, useState } from "react";
import { DevicesContext } from "../../contexts/DevicesContext";

export function BrandCard({givenBrand, removeMethod}: BrandCardPropsType) {

    const navigate = useNavigate();

    const devices = useContext(DevicesContext);
    const [deviceCount, setDeviceCount] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:5001/api/devicesfor/${givenBrand.getId()}`)
            .then(response => {
                setDeviceCount(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching devices:', error);
            });
    }, [givenBrand, devices]);

    const handleCardOnClick = () => {
        navigate('/editBrand/' + givenBrand.getId());
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        axios.delete(`http://localhost:5001/api/brands/${givenBrand.getId()}`)
            .then(() => {
                removeMethod(givenBrand.getId());
            })
            .catch(error => {
                console.error('Error deleting brand:', error);
            });
    };
    return (
        <div className='card' 
        data-testid='brand-card' 
        onClick={handleCardOnClick}
        >
            <button className='remove-button' 
            data-testid='remove-button' 
            onClick={handleRemoveClick}>
                X
            </button>
            <div className='card-info' 
            data-testid='card-info'>
                <div className='brand-info'>
                    <div className='brand-id'>ID: {givenBrand.getId()}</div>
                    <div className='name'>{givenBrand.getName()}</div>
                    <div className='device-count'>Devices: {deviceCount}</div>
                </div>
            </div>
        </div>
    );
}