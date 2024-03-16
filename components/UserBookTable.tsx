import { GetBookedDate } from '@/model/user';
import { Box } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

interface UserBookedProps {
    bookdata: GetBookedDate[]
}
export default function UserBookTable(data: UserBookedProps) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(data.bookdata.slice(0, PAGE_SIZE));

    function formatDate(dateString: string) {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    }

    function formatCreateAndUpdateDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' });
    }

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(data.bookdata.slice(from, to));
    }, [page]);

    return (
        <Box sx={{ height: 500 }}>
            <DataTable
                withBorder
                records={records}
                columns={[
                    { accessor: 'checkin_at', width: 50, render: ({ checkin_at }) => formatDate(checkin_at) },
                    { accessor: 'checkout_at', width: 50, render: ({ checkout_at }) => formatDate(checkout_at) },
                    { accessor: 'firstname', width: 70 },
                    { accessor: 'lastname', width: 70 },
                    { accessor: 'email', width: 100 },
                    { accessor: 'phone_number', width: 50 },
                    { accessor: 'created_at', width: 70, render: ({ created_at }) => formatCreateAndUpdateDate(created_at) },
                ]}
                totalRecords={data.bookdata.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={(p) => setPage(p)}
                idAccessor="email"
            ></DataTable>
        </Box>
    );
}