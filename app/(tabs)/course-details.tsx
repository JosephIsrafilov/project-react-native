import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CourseDetailsScreen() {
  const router = useRouter();
  const [voice, setVoice] = useState<'male' | 'female'>('male');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.bannerBox}>
        <Image
          source={require('../../assets/course-details-banner.png')}
          style={styles.bannerImg}
        />

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#393939" />
        </TouchableOpacity>
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={24} color="#393939" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="download" size={24} color="#393939" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 22, backgroundColor: '#fff' }}>
        <Text style={styles.title}>Happy Morning</Text>
        <Text style={styles.type}>COURSE</Text>
        <Text style={styles.desc}>
          Ease the mind into a restful night’s sleep with{' '}
          these deep, ambient tones.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="heart" size={18} color="#FF6A6A" />
            <Text style={styles.statTxt}>24,234 Favorites</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="headphones" size={18} color="#8E97FD" />
            <Text style={styles.statTxt}>34,234 Listening</Text>
          </View>
        </View>

        <Text style={styles.pickTxt}>Pick a Narrator</Text>
        <View style={styles.voiceRow}>
          <TouchableOpacity
            style={[styles.voiceBtn, voice === 'male' && styles.voiceBtnActive]}
            onPress={() => setVoice('male')}
          >
            <Text style={[styles.voiceTxt, voice === 'male' && styles.voiceTxtActive]}>MALE VOICE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.voiceBtn, voice === 'female' && styles.voiceBtnActive]}
            onPress={() => setVoice('female')}
          >
            <Text style={[styles.voiceTxt, voice === 'female' && styles.voiceTxtActive]}>FEMALE VOICE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tracksSection}>
        <TrackItem title="Focus Attention" duration="10 MIN" active />
        <View style={styles.separator} />
        <TrackItem title="Body Scan" duration="5 MIN" />
        <View style={styles.separator} />
        <TrackItem title="Making Happiness" duration="3 MIN" />
      </View>
    </ScrollView>
  );
}

function TrackItem({ title, duration, active }: { title: string; duration: string; active?: boolean }) {
  return (
    <TouchableOpacity style={[trackStyles.item, active && trackStyles.itemActive]}>
      <View style={[trackStyles.iconWrap, active && trackStyles.iconWrapActive]}>
        <Ionicons name={active ? 'play' : 'play-outline'} size={22} color={active ? '#fff' : '#8E97FD'} />
      </View>
      <View>
        <Text style={[trackStyles.title, active && trackStyles.titleActive]}>{title}</Text>
        <Text style={trackStyles.duration}>{duration}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bannerBox: {
    width: width,
    height: 188,
    marginBottom: 8,
    position: 'relative',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 22,
    padding: 7,
  },
  topRightIcons: {
    position: 'absolute',
    top: 16,
    right: 14,
    flexDirection: 'row',
    gap: 10,
    zIndex: 2,
  },
  iconBtn: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 22,
    padding: 7,
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#393939',
    marginTop: 6,
  },
  type: {
    fontSize: 13,
    color: '#A1A4B2',
    fontWeight: 'bold',
    marginTop: 5,
    letterSpacing: 1,
  },
  desc: {
    fontSize: 15,
    color: '#A1A4B2',
    marginTop: 8,
    marginBottom: 10,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 6,
    gap: 22,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statTxt: {
    fontSize: 13,
    color: '#A1A4B2',
    fontWeight: '400',
  },
  pickTxt: {
    marginTop: 13,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#393939',
    marginBottom: 9,
  },
  voiceRow: {
    flexDirection: 'row',
    marginBottom: 13,
    gap: 8,
    borderBottomColor: '#ececec',
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
  voiceBtn: {
    flex: 1,
    paddingVertical: 7,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  voiceBtnActive: {
    borderBottomColor: '#8E97FD',
  },
  voiceTxt: {
    color: '#A1A4B2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  voiceTxtActive: {
    color: '#8E97FD',
  },
  tracksSection: {
    marginTop: 8,
    marginBottom: 35,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ECECEC',
    alignSelf: 'center',
  },
});

const trackStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 4,
    marginBottom: 0,
  },
  itemActive: {
    backgroundColor: '#8E97FD',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  iconWrapActive: {
    backgroundColor: '#706CFD',
  },
  title: {
    fontSize: 17,
    color: '#393939',
    fontWeight: '600',
  },
  titleActive: {
    color: '#fff',
  },
  duration: {
    fontSize: 13,
    color: '#A1A4B2',
    marginTop: 2,
  },
});
