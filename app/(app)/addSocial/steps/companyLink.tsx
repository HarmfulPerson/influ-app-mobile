import {
    RadioGroup,
    Text,
    View,
    YStack,
    Button as TamaguiButton,
    Input,
    Circle,
    ScrollView,
} from "tamagui";
import Colors from "../../../../constants/Colors";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import RadioButton from "../../addCollaboration/common/RadioButton";
import { Check, Search } from "lucide-react-native";
import { styles } from "../styles/companyLink";
import ModalMechanism from "../../../components/ModalMechanism/ModalMechanism";
import Background from "../common/Background";
import DropdownBottom from "../common/dropdownBottom";

export default function CompanyLink() {
    const [isAddedToCampaign, setIsAddedToCampaign] = useState("true");
    const [isOpenCampaignModal, setIsOpenCampaignModal] = useState(false);
    const openModalCampaing = () => setIsOpenCampaignModal(true);
    const closeModalCampaign = () => setIsOpenCampaignModal(false);
    const [pickedCampaign, setPickedCampaign] = useState<string | null>(null);
    const campaignDropDown = () => {
        const campaigns = [
            "campaign1",
            "campaign2",
            "campaign3",
            "campaign4",
            "campaign5",
            "campaign6",
        ];
        const [displayedCampaigns, setDisplayedCampaigns] = useState(campaigns);

        const handleInputChange = (substring: string) => {
            const filteredCampaigns = campaigns.filter((campaign) =>
                campaign.includes(substring)
            );

            setDisplayedCampaigns(filteredCampaigns);
        };
        return (
            <View>
                <Text style={styles.campaignPickerTitle}>Wybierz kampanie</Text>
                <TamaguiButton
                    style={styles.searchButton}
                    borderWidth={1}
                    borderColor={Colors.grayscale.surface.default}>
                    <Input
                        borderWidth={0}
                        placeholder="Wyszukaj kampanie"
                        style={{ flex: 1 }}
                        onChangeText={(text) => handleInputChange(text)}
                        backgroundColor={Colors.grayscale.surface.darker}
                        borderColor={Colors.grayscale.surface.default}></Input>
                    <View style={styles.searchIconContainer}>
                        <Search size={12} color={Colors.grayscale.text.body} />
                    </View>
                </TamaguiButton>
                <ScrollView style={styles.campaignRowsContainer}>
                    {displayedCampaigns.map((campaign: string) => (
                        <View
                            key={campaign}
                            onPress={() => {
                                if (pickedCampaign === campaign) {
                                    setPickedCampaign(null);
                                } else {
                                    setPickedCampaign(campaign);
                                }
                            }}
                            style={styles.campaignRow}>
                            <Text style={styles.campaignRowText}>
                                {campaign}
                            </Text>
                            {pickedCampaign === campaign && (
                                <Circle
                                    width={18}
                                    height={18}
                                    backgroundColor={
                                        Colors.primary.surface.lighter
                                    }>
                                    <Check
                                        width={10}
                                        height={10}
                                        color={Colors.grayscale.text.negative}
                                    />
                                </Circle>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    };
    const mainArea = (
        <View flex={1}>
            <Text style={styles.title}>
                Czy chcesz powiązać te współpracę z istniejącą kampanią?
            </Text>
            <Text style={styles.subtitle}>
                Jezeli tak, wyszukaj odpowiednia kampanie, a nastepnie kliknij
                przycisk dodaj
            </Text>
            <RadioGroup
                value={isAddedToCampaign}
                onValueChange={setIsAddedToCampaign}>
                <YStack gap={12}>
                    <RadioButton
                        setValue={setIsAddedToCampaign}
                        radioValue="true"
                        incomingValue={isAddedToCampaign}
                        firstRowText="Tak"
                        secondRowText="Chcę dodać współpracę do mojej kampanii"
                    />
                    <RadioButton
                        setValue={setIsAddedToCampaign}
                        radioValue="false"
                        incomingValue={isAddedToCampaign}
                        firstRowText="Nie"
                        secondRowText="Wybieram pojedyńczą współpracę"
                    />
                </YStack>
            </RadioGroup>
            {isAddedToCampaign === "true" && (
                <>
                    <View style={styles.campaingContainer}>
                        <Text style={styles.campaignTitle}>Kampania</Text>
                    </View>
                    <ModalMechanism
                        closeModal={closeModalCampaign}
                        isVisible={isOpenCampaignModal}
                        openModal={openModalCampaing}
                        triggerButton={
                            <TamaguiButton
                                style={styles.searchButton}
                                borderWidth={1}
                                onPress={openModalCampaing}
                                borderColor={Colors.grayscale.surface.default}>
                                <Input
                                    borderWidth={0}
                                    placeholder="Wybierz kampanie"
                                    style={{ flex: 1 }}
                                    onPressIn={openModalCampaing}
                                    editable={false}
                                    backgroundColor={
                                        Colors.grayscale.surface.darker
                                    }
                                    borderColor={
                                        Colors.grayscale.surface.default
                                    }></Input>
                                <View style={styles.searchIconContainer}>
                                    <Search
                                        size={12}
                                        color={Colors.grayscale.text.body}
                                    />
                                </View>
                            </TamaguiButton>
                        }
                        position="flex-end"
                        children={
                            <DropdownBottom
                                closeModal={closeModalCampaign}
                                children={campaignDropDown()}
                            />
                        }
                    />
                </>
            )}
        </View>
    );
    const botttomArea = (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
            }}>
            <Button
                variant="secondary"
                style={{ height: "100%", width: "48%" }}
                text="Wstecz"
            />
            <Button
                variant="primary"
                style={{ height: "100%", width: "48%" }}
                text="Dalej"
            />
        </View>
    );
    return (
        <Background
            mainArea={mainArea}
            bottomArea={botttomArea}
            progress={20}
        />
    );
}
