import { router } from "expo-router";
import { useSession } from "./hooks/session/authenticationProvider";
import { useState } from "react";
import { Button, Form, Image, Input, Text, View } from "tamagui";
import { LoginData } from "./types/signIn";
import { TvIcon } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import GoogleIcon from "../assets/images/google-icon.svg";

export default function SignIn() {
    const { signIn } = useSession();
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });
    const handleLogin = async () => {
        await signIn(loginData);
        router.replace("/");
    };
    return (
        <>
            <Form
                gap="$2"
                onSubmit={() => handleLogin()}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 200,
                }}
                padding="$8">
                <Text style={{ paddingBottom: 60, fontSize: 36 }}>Witamy</Text>

                <Form.Trigger asChild>
                    <View>
                        <Input
                            width={160}
                            marginBottom={5}
                            onChangeText={(e) =>
                                setLoginData({ ...loginData, email: e })
                            }
                            placeholder="Enter email"
                        />
                        <Input
                            width={160}
                            marginBottom={5}
                            onChangeText={(e) =>
                                setLoginData({ ...loginData, password: e })
                            }
                            secureTextEntry={true}
                            placeholder="Enter password"
                        />
                        <Form.Trigger asChild>
                            <Button>Submit</Button>
                        </Form.Trigger>
                    </View>
                </Form.Trigger>
                <View paddingTop="$6">
                    <Text
                        onPress={() =>
                            router.replace("/sign-up/(choices)/intro")
                        }>
                        Don't have an account yet? click here to register
                    </Text>
                    <Text style={{ alignSelf: "center", paddingTop: 40 }}>
                        or sign in with
                    </Text>
                    <View
                        style={{
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            paddingTop: 40,
                        }}>
                        <GoogleIcon width={48} height={48} />
                    </View>
                </View>
            </Form>
        </>
    );
}
