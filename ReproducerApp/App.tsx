import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AritstScreen from './screens/ArtistScreen';
import AnimatedBottomOptions from './components/AnimatedBottomOptions';



const tabOptions = {
  headerShown: false
};
function App() {

  return  return <GestureHandlerRootView style={StyleFlex}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={tabOptions}>
              <Stack.Screen name="ArtistPage" component={AritstScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <AnimatedBottomOptions />
      </GestureHandlerRootView>;
}

export default App;
