import MainPage from "@/components/Home";
import About from "@/components/About";
import Events from "@/components/Events";
import Galery from "@/components/Galery";
import Movies from "@/components/Movies";
import Contact from "@/components/Contact";
import Musicians from "@/components/Musicians";
import PhotoComponent from "@/components/PhotoComponent";
import { useFirebaseData } from "@/context/firebaseDataContext";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const {
    introData,
    eventsData,
    offerData,
    aboutData,
    artistsData,
    galeryData,
    moviesData,
    contactData,
  } = useFirebaseData();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      introData.length > 0 &&
      eventsData.length > 0 &&
      offerData.length > 0 &&
      aboutData.length > 0 &&
      artistsData.length > 0 &&
      galeryData.length > 0 &&
      moviesData.length > 0 &&
      contactData.length > 0
    ) {
      setLoading(false);
    }
  }, [
    introData,
    eventsData,
    offerData,
    aboutData,
    artistsData,
    galeryData,
    moviesData,
    contactData,
  ]);

  if (loading) {
    return <Box sx={{display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><Image src={'/loadingGIF.gif'} width={300} height={200} alt="Ładowanie danych"/><span>Ładowanie</span></Box>;
  }

  return (
    <>
      <MainPage introData={introData} />
      <PhotoComponent introData={introData} />
      <About aboutData={aboutData} />
      <Events eventsData={eventsData} />
      <Musicians artistsData={artistsData} />
      <Galery galeryData={galeryData} />
      <Movies moviesData={moviesData[0]} />
      <Contact contactData={contactData} />
    </>
  );
}
