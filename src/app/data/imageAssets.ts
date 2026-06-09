import bannerImg from "../../image_assets/porto web assets/Mihoyo/new1.jpg";
import polaroidImg from "../../image_assets/porto web assets/Mihoyo/polaroid.jpg";
import chibiSticker from "../../image_assets/porto web assets/Mihoyo/chibi.png";
import chibiWinkSticker from "../../image_assets/porto web assets/Mihoyo/chibi_wink.png";
import sold1Listing from "../../image_assets/porto web assets/Mihoyo/sold1.PNG";
import sold1a from "../../image_assets/porto web assets/Mihoyo/sold1a.PNG";
import sold1b from "../../image_assets/porto web assets/Mihoyo/sold1b.PNG";
import sold1c from "../../image_assets/porto web assets/Mihoyo/sold1c.PNG";
import sold1d from "../../image_assets/porto web assets/Mihoyo/sold1d.PNG";
import sold2Listing from "../../image_assets/porto web assets/Mihoyo/sold2.PNG";
import sold2a from "../../image_assets/porto web assets/Mihoyo/sold2a.png";
import sold2b from "../../image_assets/porto web assets/Mihoyo/sold2b.png";
import sold2c from "../../image_assets/porto web assets/Mihoyo/sold2c.png";
import sold3Img from "../../image_assets/porto web assets/Mihoyo/sold3.png";
import animeBanner from "../../image_assets/porto web assets/Anime/pol5.PNG";
import animePol1 from "../../image_assets/porto web assets/Anime/pol1.PNG";
import animePol4 from "../../image_assets/porto web assets/Anime/pol4.PNG";
import animeKey1 from "../../image_assets/porto web assets/Anime/key1.png";
import animePol2 from "../../image_assets/porto web assets/Anime/pol2.PNG";
import animeSold1 from "../../image_assets/porto web assets/Anime/sold1.PNG";
import animeSold2 from "../../image_assets/porto web assets/Anime/sold2.png";
import mcytBanner from "../../image_assets/porto web assets/MCYT/skephalo6.jpg";
import mcytFlux from "../../image_assets/porto web assets/MCYT/flux1.jpg";
import mcytSkep from "../../image_assets/porto web assets/MCYT/Skep1.jpg";
import mcytGroup1 from "../../image_assets/porto web assets/MCYT/group1.jpg";
import mcytBbh from "../../image_assets/porto web assets/MCYT/bbh1.jpg";
import mcytVid1 from "../../image_assets/porto web assets/MCYT/mcytvid1.mp4";
import mcytVid2 from "../../image_assets/porto web assets/MCYT/mcytvid2.mp4";
import cocBanner from "../../image_assets/porto web assets/CoC/1.jpg";
import cocKevin from "../../image_assets/porto web assets/CoC/5.jpg";
import cocGroup from "../../image_assets/porto web assets/CoC/2.jpg";
import cocNus from "../../image_assets/porto web assets/CoC/3.jpg";
import cocChibi from "../../image_assets/porto web assets/CoC/4.jpg";
import coc7 from "../../image_assets/porto web assets/CoC/7.jpg";
import personalBanner from "../../image_assets/porto web assets/Personal/per1.jpg";
import waengsLogo from "../../image_assets/porto web assets/Personal/Logos/waengs.png";
import logoUntitled from "../../image_assets/porto web assets/Personal/Logos/Untitled_Artwork.png";
import logoUntitled6 from "../../image_assets/porto web assets/Personal/Logos/Untitled_Artwork (6).png";
import logo486 from "../../image_assets/porto web assets/Personal/Logos/Untitled486_20241010150337.png";
import logoImg from "../../image_assets/porto web assets/Personal/Logos/IMG_1015.PNG";
import spireMc from "../../image_assets/porto web assets/Personal/The Spire of Azael/mc.png";
import sb6 from "../../image_assets/porto web assets/Personal/sb6.jpeg";
import sb7 from "../../image_assets/porto web assets/Personal/sb7.jpeg";
import sb8 from "../../image_assets/porto web assets/Personal/sb8.jpeg";
import sb9 from "../../image_assets/porto web assets/Personal/sb9.jpeg";
import sb10 from "../../image_assets/porto web assets/Personal/sb10.jpeg";
import bf1 from "../../image_assets/porto web assets/Personal/bf1.JPG";
import bf2 from "../../image_assets/porto web assets/Personal/bf2.PNG";
import bf3 from "../../image_assets/porto web assets/Personal/bf3.JPG";
import bf4 from "../../image_assets/porto web assets/Personal/bf4.PNG";
import blBanner from "../../image_assets/porto web assets/BlueLock/sketch1.PNG";
import blPin1 from "../../image_assets/porto web assets/BlueLock/pin1.PNG";
import blPin2 from "../../image_assets/porto web assets/BlueLock/pin2.PNG";
import blPin3 from "../../image_assets/porto web assets/BlueLock/pin3.PNG";
import blPin4 from "../../image_assets/porto web assets/BlueLock/pin4.PNG";
import blPin5 from "../../image_assets/porto web assets/BlueLock/pin5.PNG";
import bl2pin1 from "../../image_assets/porto web assets/BlueLock/2pin1.PNG";
import bl2pin2 from "../../image_assets/porto web assets/BlueLock/2pin2.PNG";
import bl2pin3 from "../../image_assets/porto web assets/BlueLock/2pin3.PNG";
import bl2pin4 from "../../image_assets/porto web assets/BlueLock/2pin4.PNG";
import bl2pin5 from "../../image_assets/porto web assets/BlueLock/2pin5.PNG";
import bl2pin6 from "../../image_assets/porto web assets/BlueLock/2pin6.PNG";
import blKey1 from "../../image_assets/porto web assets/BlueLock/key1.png";
import blKey2 from "../../image_assets/porto web assets/BlueLock/key2.png";
import blKey3 from "../../image_assets/porto web assets/BlueLock/key3.png";
import blKey4 from "../../image_assets/porto web assets/BlueLock/key4.png";
import blKey5 from "../../image_assets/porto web assets/BlueLock/key5.png";
import blKey6 from "../../image_assets/porto web assets/BlueLock/key6.png";
import cindy1 from "../../image_assets/porto web assets/me/cindy1.jpeg";
import cindy2 from "../../image_assets/porto web assets/me/cindy2.jpeg";

const spirePixelModules = import.meta.glob(
  "../../image_assets/porto web assets/Personal/The Spire of Azael/Untitled8*.png",
  { eager: true, import: "default" },
) as Record<string, string>;

const SPIRE_PIXEL_ROSTER = Object.keys(spirePixelModules)
  .sort()
  .map((path) => spirePixelModules[path]);

const bfCatModules = import.meta.glob(
  "../../image_assets/porto web assets/Personal/bfcats/*.{jpg,JPG,jpeg,JPEG}",
  { eager: true, import: "default" },
) as Record<string, string>;

const BF_CATS = Object.keys(bfCatModules)
  .sort()
  .map((path) => ({
    src: bfCatModules[path],
    filename: path.split("/").pop() ?? path,
  }));

export const PERSONAL_ASSETS = {
  banner: personalBanner,
  logos: [logoUntitled, logoUntitled6, logo486, logoImg] as const,
  bfCats: BF_CATS,
  sb: [sb6, sb7, sb8, sb9, sb10] as const,
  spire: {
    mc: spireMc,
    pixelRoster: SPIRE_PIXEL_ROSTER,
  },
  partner: {
    birthday: [bf1, bf2, bf3, bf4] as const,
  },
};

export const BLUELOCK_ASSETS = {
  banner: blBanner,
  store: {
    couplePin: [blPin1, blPin2, blPin3, blPin4, blPin5] as const,
    individualPin: [bl2pin1, bl2pin2, bl2pin3, bl2pin4, bl2pin5, bl2pin6] as const,
    key: [blKey1, blKey2, blKey3, blKey4, blKey5, blKey6] as const,
  },
};

export const ANIME_ASSETS = {
  banner: animeBanner,
  gallery: [animePol4, animePol1, animeKey1, animePol2] as const,
  cupOCollect: [animeSold1, animeSold2] as const,
};

export const COC_ASSETS = {
  banner: cocBanner,
  gallery: [cocGroup, cocNus, cocChibi, coc7] as const,
  introStickers: [cocKevin] as const,
};

export const MCYT_ASSETS = {
  banner: mcytBanner,
  gallery: [mcytFlux, mcytSkep, mcytGroup1, mcytBbh] as const,
  introStickers: [mcytSkep, mcytFlux] as const,
  videos: [mcytVid1, mcytVid2] as const,
};

export const MIHOYO_ASSETS = {
  banner: bannerImg,
  polaroid: polaroidImg,
  chibi: chibiSticker,
  chibiWink: chibiWinkSticker,
  cupOCollect: [sold3Img] as const,
  shopeeShelf: {
    sold1: {
      listing: sold1Listing,
      pairs: [
        { label: "danheng", back: sold1a, front: sold1b },
        { label: "blade", back: sold1c, front: sold1d },
      ],
    },
    sold2: {
      listing: sold2Listing,
      items: [
        { label: "zhongli & childe", src: sold2a },
        { label: "kaeya & diluc", src: sold2b },
        { label: "aether & xiao", src: sold2c },
      ],
    },
  },
};

export const BRAND_ASSETS = {
  logo: waengsLogo,
};

export const ABOUT_ASSETS = {
  /** Home about snippet — cindy2 */
  home: cindy2,
  /** Full about page — cindy1 */
  page: cindy1,
};
