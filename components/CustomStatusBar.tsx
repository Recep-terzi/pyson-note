import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomStatusBar = ({
  children,
  backgroundColor = '',
  barStyle = 'light-content',
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Native StatusBar ayarı */}
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent={false}
        {...props}
      />

      
      {/* İçerik alanı */}
      <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
        {children}
      </SafeAreaView>

      {Platform.OS === 'ios' && (
        <View
          style={{
            backgroundColor: backgroundColor,
          }}
        />
      )}
    </>
  );
};

export default CustomStatusBar;
