import BottomNavigator from '@/components/BottomNavigator';
import React from 'react';
import { SafeAreaView } from 'react-native';
const MainScreen = () => {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }} >
                <BottomNavigator />
            </SafeAreaView>
        </>
    )
}

export default MainScreen