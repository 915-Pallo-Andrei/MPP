import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {expect, test, vi} from 'vitest';
import {DevicesContextProvider} from '../contexts/DevicesContext';
import {Device} from '../models/device';
import {DisplayDevicesPage} from '../pages/Display Devices Page/DisplayDevicesPage';

test('test display devices page render', () => {
    render(
        <DevicesContextProvider
            deviceContext={{
                devices: [new Device(1, 'X-ray', 200, 'xray.jpg')],
                addDevice: vi.fn(),
                removeDevice: vi.fn(),
            }}
        >
            <BrowserRouter>
                <DisplayDevicesPage />
            </BrowserRouter>
        </DevicesContextProvider>,
    );

    const devicesListDiv = screen.getByTestId('devices-list');

    expect(devicesListDiv.childNodes.length).toBe(1);
});
