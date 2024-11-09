import React, { useMemo, useRef } from "react";
import { ActivityIndicator, Animated, FlatListProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCustomFlatListHook } from "./useFlatList";
import { Text, View } from "tamagui";

type CustomFlatListProps<T> = Omit<FlatListProps<T>, "ListHeaderComponent"> & {
    HeaderComponent: JSX.Element;
    StickyElementComponent: JSX.Element;
    TopListElementComponent?: JSX.Element;
    changesList: string;
    data: any;
    shouldUseSpinner: boolean;
};

function CustomFlatList<T>({
    style,
    data,
    changesList,
    HeaderComponent,
    StickyElementComponent,
    TopListElementComponent,
    shouldUseSpinner,
    ...props
}: CustomFlatListProps<T>): React.ReactNode {
    const listRef = useRef<Animated.FlatList<T> | null>(null);

    const [scrollY, styles, onLayoutHeaderElement, onLayoutStickyElement] =
        useCustomFlatListHook();

    const memoizedList = useMemo(() => {
        return (
            <Animated.FlatList<any>
                ref={listRef}
                data={data}
                {...props}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: "center",
                    paddingTop: 120,
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    }
                )}
            />
        );
    }, [changesList]);

    return (
        <SafeAreaView edges={["bottom"]} style={style}>
            <Animated.View
                style={styles.header}
                onLayout={onLayoutHeaderElement}>
                {HeaderComponent}
            </Animated.View>

            <Animated.View
                onLayout={onLayoutStickyElement}
                style={styles.stickyElement}>
                {StickyElementComponent}
            </Animated.View>

            {shouldUseSpinner ? (
                <View alignItems="center" justifyContent="center" flex={1}>
                    <ActivityIndicator />
                </View>
            ) : (
                memoizedList
            )}
        </SafeAreaView>
    );
}

export default CustomFlatList;
