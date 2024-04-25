import { Pressable, Text, View } from 'react-native';
import { BottomOptionsManager } from "../storage/BottomOptionsManager";
import { PureComponent } from 'react';

class ArtistScreen extends PureComponent {
  _setZE = () => {
    BottomOptionsManager.setStorage({ hi: "TEST" });
  };
  render() {
    return <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Pressable style={{
        width: '100%', height: '30%', backgroundColor: 'blue'
      }} onPress={this._setZE} >
        <Text>SECOND TO CLICK</Text>
      </Pressable>
    </View>;
  }

}


export default ArtistScreen;
