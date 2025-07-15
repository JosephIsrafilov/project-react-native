import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChooseTopicScreen() {
  const router = useRouter();


  const handleChoose = (topic: string) => {
    
    router.push('/(onboarding)/reminders');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        What Brings you{'\n'}
        <Text style={styles.bold}>to Silent Moon?</Text>
      </Text>
      <Text style={styles.subtitle}>choose a topic to focus on:</Text>
      <View style={styles.grid}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.cardReduceStress} activeOpacity={0.85} onPress={() => handleChoose('reduce-stress')}>
            <Image source={require('../../assets/reduce-stress-card.png')} style={styles.cardImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardImprovePerf} activeOpacity={0.85} onPress={() => handleChoose('improve-performance')}>
            <Image source={require('../../assets/improve-performance-card.png')} style={styles.cardImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.cardIncreaseHap} activeOpacity={0.85} onPress={() => handleChoose('increase-happiness')}>
            <Image source={require('../../assets/increase-happiness-card.png')} style={styles.cardImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardReduceAnx} activeOpacity={0.85} onPress={() => handleChoose('reduce-anxiety')}>
            <Image source={require('../../assets/reduce-anxiety-card.png')} style={styles.cardImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.cardPersonalGrowth} activeOpacity={0.85} onPress={() => handleChoose('personal-growth')}>
            <Image source={require('../../assets/personal-growth-card.png')} style={styles.cardImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardBetterSleep} activeOpacity={0.85} onPress={() => handleChoose('better-sleep')}>
            <Image source={require('../../assets/better-sleep-card.png')} style={styles.cardImg} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 17,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 2,
    color: '#393939',
    textAlign: 'left',
  },
  bold: {
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    color: '#A1A4B2',
    marginBottom: 22,
    marginTop: 6,
  },
  grid: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 17,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardReduceStress: {
    width: 176.43,
    height: 210,
    marginRight: 25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImprovePerf: {
    width: 176.43,
    height: 167,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardIncreaseHap: {
    width: 176.43,
    height: 167,
    marginRight: 25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardReduceAnx: {
    width: 176.43,
    height: 210,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardPersonalGrowth: {
    width: 176.43,
    height: 210,
    marginRight: 25,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBetterSleep: {
    width: 176.43,
    height: 167,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
