import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import { useMemo, useRef, useState } from "react";
import type { FontSizeTokens, SelectProps } from "tamagui";
import {
    Adapt,
    Label,
    Select,
    Sheet,
    XStack,
    YStack,
    getFontSize,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import Colors from "../../../constants/Colors";

type SelectPropsExtended<T> = {
    valuePickFunction: (value: string) => void;
    pickedValue: string;
    values: string[];
} & SelectProps;

export function SelectDemoItem<T>(props: SelectPropsExtended<T>) {
    const { values, pickedValue, valuePickFunction } = props;
    const handlePickValue = (value: string) => {
        valuePickFunction(value);
    };

    return (
        <Select
            value={pickedValue}
            onValueChange={handlePickValue}
            disablePreventBodyScroll
            {...props}>
            <Select.Trigger
                backgroundColor={Colors.grayscale.surface.darker}
                borderColor={Colors.grayscale.surface.default}
                color={Colors.grayscale.surface.disabled}
                width="100%"
                height={56}
                iconAfter={
                    <ChevronDown width={16} height={16} strokeWidth={3} />
                }>
                <Select.Value
                    color={Colors.grayscale.text.subtitle}
                    placeholder="Wybierz swój kraj"
                />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native={!!props.native}
                    modal
                    // dismissOnSnapToBottom
                    animationConfig={{
                        type: "spring",
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}>
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3">
                    <YStack zIndex={10}>
                        <ChevronUp size={20} />
                    </YStack>
                    {/* <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={["$background", "transparent"]}
                        borderRadius="$4"
                    /> */}
                </Select.ScrollUpButton>

                <Select.Viewport
                    // to do animations:
                    animation="quick"
                    animateOnly={["transform", "opacity"]}
                    enterStyle={{ o: 0, y: -10 }}
                    exitStyle={{ o: 0, y: 10 }}
                    minWidth={200}>
                    <Select.Group>
                        <Select.Label>Kraje</Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {useMemo(
                            () =>
                                values.map((item: string, i: number) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item}
                                            value={item}>
                                            <Select.ItemText>
                                                {item}
                                            </Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check
                                                    size={16}
                                                    color={
                                                        Colors.primary.text
                                                            .label
                                                    }
                                                />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    );
                                }),
                            [values]
                        )}
                    </Select.Group>
                    {props.native && (
                        <YStack
                            position="absolute"
                            right={0}
                            top={0}
                            bottom={0}
                            alignItems="center"
                            justifyContent="center"
                            width={"$4"}
                            pointerEvents="none">
                            <ChevronDown
                                size={getFontSize(
                                    (props.size as FontSizeTokens) ?? "$true"
                                )}
                            />
                        </YStack>
                    )}
                </Select.Viewport>

                <Select.ScrollDownButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3">
                    <YStack zIndex={10}>
                        <ChevronDown size={20} />
                    </YStack>
                    <LinearGradient
                        start={[0, 0]}
                        end={[0, 1]}
                        fullscreen
                        colors={["transparent", "$background"]}
                        borderRadius="$4"
                    />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    );
}
