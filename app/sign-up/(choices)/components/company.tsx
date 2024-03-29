import { Input, Text, View } from "tamagui";
import CustomInput from "../../../components/CustomInput";

export default function CompanyForm(props: any) {
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
        </View>
    );
}
