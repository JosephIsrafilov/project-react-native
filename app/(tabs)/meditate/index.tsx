import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNav from '../../../components/BottomNav';

const categories = [
  { key: 'all', label: 'All', image: require('../../../assets/categories/all.png') },
  { key: 'my', label: 'My', image: require('../../../assets/categories/my.png') },
  { key: 'anxious', label: 'Anxious', image: require('../../../assets/categories/anxious.png') },
  { key: 'sleep', label: 'Sleep', image: require('../../../assets/categories/sleep.png') },
  { key: 'kids', label: 'Kids', image: require('../../../assets/categories/kids.png') },
];

export default function MeditateScreen() {
  const [activeCat, setActiveCat] = useState('all');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Meditate</Text>
        <Text style={styles.subheader}>
          we can learn how to recognize when our minds{"\n"}
          are doing their normal everyday acrobatics.
        </Text>

        {/* Категории */}
        <View style={styles.categoriesBar}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={styles.catBtn}
              onPress={() => setActiveCat(cat.key)}
              activeOpacity={0.85}
            >
              <View style={[
                styles.catImgWrap,
                activeCat === cat.key && styles.catImgWrapActive
              ]}>
                <Image source={cat.image} style={styles.catImg} />
              </View>
              <Text style={[
                styles.catLabel,
                activeCat === cat.key && styles.catLabelActive
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.dailyCalmBox}>
          <Image
            source={require('../../../assets/meditate-daily-calm.png')}
            style={styles.dailyCalmImg}
          />
        </TouchableOpacity>

        <View style={styles.cardsRow}>
          <TouchableOpacity activeOpacity={0.9}>
            <Image
              source={require('../../../assets/meditate-7days.png')}
              style={styles.cardTall}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Image
              source={require('../../../assets/meditate-anxiety-release.png')}
              style={styles.cardShort}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardsRow}>
          <TouchableOpacity activeOpacity={0.9}>
            <Image
              source={require('../../../assets/meditate-card3.png')}
              style={styles.cardShort}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Image
              source={require('../../../assets/meditate-card4.png')}
              style={styles.cardTall}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav active="meditate" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 140,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#393939',
    textAlign: 'center',
    marginTop: 44,
    marginBottom: 10,
  },
  subheader: {
    color: '#A1A4B2',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 28,
  },
   categoriesBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginBottom: 16,
    marginTop: 3,
  },
  catBtn: {
    width: 65,
    height: 92,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  catImgWrap: {
    width: 65,
    height: 65,
    borderRadius: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  catImgWrapActive: {
    backgroundColor: '#8E97FD22',
  },
  catImg: {
    width: 65,
    height: 65,
    borderRadius: 25,
  },
  catLabel: {
    color: '#A1A4B2',
    fontWeight: '500',
    fontSize: 13,
    marginTop: 2,
    textAlign: 'center',
  },
  catLabelActive: {
    color: '#8E97FD',
    fontWeight: '700',
  },
  dailyCalmBox: {
    alignSelf: 'center',
    marginBottom: 13,
  },
  dailyCalmImg: {
    width: 374,
    height: 95,
    borderRadius: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 11,
  },
  cardTall: {
    width: 176.4,
    height: 210,
    borderRadius: 16,
  },
  cardShort: {
    width: 176.4,
    height: 167,
    borderRadius: 16,
  },
});

