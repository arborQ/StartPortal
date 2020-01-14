import React from 'react';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
    <Button>Test</Button>
  </Layout>
);

export default () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <HomeScreen />
  </ApplicationProvider>
);
