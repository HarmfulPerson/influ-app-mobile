import { router } from "expo-router";
import { Button, Form, RadioGroup, ScrollView, Text, View } from "tamagui";
import { RadioGroupItemWithLabel } from "../../components/RadioGroupItemWithLabel";
import { TYPE_OF_RECKONING } from "../../../constants/SignUp";
import { useEffect, useState } from "react";
import { RegisterData } from "../../types/signUp";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import { styles } from "./styles/influencer";
import { isErrorYupType } from "../../../utils/yup";
import TopBox from "../../components/TopBox/TopBox";
import { KeyboardAvoidingView } from "react-native";
import CompanyForm from "./components/company";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const registerSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Numer telefonu jest nieprawidłowy"),
    email: yup
        .string()
        .email("Email jest nieprawidłowy")
        .required("Email jest wymagany"),
    password: yup
        .string()
        .required()
        .min(8, "Hasło musi mieć conajmniej 8 znaków")
        .matches(/[A-Z]/, "Hasło musi posiadać conajmniej 1 dużą literę")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Hasło musi posiadać conajmniej jeden znak specjalny"
        ),
    repeatedPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Hasła muszą być takie same")
        .required("Musisz potwierdzić hasło"),
    nameOfCompany: yup.string().required("Nazwa firmy jest wymagana"),
    NIP: yup.string().matches(/^\d{10}$/, "NIP musi być prawidłowy"),
});

export default function Advertiser() {
    const [registerData, setRegisterData] = useState<RegisterData>({
        email: "",
        phoneNumber: "",
        password: "",
        repeatedPassword: "",
        nameOfCompany: "",
        typeOfReckoning: TYPE_OF_RECKONING.jdg,
        NIP: "",
        roles: [],
    });
    const [errors, setErrors] = useState({
        email: null,
        phoneNumber: null,
        password: null,
        repeatedPassword: null,
        nameOfCompany: null,
        typeOfReckoning: null,
        NIP: null,
    });

    const handleSubmit = async () => {
        try {
            const validation = await registerSchema.validate(registerData, {
                abortEarly: false,
            });
            const response: AxiosResponse = await axios.post(
                `http://192.168.0.101:4000/api/v1/auth/signUp`,
                { body: registerData }
            );
        } catch (err: any) {
            if (isErrorYupType(err)) {
                const newErrors = {};
                err.inner.forEach(
                    (error: { path: string; errors: Array<string> }) => {
                        (newErrors as any)[error.path] = error.errors[0];
                    }
                );
                setErrors({ ...errors, ...newErrors });
            }
        }
    };

    const clearErrors = () => {
        let noErrorsObject = { ...errors };
        for (let key in noErrorsObject) {
            noErrorsObject[key as keyof typeof errors] = null;
        }
        setErrors(noErrorsObject);
    };

    useEffect(() => clearErrors(), [registerData.typeOfReckoning]);

    return (
        <View style={styles.container}>
            <TopBox
                onBackPress={() => router.replace("/sign-up/(choices)/intro")}
                headerText="Zakładasz konto jako reklamodawca"
            />
            <KeyboardAvoidingView
                style={styles.keyBoardAvoiding}
                keyboardVerticalOffset={-64}
                enabled
                behavior="padding">
                <Form
                    alignItems="center"
                    gap="$2"
                    onSubmit={() => console.log(1)}
                    style={styles.form}
                    paddingTop="$6"
                    paddingBottom="$14">
                    <Form.Trigger asChild>
                        <>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={styles.typeContainer}>
                                    <Text>Wybierz typ </Text>
                                    <RadioGroup
                                        aria-labelledby="Select one item"
                                        defaultValue={TYPE_OF_RECKONING.jdg}
                                        onValueChange={(value) =>
                                            setRegisterData({
                                                ...registerData,
                                                typeOfReckoning: value,
                                            })
                                        }
                                        name="form">
                                        <RadioGroupItemWithLabel
                                            size="$3"
                                            value={TYPE_OF_RECKONING.jdg}
                                            label="Jednoosobowa działalność gospodarcza"
                                        />
                                        <RadioGroupItemWithLabel
                                            size="$3"
                                            value={TYPE_OF_RECKONING.company}
                                            label="Spółka"
                                        />
                                    </RadioGroup>
                                </View>

                                <CompanyForm
                                    setRegisterData={setRegisterData}
                                    errors={errors}
                                    registerData={registerData}
                                />
                            </ScrollView>
                            <Form.Trigger asChild>
                                <Button
                                    style={{ backgroundColor: "red" }}
                                    onPress={() => handleSubmit()}>
                                    Załóż konto
                                </Button>
                            </Form.Trigger>
                        </>
                    </Form.Trigger>
                </Form>
            </KeyboardAvoidingView>
        </View>
    );
}
