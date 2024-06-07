import { useContext, useRef } from "react";
import { Brand } from "../../models/brand";
import { useNavigate, useParams } from "react-router-dom";
import { BrandsContext } from "../../contexts/BrandsContext";
import axios from "axios";
import { Layout } from "../../shared/components/layout/Layout";
import { BrandForm } from "../../features/CRUD/Brand Form/BrandForm";
import { Button } from "../../shared/components/button/Button";

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
): Brand {
    if (
        !idInput.current ||
        !nameInput.current
    ) {
        throw new Error('Null references!');
    }
    if (
        !idInput.current!.value ||
        !nameInput.current!.value
    ) {
        throw new Error('All fields should be filled in!');
    }
    const brandId = parseInt(idInput.current!.value);
    const brandName = nameInput.current!.value;

    return new Brand(brandId, brandName);
}

export function EditBrandPage() {
    document.title = 'Edit Brand';

    const idInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const brandContext = useContext(BrandsContext)!;

    const {brandId} = useParams();
    if (!brandId) {
        navigate('/brands');
        return;
    }

    const givenBrand = brandContext.brands.find(
        (brand: Brand) => brand.getId() === parseInt(brandId),
    );

    const handleOnClickWrapper = () => {
        try {
            const inputBrand = handleOnClick(
                idInput,
                nameInput,
            );

            axios.put(`http://localhost:5001/api/brands/${inputBrand.getId()}`, inputBrand)
                .then(response => {
                    brandContext.removeBrand(response.data);
                    brandContext.addBrand(new Brand(response.data.id, response.data.name));
                    navigate('/brands');
                })
                .catch(error => {
                    console.error('Error updating brand:', error);
                });
        } catch (error) {
            console.error('Error handling input:', error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <div className="main-title">Edit Brand</div>

                <BrandForm
                    idInput={idInput}
                    nameInput={nameInput}
                    givenBrand={givenBrand}
                />

            
                <Button
                    type='submit'
                    buttonText="Edit Brand"
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}