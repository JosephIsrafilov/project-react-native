import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import React from 'react';

function RootNavigation() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) return;
    if (!user && segments[0] !== '(auth)') {
      router.replace('/(auth)/login');
    }
    if (user && segments[0] === '(auth)') {
      router.replace('/(onboarding)/intro');
    }
  }, [user, segments, loading]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
