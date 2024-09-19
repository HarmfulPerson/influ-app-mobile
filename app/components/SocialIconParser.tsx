import TiktokIcon from "../../assets/images/tiktok.svg";
import FacebookIcon from "../../assets/images/facebook.svg";
import InstagramIcon from "../../assets/images/instagram.svg";
import YoutubeIcon from "../../assets/images/youtube.svg";
import TwitchIcon from "../../assets/images/twitch.svg";
import XIcon from "../../assets/images/X.svg";
import LinkedinIcon from "../../assets/images/linkedin.svg";
import SpotifyIcon from "../../assets/images/spotify.svg";

const SocialIcon = (props: {
    social: string;
    width: number;
    height: number;
    fill?: string;
}) => {
    const { social, width, height, fill } = props;
    const socialIconParser = {
        tiktok: <TiktokIcon width={width} height={height} fill={fill} />,
        facebook: <FacebookIcon width={width} height={height} fill={fill} />,
        instagram: <InstagramIcon width={width} height={height} fill={fill} />,
        youtube: <YoutubeIcon width={width} height={height} fill={fill} />,
        twitch: <TwitchIcon width={width} height={height} fill={fill} />,
        x: <XIcon width={width} height={height} fill={fill} />,
        linkedin: <LinkedinIcon width={width} height={height} fill={fill} />,
        spotify: <SpotifyIcon width={width} height={height} fill={fill} />,
    };

    return <>{socialIconParser[social as keyof typeof socialIconParser]}</>;
};
export default SocialIcon;
