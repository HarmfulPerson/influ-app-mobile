import { Dispatch, SetStateAction, useState } from "react";
import {
  Text,
  View,
  Button as TamaguiButton,
  Input,
  Circle,
  ScrollView,
} from "tamagui";
import { styles } from "../styles/companyLink";
import Colors from "../../../../constants/Colors";
import { Check, Search } from "lucide-react-native";

type CampaignDropdownProps = {
  pickedCampaign: string | null;
  setPickedCampaign: Dispatch<SetStateAction<string | null>>;
};

const CompanyLinkCampaignDropdown = (props: CampaignDropdownProps) => {
  const { setPickedCampaign, pickedCampaign } = props;
  const campaigns = [
    "campaign1",
    "campaign2",
    "campaign3",
    "campaign4",
    "campaign5",
    "campaign6",
  ];
  const [displayedCampaigns, setDisplayedCampaigns] = useState(campaigns);
  const [searchedString, setSearchedString] = useState<string>();

  const handleInputChange = (substring: string) => {
    const filteredCampaigns = campaigns.filter((campaign) =>
      campaign.includes(substring)
    );
    setSearchedString(substring);
    setDisplayedCampaigns(filteredCampaigns);
  };

  return (
    <View>
      <Text style={styles.campaignPickerTitle}>Wybierz kampanie</Text>
      <TamaguiButton
        style={styles.searchButton}
        borderWidth={1}
        borderColor={Colors.grayscale.surface.default}
      >
        <Input
          borderWidth={0}
          placeholder="Wyszukaj kampanie"
          style={{ flex: 1 }}
          value={searchedString}
          onChangeText={(text) => handleInputChange(text)}
          backgroundColor={Colors.grayscale.surface.darker}
          borderColor={Colors.grayscale.surface.default}
        ></Input>
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
            style={styles.campaignRow}
          >
            <Text style={styles.campaignRowText}>{campaign}</Text>
            {pickedCampaign === campaign && (
              <Circle
                width={18}
                height={18}
                backgroundColor={Colors.primary.surface.lighter}
              >
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

export default CompanyLinkCampaignDropdown;
