import {Device} from '../../../models/device';
import {DeviceFormProps} from '../../../types/DeviceFormProps.types';
import {FormDataEntry} from '../Form Data Entry/FormDataSubmission';
import { DevicesContext } from '../../../contexts/DevicesContext';
import React from 'react';

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeholder: string;
    defaultValue: string;
    disabled: boolean;
};

function setFormEntriesForDevice(
    formEntires: FormEntryType[],
    givenDevice: Device | undefined,
) {
    if (givenDevice !== undefined) {
        formEntires[0].disabled = true;
        formEntires[0].defaultValue = givenDevice.getId().toString();
        formEntires[1].defaultValue = givenDevice.getName();
        formEntires[2].defaultValue = givenDevice.getPrice().toString();
        formEntires[3].defaultValue = givenDevice.getBrand();
        formEntires[4].defaultValue = givenDevice.getImage();
    }

    return formEntires;
}

function createFormEntries(props: DeviceFormProps) {
    const devicesContext = React.useContext(DevicesContext);
    const devices = devicesContext?.devices;
    let formEntires = [
        {
            label: 'ID',
            ref: props.idInput,
            placeholder: 'ID',
            defaultValue: '',
            disabled: true,
        },
        {
            label: 'Name',
            ref: props.nameInput,
            placeholder: 'Name',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Price',
            ref: props.priceInput,
            placeholder: 'Price',
            defaultValue: '',
            disabled: false,
        },
        {
            label: 'Brand',
            ref: props.brandInput,
            placeholder: 'Brand',
            defaultValue: devices ? devices[0].getBrand() : '',
            disabled: true,
        },
        {
            label: 'Image',
            ref: props.imageInput,
            placeholder: 'Image',
            defaultValue: '',
            disabled: false,
        },
    ];
    formEntires = setFormEntriesForDevice(formEntires, props.givenDevice);
    return formEntires;
}

export function DeviceForm(props: DeviceFormProps) {
    const formEntries = createFormEntries(props);
    return (
        <div className='form' data-testid='device-form'>
            <form className='device-form'>
                {formEntries.map((entry) => (
                    <FormDataEntry
                        key={entry.label}
                        label={entry.label}
                        ref={entry.ref}
                        placeholder={entry.placeholder}
                        defaultValue={entry.defaultValue}
                        disabled={entry.disabled}
                    />
                ))}
            </form>
        </div>
    );
}
