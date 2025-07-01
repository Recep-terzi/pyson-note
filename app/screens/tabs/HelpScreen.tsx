import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const HelpScreen = () => {
    const darkMode = useSelector((state: any) => state.note.darkMode)
    return (
        <View className={`${darkMode ? 'bg-slate-900' : ''}`}>
            <View className="h-[251px] bg-primary ">
                <View className="px-[39px] mt-[39px]">
                    <Text className="text-[36px] font-medium mb-[32px]">Help</Text>
                    <Text className='text-[48px] font-regular text-white px-[21px]'>User Guide</Text>
                </View>
            </View>
            <View className='mt-[30px] flex-col px-[30px] gap-[37px] h-full '>
                <TouchableOpacity className='flex-row items-center gap-4 h-[100px] px-[25px] py-5 bg-primary rounded-lg'>
                    <Image source={require('@/assets/icons/sticky_note_2_white_24dp 1.png')} alt='Sticky Icon' width={60} height={60} />
                    <View className='flex-col gap-2'>
                        <Text className='text-[24px] font-regular'>Notes</Text>
                        <Text className='font-light text-[18px]'>Tap to view</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='flex-row items-center gap-4 h-[100px] px-[25px] py-5 bg-primary rounded-lg'>
                    <Image source={require('@/assets/icons/image_search_black_24dp 1.png')} alt='Search Icon' width={60} height={60} />
                    <View className='flex-col gap-2'>
                        <Text className='text-[24px] font-regular'>OCR</Text>
                        <Text className='font-light text-[18px]'>Tap to view</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className='flex-row items-center gap-4 h-[100px] px-[25px] py-5 bg-primary rounded-lg'>
                    <Image source={require('@/assets/icons/lock_white_24dp 1.png')} alt='Lock Icon' width={60} height={60} />
                    <View className='flex-col gap-2'>
                        <Text className='text-[24px] font-regular'>Reset Password</Text>
                        <Text className='font-light text-[18px]'>Tap to view</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HelpScreen;
