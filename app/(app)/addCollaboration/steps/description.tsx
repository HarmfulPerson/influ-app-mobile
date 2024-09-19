import { View, Text } from "tamagui";
import Background from "../common/background";
import { styles } from "../styles/description";
import Input from "../../../components/Input/Input";
import { Keyboard } from "react-native";
import CustomTextArea from "../../../components/TextArea/TextArea";
import { useState } from "react";
import Button from "../../../components/Button/Button";
import { router, useLocalSearchParams } from "expo-router";
import * as yup from "yup";
import { validate } from "../../../../utils/yup";

const descriptionSchema = yup.object().shape({
    description: yup
        .string()
        .min(3, "Opis powinien mieć conajmniej 3 znaki")
        .required("Opis jest wymagany"),
    title: yup
        .string()
        .min(3, "Tytuł powinien mieć conajmniej 3 znaki")
        .required("Tytuł jest wymagany"),
});

export default function Description() {
    const { advertisementCategories } = useLocalSearchParams();
    const [descriptionData, setDescriptionData] = useState<{
        description: string;
        title: string;
    }>({ description: "", title: "" });
    const [errors, setErrors] = useState<{
        description?: string;
        title?: string;
    }>({});

    const canProceed = () =>
        descriptionData.description.length > 0 &&
        descriptionData.title.length > 0;

    const navigateToNextPage = async () => {
        const errors = await validate(descriptionSchema, descriptionData);
        if (Object.values(errors).length) return setErrors(errors);

        router.push({
            pathname: "addCollaboration/steps/startDate",
            params: {
                title: descriptionData.title,
                description: descriptionData.description,
                advertisementCategories,
            },
        });
    };
    const descriptionInfoMessage =
        "UŻYJ TEGO MIEJSCA, ABY SZYBKO PRZEDSTAWIĆ INFLUENCEROM, O CZYM JEST TWOJA REKLAMA";

    const mainArea = (
        <View flex={1}>
            <Text style={styles.header}>Czego dotyczy Twoje ogłoszenie?</Text>
            <Input
                label="Tytuł"
                value={descriptionData.title}
                error={!!errors.title}
                infoMessage={errors.title}
                onChangeText={(text) =>
                    setDescriptionData({
                        ...descriptionData,
                        title: text,
                    })
                }
                placeholder="Wprowadź tytuł ogłoszenia..."
            />
            <CustomTextArea
                label="Opis"
                placeholder="Wprowadź opis..."
                value={descriptionData.description}
                onChangeText={(text) =>
                    setDescriptionData({
                        ...descriptionData,
                        description: text,
                    })
                }
                error={!!errors.description}
                infoMessage={
                    !!errors.description
                        ? errors.description
                        : descriptionInfoMessage
                }
                style={{ flex: 1 }}
            />
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
                onPress={() => router.back()}
                style={{ height: "100%", width: "48%" }}
                text="Wstecz"
            />
            <Button
                variant="primary"
                disabled={!canProceed()}
                onPress={navigateToNextPage}
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
