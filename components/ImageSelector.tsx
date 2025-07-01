import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface IPropsImageSelector {
    setImage?: any;
    image?: any;
    setImageLoading?: any;
    setImageData?: any;
    setDesc?: any;
    imageData?: any;
    darkMode?: boolean;
}

const ImageSelector: React.FC<IPropsImageSelector> = ({ darkMode, setImage, image, setImageLoading, setImageData, setDesc, imageData }) => {
    const [showOptions, setShowOptions] = useState(false);

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Camera permission denied');
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                base64: true,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            setImageLoading(false);

            if (!result.canceled) {
                setImageLoading(true);
                setShowOptions(false);
                setImageData(result.assets[0].uri);
                setImage(result);
                setDesc('');
            }
        } catch (error) {
            console.error('Error opening the camera:', error);
            setImageLoading(false);
        }
    };


    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Access to the gallery denied');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
              setImageLoading(true);
                setShowOptions(false);
                setImageData(result.assets[0].uri);
                setImage(result);
                setDesc('');
        }

        setShowOptions(false);
    };
    return (
        <View className=''>
            {!imageData && <TouchableOpacity
                onPress={() => setShowOptions(true)}
                style={{
                    height: 270,
                    borderWidth: 1,
                    borderColor: darkMode ? 'white' : 'black',
                    borderRadius: 10,
                    margin: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                }}
            >
                <Entypo name="camera" size={48} color={darkMode ? 'white' : 'black'} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}>Take or Upload a Photo</Text></TouchableOpacity>}

            <Modal visible={showOptions} transparent animationType="slide">
                <TouchableOpacity onPress={() => setShowOptions(false)} style={styles.modalOverlay}>
                    <View style={styles.modalContent} >
                        <View className='m-auto h-[5px] w-[100px] rounded-lg bg-gray-300 mt-2'></View>
                        <TouchableOpacity onPress={openCamera} style={styles.option}>
                            <Text>📷 Shoot with Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickFromGallery} style={styles.option}>
                            <Text>🖼️ Select from Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    image: { width: "100%", height: 270, marginBottom: 20, borderRadius: 10, objectFit: "contain", resizeMode: "contain" },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingBottom: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    option: {
        padding: 20,
        alignItems: 'center',
    },
});
