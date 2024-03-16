import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import LandingNavbar from "@/components/Navbar";
import FooterLayout from "@/components/Footer";
import { Grid } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Head>
        <title>Home | Funchbook.com</title>
        <meta name="description" content="funchbook.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <LandingNavbar></LandingNavbar>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          backgroundImage: 'url("/landing.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          <p style={{ fontSize: "48px" }}>Book Your Summer</p>
          <p style={{ fontSize: "36px" }}>holidays With hotel</p>
        </div>
      </div>

      <Grid columns={12}>
        <Grid.Col md={6} className="text-center ">
          <p style={{ padding: '20px', border: '3px solid black', borderRadius: '10px', display: 'inline-block', margin: "30%", backgroundColor: "#fbbf24", fontSize: "48px", textShadow: '2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white' }}>Free Breakfast</p>
        </Grid.Col>
        <Grid.Col md={6}>
          <Image src={"/dining.jpg"} height={600} width={600} alt="dining" style={{ marginTop: "20%", borderRadius: "50%" }}></Image>
        </Grid.Col>
      </Grid>

      <Grid columns={12} style={{ marginBottom: "20%" }}>
        <Grid.Col md={6}>
          <Image src={"/beach.jpeg"} height={600} width={600} alt="dining" style={{ marginTop: "10%", marginLeft: "15%", borderRadius: "50%" }}></Image>
        </Grid.Col>
        <Grid.Col md={6} className="text-center" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginLeft: "20%", marginTop: "20%", padding: '20px', border: '3px solid black', borderRadius: '10px', backgroundColor: "#fbbf24", fontSize: "48px", textShadow: '2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white' }}>
            Connect with Nature
          </div>
        </Grid.Col>
      </Grid>

      <FooterLayout />

    </main>
  );
}
