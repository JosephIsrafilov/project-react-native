import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'home') iconName = 'home-outline';
          if (route.name === 'meditate') iconName = 'leaf-outline';
          if (route.name === 'sleep') iconName = 'moon-outline';
          if (route.name === 'music') iconName = 'musical-notes-outline';
          if (route.name === 'profile') iconName = 'person-outline';

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="meditate" options={{ title: 'Meditate' }} />
      <Tabs.Screen name="sleep" options={{ title: 'Sleep' }} />
      <Tabs.Screen name="music" options={{ title: 'Music' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
