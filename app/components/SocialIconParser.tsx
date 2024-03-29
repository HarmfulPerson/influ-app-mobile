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
}) => {
    const { social, width, height } = props;
    const socialIconParser = {
        tiktok: <TiktokIcon width={width} height={height} />,
        facebook: <FacebookIcon width={width} height={height} />,
        instagram: <InstagramIcon width={width} height={height} />,
        youtube: <YoutubeIcon width={width} height={height} />,
        twitch: <TwitchIcon width={width} height={height} />,
        x: <XIcon width={width} height={height} />,
        linkedin: <LinkedinIcon width={width} height={height} />,
        spotify: <SpotifyIcon width={width} height={height} />,
    };

    return <>{socialIconParser[social as keyof typeof socialIconParser]}</>;
};
export default SocialIcon;
