import { CustomFlowbiteTheme, Navbar, Sidebar } from 'flowbite-react';
import { CalendarIcon, ProfileIcon, LogoutIcon, EventNoteIcon } from './Icon';
import { Grid } from '@mantine/core';
import FooterLayout from './Footer';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Token from '@/util/token-manager';

interface ContentProps {
  children: JSX.Element;
}

export default function SidebarLayout(props: ContentProps) {
  const router = useRouter()
  const customTheme: CustomFlowbiteTheme['sidebar'] = {
    root: {
      base: 'bg-gray-800',
      inner: 'bg-gray-800'
    },
  }
  const handleLogout = async () => {
    Token.removeToken()
    router.push("/login")
  }

  return (
    <>
      <div className="bg-amber-400" style={{ height: "6vh" }}>
        <Navbar
          fluid={true}
          className="bg-amber-400"
        >
          <Navbar.Brand href="http://localhost:3000/">
            <Image
              src="/icon.png"
              className="mr-3 h-6 sm:h-9"
              alt="funch book brand"
              style={{ height: "auto", width: "auto", filter: 'drop-shadow(0 0 0.2rem white) drop-shadow(0 0 0.2rem white)' }}
              width={32}
              height={32}
              priority
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white" style={{ textShadow: "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff" }}>
              Funch Hotel
            </span>
          </Navbar.Brand>
        </Navbar>
      </div>
      <Grid columns={12} mt={1}>
        <Grid.Col md={2} style={{ padding: 0 }}>
          <Sidebar
            aria-label="sidebar"
            style={{ padding: "15px", height: "93vh", width: "100%" }}
            theme={customTheme}
          >

            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="/profile" icon={ProfileIcon}>
                  <p className='text-white'>Profile</p>
                </Sidebar.Item>
                <Sidebar.Item href="/book-a-room" icon={CalendarIcon}>
                  <p className='text-white'>Book a room</p>
                </Sidebar.Item>
                <Sidebar.Item href="/my-book-room" icon={EventNoteIcon}>
                  <p className='text-white'>My book room</p>
                </Sidebar.Item>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <Sidebar.Item icon={LogoutIcon}>
                  <p className='text-white' onClick={handleLogout}>Logout</p>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Grid.Col>
        <Grid.Col md={10} className='bg-gray-50' styles={{ width: "100%", padding: 0 }}>
          {props.children}
          <FooterLayout />
        </Grid.Col>
      </Grid>
    </>
  )
}