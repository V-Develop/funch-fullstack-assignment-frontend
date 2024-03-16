import { Navbar } from "flowbite-react";
import Image from "next/image";

export default function NavbarLayout() {
    return (
        <div className="bg-amber-400">
            <Navbar
                fluid={true}
                className="bg-amber-400 max-w-screen-xl mx-auto"
            >
                <Navbar.Brand href="http://localhost:3000/">
                    <Image
                        src="/icon.png"
                        className="mr-3 h-6 sm:h-9"
                        alt="funch book brand"
                        style={{ height: "auto", width: "auto", filter: 'drop-shadow(0 0 0.2rem white) drop-shadow(0 0 0.2rem white)' }}
                        width={32}
                        height={32}
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style={{ textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff" }}>
                        Funch Hotel
                    </span>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Navbar.Link
                        href="/"
                        className="text-gray-900 md:hover:text-gray-100"
                    >
                        Home
                    </Navbar.Link>
                    <Navbar.Link
                        href="/login"
                        className="text-gray-900 md:hover:text-gray-100"
                    >
                        Login
                    </Navbar.Link>
                    <Navbar.Link
                        href="/register"
                        className="text-gray-900 md:hover:text-gray-100"
                    >
                        Register
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}