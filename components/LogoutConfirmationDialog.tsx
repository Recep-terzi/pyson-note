import { supabase } from '@/lib/supabase';
import { setLogoutUser } from '@/redux/noteSlice';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
interface IPropsLogoutConfirmationDialog {
    handleClose?: any;
    navigation?: any;
}

const LogoutConfirmationDialog: React.FC<IPropsLogoutConfirmationDialog> = ({ handleClose, }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Çıkış işlemi sırasında hata oluştu:', error.message);
        } else {
            dispatch(setLogoutUser())
            navigation.reset({
                index: 0,
                routes: [{ name: 'WelcomePage' }],
            });
        }
    };
    return (
        <View className='absolute left-0 right-0 bottom-0 top-0 m-auto flex items-center justify-center'>
            <View className='absolute bg-black opacity-30 w-full h-full z-40'></View>
            <View className=' w-[328px] h-[182px] rounded-lg  shadow-lg bg-white z-50 flex-col flex gap-5 p-6 '>
                <Text className='text-[18px] font-bold'>Log out</Text>
                <Text className='text-[#8a8c8f] text-[14px]'>Are you sure you want to log out?</Text>
                <View className='grid grid-cols-2 gap-2'>
                    <TouchableOpacity onPress={handleClose} className='w-full h-[42px] rounded-md border-[1px] border-gray-100 flex items-center justify-center'><Text>No</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} className='w-full h-[42px] rounded-md bg-primary flex items-center justify-center'><Text className='text-white'>Log out</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LogoutConfirmationDialog