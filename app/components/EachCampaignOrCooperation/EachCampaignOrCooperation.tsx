import { Campaign } from "../../types/campaign";
import { Social } from "../../types/social";
import EachCampaign from "../EachCampaign/EachCampaign";
import EachCooperation from "../EachCooperation/EachCooperation";

const EachCampaignOrCooperation = ({ item }: { item: Campaign | Social }) => {
    if ("purpose" in item) return <EachCampaign item={item} />;
    return <EachCooperation item={item} />;
};

export default EachCampaignOrCooperation;
