import { Carousel } from 'flowbite-react';

export default function RoomCarousel() {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-4">
            <Carousel pauseOnHover>
                <img src="/premium_room.jpg" alt="premium room" />
                <img src="/standard_room.jpg" alt="standard room" />
                <img src="/eco_room.jpg" alt="eco room" />
            </Carousel>
        </div>
    );
}
