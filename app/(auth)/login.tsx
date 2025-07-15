import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

 const handleLogin = async () => {
  try {
    await login(email, password);
    router.replace('/(onboarding)/intro'); 
  } catch (e: any) {
    alert('Authentication error: ' + e.message);
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/girl-on-couch.png')} style={styles.illustration} />
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={{ width: '100%', marginVertical: 16 }}>
        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="facebook" size={22} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.socialTxt}>CONTINUE WITH FACEBOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtnOutline}>
          <FontAwesome name="google" size={22} color="#4285F4" style={{ marginRight: 10 }} />
          <Text style={styles.socialTxtBlack}>CONTINUE WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.orTxt}>OR LOG IN WITH EMAIL</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={!showPass}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPass((prev) => !prev)}>
          <Ionicons name={showPass ? 'eye-outline' : 'eye-off-outline'} size={22} color="#3F414E" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginTxt}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotTxt}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>DON'T HAVE AN ACCOUNT? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.footerLink}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  illustration: { width: 200, height: 120, resizeMode: 'contain', marginTop: 48, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 26, marginBottom: 8 },
  socialBtn: {
    backgroundColor: '#706CFD',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialBtnOutline: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialTxt: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  socialTxtBlack: { color: '#222', fontWeight: 'bold', fontSize: 15 },
  orTxt: { color: '#aaa', marginVertical: 10, alignSelf: 'center' },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F8',
    borderRadius: 14,
    marginBottom: 14,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#F7F8F8',
  },
  input: {
    flex: 1,
    padding: 18,
    fontSize: 16,
    backgroundColor: '#F7F8F8',
    borderRadius: 14,
    color: '#3F414E',
  },
  loginBtn: { width: '100%', backgroundColor: '#706CFD', borderRadius: 16, padding: 16, alignItems: 'center', marginVertical: 12 },
  loginTxt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  forgotTxt: { color: '#706CFD', alignSelf: 'flex-end', marginVertical: 6, fontSize: 13 },
  footer: { flexDirection: 'row', marginTop: 30 },
  footerLink: { color: '#706CFD', fontWeight: 'bold' },
});