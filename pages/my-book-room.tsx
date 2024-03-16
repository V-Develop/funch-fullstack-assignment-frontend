import { getUserBookedApi } from "@/api/get-user_booked";
import SidebarLayout from "@/components/Sidebar";
import UserBookTable from "@/components/UserBookTable";
import { ResponseWithPayload } from "@/model/response";
import { GetBookedDate, GetUserProfileResponse } from "@/model/user";
import Token from "@/util/token-manager";
import { Grid, Group } from "@mantine/core";
import { AxiosError } from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { getUserProfileApi } from "@/api/get-user-profile";

export default function MyBookedRoom() {
    const router = useRouter()
    const [userBooked, setUserBooked] = useState<GetBookedDate[]>([]);
    const [userProfile, setUserProfile] = useState<GetUserProfileResponse>({ firstname: "", lastname: "", email: "", phone_number: "" });

    const getUserBooked = async () => {
        const token = Token.getDescryptToken()
        try {
            const response: ResponseWithPayload<GetBookedDate[]> = await getUserBookedApi(token.access_token)
            if (response.status.http_status === 200) {
                setUserBooked(response.payload)
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

    useEffect(() => {
        getUserPrfoile()
        getUserBooked()
    }, [])

    return (
        <main>
            <Head>
                <title>My book room | Funchbook.com</title>
                <meta name="description" content="funchbook.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
            </Head>

            <SidebarLayout>
                <Grid columns={24}>
                    <Grid.Col md={1}></Grid.Col>
                    <Grid.Col md={22} mt={100}>
                        {userBooked.length === 0 ? (
                            <Group position="center">There are no room reservations yet.</Group>
                        ) : (
                            <UserBookTable bookdata={userBooked} />
                        )}
                    </Grid.Col>
                    <Grid.Col md={1}></Grid.Col>
                </Grid>
            </SidebarLayout>
        </main>
    )
}