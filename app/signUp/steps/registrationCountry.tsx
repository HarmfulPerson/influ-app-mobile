import { View, Text, XStack } from "tamagui";
import NotLoggedBackground from "../../components/TopBox/NotLoggedBackground/NotLoggedBackground";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/registrationCountry";
import { SelectDemoItem } from "../../components/Dropdown/Dropdown";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { countries } from "../../../constants/Countries";
import { router } from "expo-router";

type Country = { name: string; name_en: string; code: string };

export default function RegistrationCountry() {
    const polandCountry = countries.find(
        (country: Country) => country.name === "Polska"
    )?.name as string;
    const [pickedCountry, setPickedCountry] = useState<string>(polandCountry);

    const handlePickCountry = (country: string) => {
        setPickedCountry(country);
    };
    return (
        <View style={{ flex: 1 }}>
            <NotLoggedBackground hasBackButton dontDisplayLogo={true} />
            <TouchableWithoutFeedback
                style={{ flex: 1 }}
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.titleText}>Kraj rejestracji</Text>
                        <Text style={styles.infoText}>
                            Uslugi, ktore beda Cie dotyczyc, zaleza od kraju
                            rejestracji
                        </Text>
                        <Text style={styles.countryLabel}>Kraj</Text>
                        <XStack
                            style={styles.selectWrapper}
                            ai="center"
                            gap="$4">
                            <SelectDemoItem
                                valuePickFunction={handlePickCountry}
                                values={countries.map(
                                    (country: Country) => country.name
                                )}
                                pickedValue={pickedCountry}
                                id="select-demo-1"
                            />
                        </XStack>
                    </View>
                    <View>
                        <Text style={styles.bottomText}>
                            Naciskajac Zarejestruj sie bezpiecznie, akceptujesz
                            nasz{" "}
                            <Text style={styles.highlightedText}>
                                regulamin
                            </Text>{" "}
                            i{" "}
                            <Text style={styles.highlightedText}>
                                polityke prywatnosci
                            </Text>
                            .
                        </Text>
                        <Button
                            style={styles.nextStepButton}
                            variant="primary"
                            text="Zarejestruj się"
                            onPress={() =>
                                router.push("/signUp/steps/userData")
                            }
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
