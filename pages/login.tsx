import NavbarLayout from "@/components/Navbar";
import Head from "next/head";
import { AuthIcon, AuthNavigation } from "@/components/Icon";
import { useRouter } from "next/router"
import { useState } from "react";
import { LoginRequest, LoginResponse } from "@/model/auth";
import { ResponseWithPayload } from "@/model/response";
import { loginApi } from "@/api/login";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import Token from "@/util/token-manager";
import { Checkbox, Group } from "@mantine/core";

export default function Login() {
    const router = useRouter()
    const [user, setUser] = useState<LoginRequest>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleRedirectToRegister = () => {
        router.push('/register');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response: ResponseWithPayload<LoginResponse> = await loginApi(user)
            if (response.status.http_status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.status.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                Token.saveEncryptToken(response.payload)
                router.push("/profile")
            }
        } catch (error: any) {
            const axiosError = error as AxiosError<ResponseWithPayload<any>>;
            Swal.fire({
                icon: "error",
                title: "Please try again...",
                text: axiosError.response?.data.status.message,
            });
        }
    }

    return (
        <main>
            <Head>
                <title>Login | Funchbook.com</title>
                <meta name="description" content="funchbook.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
            </Head>

            <NavbarLayout></NavbarLayout>

            <div className='w-full text-center flex justify-center items-center' style={{ height: "85vh" }}>
                <form className="max-w-md w-full mx-auto" onSubmit={login}>
                    <p className="mb-5 text-center text-4xl text-gray-900 dark:text-black">LOGIN</p>
                    <div className="mb-5">
                        <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required
                            value={user.email}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-5">
                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required
                            value={user.password}
                            onChange={handleChange} />
                    </div>
                    <Group position="right" className="mb-5">
                        <Checkbox
                            onChange={handleTogglePassword}
                            label="Show password"
                        />
                    </Group>

                    <button type="submit" className="text-white bg-stone-950 hover:bg-stone-950 login-button-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center">
                        LOGIN
                        <AuthIcon />
                    </button>

                    <div className="max-w-md w-full mx-auto">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <p className="text-xs text-center text-gray-900 dark:text-black flex justify-center items-center">
                                Don't have an account?{" "}
                                <button type="button" className="font-bold decoration-indigo-500 flex items-center justify-center ml-2 hover:bg-gray-100 px-1.5 rounded" onClick={handleRedirectToRegister}>
                                    Register{" "}
                                    <AuthNavigation />
                                </button>
                            </p>
                            <div className="flex justify-between">
                                <a className="mt-5 mb-5 mr-1 text-xs text-left text-gray-900 dark:text-black">Forgot password{" "}</a>
                                <svg className="w-4 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}