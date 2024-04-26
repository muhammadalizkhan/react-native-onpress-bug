import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AritstScreen from './test/screens/ArtistScreen';
import AnimatedBottomOptions from './test/components/AnimatedBottomOptions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, Text, View } from 'react-native';
import { Component } from 'react';
const TabStack = createBottomTabNavigator();
import codePush from "react-native-code-push";

const tabOptions = {
  headerShown: false
};
const HomeScreen = ({ navigation }: any) => {
  return <View style={{ flex: 1 }}>
    <Pressable style={{ width: '100%', height: '20%', backgroundColor: 'yellow' }} onPress={() => {
      navigation.navigate('ArtistPage');
    }}>
      <Text>FIRST TO CLICK</Text>
    </Pressable>
  </View>;
};
function HomeTabs() {
  return (
    <TabStack.Navigator
      backBehavior="none"
      screenOptions={tabOptions}>
      <TabStack.Screen name="Home" component={HomeScreen} />
    </TabStack.Navigator>
  );
}
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
            <Stack.Screen name="tab" component={HomeTabs} />
            <Stack.Screen name="ArtistPage" component={AritstScreen} options={defAnimationsOptions} />
          </Stack.Navigator>
        </NavigationContainer>
        <AnimatedBottomOptions />
      </GestureHandlerRootView>;
    }
    return null;
  }
}


export default codePush({ checkFrequency: codePush.CheckFrequency.MANUAL })(
  App,
);
