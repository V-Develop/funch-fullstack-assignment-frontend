import { Footer } from 'flowbite-react';

export default function FooterLayout() {
    return (
        <Footer container className='bg-gray-800' style={{ borderRadius: 0, position: "fixed", bottom: 0, left: 0, width: "100%" }}>
            <div className="w-full text-center">
                <Footer.Copyright className='text-white' by="Funch Hotel" year={2024} />
            </div>
        </Footer>
    );
}