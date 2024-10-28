import { GetStaticProps } from 'next';
import MainPage from "@/components/Home";
import About from "@/components/About";
import Movies from "@/components/Movies";
import Contact from "@/components/Contact";
import PhotoComponent from "@/components/PhotoComponent";
import { Box } from "@mui/material";
import { db, storage } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { aboutType, artistsType, contactType, eventsType, galeryType, intro, moviesType, offerType } from '@/context/dataTypes';
import Events from '@/components/Events';
import Musicians from '@/components/Musicians';
import Galery from '@/components/Galery';
import Head from 'next/head';
import FadeInOnScroll from '@/components/FadeInOnScroll';
import dynamic from 'next/dynamic';
const StickyIcons = dynamic(() => import('@/components/StickyIcons'), { ssr: false });
type HomeProps = {
  introData: intro[];
  eventsData: eventsType[];
  offerData: offerType[];
  aboutData: aboutType[];
  artistsData: artistsType[];
  galeryData: galeryType[];
  moviesData: moviesType[];
  contactData: contactType[];
};

const getPDFURL = async (path: string): Promise<string> => {
  try {
    if (!path) return '';
    const pdfRef = ref(storage, path);
    const url = await getDownloadURL(pdfRef);
    return url;
  } catch (error) {
    console.error(`Błąd pobierania pliku PDF dla ścieżki: ${path}`, error);
    return '';
  }
};


export const getStaticProps: GetStaticProps = async () => {
  const fetchDataFromFirebase = async () => {
    try {
      const introSnapshot = await getDocs(collection(db, 'Intro'));
      const introDocuments = await Promise.all(
        introSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return {
            logo: await getImageURL(data.logo),
            portrait: await getImageURL(data.portrait)
          };
        })
      );

      const eventsSnapshot = await getDocs(collection(db, 'Events_m'));
      const eventsDocuments = eventsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          date: data.date || '',
          path: data.path || '',
          place: data.place || '',
          order: data.order || ''
        };
      });

      const offerSnapshot = await getDocs(collection(db, 'offer'));
      const offerDocuments = await Promise.all(
        offerSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          
          return {
            photoPath: await getImageURL(data.photo),
            pathPDF: await getPDFURL(data.path) || ''
          };
        })
      );

      const aboutSnapshot = await getDocs(collection(db, 'about'));
      const aboutDocuments = aboutSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.title || '',
          introText: data.introText || '',
          details: data.details || ''
        };
      });

      const artistsSnapshot = await getDocs(collection(db, 'artists'));
      const artistsDocuments = await Promise.all(
        artistsSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return {
            
            intro: data.intro || '',
            id: doc.id,
            name: data.name || '',
            role: data.role || '',
            photo: await getImageURL(data.photo),
            description: data.description || '',
            order: data.order || ''
          };
        })
      );

      const galerySnapshot = await getDocs(collection(db, 'photoSections'));
      const galeryDocuments = await Promise.all(
        galerySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const paths = await Promise.all(
            data.paths.map((path: string) => getImageURL(path))
          );
          return {
            id: doc.id,
            name: data.name || '',
            paths
          };
        })
      );

      const moviesSnapshot = await getDocs(collection(db, 'movies'));
      const moviesDocuments = await Promise.all(
        moviesSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return {
            paths: data.paths || []
          };
        })
      );

      const contactSnapshot = await getDocs(collection(db, 'contactData'));
      const contactDocuments = await Promise.all(
        contactSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || '',
            phone: data.phone || '',
            mail: data.mail || '',
            fbPath: data.fbPath || '',
            photo: await getImageURL(data.photo),
            order: data.order || ''
          };
        })
      );
      return {
        introData: introDocuments,
        eventsData: eventsDocuments,
        offerData: offerDocuments,
        aboutData: aboutDocuments,
        artistsData: artistsDocuments,
        galeryData: galeryDocuments,
        moviesData: moviesDocuments,
        contactData: contactDocuments,
      };
    } catch (error) {
      console.error('Błąd przy pobieraniu danych z Firebase: ', error);
      return {
        introData: [],
        eventsData: [],
        offerData: [],
        aboutData: [],
        artistsData: [],
        galeryData: [],
        moviesData: [],
        contactData: [],
      };
    }
  };

  const data = await fetchDataFromFirebase();

  return {
    props: data,
    revalidate: 5,
  };
};

const getImageURL = async (path: string): Promise<string> => {
  try {
    if (!path) return '';
    const imageRef = ref(storage, path);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error(`Błąd pobierania obrazu dla ścieżki: ${path}`, error);
    return '';
  }
};

const Home: React.FC<HomeProps> = ({
  introData,
  offerData,
  aboutData,
  eventsData,
  artistsData,
  galeryData,
  moviesData,
  contactData,
}) => {

  return (
    <>
    <Head>
      <title>Love Duet Operetka - Dorota Ritz i Paweł Wisnar | Duet Operetkowy Warszawa</title>
      <meta name="description" content="Love Duet Operetka - warszawski duet operetkowy z ponad dekadą doświadczenia na polskich i zagranicznych scenach. Dorota Ritz (sopran) i Paweł Wisnar (tenor) tworzą wyjątkowe, komediowe show operetkowo-musicalowe. Z miłością i pasją występujemy od 2010 roku, prezentując autorskie programy operetkowe, kabarety i koncerty w całej Polsce i za granicą." />
      <meta name="keywords" content="Love Duet, duet operetkowy, Dorota Ritz, Paweł Wisnar, warszawski duet śpiewaczy, show operetkowe, koncerty operetkowe, operetka Warszawa, muzyka klasyczna, duet muzyczny, koncerty muzyczne, kabaret miłości, operetka Przeboje, Kolędowanie z Love Duet, musical komediowy, duet operowy" />
      <meta property="og:title" content="Love Duet Operetka - Wyjątkowy Duet Operetkowy" />
      <meta property="og:description" content="Warszawski duet operetkowy z pasją i doświadczeniem - Dorota Ritz i Paweł Wisnar prezentują autorskie, komediowe show operetkowe. Ponad dekada występów na polskich i zagranicznych scenach!" />
      <meta property="og:image" content="URL_do_zdjęcia_duetu" />
      <meta property="og:url" content="https://loveduetoperetka.pl/" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Love Duet Operetka - Wyjątkowy Duet Operetkowy" />
      <meta name="twitter:description" content="Dorota Ritz i Paweł Wisnar tworzą warszawski duet operetkowy występujący od 2010 roku na polskich i zagranicznych scenach. Dołącz do nas na naszym muzycznym show!" />
      <meta name="twitter:image" content="URL_do_zdjęcia_duetu" />

    </Head>
    <Box sx={{ bgcolor: 'black' }}>
        <StickyIcons />
        <FadeInOnScroll>
          <MainPage introData={introData} />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <PhotoComponent introData={introData} />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <About aboutData={aboutData} />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Events eventsData={eventsData} offerData={offerData} />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Musicians artistsData={artistsData} />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Galery galeryData={galeryData} />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Movies moviesData={moviesData[0]} />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <Contact contactData={contactData} />
        </FadeInOnScroll>
      </Box>
    </>
  );
};

export default Home;
