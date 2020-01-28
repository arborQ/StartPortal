import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import { ApplicationProvider, Layout, Button, ViewPager } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { customTheme } from './custom-theme';
import { BottomNavBar } from './components/bottom.navigation';
import { SearchCarPage } from './pages/search-car/search.car.page';
import { CameraComponent } from './src/camera/camera.component';

const theme = { ...darkTheme, ...customTheme };
export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <SafeAreaView style={styles.container}>
        <ViewPager 
          style={styles.content}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        >
          <Layout style={styles.content}>
            <CameraComponent />
          </Layout>
          <Layout style={styles.content}>
            <SearchCarPage />
          </Layout>
        </ViewPager>
        <BottomNavBar
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          options={['Skanuj VIN', 'Szukaj']} />
      </SafeAreaView>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme['color-primary-900'],
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
  }
});
