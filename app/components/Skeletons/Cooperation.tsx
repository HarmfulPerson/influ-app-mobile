import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import Colors from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

const SkeletonCooperationList = () => {
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
            <View style={styles.photoContainer}>
                <Skeleton
                    colors={colorsLigher}
                    radius={12}
                    height={44}
                    width={44}
                />
                <View style={{ width: 12 }}></View>
                <Skeleton
                    colors={colorsLigher}
                    radius={12}
                    height={44}
                    width={44}
                />
                <View style={styles.nameOfCompany}>
                    <Skeleton
                        colors={colorsLigher}
                        radius={12}
                        height={8}
                        width={73}
                    />
                    <Spacer height={8} />
                    <Skeleton
                        colors={colorsLigher}
                        radius={12}
                        height={12}
                        width={187}
                    />
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
    advertisementSkeletonContainer: {
        width: "90%",
        backgroundColor: Colors.grayscale.surface.darker,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginVertical: 4,
        borderRadius: 24,
        height: 92,
        justifyContent: "center",
    },
    nameOfCompany: {
        flex: 1,
        paddingLeft: 8,
        justifyContent: "center",
        flexDirection: "column",
    },
    photoContainer: {
        flexDirection: "row",
        minWidth: "98%",
    },
});

export default SkeletonCooperationList;
