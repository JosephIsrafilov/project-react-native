import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Linking, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; 
import { auth } from '../../firebaseConfig';



export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'ok' | 'exists' | 'checking'>('idle');
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'ok' | 'exists' | 'checking'>('idle');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const checkEmailExists = async (mail: string) => {
    if (!mail || !mail.includes('@')) return setEmailStatus('idle');
    setEmailStatus('checking');
    try {
      const methods = await fetchSignInMethodsForEmail(auth, mail);
      setEmailStatus(methods.length ? 'exists' : 'ok');
    } catch (err) {
      setEmailStatus('idle');
    }
  };

  
  const checkUsernameExists = async (name: string) => {
    if (!name) return setUsernameStatus('idle');
    setUsernameStatus('checking');
    try {
      const q = query(
        collection(firestore, 'users'),
        where('username', '==', name)
      );
      const snapshot = await getDocs(q);
      setUsernameStatus(snapshot.empty ? 'ok' : 'exists');
    } catch (err) {
      setUsernameStatus('idle');
    }
  };

  const handleRegister = async () => {
  if (!agreed) {
    alert('Please agree to the Privacy Policy');
    return;
  }
  try {
    
    const userCred = await register(email, password);
    const uid = userCred?.user?.uid || auth.currentUser?.uid;
    if (uid) {
      await setDoc(doc(firestore, 'users', uid), {
        username,
        email,
      });
    }
  } catch (e: any) {
    alert('Ошибка регистрации: ' + e.message);
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/auth-illustration.png')} style={styles.illustration} />
      <Text style={styles.title}>Create your account</Text>

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
          placeholder="Username"
          value={username}
          autoCapitalize="none"
          onChangeText={text => {
            setUsername(text);
            setUsernameStatus('idle');
            if (text.length > 2) checkUsernameExists(text);
          }}
        />
        {usernameStatus === 'checking' && <ActivityIndicator size="small" color="#aaa" />}
        {usernameStatus === 'ok' && <Ionicons name="checkmark" size={22} color="#5EB872" />}
        {usernameStatus === 'exists' && <Ionicons name="close" size={22} color="#E76363" />}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={text => {
            setEmail(text);
            setEmailStatus('idle');
            if (text.includes('@')) checkEmailExists(text);
          }}
        />
        {emailStatus === 'checking' && <ActivityIndicator size="small" color="#aaa" />}
        {emailStatus === 'ok' && <Ionicons name="checkmark" size={22} color="#5EB872" />}
        {emailStatus === 'exists' && <Ionicons name="close" size={22} color="#E76363" />}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={!showPass}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPass(p => !p)}>
          <Ionicons name={showPass ? 'eye-outline' : 'eye-off-outline'} size={22} color="#3F414E" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.privacyRow}
        activeOpacity={0.7}
        onPress={() => setAgreed(a => !a)}
      >
        <Text style={{ color: '#A1A4B2', fontSize: 14, marginRight: 4 }}>i have read the</Text>
        <Text
          style={{ color: '#7583CA', fontSize: 14, textDecorationLine: 'underline', marginRight: 8 }}
          onPress={() => Linking.openURL('https://policies.google.com/privacy?hl=en-US')}
        >
          Privacy Policy
        </Text>
        <Ionicons name={agreed ? 'checkbox-outline' : 'square-outline'} size={22} color={agreed ? '#8E97FD' : '#BFC2DF'} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} disabled={!agreed}>
        <Text style={styles.loginTxt}>GET STARTED</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>ALREADY HAVE AN ACCOUNT? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.footerLink}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  illustration: { 
    width: 200, 
    height: 120, 
    resizeMode: 'contain', 
    marginTop: 48, 
    marginBottom: 10 },
  logo: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    color: '#706CFD', 
    marginVertical: 12, 
    letterSpacing: 2 },
  title: { 
    fontWeight: 'bold', 
    fontSize: 26, 
    marginBottom: 8 },
  socialBtn: { 
    backgroundColor: '#706CFD', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 10, 
    alignItems: 'center' },
  socialBtnOutline: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 16, 
    marginBottom: 10, 
    alignItems: 'center' },
  socialTxt: { 
    color: '#fff', 
    fontWeight: 'bold' },
  socialTxtBlack: { 
    color: '#222', 
    fontWeight: 'bold' },
  orTxt: { 
    color: '#aaa', 
    marginVertical: 10 },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#ececec', 
    borderRadius: 14, 
    padding: 16, 
    marginBottom: 16, 
    fontSize: 16, 
    backgroundColor: '#f8f8fa' },
  loginBtn: { 
    width: '100%', 
    backgroundColor: '#706CFD', 
    borderRadius: 16, 
    padding: 16, 
    alignItems: 'center', 
    marginVertical: 12 },
  loginTxt: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 },
  privacyRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 },
  footer: { 
    flexDirection: 'row', 
    marginTop: 16 },
  footerLink: { 
    color: '#706CFD', 
    fontWeight: 'bold' 
  },
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

});
