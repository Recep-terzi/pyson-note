import { Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
const Loading = () => {
  return (
    <>
      <Stack.Screen
        options={{ headerShown: false }}
      />
      <View  className='flex-1 justify-center items-center bg-[#FFB347]'>
        <Image source={require('@/assets/images/loading.png')} alt='Loading Image' />
        <Text  className='text-[32px] font-bold mb-5'>Pyson Notes</Text>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </>
  )
}

export default Loading