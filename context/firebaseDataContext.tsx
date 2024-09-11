import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '@/firebase/firebase'; // dodaj tutaj storage

export type intro = {
  logo: string;
  portrait: string;
};

export type eventsType = {
  name: string;
  date: string;
  path: string;
};

export type offerType = {
  photoPath: string;
  pathPDF: string;
};

export type aboutType = {
  name: string;
  introText: string;
  details: string[];
};

export type artistsType = {
  name: string;
  role: string;
  photo: string;
  description: string;
};

export type galeryType = {
  name: string;
  paths: string[];
};

export type moviesType = {
  paths: string[];
};

export type contactType = {
  name: string;
  phone: string;
  mail: string;
  fbPath: string;
  photo: string;
};

interface FirebaseDataContextType {
  introData: intro[];
  eventsData: eventsType[];
  offerData: offerType[];
  aboutData: aboutType[];
  artistsData: artistsType[];
  galeryData: galeryType[];
  moviesData: moviesType[];
  contactData: contactType[];
}

const FirebaseDataContext = createContext<FirebaseDataContextType | undefined>(undefined);

export const useFirebaseData = (): FirebaseDataContextType => {
  const context = useContext(FirebaseDataContext);
  if (!context) {
    throw new Error('useFirebaseData musi być używane wewnątrz FirebaseDataProvider');
  }
  return context;
};

interface FirebaseDataProviderProps {
  children: ReactNode;
}

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

export const FirebaseDataProvider: React.FC<FirebaseDataProviderProps> = ({ children }) => {
  const [introData, setIntroData] = useState<intro[]>([]);
  const [eventsData, setEventsData] = useState<eventsType[]>([]);
  const [offerData, setOfferData] = useState<offerType[]>([]);
  const [aboutData, setAboutData] = useState<aboutType[]>([]);
  const [artistsData, setArtistsData] = useState<artistsType[]>([]);
  const [galeryData, setGaleryData] = useState<galeryType[]>([]);
  const [moviesData, setMoviesData] = useState<moviesType[]>([]);
  const [contactData, setContactData] = useState<contactType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const introSnapshot = await getDocs(collection(db, 'Intro'));
        const introDocuments = await Promise.all(
          introSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            return {
              logo: await getImageURL(data.logo),
              portrait: await getImageURL(data.portrait)
            } as intro;
          })
        );
        setIntroData(introDocuments);

        const eventsSnapshot = await getDocs(collection(db, 'Events'));
        const eventsDocuments = eventsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name || '',
            date: data.date || '',
            path: data.path || ''
          } as eventsType;
        });
        setEventsData(eventsDocuments);

        const offerSnapshot = await getDocs(collection(db, 'offer'));
        const offerDocuments = await Promise.all(
          offerSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            return {
              photoPath: await getImageURL(data.photoPath),
              pathPDF: data.pathPDF || ''
            } as offerType;
          })
        );
        setOfferData(offerDocuments);

        const aboutSnapshot = await getDocs(collection(db, 'about'));
        const aboutDocuments = aboutSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.title || '',
            introText: data.introText || '',
            details: data.details || ''
          } as aboutType;
        });
        setAboutData(aboutDocuments);

        const artistsSnapshot = await getDocs(collection(db, 'artists'));
        const artistsDocuments = await Promise.all(
          artistsSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            return {
              name: data.name || '',
              role: data.role || '',
              photo: await getImageURL(data.photo),
              description: data.description || ''
            } as artistsType;
          })
        );
        setArtistsData(artistsDocuments);

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
            } as galeryType;
          })
        );
        console.log(galeryDocuments)
        setGaleryData(galeryDocuments);

        const moviesSnapshot = await getDocs(collection(db, 'movies'));
        const moviesDocuments = await Promise.all(
          moviesSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const paths = data.paths
            return {
              paths
            } as moviesType;
          })
        );
        setMoviesData(moviesDocuments);

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
            } as contactType;
          })
        );
        console.log(contactDocuments);
        setContactData(contactDocuments);
      } catch (error) {
        console.error('Błąd przy pobieraniu danych z Firestore: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <FirebaseDataContext.Provider
      value={{
        introData,
        eventsData,
        offerData,
        aboutData,
        artistsData,
        galeryData,
        moviesData,
        contactData,
      }}
    >
      {children}
    </FirebaseDataContext.Provider>
  );
};
