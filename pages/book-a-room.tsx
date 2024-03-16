import RoomCarousel from "@/components/RoomCarousel";
import SidebarLayout from "@/components/Sidebar";
import { Button, Grid, Group, Input, Modal, ScrollArea } from "@mantine/core";
import { Badge } from "flowbite-react";
import { DatePicker, DatePickerInput as _DatePickerInput } from '@mantine/dates';
import Head from "next/head";
import { useEffect, useState } from "react";
import Token from "@/util/token-manager";
import { ResponseWithPayload, ResponseWithoutPayload } from "@/model/response";
import { CreateBookRoom, GetBookedDate, GetUserProfileResponse } from "@/model/user";
import { getUserProfileApi } from "@/api/get-user-profile";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { createBookRoomApi } from "@/api/create-book-room";
import { getBookedDateApi } from "@/api/get-booked-date";
import { getAllBookedDates, hasUnallowedDates } from "@/util/booking-date";
import { useRouter } from "next/router";

const DatePickerInput = _DatePickerInput as any;

export default function BookingRoom() {
    const router = useRouter()
    const [rangeDate, setRangeDate] = useState<[Date | null, Date | null]>([null, null]);
    const [singleDate, setSingleDate] = useState<Date | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<GetUserProfileResponse>({ firstname: "", lastname: "", email: "", phone_number: "" });
    const [excludeDate, setExcludeDate] = useState<Date[]>();

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

    const getBookedRoom = async () => {
        const token = Token.getDescryptToken()
        try {
            const response: ResponseWithPayload<GetBookedDate[]> = await getBookedDateApi(token.access_token)
            if (response.status.http_status === 200) {
                setExcludeDate(getAllBookedDates(response.payload))
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

    const createBookRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = Token.getDescryptToken()
        const userBookRoom: CreateBookRoom = {
            checkin_at: rangeDate[0]!.toISOString().slice(0, -5) + "Z",
            checkout_at: rangeDate[1]!.toISOString().slice(0, -5) + "Z",
            email: userProfile.email,
            firstname: userProfile.firstname,
            lastname: userProfile.lastname,
            phone_number: userProfile.phone_number
        }
        if (hasUnallowedDates(rangeDate[0], rangeDate[1], excludeDate)) {
            Swal.fire({
                icon: "error",
                title: "Please try again...",
                text: "Book date contain unallow date",
            });
            return
        }
        try {
            const response: ResponseWithoutPayload = await createBookRoomApi(token.access_token, userBookRoom)
            if (response.status.http_status === 200) {
                Swal.fire({
                    icon: "success",
                    title: response.status.message,
                    showConfirmButton: false,
                    timer: 1500
                });
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
        getUserPrfoile()
        getBookedRoom()
    }, [])

    return (
        <main>
            <Head>
                <title>Book a room | Funchbook.com</title>
                <meta name="description" content="funchbook.com" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icon.png" />
            </Head>

            <SidebarLayout>
                <Grid columns={24}>
                    <Grid.Col md={8}></Grid.Col>
                    <Grid.Col md={8}>
                        <RoomCarousel />
                        <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge color="warning" className="ml-5">คลิ๊กหน้าปฏิทิน เพื่อเริ่มจองห้องพักได้เลย!</Badge>
                                </div>
                                <DatePicker
                                    value={singleDate} onChange={setSingleDate}
                                    onClick={() => {
                                        setModalOpen(true)
                                    }}
                                />
                                <Modal
                                    title="Booking Details"
                                    opened={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                    size="lg"
                                    scrollAreaComponent={ScrollArea.Autosize}
                                    centered
                                >
                                    <form onSubmit={createBookRoom}>
                                        <DatePickerInput
                                            type="range"
                                            label="Checkin - Checkout"
                                            placeholder="Pick dates range"
                                            value={rangeDate}
                                            onChange={setRangeDate}
                                            mx="auto"
                                            maw={400}
                                            minDate={new Date()}
                                            excludeDate={(date: any) => excludeDate!.some(excludeDate => excludeDate.getTime() === date.getTime())}
                                            clearable
                                        />
                                        <Input
                                            mt={25}
                                            mx="auto"
                                            maw={400}
                                            placeholder="Your email"
                                            name="email"
                                            onChange={handleChange}
                                            value={userProfile.email}
                                        />
                                        <Input
                                            mt={25}
                                            mx="auto"
                                            maw={400}
                                            placeholder="Your firstname"
                                            name="firstname"
                                            onChange={handleChange}
                                            value={userProfile.firstname}
                                        />
                                        <Input
                                            mt={25}
                                            mx="auto"
                                            maw={400}
                                            placeholder="Your lastname"
                                            name="lastname"
                                            onChange={handleChange}
                                            value={userProfile.lastname}
                                        />
                                        <Input
                                            mt={25}
                                            mx="auto"
                                            maw={400}
                                            placeholder="Your phone number"
                                            name="phone_number"
                                            onChange={handleChange}
                                            value={userProfile.phone_number}
                                        />
                                        <Group mt="xl" position="right">
                                            <Button variant="outline" type="submit">
                                                Book Room
                                            </Button>
                                        </Group>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                    </Grid.Col>
                    <Grid.Col md={8}></Grid.Col>
                </Grid>
            </SidebarLayout>
        </main>
    )
}