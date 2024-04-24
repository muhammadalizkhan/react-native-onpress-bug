import { Pressable } from 'react-native';
import { BottomOptionsManager } from "../storage/BottomOptionsManager";


const ArtistScreen = () => {

  return <View style={{flex: 1, backgroundColor: 'white'}}>
    <Pressable style={{width: '100%', 'height: '30%', backgroundColor: 'blue'}} onPress={() => {
     BottomOptionsManager.setStorage({hi: "TEST"});
    } }/>
  </View>

};

export default ArtistScreen;
