import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Button, Container, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { FirebaseError } from 'firebase/app';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      router.push('/admin');
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/wrong-password') {
          setError('Błędne hasło. Spróbuj ponownie.');
        } else if (err.code === 'auth/user-not-found') {
          setError('Użytkownik nie istnieje. Sprawdź adres e-mail.');
        } else {
          setError('Wystąpił błąd podczas logowania.');
        }
      } else {
        setError('Wystąpił nieoczekiwany błąd.');
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
          <Typography component="h1" variant="h5" align="center">
            Logowanie
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="hasło"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            
            {isLoading ? (
              <Box display="flex" justifyContent="center" sx={{ mt: 3, mb: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Zaloguj
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
