```javascript
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    (async () => {
      const asset = Asset.fromModule(require('./assets/neural-tower.html'));
      await asset.downloadAsync();
      const content = await FileSystem.readAsStringAsync(asset.localUri);
      setHtml(content);
    })();
  }, []);

  if (!html) return <View style={styles.loading} />;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={styles.web}
        javaScriptEnabled
        domStorageEnabled        // enables localStorage for your profile/key storage
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        mixedContentMode="always"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  loading:   { flex: 1, backgroundColor: '#020617' },
  web:       { flex: 1 },
});
```