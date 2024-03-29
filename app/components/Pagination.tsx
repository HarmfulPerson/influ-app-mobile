import React from "react";
import { StyleSheet } from "react-native";
import { Text, XStack } from "tamagui";

const styles = StyleSheet.create({
    background: {
        backgroundColor: "red",
        width: "80%",
    },
    fontColor: {
        color: "white",
    },
});

const Pagination = (props: {
    count: number;
    onPageMove: (page: number) => void;
    rowsPerPage: number;
}) => {
    const { count, onPageMove, rowsPerPage } = props;
    const numberOfPages = Math.ceil(count / rowsPerPage);
    return (
        <XStack style={styles.background}>
            <Text>{numberOfPages}</Text>
        </XStack>
    );
};

export default Pagination;
