import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useRouter } from 'expo-router';

const WEEKDAYS = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];

export default function RemindersScreen() {
  const [date, setDate] = useState(new Date(2024, 1, 1, 7, 0)); 
  const [showPicker, setShowPicker] = useState(false);
  const [days, setDays] = useState([false, false, false, false, false, false, false]);
  const router = useRouter();

  const toggleDay = (idx: number) => {
    setDays(days => days.map((val, i) => (i === idx ? !val : val)));
  };

  const handleSave = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What time would you like to meditate?</Text>
      <Text style={styles.subtitle}>Any time you can choose but We recommend first thing in the morning.</Text>
      <TouchableOpacity style={styles.pickerWrap} onPress={() => setShowPicker(true)} activeOpacity={0.7}>
        <Text style={styles.timeText}>
          {date.getHours().toString().padStart(2, '0')}
          :
          {date.getMinutes().toString().padStart(2, '0')}
          {date.getHours() < 12 ? ' AM' : ' PM'}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selected) => {
            setShowPicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      <Text style={[styles.title, { marginTop: 36 }]}>Which day would you like to meditate?</Text>
      <Text style={styles.subtitle}>Everyday is best, but we recommend picking at least five.</Text>
      <View style={styles.weekRow}>
        {WEEKDAYS.map((d, i) => (
          <TouchableOpacity
            key={d}
            style={[styles.dayBtn, days[i] && styles.dayBtnActive]}
            onPress={() => toggleDay(i)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dayTxt, days[i] && styles.dayTxtActive]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveTxt}>SAVE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 16 }} onPress={() => router.replace('/(tabs)/home')}>
        <Text style={{ color: '#A1A4B2', fontSize: 16, fontWeight: '500', textAlign: 'center' }}>
          NO THANKS
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: '#fff', 
    padding: 26, 
    paddingTop: 40 },
  title: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#3F414E', 
    marginBottom: 6 },
  subtitle: { 
    fontSize: 14, 
    color: '#A1A4B2', 
    marginBottom: 14 },
  pickerWrap: {
    width: '100%',
    height: 82,
    backgroundColor: '#F5F5F7',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  timeText: {
    fontSize: 32,
    color: '#3F414E',
    fontWeight: '600',
    letterSpacing: 1,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
    width: '100%',
  },
  dayBtn: {
    width: 43,
    height: 43,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F2F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBtnActive: {
    backgroundColor: '#3F414E',
    borderColor: '#3F414E',
  },
  dayTxt: { fontSize: 15, color: '#A1A4B2', fontWeight: '600' },
  dayTxtActive: { color: '#fff' },
  saveBtn: {
    width: '100%',
    height: 54,
    backgroundColor: '#A3A7F7',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  saveTxt: { color: '#fff', fontWeight: '700', fontSize: 17, letterSpacing: 1.1 },
});
