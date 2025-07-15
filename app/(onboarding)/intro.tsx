import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth, firestore } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

export default function Intro() {
  const router = useRouter();
  const user = auth.currentUser;

  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user) return;
      try {
        const docSnap = await getDoc(doc(firestore, 'users', user.uid));
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        } else {
          setUsername(null);
        }
      } catch {
        setUsername(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUsername();
  }, [user]);

  //сделал потому что на телефоне через expo go очень долго грузит а на эмуляторе быстро видимо,возможности проверить нет 
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#FFECCC" />
      </SafeAreaView>
    );
  }

  const emailName = user?.email?.split('@')[0] ?? 'User';
  const name = username || emailName;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/welcomelogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.header}>
        <Text style={styles.title}>Hi {name}, Welcome</Text>
        <Text style={styles.subtitle}>to Silent Moon</Text>
        <Text style={styles.desc}>
          Explore the app, Find some peace of mind to{'\n'}
          prepare for meditation.
        </Text>
      </View>

      <Image
        source={require('../../assets/meditation.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/(onboarding)/choose-topic')}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AA2FD',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 54,
    paddingBottom: 32,
  },
  logo: {
    width: 160,
    height: 38,
    marginTop: 10,
    marginBottom: 44,
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    fontSize: 30,
    color: '#FFECCC',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '100',
    fontSize: 30,
    color: '#FFECCC',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  desc: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 16,
    color: '#FFECCC',
    textAlign: 'center',
    lineHeight: 27,
    letterSpacing: 0,
  },
  image: {
    width: width * 0.85,
    height: width * 0.62,
    marginTop: 10,
    marginBottom: 28,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingVertical: 18,
    width: width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 0,
  },
  buttonText: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    fontSize: 18,
    color: '#3F414E',
    letterSpacing: 1,
  },
});
