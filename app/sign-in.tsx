import { router } from "expo-router";
import { useSession } from "./hooks/session/authenticationProvider";
import { useState } from "react";
import { Button, Form, Input, Text, View } from "tamagui";
import { LoginData } from "./types/signIn";

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
                alignItems="center"
                gap="$2"
                onSubmit={() => handleLogin()}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                padding="$8">
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
                    <Text onPress={() => router.replace("/sign-up")}>
                        Don't have an account yet? click here to register
                    </Text>
                </View>
            </Form>
        </>
    );
}
