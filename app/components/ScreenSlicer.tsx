import React, { Component, ReactNode, useState } from "react";
import { ScrollView, Separator, Text, View } from "tamagui";
type DisplayedData = "left" | "right";
const ScreenSlicer = (props: {
    leftHeader: string;
    rightHeader: string;
    leftContent: ReactNode;
    rightContent: ReactNode;
}) => {
    const { leftHeader, rightHeader, leftContent, rightContent } = props;
    const [displayedData, setDisplayedData] = useState<DisplayedData>("left");
    return (
        <>
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}>
                <Text
                    onPress={() => setDisplayedData("left")}
                    style={{
                        width: "50%",
                        textAlign: "center",
                        fontSize: 30,
                    }}>
                    {leftHeader}
                </Text>
                <Separator vertical marginHorizontal={15} />
                <Text
                    onPress={() => setDisplayedData("right")}
                    style={{
                        width: "50%",
                        textAlign: "center",
                        fontSize: 30,
                    }}>
                    {rightHeader}
                </Text>
            </View>
            <View style={{ width: "100%" }}>
                {displayedData === "left" ? leftContent : rightContent}
            </View>
        </>
    );
};
export default ScreenSlicer;
