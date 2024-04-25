import { PureComponent } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';


const RIPPLE_CONFIG = { color: 'rgba(159, 159, 159,.1)', foreground: true };


interface TextButtonProps {
  text: string;
  onPress: (index?: any) => void;
  backgroundColor?: string;
  hasBorder?: boolean;
  index?: number;
}
class TextButtonComponent extends PureComponent<TextButtonProps> {
  _pressButton: any;
  hasIndex;
  constructor(props: TextButtonProps) {
    super(props);
    this.hasIndex = props.index != null;
    this._pressButton = this.hasIndex ? () => {
      props.onPress(props.index);
    } : undefined;
  }

  render() {
    const { text, onPress, backgroundColor = "#272727", hasBorder } = this.props;
    return <Pressable
      android_ripple={RIPPLE_CONFIG}
      style={[styles.textButton, { backgroundColor, borderColor: hasBorder ? "#424242" : backgroundColor }]}
      onPress={this.hasIndex ? this._pressButton : onPress}>
      <Text style={styles.textButtonTextStyle}>{text}</Text>
    </Pressable>;
  }
}

const styles = StyleSheet.create({

  iconStyle: {
    textAlign: 'center'
  },
  textButton: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 20,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center'
  },
  textButtonTextStyle: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 13,
    color: 'white',
  }
});

export { TextButtonComponent };