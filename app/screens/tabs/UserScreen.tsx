import LogoutConfirmationDialog from '@/components/LogoutConfirmationDialog';
import { setDarkMode } from '@/redux/noteSlice';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const UserScreen = () => {
  const user = useSelector((state: any) => state.note.user)
  const navigation = useNavigation()
  const [logoutPopup, setLogoutPopup] = useState(false)
  const [openSetting, setOpenSettings] = useState(false)
  const dispatch = useDispatch()
  const darkMode = useSelector((state: any) => state.note.darkMode)
  const toggleSwitch = () => {
    dispatch(setDarkMode(!darkMode))
  };
  return (
    <View className='relative h-full ' style={{ backgroundColor: darkMode ? '#0F172A' : '' }}>
      <View className='px-[39px] mt-[39px]'>
        <Text className={`text-[36px] font-medium mb-[32px] ${darkMode ? 'text-white' : ''}`}>Me</Text>
        <View className='flex-row items-center gap-[10px]'>
          <FontAwesome name="user-circle" size={80} color={darkMode ? 'white' : "black"} />
          <View className='flex-col gap-1'>
            <Text className={`text-[18px] font-bold ${darkMode ? 'text-white' : ''}`}>{user && user.user_metadata.displayName}</Text>
            <Text className={`text-[14px] font-regular ${darkMode ? 'text-white' : ''}`}>{user && user.user_metadata.email}</Text>
          </View>

        </View>
      </View>
      <View className={`h-[1px] w-full ${darkMode ? 'bg-white' : 'bg-black'}  mt-[50px]`} />
      <View className='px-[60px] mt-[27px]'>
        <View className='flex-col gap-[18px]'>
          {
            openSetting ? (<>
              <View className='flex-row justify-between items-center'>
                <TouchableOpacity className='flex flex-row items-center gap-[25px]'>
                  {
                    darkMode ? <Image source={require('@/assets/icons/mode_night_white_24dp 2.png')} alt='Mode Icon' /> : <Image source={require('@/assets/icons/mode_night_black_24dp 1.png')} alt='Mode Icon' />
                  }
                  <Text className={`text-[18px] ${darkMode ? 'text-white' : ''}`}>Dark Mode</Text>
                </TouchableOpacity>
                <Switch
                  trackColor={{ false: '#fff', true: '#FFB347' }}
                  thumbColor={darkMode ? '#fff' : '#FFB347'}
                  onValueChange={toggleSwitch}
                  value={darkMode}
                />
              </View>
              <TouchableOpacity className='flex flex-row items-center gap-[25px]'>
                {
                  darkMode ? <Image source={require('@/assets/icons/lock_white_24dp 3.png')} alt='Settings Icon' /> : <Image source={require('@/assets/icons/lock_black_24dp 2.png')} alt='Settings Icon' />
                }
                <Text className={`text-[18px] ${darkMode ? 'text-white' : ''}`}>Reset Password</Text>
              </TouchableOpacity>
            </>) : (<>
              <TouchableOpacity onPress={() => setOpenSettings(true)} className='flex flex-row items-center gap-[25px]'>
                {
                  darkMode ? <Image source={require('@/assets/icons/settings_white_24dp 2.png')} alt='Settings Icon' /> : <Image source={require('@/assets/icons/settings_black_24dp 1.png')} alt='Settings Icon' />
                }
                <Text className={`text-[18px] ${darkMode ? 'text-white' : ''}`}>Settings</Text>
              </TouchableOpacity>
            </>)
          }

          <TouchableOpacity onPress={() => navigation.navigate('AboutScreen')} className='flex flex-row items-center gap-[25px]'>
            {
              darkMode ? <Image source={require('@/assets/icons/info_white_24dp 2.png')} alt='Info Icon' /> : <Image source={require('@/assets/icons/info_black_24dp 1.png')} alt='Info Icon' />
            }
            <Text className={`text-[18px] ${darkMode ? 'text-white' : ''}`}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => setLogoutPopup(true)} className='h-[52px] rounded-lg flex items-center justify-center flex-row gap-4 bg-primary mx-9 mt-10'>
        <Image source={require('@/assets/icons/logout_black_24dp 1.png')} alt='Logout Icon' />
        <Text className='text-white text-[18px]'>LOG OUT</Text>
      </TouchableOpacity>
      {logoutPopup &&
        <LogoutConfirmationDialog handleClose={() => setLogoutPopup(false)} />
      }

    </View>
  )
}

export default UserScreen