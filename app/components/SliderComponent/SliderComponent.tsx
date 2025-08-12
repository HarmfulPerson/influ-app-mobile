import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Text, XStack } from "tamagui";
import Colors from "../../../constants/Colors";
import { CheckCircle2, Loader2Icon, XCircle } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SOCIAL_STATUS_NEXT_STEP, SOCIAL_STATUSES } from "../../../constants/Social";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 32;
const THUMB_SIZE = 50;
const MAX_SLIDE_PERCENTAGE = 0.3;
const MAX_SLIDE_DISTANCE = SLIDER_WIDTH * MAX_SLIDE_PERCENTAGE;
const AUTO_COMPLETE_THRESHOLD = 0.75;

export type Props = {
  onConfirm: () => Promise<{ result: boolean; message: string }>;
  status: keyof typeof SOCIAL_STATUSES;
  disabled?: boolean;
};

const ThumbSlider = ({ onConfirm, status, disabled = false }: Props) => {
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);
  const loaderScale = useSharedValue(1);
  const loaderOpacity = useSharedValue(1);
  const checkScale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(20);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const isAnimating = useRef(false);

  const handleConfirm = async () => {
    if (disabled) return;

    const { result, message } = await onConfirm();
    setMessage(message);

    if (result) {
      setIsConfirmed(true);
      setIsError(false);
      translateX.value = withSpring(SLIDER_WIDTH);

      loaderScale.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) });
      loaderOpacity.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) });

      rotation.value = withTiming(1440, { duration: 1000, easing: Easing.linear }, () => {
        checkScale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
        checkOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
      });

      messageOpacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
      messageTranslateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) });

      setTimeout(() => {
        translateX.value = withSpring(0);
        setIsConfirmed(false);
        checkScale.value = withTiming(0);
        checkOpacity.value = withTiming(0);
        messageOpacity.value = withTiming(0);
      }, 1500);
    } else {
      setIsConfirmed(false);
      setIsError(true);
      translateX.value = withSpring(0);
    }
    isAnimating.current = false;
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      if (disabled) return;

      if (event.x > MAX_SLIDE_DISTANCE) {
        ctx.shouldBlock = true;
        return;
      }

      ctx.shouldBlock = false;
      const touchX = Math.max(0, Math.min(event.x, MAX_SLIDE_DISTANCE));
      translateX.value = withSpring(touchX);
      ctx.startX = touchX;
    },
    onActive: (event, ctx) => {
      if (disabled || isConfirmed || ctx.shouldBlock) return;

      const newTranslateX = Math.max(
        0,
        Math.min((ctx.startX as number) + event.translationX, SLIDER_WIDTH)
      );
      translateX.value = newTranslateX;

      rotation.value = interpolate(newTranslateX, [0, SLIDER_WIDTH], [0, 720]);
    },
    onEnd: (event, ctx) => {
      if (disabled || ctx.shouldBlock) return;

      const currentPosition = translateX.value;
      const threshold = SLIDER_WIDTH * AUTO_COMPLETE_THRESHOLD;

      if (currentPosition >= threshold) {
        translateX.value = withSpring(SLIDER_WIDTH, {}, () => {
          runOnJS(handleConfirm)();
        });

        rotation.value = withTiming(1440, { duration: 1000, easing: Easing.linear });
      } else {
        translateX.value = withSpring(0);
        rotation.value = withTiming(0, { duration: 500, easing: Easing.linear });
      }
    },
  });

  const whitePartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      backgroundColor: disabled
        ? Colors.grayscale.surface.disabled
        : Colors.grayscale.surface.darker,
    };
  });

  const loaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: loaderScale.value }],
      opacity: loaderOpacity.value,
    };
  });

  const checkStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: checkScale.value }],
      opacity: checkOpacity.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, SLIDER_WIDTH - THUMB_SIZE], [1, 0]);
    return {
      opacity,
    };
  });

  const messageStyle = useAnimatedStyle(() => {
    return {
      opacity: messageOpacity.value,
      transform: [{ translateY: messageTranslateY.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <XStack space="$2" alignItems="center">
        <View style={styles.slider}>
          <LinearGradient
            colors={isError ? ["#FF6B6B", "#FF0000"] : ["#67FEBF", "#01CB77"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.greenPart}
          />
          <Animated.View style={[styles.loaderIcon, loaderStyle]}>
            <Loader2Icon
              strokeWidth={1}
              color={isError ? "#FF0000" : "#00663B"}
              width={32}
              height={32}
            />
          </Animated.View>
          <Animated.View style={[styles.checkIcon, checkStyle]}>
            <CheckCircle2 strokeWidth={1} color="#00663B" width={32} height={32} />
          </Animated.View>
          {isError && (
            <XCircle
              style={{
                marginLeft: 16,
                position: "absolute",
                right: "5%",
                zIndex: 1000,
              }}
              strokeWidth={1}
              color="#FF0000"
              width={32}
              height={32}
            />
          )}
          <PanGestureHandler onGestureEvent={onGestureEvent} enabled={!disabled}>
            <Animated.View style={[styles.whitePart, whitePartStyle]}>
              <Animated.Text style={[styles.text]}>
                {SOCIAL_STATUS_NEXT_STEP[status].title}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.subtitle,
                  {
                    color: disabled
                      ? Colors.grayscale.text.title
                      : isError
                      ? "#FF0000"
                      : Colors.grayscale.text.title,
                  },
                ]}
              >
                {message ? message : SOCIAL_STATUS_NEXT_STEP[status].subtitle}
              </Animated.Text>
            </Animated.View>
          </PanGestureHandler>
          {isConfirmed && (
            <Animated.View style={[styles.messageContainer, messageStyle]}>
              <Text style={styles.messageText}>{message}</Text>
            </Animated.View>
          )}
        </View>
      </XStack>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    maxHeight: 76,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    width: SLIDER_WIDTH,
    height: 76,
    borderRadius: 12,
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    backgroundColor: Colors.grayscale.surface.disabled,
  },
  greenPart: {
    width: SLIDER_WIDTH,
    height: "100%",
    position: "absolute",
    left: 0,
    borderRadius: 12,
    zIndex: 1,
  },
  whitePart: {
    width: SLIDER_WIDTH,
    height: 76,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    lineHeight: 19.2,
    position: "absolute",
    borderRadius: 12,
    padding: 16,
    zIndex: 2,
  },
  loaderIcon: {
    position: "absolute",
    left: "10%",
    transform: [{ translateY: -THUMB_SIZE / 2 }],
    zIndex: 1,
  },
  checkIcon: {
    position: "absolute",
    left: "10%",
    transform: [{ translateY: -THUMB_SIZE / 2 }],
    zIndex: 1,
  },
  text: {
    color: Colors.grayscale.text.title,
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: Colors.grayscale.text.title,
    fontSize: 10,
    lineHeight: 12,
  },
  messageContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },
  messageText: {
    color: Colors.grayscale.text.title,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ThumbSlider;
