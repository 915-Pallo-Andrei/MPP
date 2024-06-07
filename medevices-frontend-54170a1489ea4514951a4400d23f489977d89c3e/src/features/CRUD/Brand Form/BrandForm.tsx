import { Brand } from "../../../models/brand";
import { BrandFormProps } from "../../../types/BrandFormProps.types";
import { FormDataEntry } from "../Form Data Entry/FormDataSubmission";

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeholder: string;
    defaultValue: string;
    disabled: boolean;
};

function setFormEntriesForBrand(
    formEntires: FormEntryType[],
    givenBrand: Brand | undefined,
) {
    if (givenBrand !== undefined) {
        formEntires[0].disabled = true;
        formEntires[0].defaultValue = givenBrand.getId().toString();
        formEntires[1].defaultValue = givenBrand.getName();
    }

    return formEntires;
}

function createFormEntries(props: BrandFormProps) {
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
    ];

    formEntires = setFormEntriesForBrand(formEntires, props.givenBrand);
    return formEntires;
}

export function BrandForm(props: BrandFormProps) {
    const formEntries = createFormEntries(props);

    return (
        <div className='form' data-testid='brand-form'>
            <form className="brand-form">
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