import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AritstScreen from './test/screens/ArtistScreen';
import AnimatedBottomOptions from './test/components/AnimatedBottomOptions';
import { Component } from 'react';

const tabOptions = {
  headerShown: false
};


const defAnimationsOptions: any = { animation: 'fade_from_bottom' };
const theme = {
  dark: true,
  colors: { ...DarkTheme.colors, background: '#000000' },
};

class App extends Component {
  render() {
    const connected = true;
    if (connected) {
      return <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={tabOptions}>
            <Stack.Screen name="ArtistPage" component={AritstScreen} options={defAnimationsOptions} />
          </Stack.Navigator>
        </NavigationContainer>
        <AnimatedBottomOptions />
      </GestureHandlerRootView>;
    }
    return null;
  }
}


export default App;
