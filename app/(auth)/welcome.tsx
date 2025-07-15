import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Image source={require('../../assets/girl-on-couch.png')} style={styles.illustration} />

      <Text style={styles.title}>We are what we do</Text>
      <Text style={styles.subtitle}>
        Thousand of people are using silent moon for smalls meditation
      </Text>

      <TouchableOpacity
        style={styles.mainBtn}
        activeOpacity={0.8}
        onPress={() => router.push('/(auth)/register')}
      >
        <Text style={styles.btnTxt}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')} activeOpacity={0.7}>
        <Text style={styles.loginTxt}>
          ALREADY HAVE AN ACCOUNT? <Text style={styles.loginLink}>LOG IN</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 36,
  },
  logo: {
    width: 132,
    height: 34,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 8,
    alignSelf: 'center',
  },
  illustration: {
    width: width * 0.65,
    height: width * 0.42,
    marginBottom: 18,
    marginTop: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3F414E',
    marginTop: 6,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#A1A4B2',
    textAlign: 'center',
    marginBottom: 38,
    lineHeight: 22,
    width: '90%',
    alignSelf: 'center',
  },
  mainBtn: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: '#8E97FD',
    paddingVertical: 16,
    borderRadius: 38,
    alignItems: 'center',
    marginBottom: 18,
    alignSelf: 'center',
    shadowColor: "#8E97FD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginTxt: {
    color: '#A1A4B2',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  loginLink: {
    color: '#8E97FD',
    fontWeight: 'bold',
  },
});
