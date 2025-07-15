import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Svg, { G, Rect, Line, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeBlend } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BottomNav({ active = 'home' }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Svg width={415} height={134} viewBox="0 0 415 134" fill="none" style={styles.svgBg}>
        <G filter="url(#filter0_d_0_1)">
          <Rect x="0.5" y="22" width="414" height="112" fill="#fff" />
        </G>
        <Line x1="139" y1="117.5" x2="277" y2="117.5" stroke="#E6E6E6" strokeWidth={5} strokeLinecap="round" />
        <Defs>
          <Filter id="filter0_d_0_1" x="-14.5" y="0" width="448" height="146" filterUnits="userSpaceOnUse">
            <FeFlood floodOpacity="0" result="BackgroundImageFix" />
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <FeOffset dx="2" dy="-5" />
            <FeGaussianBlur stdDeviation="8.5" />
            <FeColorMatrix type="matrix" values="0 0 0 0 0.329412 0 0 0 0 0.341961 0 0 0 0 0.360784 0 0 0 0.1 0" />
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
          </Filter>
        </Defs>
      </Svg>

      <View style={styles.navRow}>
        <NavButton
          label="Home"
          icon={<Ionicons name="home" size={28} color={active === 'home' ? "#8E97FD" : "#A0A3B1"} />}
          active={active === 'home'}
          onPress={() => router.replace('/(tabs)/home')}
        />
        <NavButton
          label="Sleep"
          icon={<Ionicons name="moon" size={28} color={active === 'sleep' ? "#8E97FD" : "#A0A3B1"} />}
          active={active === 'sleep'}
          onPress={() => router.replace('/(tabs)/sleep')}
        />
        <NavButton
          label="Meditate"
          icon={<Ionicons name="flower-outline" size={28} color={active === 'meditate' ? "#8E97FD" : "#A0A3B1"} />}
          active={active === 'meditate'}
          onPress={() => router.replace('/(tabs)/meditate')}
        />
        <NavButton
          label="Music"
          icon={<Ionicons name="musical-notes" size={28} color={active === 'music' ? "#8E97FD" : "#A0A3B1"} />}
          active={active === 'music'}
          onPress={() => router.replace('/(tabs)/music')}
        />
        <NavButton
          label="Profile"
          icon={<MaterialCommunityIcons name="account-circle" size={28} color={active === 'profile' ? "#8E97FD" : "#A0A3B1"} />}
          active={active === 'profile'}
          onPress={() => router.replace('/(tabs)/profile')}
        />
      </View>
    </View>
  );
}

function NavButton({ label, icon, active, onPress }: any) {
  return (
    <TouchableOpacity style={styles.navBtn} onPress={onPress} activeOpacity={0.8}>
      {icon}
      <Text style={[styles.navText, active && { color: "#8E97FD", fontWeight: "bold" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  svgBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navRow: {
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: '4%',
    right: '4%',
    height: 56,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: "#A0A3B1",
    marginTop: 4,
  },
});
