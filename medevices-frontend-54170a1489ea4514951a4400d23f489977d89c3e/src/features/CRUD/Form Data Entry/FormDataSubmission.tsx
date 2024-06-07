import {forwardRef} from 'react';
import {FormEntryProps} from '../../../types/FormEntryProps.types';
import './FormDataSubmission.css';

const FormDataEntry = forwardRef<HTMLInputElement, FormEntryProps>(
    (props, ref) => {
        return (
            <div className='form-submission' data-testid='form-entry'>
                <label className='form-label'>{props.label}</label>
                {props.defaultValue === '' ? (
                    <input
                        data-testid='form-entry-input'
                        type='text'
                        className='form-input'
                        id={props.label}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        ref={ref}
                    />
                ) : (
                    <input
                        data-testid='form-entry-input'
                        type='text'
                        className='form-input'
                        id={props.label}
                        placeholder={props.defaultValue}
                        defaultValue={props.defaultValue}
                        disabled={props.disabled}
                        ref={ref}
                    />
                )}
            </div>
        );
    },
);

export {FormDataEntry};
