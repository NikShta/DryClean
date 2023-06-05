import {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import {Spinner} from '../assets/images';

function Loader() {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <Animated.View style={[styles.spinner, animatedStyles]}>
      <FastImage
        style={styles.image}
        source={Spinner}
        resizeMode={FastImage.resizeMode.contain}
      />
    </Animated.View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    zIndex: 100,
    top: '10%',
  },
  image: {
    width: 50,
    height: 50,
  },
});
