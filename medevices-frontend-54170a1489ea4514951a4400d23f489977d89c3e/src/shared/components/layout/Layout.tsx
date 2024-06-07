import {Footer} from '../footer/Footer';
import {Header} from '../header/Header';

export function Layout({children}: any) {
    return (
        <div className='layout' data-testid='layout-test-id'>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
