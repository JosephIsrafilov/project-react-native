import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNav from '../../../components/BottomNav';
import { useAuth } from '../../../contexts/AuthContext';
import { firestore } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsername() {
      if (user?.uid) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data()?.username ?? null);
        }
      }
    }
    fetchUsername();
  }, [user]);

  const goToCourse = () => router.push('/(tabs)/course-details');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.greetBox}>
          <Text style={styles.greeting}>
            Good Morning,{' '}
            <Text style={styles.greetingBold}>{username ?? 'User'}</Text>
          </Text>
          <Text style={styles.subGreeting}>We Wish you have a good day</Text>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity onPress={goToCourse} activeOpacity={0.8}>
            <Image source={require('../../../assets/basics-card.png')} style={styles.basicCard} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToCourse} activeOpacity={0.8}>
            <Image source={require('../../../assets/relaxation-card.png')} style={styles.relaxationCard} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={goToCourse} activeOpacity={0.8}>
          <Image source={require('../../../assets/daily-thought-card.png')} style={styles.dailyThoughtCard} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <View style={styles.recommendedRow}>
          <TouchableOpacity onPress={goToCourse} activeOpacity={0.8}>
            <Image source={require('../../../assets/focus-card.png')} style={styles.recommendCard} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToCourse} activeOpacity={0.8}>
            <Image source={require('../../../assets/happiness-card.png')} style={styles.recommendCard} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 130,
  },
  logo: {
    width: 168,
    height: 30,
    marginTop: 50,
    alignSelf: 'center',
  },
  greetBox: {
    marginTop: 30,
    marginLeft: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#393939',
    fontWeight: '400',
  },
  greetingBold: {
    fontWeight: '700',
  },
  subGreeting: {
    fontSize: 15,
    color: '#A1A4B2',
    marginTop: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginLeft: 20,
    marginRight: 17,
  },
  basicCard: {
    width: 177,
    height: 210,
    borderRadius: 16,
  },
  relaxationCard: {
    width: 177,
    height: 210,
    borderRadius: 16,
  },
  dailyThoughtCard: {
    width: 374,
    height: 95,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#393939',
    marginLeft: 20,
    marginTop: 28,
    marginBottom: 16,
  },
  recommendedRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20,
    gap: 13,
  },
  recommendCard: {
    width: 162,
    height: 161,
    borderRadius: 16,
    marginRight: 13,
  },
});
