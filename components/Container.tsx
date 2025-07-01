import React from 'react';
import { View } from 'react-native';

interface IPropsContainer{
    children?:any;
}

const Container:React.FC<IPropsContainer> = ({children}) => {
  return (
    <>
        <View className='px-[39px] mt-[39px] h-full relative  '>
            {children}
        </View>
    </>
  )
}

export default Container