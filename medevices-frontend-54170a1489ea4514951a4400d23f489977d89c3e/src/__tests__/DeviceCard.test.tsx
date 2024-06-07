import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {expect, test, vi} from 'vitest';
import {DeviceCard} from '../features/Display Devices/DeviceCard';
import {Device} from '../models/device';

const {mockedUseNavigate} = vi.hoisted(() => {
    return {
        mockedUseNavigate: vi.fn(),
    };
});

vi.mock('react-router-dom', async () => {
    const router =
        await vi.importActual<typeof import('react-router-dom')>(
            'react-router-dom',
        );
    return {
        ...router,
        useNavigate: () => mockedUseNavigate,
    };
});

test('test device card rendering', () => {
    const testDevice = new Device(1, 'X-ray', 200, 'xray.jpg');
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <DeviceCard
                givenDevice={testDevice}
                removeMethod={mockRemoveMethod}
            />
        </BrowserRouter>,
    );

    const deviceCard = screen.getByTestId('device-card');
    const removeButton = screen.getByTestId('remove-button');

    const deviceId = screen.getByText('ID: 1');
    const deviceName = screen.getByText('X-ray');
    const deviceImage = screen.getByAltText('device image');

    expect(deviceCard).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(deviceId).toBeInTheDocument();
    expect(deviceName).toBeInTheDocument();
    expect(deviceImage).toBeInTheDocument();
});

test('test device card remove method to be called', () => {
    const testDevice = new Device(1, 'X-ray', 200, 'xray.jpg');
    const mockRemoveMethod = vi.fn();

    render(
        <BrowserRouter>
            <DeviceCard
                givenDevice={testDevice}
                removeMethod={mockRemoveMethod}
            />
        </BrowserRouter>,
    );

    const deviceCard = screen.getByTestId('device-card');
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    fireEvent.click(deviceCard);

    expect(mockRemoveMethod.mock.calls.length).toBe(1);
    expect(mockedUseNavigate).toBeCalledWith('/editDevice/1');
});
