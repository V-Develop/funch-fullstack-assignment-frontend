import { AuthIcon, AuthNavigation } from "@/components/Icon";
import NavbarLayout from "@/components/Navbar";
import Head from "next/head";
import { registerApi } from "@/api/register";
import { RegisterRequest } from "@/model/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseWithoutPayload } from "@/model/response";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { Checkbox, Group } from "@mantine/core";
import validator from 'validator';
import Loading from "@/components/Loading";

export default function Register() {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<RegisterRequest>({ email: '', password: '', repeat_password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleRedirectToLogin = () => {
        router.push('/login');
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

    const isInvalidEmail = (email: string) => {
        return !validator.isEmail(email);
    };

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.email == "" || user.password == "") {
            return
        }
        if (isInvalidEmail(user.email)) {
            return
        }
        if (user.password.length < 8) {
            return
        }
        if (!/[~!@#$%^&*()\-_+={}[\]|;:'",.<>?/\\]/.test(user.password)) {
            return
        }
        if (!/[A-Z]/.test(user.password)) {
            return
        }
        if (!/[a-z]/.test(user.password)) {
            return
        }

        try {
            const response: ResponseWithoutPayload = await registerApi(user)
            if (response.status.http_status === 201) {
                Swal.fire({
                    icon: "success",
                    title: response.status.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push("/login")
            }

        } catch (error: any) {
            const axiosError = error as AxiosError<ResponseWithoutPayload>;
            Swal.fire({
                icon: "error",
                title: "Please try again...",
                text: axiosError.response?.data.status.message,
            });
        }
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading></Loading>
    } else {
        return (
            <main>
                <Head>
                    <title>Register | Funchbook.com</title>
                    <meta name="description" content="funchbook.com" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/icon.png" />
                </Head>

                <NavbarLayout></NavbarLayout>

                <div className='w-full text-center flex justify-center items-center' style={{ height: "85vh" }}>
                    <form className="max-w-md w-full mx-auto" onSubmit={register}>
                        <p className="mb-5 text-center text-4xl text-gray-900 dark:text-black">REGISTER</p>
                        <div className="mb-5">
                            <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required
                                value={user.email}
                                onChange={handleChange}
                            />
                            {user.email != "" && isInvalidEmail(user.email) && (
                                <Group position="left">
                                    <p style={{ color: 'red', fontSize: "14px" }}>- Incorrect email format</p>
                                </Group>
                            )}
                        </div>
                        <div className="mb-5">
                            <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required
                                value={user.password}
                                onChange={handleChange}
                            />
                            {user.password.length < 8 && user.password != "" && (
                                <Group position="left"><p style={{ color: 'red', fontSize: "14px" }}>- At least 8 characters</p></Group>
                            )}
                            {user.password != "" && !/[~!@#$%^&*()\-_+={}[\]|;:'",.<>?/\\]/.test(user.password) && (
                                <Group position="left">
                                    <p style={{ color: 'red', fontSize: "14px" }}>- Use special character</p>
                                </Group>
                            )}
                            {user.password != "" && !/[A-Z]/.test(user.password) && (
                                <Group position="left">
                                    <p style={{ color: 'red', fontSize: "14px" }}>- Use uppercase</p>
                                </Group>
                            )}
                            {user.password != "" && !/[a-z]/.test(user.password) && (
                                <Group position="left">
                                    <p style={{ color: 'red', fontSize: "14px" }}>- Use lowercase</p>
                                </Group>
                            )}
                        </div>
                        <div className="mb-5">
                            <input type={showPassword ? 'text' : 'password'} id="repeat_password" name="repeat_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Repeat password" required
                                value={user.repeat_password}
                                onChange={handleChange}
                            />
                        </div>

                        <Group position="right" className="mb-5">
                            <Checkbox
                                onChange={handleTogglePassword}
                                label="Show password"
                            />
                        </Group>
                        <button type="submit" className="text-white bg-stone-950 hover:bg-stone-950 login-button-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center"
                        >
                            REGISTER
                            <AuthIcon />
                        </button>

                        <p className="mt-10 mb-5 text-xs text-center text-gray-900 dark:text-black flex justify-center items-center">
                            Already have an account?{" "}
                            <button type="button" className="font-bold decoration-indigo-500 flex items-center justify-center ml-2 hover:bg-gray-100 px-1.5 rounded" onClick={handleRedirectToLogin}>
                                Login{" "}
                                <AuthNavigation />
                            </button>
                        </p>
                    </form>
                </div>
            </main>
        )
    }
}