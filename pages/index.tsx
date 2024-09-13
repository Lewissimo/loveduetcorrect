import { GetStaticProps } from 'next';
import MainPage from "@/components/Home";
import About from "@/components/About";
import Events from "@/components/Events";
import Galery from "@/components/Galery";
import Movies from "@/components/Movies";
import Contact from "@/components/Contact";
import Musicians from "@/components/Musicians";
import PhotoComponent from "@/components/PhotoComponent";
import { Box } from "@mui/material";
import { db, storage } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { aboutType, artistsType, contactType, eventsType, galeryType, intro, moviesType, offerType } from '@/context/firebaseDataContext';

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

      const eventsSnapshot = await getDocs(collection(db, 'Events'));
      const eventsDocuments = eventsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name || '',
          date: data.date || '',
          path: data.path || ''
        };
      });

      const offerSnapshot = await getDocs(collection(db, 'offer'));
      const offerDocuments = await Promise.all(
        offerSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          return {
            photoPath: await getImageURL(data.photoPath),
            pathPDF: data.pathPDF || ''
          };
        })
      );

      const aboutSnapshot = await getDocs(collection(db, 'about'));
      const aboutDocuments = aboutSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
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
            name: data.name || '',
            role: data.role || '',
            photo: await getImageURL(data.photo),
            description: data.description || ''
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
            name: data.name || '',
            phone: data.phone || '',
            mail: data.mail || '',
            fbPath: data.fbPath || '',
            photo: await getImageURL(data.photo)
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
    revalidate: 60,
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
  eventsData,
  offerData,
  aboutData,
  artistsData,
  galeryData,
  moviesData,
  contactData,
}) => {
  return (
    <Box sx={{ bgcolor: 'black' }}>
      <MainPage introData={introData} />
      <PhotoComponent introData={introData} />
      <About aboutData={aboutData} />
      <Events eventsData={eventsData} />
      <Musicians artistsData={artistsData} />
      <Galery galeryData={galeryData} />
      <Movies moviesData={moviesData[0]} />
      <Contact contactData={contactData} />
    </Box>
  );
};

export default Home;
