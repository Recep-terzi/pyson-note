import ImageSelector from '@/components/ImageSelector';
import { getTextFromImage } from '@/GoogleVision';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';

const OCRScreen = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState('');
  const [imageLoading, setImageLoading] = useState(false);



  const getData = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await getTextFromImage(image.assets[0].base64);
      setDesc(res.responses[0].textAnnotations[0].description || 'Metin bulunamadı.');
    } catch (err) {
      Alert.alert('Hata', 'Metin alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setImageData(null);
    setDesc('');
    setLoading(false);
    setImageLoading(false);
  };
  const darkMode = useSelector((state: any) => state.note.darkMode)
  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#0F172A' : '' }}>
      <Text className={`px-6 text-[36px] font-medium mt-9 mb-6 ${darkMode ? 'text-white' : ''}`}>Image to Text</Text>
      {imageData && (
        <View style={{ position: 'relative' }}>
          {!imageLoading ? (
            <ActivityIndicator
              size="large"
              style={{ height: 270, alignSelf: 'center' }}
            />
          ) : (
            <>
              <Image
                source={{ uri: imageData }}
                style={{ width: '100%', height: 270, resizeMode: 'contain' }}
              />
              <TouchableOpacity
                onPress={reset}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: 6,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      <ImageSelector darkMode={darkMode} setImage={setImage} image={image} setImageLoading={setImageLoading} setImageData={setImageData} setDesc={setDesc} imageData={imageData} />


      {(imageData && !loading) && !desc && (
        <TouchableOpacity
          onPress={getData}
          style={{
            marginHorizontal: 16,
            backgroundColor: '#FFB347',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            marginTop: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Metni Al</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <ActivityIndicator style={{ marginTop: 16 }} size={'large'} />
      ) : (
        !!desc && (
          <ScrollView style={{ maxHeight: 350, marginHorizontal: 30,marginTop:20 }}>
            <TextInput
              value={desc}
              editable={false}
              multiline
              selectTextOnFocus
              scrollEnabled
              style={{
                fontSize: 16,
                color: darkMode ? 'white' : '#000',
                textAlignVertical: 'top', 
                padding: 0,
              }}
            />
          </ScrollView>
        )
      )}
    </View>
  );
};

export default OCRScreen;
