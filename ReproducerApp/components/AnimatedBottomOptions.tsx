import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { BottomOptionsManager } from "../storage/BottomOptionsManager";
import { PureComponent, useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { BackHandler, Image, Pressable, StyleSheet, Text, View } from "react-native";

const OVERDRAG = 20;

function disableSheet() {
	BottomOptionsManager.setStorage(undefined);
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
interface INativeSearch {
  hi: string;
}

const animationDuration = 200;
const animationElastic = Easing.elastic(0.8);

function AnimatedBottomOptions() {
	const offset = useSharedValue(400);
	const opacity = useSharedValue(0);

	const [visible, setVisible] = useState<undefined | INativeSearch>(undefined);

	useEffect(() => {
		const listener = () => {
			const bottomOption = BottomOptionsManager.memoryVariable;
			if (bottomOption) {
				opacity.value = withTiming(1, {
					duration: animationDuration
				});
				offset.value = withTiming(0, {
					duration: 300,
					easing: animationElastic
				});
				setVisible(bottomOption);
			} else {
				offset.value = withTiming(400, {
					duration: animationDuration,
				});
				opacity.value = withTiming(0, {
					duration: animationDuration
				}, () => {
					runOnJS(setVisible)(undefined);
				});
			}
		};
		const unlisten = BottomOptionsManager.registerListen(listener);


		return () => unlisten();
	}, []);


	const fadeInOutStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	if (visible === undefined)
		return null;


	return <AnimatedPressable onPress={disableSheet} style={[styles.backdrop, fadeInOutStyle]}>
		<GestureBottom composant={visible} offset={offset} />
	</AnimatedPressable>;
}

interface IGestureBottomProps {
	composant: INativeSearch;
	offset: any;
}
function GestureBottom({ composant, offset }: IGestureBottomProps) {
	const translateY = useAnimatedStyle(() => ({
		transform: [{ translateY: offset.value }],
	}));
	const pan = Gesture.Pan()
		.onChange((event) => {
			const offsetDelta = event.changeY + offset.value;

			const clamp = Math.max(-OVERDRAG, offsetDelta);
			offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
		})
		.onFinalize(() => {
			if (offset.value < OVERDRAG) {
				offset.value = withSpring(0);
			} else {
				runOnJS(disableSheet)();
			}
		});

	useEffect(() => {
		const onBackPress = () => {
			if (BottomOptionsManager.memoryVariable !== undefined) {
				disableSheet();
				return true;
			}
		};
		const backhandler = BackHandler.addEventListener(
			'hardwareBackPress',
			onBackPress);
		return () => backhandler.remove();
	}, []);


	return <GestureDetector gesture={pan}>
		<Animated.View
			style={[styles.sheet, translateY]}
		>
			<BottomOpt composant={composant} />
		</Animated.View>
	</GestureDetector>;

}
const toAddImageArist = '=w200-h200-l70-rj';
const scaled17 = 17;
interface BottomOptProps {
	composant: INativeSearch;
}
class BottomOpt extends PureComponent<BottomOptProps> {

	render() {
		const composant = this.props.composant;
			return <>
				<View style={styles.optView}>
					<View style={styles.optinView}>
						<Text style={styles.typeText}>Artiste</Text>
						<Text style={styles.nameText}>{artist.hi}</Text>
					</View>
				</View>
				<View style={styles.parrentViewButton}>
					<Pressable
            style={{width: '100%', height: 100, backgroundColor: "red"}}
						onPress={() => {
						  console.log("DETECT CLICK");
							disableSheet();
						}}
					/>
				</View>
				<View style={styles.separator} />
			</>;
		
	
}
const RIPPLE_CONFIG = { color: 'rgba(159, 159, 159,.1)', foreground: true };

const scaled21 = 21;


const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	sheet: {
		width: '100%',
		position: 'absolute',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		height: 'auto',
		backgroundColor: "#1e1e1e",
		bottom: -50,
		paddingBottom: 60,
	},
	optView: {
		flexDirection: 'row',
		height: 100,
		margin: 20
	},
	separator: {
		borderBottomColor: "#9F9F9F",
		margin: 20,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	optinView: {
		flex: 1,
		marginRight: 'auto'
	},
	optImage: {
		backgroundColor: "#424242",
		height: 100,
		width: 100,
		borderRadius: 12.5
	},
	typeText: {
		color: '#9F9F9F',
		fontSize: 13
	},
	parrentViewButton: {
		height: 70
	},
	nameText: {
		color: 'white',
		fontSize: 19,
		fontWeight: '500',
		marginTop: 18
	},
	button: {
		width: '100%',
		height: 45,
		paddingLeft: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	textButton: {
		color: 'white',
		fontSize: 15,
		marginLeft: 20,
		flex: 1
	},
});

export default AnimatedBottomOptions;
