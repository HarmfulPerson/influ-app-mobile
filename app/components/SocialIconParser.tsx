import TiktokIcon from "../../assets/images/tiktok.svg";
import FacebookIcon from "../../assets/images/facebook.svg";
import InstagramIcon from "../../assets/images/instagram.svg";
import YoutubeIcon from "../../assets/images/youtube.svg";
import TwitchIcon from "../../assets/images/twitch.svg";
import XIcon from "../../assets/images/X.svg";
import LinkedinIcon from "../../assets/images/linkedin.svg";
import SpotifyIcon from "../../assets/images/spotify.svg";
import ColouredSpotifyIcon from "../../assets/images/coloured/spotify.svg";
import ColouredLinkedinIcon from "../../assets/images/coloured/linkedin.svg";
import ColouredXIcon from "../../assets/images/coloured/x.svg";
import ColouredTwitchIcon from "../../assets/images/coloured/twitch.svg";
import ColouredYoutubeIcon from "../../assets/images/coloured/youtube.svg";
import ColouredInstagramIcon from "../../assets/images/coloured/instagram.svg";
import ColouredFacebookIcon from "../../assets/images/coloured/facebook.svg";
import ColouredTiktokIcon from "../../assets/images/coloured/tiktok.svg";

const SocialIcon = (props: {
  social: string;
  width: number;
  height: number;
  fill?: string;
  coloured?: boolean;
}) => {
  const { social, width, height, fill, coloured } = props;
  const socialIconParser = {
    tiktok: coloured ? (
      <ColouredTiktokIcon width={width} height={height} />
    ) : (
      <TiktokIcon width={width} height={height} fill={fill} />
    ),
    facebook: coloured ? (
      <ColouredFacebookIcon width={width} height={height} />
    ) : (
      <FacebookIcon width={width} height={height} fill={fill} />
    ),
    instagram: coloured ? (
      <ColouredInstagramIcon width={width} height={height} />
    ) : (
      <InstagramIcon width={width} height={height} fill={fill} />
    ),
    youtube: coloured ? (
      <ColouredYoutubeIcon width={width} height={height} />
    ) : (
      <YoutubeIcon width={width} height={height} fill={fill} />
    ),
    twitch: coloured ? (
      <ColouredTwitchIcon width={width} height={height} />
    ) : (
      <TwitchIcon width={width} height={height} fill={fill} />
    ),
    x: coloured ? (
      <ColouredXIcon width={width} height={height} />
    ) : (
      <XIcon width={width} height={height} fill={fill} />
    ),
    linkedin: coloured ? (
      <ColouredLinkedinIcon width={width} height={height} />
    ) : (
      <LinkedinIcon width={width} height={height} fill={fill} />
    ),
    spotify: coloured ? (
      <ColouredSpotifyIcon width={width} height={height} />
    ) : (
      <SpotifyIcon width={width} height={height} fill={fill} />
    ),
  };

  return <>{socialIconParser[social as keyof typeof socialIconParser]}</>;
};
export default SocialIcon;
