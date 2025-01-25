import { View, Text } from "tamagui";
import EachCooperation from "../EachCooperation/EachCooperation";
import { styles } from "./styles";
import { Campaign } from "../../types/campaign";
import { Social } from "../../types/social";

const EachCampaign = ({ item }: { item: Campaign }) => {
    const isCampaignFinished =
        !!item.socials.length &&
        item?.socials
            .map((social: Social) => social.socialStatus?.status)
            .every((status: string) => status === "finished");

    return (
        <View style={styles.container}>
            {isCampaignFinished && (
                <View style={styles.endContainer}>
                    <Text style={styles.endText}>ZAKOŃCZONA</Text>
                </View>
            )}
            <View style={styles.nameAndCounterContainer}>
                <Text style={styles.campaignName}>{item.name}</Text>
                <Text style={styles.campaignCounter}>
                    {`${item.socials.length} współprace`}
                </Text>
            </View>

            {item.socials.map((item: Social, index: number) => (
                <View
                    key={index}
                    style={[
                        styles.eachCooperationContainer,
                        {
                            marginTop: index === 0 ? -8 : -70,
                            zIndex: index + 1,
                        },
                    ]}>
                    <EachCooperation
                        containerStyle={styles.eachCooperation}
                        item={item}
                    />
                </View>
            ))}
        </View>
    );
};

export default EachCampaign;
