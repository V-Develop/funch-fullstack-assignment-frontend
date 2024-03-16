import { getUserProfileApi } from "@/api/get-user-profile";
import SidebarLayout from "@/components/Sidebar";
import { ResponseWithPayload } from "@/model/response";
import { GetUserProfileResponse, UpdateUserProfile } from "@/model/user";
import Token from "@/util/token-manager";
import { Grid } from "@mantine/core";
import { AxiosError } from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateUserProfileApi } from "@/api/update-user-profile";
import { useRouter } from "next/router";

export default function Profile() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<GetUserProfileResponse>({ firstname: "", lastname: "", email: "", phone_number: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfile(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const getUserPrfoile = async () => {
        const token = Token.getDescryptToken()
        try {
            const response: ResponseWithPayload<GetUserProfileResponse> = await getUserProfileApi(token.access_token)
            if (response.status.http_status === 200) {
                setUserProfile(response.payload)
            }
        } catch (error: any) {
            const axiosError = error as AxiosError<ResponseWithPayload<any>>;
            Swal.fire({
                icon: "error",
                title: "Please try again...",
                text: axiosError.response?.data.status.message,
            });
            Token.removeToken()
            router.push("/login")
        }
    }

    const updateUserProfile = async () => {
        const token = Token.getDescryptToken()
        const userUpdateProfile: UpdateUserProfile = {
            firstname: userProfile.firstname,
            lastname: userProfile.lastname,
            phone_number: userProfile.phone_number
        }
        try {
            const response: ResponseWithPayload<GetUserProfileResponse> = await updateUserProfileApi(token.access_token, userUpdateProfile)
            if (response.status.http_status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.status.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setUserProfile(response.payload)
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

    useEffect(() => {
        getUserPrfoile()
    }, [])

    return (
        <main>
            <Head>
                <title>Profile | Funchbook.com</title>
                <meta name="description" content="funchbook.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
            </Head>

            <SidebarLayout>
                <Grid columns={24}>
                    <Grid.Col md={8}></Grid.Col>
                    <Grid.Col md={8}>
                        <form className="mt-16" onSubmit={updateUserProfile}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
                                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your english firstname" required
                                        name="firstname"
                                        value={userProfile?.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your english lastname" required
                                        name="lastname"
                                        value={userProfile?.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" id="email" className="bg-neutral-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled
                                        name="email"
                                        value={userProfile?.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                    <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="012-345-6789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                                        name="phone_number"
                                        value={userProfile?.phone_number}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Apply Changes</button>
                            </div>
                        </form>
                    </Grid.Col>
                    <Grid.Col md={8}></Grid.Col>
                </Grid>
            </SidebarLayout>
        </main>
    )
}