const xstore = {
  name: "Dust Swap - Seamless and Productive Trading on Linea",
  title: "Dust Swap - Seamless and Productive Trading on Linea",
  description: "",
  faviconUrl: "/favicon.ico",
  socialThumbUrl: "/images/logo.svg", // ảnh để share lên mạng xã hội <meta og:image/>
  page: {
    header: {
      logo: {
        title: "Dust Swap",
        imageUrl: "/images/logo.svg",
        imageUrl2: "/images/avt.png",
      },
      menuItem: [
        {
          title: "Home",
          url: "/",
          icon: "lineax-home",
        },
        {
          title: "Trade",
          url: "/trade",
          icon: "lineax-arrow-path",
        },
        {
          title: "Pool",
          url: "",
          icon: "lineax-stack-3d",
          iconSub: "lineax-arrow-down",
          subMenu: [
            {
              title: "Pools",
              url: "/pools",
              imageUrl: "",
            },
            {
              title: "Positions",
              url: "/positions",
              imageUrl: "",
            },
            {
              title: "Earnings",
              url: "/earnings",
              imageUrl: "",
            },
            {
              title: "Wizard",
              url: "/wizard",
              imageUrl: "",
            },
          ],
        },
        {
          title: "Events",
          url: "",
          icon: "lineax-star",
          iconSub: "lineax-arrow-down",
          subMenu: [
            {
              title: "Loyalty Programs",
              url: "/loyalty-programs",
              imageUrl: "",
            },
          ],
        },
        {
          title: "Launch",
          url: "/launch",
          icon: "lineax-launch",
        },
        {
          title: "Social",
          url: "",
          icon: "lineax-squares-22",
          iconSub: "lineax-arrow-down",
          subMenu: [
            {
              title: "Twitter",
              url: "https://x.com/dustswap_?s=21",
              imageUrl: "lineax-twitter",
            },
            {
              title: "Discord",
              url: "https://dustswap.io/#",
              imageUrl: "lineax-discord",
            },
            {
              title: "Telegram",
              url: "https://t.me/dustswap_official",
              imageUrl: "lineax-telegram",
            },
            // {
            //   title: "Mirror",
            //   url: "#",
            //   imageUrl: "lineax-mirror",
            // },
            // {
            //   title: "Guild",
            //   url: "#",
            //   imageUrl: "lineax-seamless",
            // },
            {
              title: "Docs",
              url: "https://dustswap.io/#",
              imageUrl: "lineax-book-open",
            },
          ],
        },
      ],
      menu: "/images/menu.svg",
      backgroundColor: "#f9f9f9",
    },
    banner: {
      backgroundUrl: "/images/background.png",
      backgroundColor: "",
      title: "Shinobi Community Like Never Before",
      subTitle: "NFT minted. Mint live",
      displayMintBox: 1,
      mintCount: "2,3,5",
      linkButtonHref: "#",
      linkButtonTitle: "Get here",
    },
    footer: {
      logo: {
        imageUrl: "",
        title: "Join Us Today To Meet Most Amazing Community Ever.",
        subTitle: "Copyright ©2022 All rights reserved Shinobi Bunny",
        imgFooterUrl: "/images/footer-bg.png",
      },
      backgroundColor: "#0C0C0C",
    },
  },
  fontFamily: "Font",
  fontUrl: "/fonts/FiraSans-Regular.ttf",
  fontHeading: "Font Heading",
  fontUrlHeading: "/fonts/FiraSans-Regular.ttf",
  fontSizeBody: "14px",
  fontSizeHeading: "20px",
  primaryColor: "#F0B90B",
  headingColor: "#fff",
  textColor: "#fff",
  textColorInput: "#fff",
  ethereumNetwork: "",
};

export default xstore;
