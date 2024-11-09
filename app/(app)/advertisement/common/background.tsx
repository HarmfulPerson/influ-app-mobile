import { ReactNode, useState } from "react";
import { View, Button as TamaguiButton, Text } from "tamagui";
import Colors from "../../../../constants/Colors";
import { BookmarkCheck, ChevronLeft, Share } from "lucide-react-native";
import {
    Keyboard,
    LayoutChangeEvent,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { navigateBack } from "../../../../utils/utils";
import MenuIcon from "../../../../assets/images/MenuIcon.svg";
import { BlurView } from "@react-native-community/blur";
import Button from "../../../components/Button/Button";
import { styles } from "../styles/background";

type Props = {
    mainArea?: ReactNode;
    bottomArea?: ReactNode;
};

export default function Background(props: Props) {
    const { mainArea, bottomArea } = props;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isModalFinishVisible, setIsModalFinishVisible] =
        useState<boolean>(false);

    const MENU_POPUP_WIDTH = 224;
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleLayout = (event: LayoutChangeEvent) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        setCoords({
            x: x - MENU_POPUP_WIDTH + width,
            y: y + height / 2,
        });
    };

    const showTooltip = () => {
        setIsVisible(true);
    };

    const handleFinishClick = () => {
        setIsModalFinishVisible(true);
        setIsVisible(false);
    };
    return (
        <>
            <View
                flex={1}
                backgroundColor={Colors.grayscale.surface.darker}
                style={styles.wrapper}
                alignItems="center">
                <TamaguiButton
                    borderColor={Colors.grayscale.surface.subtle}
                    onPress={navigateBack}
                    style={styles.backButton}>
                    <ChevronLeft color={Colors.grayscale.text.body} />
                </TamaguiButton>
                <Text style={styles.title}>STRONA OGŁOSZENIA</Text>
                <TamaguiButton
                    borderColor={Colors.grayscale.surface.subtle}
                    onPress={() => showTooltip()}
                    onLayout={handleLayout}
                    style={styles.menuButton}>
                    <MenuIcon />
                </TamaguiButton>
                <View style={styles.mainAreaContainer}>
                    <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => Keyboard.dismiss()}>
                        {mainArea}
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.bottomArea}>{bottomArea}</View>
            </View>
            <Modal transparent={true} visible={isVisible} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                    <BlurView
                        blurType="dark"
                        blurAmount={1}
                        reducedTransparencyFallbackColor="white"
                        style={styles.blurViewBackground}></BlurView>
                </TouchableWithoutFeedback>
                <View
                    style={[
                        styles.menuContainer,
                        {
                            top: coords.y,
                            left: coords.x,
                            width: MENU_POPUP_WIDTH,
                        },
                    ]}>
                    <View
                        onPress={handleFinishClick}
                        style={styles.finishContainer}>
                        <Text style={styles.finishorFinishText}>Zakończ</Text>
                        <BookmarkCheck
                            width={24}
                            height={24}
                            color={Colors.grayscale.text.caption}
                        />
                    </View>
                    <View style={styles.shareContainer}>
                        <Text style={styles.finishorFinishText}>
                            Udostępnij
                        </Text>
                        <Share
                            width={24}
                            height={24}
                            color={Colors.grayscale.text.caption}
                        />
                    </View>
                </View>
            </Modal>
            <Modal
                transparent={true}
                visible={isModalFinishVisible}
                animationType="slide">
                <TouchableWithoutFeedback
                    onPress={() => setIsModalFinishVisible(false)}>
                    <View style={styles.finishAdvertisementBackground}>
                        <TouchableWithoutFeedback style={{ flex: 1 }}>
                            <View style={styles.finishAdvertisementContainer}>
                                <Text style={styles.finishTitle}>Uwaga</Text>
                                <Text style={styles.finishSubtitle}>
                                    Czy na pewno chcesz zakończyć ogłoszenie?
                                </Text>
                                <View style={styles.chooseButtonsContainer}>
                                    <Button
                                        variant="secondary"
                                        onPress={() =>
                                            setIsModalFinishVisible(false)
                                        }
                                        text="Nie"
                                        style={styles.chooseButton}
                                    />
                                    <Button
                                        variant="primary"
                                        text="Tak"
                                        style={styles.chooseButton}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}
