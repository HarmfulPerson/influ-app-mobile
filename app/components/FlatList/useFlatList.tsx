import { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    LayoutChangeEvent,
    StyleProp,
    ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ICustomFlatListStyles = {
    header: StyleProp<ViewStyle>;
    stickyElement: StyleProp<ViewStyle>;
    topElement?: StyleProp<ViewStyle>;
};

type TUseCustomFlatListHook = [
    Animated.Value,
    ICustomFlatListStyles,
    (event: LayoutChangeEvent) => void,
    (event: LayoutChangeEvent) => void,
    (event: LayoutChangeEvent) => void
];

const window = Dimensions.get("window");

export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const [heights, setHeights] = useState({
        header: 0,
        sticky: 0,
        topList: 0,
    });

    const styles: ICustomFlatListStyles = {
        header: {
            marginBottom: -60,
            transform: [
                {
                    translateY: scrollY.interpolate({
                        extrapolate: "clamp",
                        inputRange: [0, heights.header, heights.header],
                        outputRange: [
                            0,
                            -heights.header,
                            -heights.header - insets.top,
                        ],
                    }),
                },
            ],
            zIndex: 2,
        },
        stickyElement: {
            marginTop: heights.header,
            position: "absolute",
            transform: [
                {
                    translateY: scrollY.interpolate({
                        extrapolate: "clamp",
                        inputRange: [-window.height, 0, heights.header],
                        outputRange: [0, 0, -heights.header],
                    }),
                },
            ],
            zIndex: 3,
        },
    };

    const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
        setHeights({ ...heights, header: event.nativeEvent.layout.height });
    };

    const onLayoutTopListElement = (event: LayoutChangeEvent): void => {
        setHeights({ ...heights, topList: event.nativeEvent.layout.height });
    };

    const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
        setHeights({ ...heights, sticky: event.nativeEvent.layout.height });
    };

    return [
        scrollY,
        styles,
        onLayoutHeaderElement,
        onLayoutTopListElement,
        onLayoutTopStickyElement,
    ];
};
