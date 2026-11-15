import { useRef } from 'react';
import { Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { WebView } from 'react-native-webview';
import { OCR_HTML } from './ocrPage';

export async function pickImage() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) {
    Alert.alert('Nėra prieigos prie kameros', 'Leiskite programai naudoti kamerą telefono nustatymuose.');
    return null;
  }
  const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], base64: true, quality: 0.6 });
  if (result.canceled || !result.assets?.[0]?.base64) return null;
  return `data:image/jpeg;base64,${result.assets[0].base64}`;
}

export function OcrRunner({ image, onProgress, onText, onError }) {
  const web = useRef(null);
  const onMessage = (e) => {
    const m = JSON.parse(e.nativeEvent.data);
    if (m.progress != null) onProgress(m.progress);
    else if (m.text != null) onText(m.text);
    else onError(new Error(m.error));
  };
  return (
    <WebView
      ref={web}
      style={styles.hidden}
      originWhitelist={['*']}
      source={{ html: OCR_HTML, baseUrl: 'https://localhost/' }}
      onLoadEnd={() => web.current?.injectJavaScript(`run(${JSON.stringify(image)}); true;`)}
      onMessage={onMessage}
      onError={(e) => onError(new Error(e.nativeEvent.description))}
    />
  );
}

const styles = StyleSheet.create({
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0 },
});
