import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { BottomOptionsManager, INativeSearch } from "../storage/BottomOptionsManager";
import { PureComponent, useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { BackHandler, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TextButtonComponent } from "./ButtonComponent";
import { FollowsStorage } from "../storage/FollowsStorage";
const COLOR_WHITE = '#FFFFFF',
	COLOR_LIGHT_GREY = '#9F9F9F',
	COLOR_GREY = '#424242',
	COLOR_GREY_DARKER = '#272727',
	COLOR_DARK_GRAY = '#1e1e1e',
	COLOR_BLACK = '#0F0F0F',
	COLOR_RED = '#CA2828',
	COLOR_MAUVE = '#B12181',
	COLOR_ORANGE = '#F4742B',
	RIPPLE_COLOR = 'rgba(159, 159, 159,.1)';

const OVERDRAG = 20;

function disableSheet() {
	BottomOptionsManager.setStorage(undefined);
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
		if (composant.hi) {
			const isFollow = FollowsStorage.isFollowed(composant.hi);
			return <>
				<View style={styles.optView}>
					<View style={styles.optinView}>
						<Text style={styles.typeText}>Artiste</Text>
						<Text style={styles.nameText}>{composant.hi}</Text>
					</View>
					<Image style={styles.optImage} source={{ uri: "https://www.lepoint.fr/images/2023/05/16/24512445lpw-24512611-article-the-weeknd-nom-abel-jpg_9523063_1250x625.jpg" }} />
				</View>
				<View style={styles.parrentViewButton}>
					<TextButtonComponent
						onPress={() => {
							const composant2 = this.props.composant;
							console.log("CLICKED CHECK");
							FollowsStorage.pushOrRemove(composant2);
							disableSheet();
						}}
						text={isFollow ? "Se désabonner" : "S'abonner"}
						backgroundColor={COLOR_GREY}
					/>
				</View>
				<View style={styles.separator} />
				<PressButton icon="shuffle" onPress={() => {}} iconSize={scaled17} text="Aléatoire" />
				<PressButton icon="radio" onPress={() => {}} text="Radio" />
				<PressButton icon="share" onPress={() => {}} text="Partager" />
			</>;
		}
	}
}
const RIPPLE_CONFIG = { color: RIPPLE_COLOR, foreground: true };

const scaled21 = 21;

const PressButton = ({ text, onPress, icon, iconSize = scaled21 }: { text: string, onPress: () => void, icon: string; iconSize?: number; }) => (
	<Pressable
		style={styles.button}
		onPress={onPress}
		android_ripple={RIPPLE_CONFIG}>
		<Text style={styles.textButton}>{text}</Text>
	</Pressable >
);

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
		backgroundColor: COLOR_DARK_GRAY,
		bottom: -50,
		paddingBottom: 60,
	},
	optView: {
		flexDirection: 'row',
		height: 100,
		margin: 20
	},
	separator: {
		borderBottomColor: COLOR_LIGHT_GREY,
		margin: 20,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	optinView: {
		flex: 1,
		marginRight: 'auto'
	},
	optImage: {
		backgroundColor: COLOR_GREY,
		height: 100,
		width: 100,
		borderRadius: 12.5
	},
	typeText: {
		color: COLOR_LIGHT_GREY,
		fontSize: 13
	},
	parrentViewButton: {
		height: 70
	},
	nameText: {
		color: COLOR_WHITE,
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
		color: COLOR_WHITE,
		fontSize: 15,
		marginLeft: 20,
		flex: 1
	},
});

export default AnimatedBottomOptions;