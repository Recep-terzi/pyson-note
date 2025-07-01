import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const LoginSlider = () => {
    const [selectState, setSelectState] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            setSelectState(prev => prev + 1)
            if (selectState === 3) {
                setSelectState(1)
            }
        }, 5000)
    }, [selectState, setSelectState])

    return (
        <>
            <View className='flex flex-col gap-5'>
                {
                    selectState === 1 ? <Image source={require('@/assets/images/amico.png')} alt='Amico Image' className='size-[340px]' /> : selectState === 2 ? <Image source={require('@/assets/images/amico2.png')} alt='Amico2 Image' className='size-[340px]' /> : <Image source={require('@/assets/images/cuate.png')} alt='Cuate Image' className='size-[340px]' />
                }

                {
                    selectState === 1 ? <Text className='text-lg'>Take Notes {'\n'} <Text className='font-bold'>Quickly capture what’s on your mind</Text></Text> : selectState === 2 ? <Text className='text-lg'>To-dos {'\n'} <Text className='font-bold'>List out your day-to-day tasks</Text></Text> : <Text className='text-lg'>Image to Text Converter {'\n'} <Text className='font-bold'>Upload your images and convert to text</Text></Text>
                }
                <View className='flex-row items-center m-auto items-center gap-4'>
                    <TouchableOpacity onPress={() => setSelectState(1)} className={` rounded-lg  ${selectState === 1 ? 'bg-primary w-[65px] h-[16px]' : 'bg-gray-200 w-[35px] h-[16px]'}`} />
                    <TouchableOpacity onPress={() => setSelectState(2)} className={` rounded-lg  ${selectState === 2 ? 'bg-primary w-[65px] h-[16px]' : 'bg-gray-200 w-[35px] h-[16px]'}`} />
                    <TouchableOpacity onPress={() => setSelectState(3)} className={` rounded-lg  ${selectState === 3 ? 'bg-primary w-[65px] h-[16px]' : 'bg-gray-200 w-[35px] h-[16px]'}`} />
                </View>

            </View>
        </>
    )
}

export default LoginSlider