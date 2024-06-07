import { useContext, useEffect, useRef } from "react";
import { Brand } from "../../models/brand";
import { useNavigate } from "react-router-dom";
import { BrandsContext } from "../../contexts/BrandsContext";
import axios from "axios";
import { Layout } from "../../shared/components/layout/Layout";
import { Button } from "../../shared/components/button/Button";
import { BrandForm } from "../../features/CRUD/Brand Form/BrandForm";

function handleOnClick(
    idInput : React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,    
): Brand {
    if (!idInput.current ||
        !nameInput.current) 
    {
        throw new Error('Null references!');
    }
    const brandId = parseInt(idInput.current!.value);
    const brandName = nameInput.current!.value;
    
    console.log(brandId, brandName);
    return new Brand(brandId, brandName);
}

export function AddBrandPage() {
    document.title = 'Add Brand';

    const idInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();
    const brandContext = useContext(BrandsContext)!;

    useEffect(() => {
        if (idInput.current) {
            const maxId = Math.max(...brandContext.brands.map(brand => brand.getId()));
            const nextId = maxId + 1;
            idInput.current.value = nextId.toString();
        }
    }, []);

    const handleOnClickWrapper = () => {
        try {
            const inputBrand = handleOnClick(
                idInput,
                nameInput,
            );

            axios.post('http://localhost:5001/api/addBrand', inputBrand)
                .then(response=> {
                    const brandData = response.data;
                    const newBrand = new Brand(brandData.brand_id, brandData.name);
                    brandContext.addBrand(newBrand);
                    navigate('/brands');
            })
            .catch(error => {
                console.log(inputBrand);
                console.error('Error adding brand:', error);
            });
    } catch (error) {
        console.error('Error handling input:', error);
    }
    };

    return (
        <Layout>
            <div className='main-page-container'>
                <div className="main-title">Add Brand</div>

                <BrandForm 
                    idInput={idInput}
                    nameInput={nameInput}
                />

                <Button
                    type='submit'
                    buttonText='Add Brand'
                    onClick={handleOnClickWrapper}
                />
            </div>
        </Layout>
    );
}