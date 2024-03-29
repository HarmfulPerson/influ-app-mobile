import { Input, Text, View } from "tamagui";
import CustomInput from "../../../components/CustomInput";

export default function JdgForm(props: any) {
    const { setRegisterData, errors, registerData } = props;
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <CustomInput
                onChangeText={(e: string) =>
                    setRegisterData({
                        ...registerData,
                        email: e,
                    })
                }
                placeholder="Email"
                error={errors.email}
            />
            <CustomInput
                onChangeText={(e: string) =>
                    setRegisterData({
                        ...registerData,
                        phoneNumber: e,
                    })
                }
                placeholder="Numer telefonu"
                error={errors.phoneNumber}
            />
            <CustomInput
                onChangeText={(e: string) =>
                    setRegisterData({
                        ...registerData,
                        password: e,
                    })
                }
                placeholder="Hasło"
                password={true}
                error={errors.password}
            />
            <CustomInput
                onChangeText={(e: string) =>
                    setRegisterData({
                        ...registerData,
                        repeatedPassword: e,
                    })
                }
                placeholder="Powtórz hasło"
                password={true}
                error={errors.repeatedPassword}
            />
            <CustomInput
                onChangeText={(e: string) =>
                    setRegisterData({
                        ...registerData,
                        nameOfCompany: e,
                    })
                }
                placeholder="Nazwa firmy"
                error={errors.nameOfCompany}
            />
            <CustomInput
                onChangeText={(e: string) =>
                    setRegisterData({
                        ...registerData,
                        NIP: e,
                    })
                }
                placeholder="NIP"
                error={errors.NIP}
            />
        </View>
    );
}
