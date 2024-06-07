import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import React from 'react';
import {expect, test} from 'vitest';
import {DeviceForm} from '../features/CRUD/Device Form/DeviceForm';
import {Device} from '../models/device';

test('testing rendering of device form without device', () => {
    let idInput = React.createRef<HTMLInputElement>();
    let nameInput = React.createRef<HTMLInputElement>();
    let priceInput = React.createRef<HTMLInputElement>();
    let imageInput = React.createRef<HTMLInputElement>();

    render(
        <DeviceForm
            idInput={idInput}
            nameInput={nameInput}
            priceInput={priceInput}
            imageInput={imageInput}
        />,
    );

    const renderedDeviceForm = screen.getByTestId('device-form');
    const idFormInput = screen.getByPlaceholderText('ID');
    const nameFormInput = screen.getByPlaceholderText('Name');
    const priceNameFormLabel = screen.getByText('Price');
    const urlFormLabel = screen.getByText('Image');

    expect(renderedDeviceForm).toBeInTheDocument();
    expect(idFormInput).toBeInTheDocument();
    expect(nameFormInput).toBeInTheDocument();
    expect(priceNameFormLabel).toBeInTheDocument();
    expect(urlFormLabel).toBeInTheDocument();
});

test('testing rendering of device form with device', () => {
    let idInput = React.createRef<HTMLInputElement>();
    let nameInput = React.createRef<HTMLInputElement>();
    let priceInput = React.createRef<HTMLInputElement>();
    let imageInput = React.createRef<HTMLInputElement>();

    let demoDevice = new Device(1, 'X-ray', 200, 'xray.jpg');

    render(
        <DeviceForm
            idInput={idInput}
            nameInput={nameInput}
            priceInput={priceInput}
            imageInput={imageInput}
            givenDevice={demoDevice}
        />,
    );

    const renderedUserForm = screen.getByTestId('device-form');
    const idFormInput = screen.getByDisplayValue('1');
    const firstNameFormInput = screen.getByDisplayValue('X-ray');
    const idFormLabel = screen.getByText('ID');
    const firstNameFormLabel = screen.getByText('Name');

    expect(renderedUserForm).toBeInTheDocument();
    expect(idFormInput).toBeInTheDocument();
    expect(firstNameFormInput).toBeInTheDocument();
    expect(idFormLabel).toBeInTheDocument();
    expect(firstNameFormLabel).toBeInTheDocument();
});
