import HelpScreen from '@/app/screens/tabs/HelpScreen';
import NotesScreen from '@/app/screens/tabs/NotesScreen';
import OCRScreen from '@/app/screens/tabs/OCRScreen';
import UserScreen from '@/app/screens/tabs/UserScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

const icons: { [key: string]: any } = {
  Notes: require('@/assets/icons/sticky_note_2_black_24dp 1.png'),
  OCR: require('@/assets/icons/image_search_black_24dp 2.png'),
  Help: require('@/assets/icons/help_outline_black_24dp 1.png'),
  Me: require('@/assets/icons/person_outline_black_24dp 1.png'),
};
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const darkMode = useSelector((state:any) => state.note.darkMode)
  return (
    <>
      <Tab.Navigator initialRouteName='Notes' 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: any;
            const iconSource = icons[route.name];
            if (route.name === 'Notes') {
              iconName = '@/assets/icons/sticky_note_2_black_24dp 1.png';
            } else if (route.name === 'OCR') {
              iconName = '@/assets/icons/image_search_black_24dp 2.png';
            } else if (route.name === 'Help') {
              iconName = '@/assets/icons/help_outline_black_24dp 1.png';
            } else if (route.name === 'Me') {
              iconName = '@/assets/icons/person_outline_black_24dp 1.png';
            }
            return <Image
              source={iconSource}
              style={{ width: size, height: size, tintColor: color }}
              resizeMode="contain"
            />;
          },
          tabBarActiveTintColor: '#FF9800',
          tabBarInactiveTintColor: 'gray',
          
          tabBarStyle: {
            paddingVertical: 5,
            height: 60,
            borderTopLeftRadius:`${darkMode ? 0 : 10}`,
            borderTopRightRadius:`${darkMode ? 0 : 10}`,
            backgroundColor:`${darkMode ? '#0F172A' : '#F1F1F1'}`

          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="Notes" component={NotesScreen} />
        <Tab.Screen name="OCR" component={OCRScreen} />
        <Tab.Screen name="Help" component={HelpScreen} />
        <Tab.Screen name="Me" component={UserScreen} />
      </Tab.Navigator>
    </>
  )
}

export default BottomNavigator