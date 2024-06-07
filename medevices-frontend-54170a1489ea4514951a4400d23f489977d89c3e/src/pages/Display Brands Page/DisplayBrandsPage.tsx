import { useContext,  useState } from "react";
import { BrandsContext } from "../../contexts/BrandsContext";
import { Brand } from "../../models/brand";
import { Layout } from "../../shared/components/layout/Layout";
import { Button } from "../../shared/components/button/Button";
import { BrandCard } from "../../features/Display Brands/BrandCard";
import './DisplayBrandsPage.css';

export function DisplayBrandsPage() {
    document.title = 'Display Brands';

    const brandsContext = useContext(BrandsContext)!;
    let allBrands: Brand[] = brandsContext.brands;
    const removeMethod = brandsContext.removeBrand;

    const [visibleCount, setVisibleCount] = useState<number>(4);
    
    return (
        <Layout>
            <div className='main-page-container'>
                <div className='all-brands' data-testid='brands-list'>
                    {allBrands.slice(0, visibleCount).map((brand) => (
                        <BrandCard
                            givenBrand={brand}
                            removeMethod={removeMethod}
                            key={brand.getId()}
                        />
                    ))}
                </div>
                {visibleCount < allBrands.length && (
                    <>
                    <Button
                        onClick={() => setVisibleCount(visibleCount + 4)}
                        buttonText='Load more'
                        type='button'
                        className='load-more-button'
                    />
                     <p>
                            Showing {visibleCount} out of {allBrands.length}{' '}
                            devices
                    </p>
                    </>
                )}
            </div>
        </Layout>
    );
}
