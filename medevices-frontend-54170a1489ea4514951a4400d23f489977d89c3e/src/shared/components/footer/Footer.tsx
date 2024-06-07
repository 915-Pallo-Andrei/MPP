import './Footer.css';

export function Footer() {
    return (
        <div className='footer' data-testid='footer-test-id'>
            <div className='footer-text' data-testid='footer-inner'>
                Medevices
                <br />
                Created by Pallo Andrei
            </div>
        </div>
    );
}
