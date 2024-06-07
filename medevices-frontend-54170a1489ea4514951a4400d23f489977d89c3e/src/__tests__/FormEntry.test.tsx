import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import React from 'react';
import {FormDataEntry} from '../features/CRUD/Form Data Entry/FormDataSubmission';

test('test form entry without default value', () => {
    const demoReference = React.createRef<HTMLInputElement>();

    render(
        <FormDataEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={false}
            defaultValue=''
            ref={demoReference}
        />,
    );

    const element = screen.getByTestId('form-entry');
    expect(element).toBeInTheDocument();
});

test('test form entry with default value', () => {
    const demoReference = React.createRef<HTMLInputElement>();

    render(
        <FormDataEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={false}
            defaultValue='test value'
            ref={demoReference}
        />,
    );

    const element = screen.getByTestId('form-entry');
    expect(element).toBeInTheDocument();
});

test('test form entry for disabled input', () => {
    const demoReference = React.createRef<HTMLInputElement>();

    render(
        <FormDataEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={true}
            defaultValue='test value'
            ref={demoReference}
        />,
    );

    const element = screen.getByTestId('form-entry-input');
    expect(element).toBeDisabled();
});

test('test form entry for enabled input', () => {
    const demoReference = React.createRef<HTMLInputElement>();

    render(
        <FormDataEntry
            label='test-label'
            placeholder='test-placeHolder'
            disabled={false}
            defaultValue='test value'
            ref={demoReference}
        />,
    );

    const element = screen.getByTestId('form-entry-input');
    expect(element).toBeEnabled();
});
