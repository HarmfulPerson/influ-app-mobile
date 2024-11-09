import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import Colors from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import TitleAndDescription from "../../(app)/addSocial/steps/TitleAndDescription";
const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

const SkeletonLoader = () => {
    const colorsLigher = [
        Colors.grayscale.surface.subtle,
        Colors.grayscale.surface.default,
    ];

    const colorsDarker = [
        Colors.grayscale.surface.subtle,
        Colors.grayscale.surface.darker,
    ];

    const eachElement = (
        <View style={styles.advertisementSkeletonContainer}>
            <View style={styles.photo}>
                <View style={{ flexDirection: "column" }}>
                    <Skeleton
                        colors={colorsLigher}
                        radius={12}
                        height={110}
                        width={110}
                    />
                    <View style={styles.socialPlatforms}>
                        <View>
                            <Skeleton
                                colors={colorsLigher}
                                radius={6}
                                height={24}
                                width={24}
                            />
                        </View>
                        <View style={styles.socialPlatformNames}>
                            <Skeleton
                                colors={colorsDarker}
                                radius={4}
                                height={12}
                                width="100%"
                            />
                            <Spacer height={4} />

                            <Skeleton
                                colors={colorsDarker}
                                radius={4}
                                height={12}
                                width="100%"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.titleAndDescription}>
                    <View style={{ height: 110 }}>
                        <Skeleton
                            colors={colorsLigher}
                            radius={6}
                            height={12}
                            width={80}
                        />
                        <Spacer height={8} />
                        <Skeleton
                            colors={colorsLigher}
                            radius={6}
                            height={20}
                            width="100%"
                        />
                        <Spacer height={16} />
                        <Skeleton
                            colors={colorsLigher}
                            radius={6}
                            height={8}
                            width="100%"
                        />
                        <Spacer height={8} />
                        <Skeleton
                            colors={colorsLigher}
                            radius={6}
                            height={8}
                            width="100%"
                        />
                        <Spacer height={8} />
                        <Skeleton
                            colors={colorsLigher}
                            radius={6}
                            height={8}
                            width="80%"
                        />
                    </View>
                    <View style={styles.underTitle}>
                        <View style={styles.firstElemUnderTitle}>
                            <View>
                                <Skeleton
                                    colors={colorsLigher}
                                    radius={6}
                                    height={24}
                                    width={24}
                                />
                            </View>
                            <View style={styles.firstElemUnderTitleRows}>
                                <Skeleton
                                    colors={colorsDarker}
                                    radius={4}
                                    height={12}
                                    width="80%"
                                />
                                <Spacer height={4} />

                                <Skeleton
                                    colors={colorsDarker}
                                    radius={4}
                                    height={12}
                                    width="100%"
                                />
                            </View>
                        </View>
                        <View style={styles.secondElemUnderTitle}>
                            <Skeleton
                                colors={colorsDarker}
                                radius={6}
                                height={24}
                                width={24}
                            />
                            <View style={styles.smallerElementContainer}>
                                <Skeleton
                                    colors={colorsDarker}
                                    radius={4}
                                    height={16}
                                    width={21}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
    return (
        <LinearGradient
            style={styles.linearContainer}
            colors={["#9B3DFF", "#FE34F4", "#9B3DFF"]}
            locations={[0, 0.5, 1]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}>
            <View style={styles.headerContainer}>
                <View style={styles.backRow}>
                    <View style={{ width: "15%" }}>
                        <Skeleton
                            colors={colorsLigher}
                            radius={12}
                            height={44}
                            width={44}
                        />
                    </View>
                    <View style={styles.title}>
                        <Skeleton
                            colors={colorsLigher}
                            radius={6}
                            height={12}
                            width={165}
                        />
                    </View>
                    <View style={{ width: "15%" }}></View>
                </View>

                <Spacer />
                <Skeleton colors={colorsLigher} height={40} width="100%" />
                <Spacer height={8} />
                <View style={styles.search}>
                    <View style={{ width: "80%" }}>
                        <Skeleton
                            colors={colorsDarker}
                            width={"100%"}
                            height={44}
                        />
                    </View>
                    <View style={styles.filter}>
                        <Skeleton
                            colors={colorsDarker}
                            radius={12}
                            height={44}
                            width={44}
                        />
                    </View>
                </View>
            </View>
            {eachElement}
            {eachElement}
            {eachElement}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    filter: {
        width: "20%",
        alignItems: "flex-end",
    },
    search: { display: "flex", flexDirection: "row" },
    title: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backRow: { display: "flex", flexDirection: "row" },
    headerContainer: {
        width: "100%",
        backgroundColor: Colors.grayscale.surface.darker,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    linearContainer: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    socialPlatforms: {
        paddingTop: 12,
        flex: 1,
        flexDirection: "row",
    },
    advertisementSkeletonContainer: {
        width: "90%",
        backgroundColor: Colors.grayscale.surface.darker,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginVertical: 4,
        borderRadius: 16,
        height: 186,
    },
    row: {
        height: 20,
        backgroundColor: "#E0E0E0",
        borderRadius: 8,
        marginVertical: 10,
        width: "100%",
    },
    photo: {
        width: "100%",
        flexDirection: "row",
    },
    socialPlatformNames: {
        flexDirection: "column",
        flex: 1,
        paddingLeft: 8,
    },
    titleAndDescription: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    underTitle: {
        paddingTop: 12,
        width: "100%",
        flexDirection: "row",
    },
    firstElemUnderTitle: { width: "60%", flexDirection: "row" },
    firstElemUnderTitleRows: { paddingLeft: 8, flex: 1 },
    secondElemUnderTitle: {
        width: "40%",
        flexDirection: "row",
        paddingLeft: 12,
    },
    smallerElementContainer: {
        height: 24,
        paddingLeft: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SkeletonLoader;
