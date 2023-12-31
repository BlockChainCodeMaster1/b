import React, { useState, useEffect, Component } from "react";
import Timer from "react-compound-timer";
import HeaderFooter from "../../layout/HeaderFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter, useRouter } from "next/router";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { utils } from "ethers";
import Link from "next/link";
import Image from "next/image";
import project3 from "../../public/launchpad/project3.png";
import project from "../../public/launchpad/arks.jpg";
import avatar from "../../public/launchpad/avatar.png";
import bitdaAvatar from "../../public/launchpad/bitda.jpeg";
import bitdaBanner from "../../public/launchpad/bitdaBanner.jpg";
import satBanner from "../../public/launchpad/satBanner.png";
import satAvatar from "../../public/launchpad/satAvatar.png";
import edoBanner from "../../public/launchpad/edoBanner.jpg";
import edoAvatar from "../../public/launchpad/edoAvatar.jpg";
import rabetBanner from "../../public/launchpad/rabetBanner.png";
import rabetAvatar from "../../public/launchpad/rabetAvatar.png";
import orgtAvatar from "../../public/launchpad/orgtAvatar.jpeg";
import orgtBanner from "../../public/launchpad/orgtBanner.png";
import avatar3 from "../../public/launchpad/avatar3-1.png";
import avatar1 from "../../public/launchpad/avatar1.png";
import project1 from "../../public/launchpad/project1.jpg";
import project2 from "../../public/launchpad/project2.png";
import chamchaAvatar from "../../public/launchpad/chamchaAvatar.png";
import chamchaBanner from "../../public/launchpad/chamchaBanner.png";
import bitlandAvatar from "../../public/launchpad/BitlandAvatar.png";
import bitmosAvator from "../../public/launchpad/bitmosAvator.png";
import deflAvatar from "../../public/launchpad/deflAvatar.png";
import icon1 from "../../public/launchpad/titleicon.png";
import icon2 from "../../public/launchpad/launchicon2.png";
import icon3 from "../../public/launchpad/launchicon3.png";
import icon4 from "../../public/launchpad/launchicon4.png";
import hot from "../../public/launchpad/hot.svg";
import twitter from "../../public/launchpad/twitter.png";
import telegram from "../../public/launchpad/telegram.png";
import discord from "../../public/launchpad/discord.png";
import medium from "../../public/launchpad/meta.png";
import satoshiflow from "../../public/launchpad/satoshiflow.jpeg";
import pingme from "../../public/launchpad/pingme.png";
import styles from "../../styles/launchpad.module.scss";
import "animate.css";
import axios from "axios";
import address from "../../public/launchpad/address.png";

const Launchpad = () => {

  const { t } = useTranslation("common");
  const router = useRouter();
  const projects = [
    {
      id: 15,
      title: "Pingme",
      desc: `"Pingme" emerges as a cutting-edge social Dapp, revolutionizing how you cultivate meaningful connections through on-chain credentials. Step into a new era of social interaction, where ambiguity about others' feelings becomes a thing of the past. Pingme delivers clarity, eliminates misunderstandings, and simplifies the joy of socializing.`,
      banner: pingme,
      avatar: pingme,
      hot: true,
      details: "/launchpad/detail7",
      twitter: "https://twitter.com/_SatoshiFlow",
      medium: "https://medium.com/@_SatoshiFlow",
      telegram: null,
      discord: null,
    },
    {
      id: 14,
      title: "satoshiFlow",
      desc: `SatoshiFlow represents innovation and progress, leading a revolution in the trading field of Bitcoin and its various protocol assets. As a decentralized trading platform, it is dedicated to providing a one-stop, efficient, and secure solution for the trading of Bitcoin and its multiple protocol assets. By simplifying and optimizing the asset trading process, it enhances user experience and becomes a leader in the Bitcoin ecosystem.`,
      banner: satoshiflow,
      avatar: satoshiflow,
      hot: true,
      details: "/launchpad/detail6",
      twitter: "https://twitter.com/_SatoshiFlow",
      medium: "https://medium.com/@_SatoshiFlow",
      telegram: null,
      discord: null,
    },
     {
      id: 13,
      title: "Edohigan",
      desc: `The Edohigan Network provides fast and easy-to-use tools that enable decentralized data validation, immutability and retrieval, empowering developers and data engineers to access reliable data they can use to build the future of Web3 with confidence.`,
      banner: edoBanner,
      avatar: edoAvatar,
      hot: true,
      details: "/launchpad/detail4",
      twitter: "https://twitter.com/Edohigan_NW",
      medium: null,
      telegram: null,
      discord: "https://discord.gg/C8Fqem6KaQ",
    },
    {
      id: 1,
      title: "TBWZ",
      desc: `Three-body Warrior is a WEB3 game, based on the BRC20 protocol ARPG + MOBA game, the game story takes place in 2272 and now, the three-body man from the future takes over the governance of the earth in an all-round way, through the game system, each player can have an immersive experience. The form of the earth in the metaverse period and participate in various governances. At the same time, you can get income in the game, and you can also convert the income into real value, (legal currency). A global team based in the United States and South Korea provides support for game development. Product features include NFT mall, game center, Defi module, incentives, and personal center.`,
      banner: project1,
      avatar: avatar1,
      hot: false,
      details: "/launchpad/detail1",
      twitter: "https://twitter.com/3bodywarriors",
      medium: "http://threebodywarriors.medium.com",
      telegram: "https://t.me/threebodywarriors",
      discord: null,
    },
    {
      id: 2,
      title: "ISKA",
      desc: `Isekai Protocol is a pioneering AI-driven Web3 creator ecosystem dedicated to the creation of ACGN (anime, comics, games, and novels) content. By leveraging the power of AI and Web3 technology, Isekai Protocol enables users to unleash their creative potential, generating derivative works from established IPs while adhering to the principles of the Isekai Protocol, fostering a dynamic NFT network that seamlessly connects derivatives and originals. The platform offers AI-powered creator tools, including a visual novel maker to enable immersive storytelling experiences. Moreover, the derivative creation royalty system ensures owners and creators of NFTs integrated into derivative works receive a fair share of profits when such creations achieve success. By establishing a bottom-up ACGN content creation ecosystem, Isekai aims to revolutionize the way content is created, shared, and monetized. `,
      banner: project2,
      avatar: project2,
      hot: true,
      details: "/launchpad/detail2",
      twitter: "https://twitter.com/isekaiprotocol",
      medium: "https://medium.com/@isekaimetaverse",
      telegram: null,
      discord: "https://discord.com/invite/tuxbNWqhmA",
    },
    // {
    //   id: 3,
    //   title: "Arkstart",
    //   desc: `Arkstart is pioneering the new era of BRC-20 token staking with
    //             our innovative blockchain project. We aim to build a sustainable
    //             staking ecosystem using unique staking mechanisms and economic
    //             models.`,
    //   banner: project,
    //   avatar: avatar,
    //   hot: false,
    //   details: "/launchpad/detail",
    //   twitter: "https://twitter.com/arkscoin",
    //   medium: "https://medium.com/@arkstart",
    //   telegram: "https://t.me/ArkstartOfficial",
    //   discord: null,
    // },
    {
      id: 4,
      title: "ODPG",
      desc: `OrdPlay is pioneering the future of the GameFi space by leveraging the power of BRC-20 tokens and the novelty of Ordinals. As the first Play2Earn platform within the Bitcoin ecosystem, we're bringing unprecedented innovation and financial opportunities to the gaming community.`,
      banner: project3,
      avatar: avatar3,
      hot: false,
      details: "/launchpad/detail3",
      twitter: "https://twitter.com/OrdPlayBTC",
      medium: "https://medium.com/ordplay",
      telegram: "https://t.me/OrdPlay",
      discord: null,
    },
    {
      id: 5,
      title: "Chamcha",
      desc: `Chamcha, the pioneer of supporting the diverse ecosystem of #Bitcoin Ordinals, builds Ordinals Assets liquidity.`,
      banner: chamchaBanner,
      avatar: chamchaAvatar,
      hot: false,
      details: "/launchpad",
      twitter: "https://twitter.com/0xChamcha",
      medium: null,
      telegram: "https://t.me/GlobalChamcha",
      discord: "https://discord.com/invite/eDRAqZN6EJ",
    },
    {
      id: 6,
      title: "Bitland",
      desc: `Bitland is the First Web3 Social Metaverse Platform on BTC Chain. You can download and experience it now!`,
      banner: bitlandAvatar,
      avatar: bitlandAvatar,
      hot: false,
      details: "/launchpad",
      twitter: "https://twitter.com/BitlandOfficial",
      medium: null,
      telegram: null,
      discord: null,
    },
    {
      id: 7,
      title: "BitMos",
      desc: `Unleashing Bitcoin and BRC20’s DeFi potential on Cosmos through cross-chain interoperability and smart contracts.`,
      banner: bitmosAvator,
      avatar: bitmosAvator,
      hot: false,
      details: "/launchpad",
      twitter: "https://twitter.com/_BitMos_",
      medium: null,
      telegram: "https://t.me/bitmos_community",
      discord: null,
    },
    {
      id: 8,
      title: "DEFL",
      desc: `DFTL is a perfect gaming-based decentralized economic policy that insures price stability and long term growth for gamers and DeFi users.`,
      banner: deflAvatar,
      avatar: deflAvatar,
      hot: false,
      details: "/launchpad",
      twitter: "https://twitter.com/defitankland",
      medium: "https://medium.com/defitankland",
      telegram: null,
      discord: "https://discord.com/invite/wzPajCFVhK",
    },
    // {
    //   id: 9,
    //   title: "BITDA",
    //   desc: `An aggregated trading platform based on the Bitcoin serial number protocol providing the most convenient solution to the #BRC20 ecology.`,
    //   banner: bitdaBanner,
    //   avatar: bitdaAvatar,
    //   hot: false,
    //   details: "/launchpad",
    //   twitter: "https://twitter.com/BITDABrc",
    //   medium: null,
    //   telegram: null,
    //   discord: null,
    // },
    {
      id: 10,
      title: "SATBYTES",
      desc: `SATBYTES Labs is revolutionizing web3 creatives by fully decentralizing participation and distribution of IP commercial value amongst its community through the "Villuminaiti" token and inscribed limited edition collections.   A first of its kind, community driven creatives based on innovative "slice-of-life" genre for Bitcoin enthusiasts!`,
      banner: satBanner,
      avatar: satAvatar,
      hot: false,
      details: "/launchpad",
      twitter: "https://twitter.com/SATBYTES_Labs",
      medium: null,
      telegram: null,
      discord: null,
    },
    {
      id: 11,
      title: "Rabet",
      desc: `Rabet is the world's first decentralized recreation platform based on brc-20 that guarantees fairness and offers a golden opportunity to win JACKPOT!`,
      banner: rabetBanner,
      avatar: rabetAvatar,
      hot: false,
      details: "/launchpad",
      twitter: "https://twitter.com/RabetBrc20",
      medium: null,
      telegram: null,
      discord: null,
    },
    {
      id: 12,
      title: "Ordigate",
      desc: `Ordigate is the first community-driven decentralized infrastructure on Ordinals.`,
      banner: orgtBanner,
      avatar: orgtAvatar,
      hot: false,
      details: "/launchpad",
      twitter: "https://twitter.com/Ordigate_",
      medium: null,
      telegram: null,
      discord: null,
    },
  ];

  const [projectList, setProjectList] = useState(projects);

  if (projectList.length > 1 && projectList.length % 3 !== 0) {
    const remainder = projectList.length % 3;
    if (remainder === 1) {
      setProjectList([...projectList, { id: "seat1" }, { id: "seat2" }]);
    } else {
      setProjectList([...projectList, { id: "seat1" }]);
    }
  }

  // useEffect(() => {
  //   updateBalance();
  //   const timer = setInterval(async () => {
  //     updateBalance();
  //   }, 5000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const updateBalance = async () => {
    let accounts = await window.unisat.getAccounts();
    if (accounts[0]) {
    }
  };

  const ListItem = (item) => {
    if (typeof item.id === "number") {
      return (
        <div className={styles.listItem} key={item.id}>
          <div className={styles.main}>
            <Link href={item.details} passHref>
              <div className={styles.banner}>
                <Image
                  src={item.banner}
                  alt="Remote Image"
                  layout="fill"
                  objectFit="cover"
                />
                {item.hot ? (
                  <div className={styles.tag}>
                    <Image src={hot} width={12} height={12} alt="hot" />
                    <span>So Hot</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Link>
            <div className={styles.avatar}>
              <Image
                src={item.avatar}
                alt="avatar"
                width={80}
                height={80}
                objectFit="cover"
              />
            </div>
            <div className={styles.name}>{item.title}</div>
            <div className={styles.contact}>
              {item.twitter && (
                <Link href={item.twitter} passHref>
                  <a className={styles.item}>
                    <Image
                      src={twitter}
                      alt="twitter"
                      width={20}
                      height={20}
                    ></Image>
                  </a>
                </Link>
              )}
              {item.discord && (
                <Link href={item.discord} passHref>
                  <a className={styles.item}>
                    <Image
                      src={discord}
                      alt="discord"
                      width={24.24}
                      height={20}
                    ></Image>
                  </a>
                </Link>
              )}
              {item.telegram && (
                <Link href={item.telegram} passHref>
                  <a className={styles.item}>
                    <Image
                      src={telegram}
                      alt="telegram"
                      width={23.53}
                      height={20}
                    ></Image>
                  </a>
                </Link>
              )}
              {item.medium && (
                <Link href={item.medium} passHref>
                  <a className={styles.item}>
                    <Image
                      src={medium}
                      alt="medium"
                      width={25.8}
                      height={20}
                    ></Image>
                  </a>
                </Link>
              )}
            </div>
          </div>
          <p>{item.desc}</p>
        </div>
      );
    } else {
      return (
        <div
          className={styles.listItem}
          key={item.id}
          style={{ backgroundColor: "transparent" }}
        ></div>
      );
    }
  };

  return (
    <HeaderFooter activeIndex={2}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.info}>
            <div className={styles.text}>
              <h1>The Launchpad Protocol</h1>
              <h2>
                for Everyone! <span className={styles.version}>Version 1</span>
              </h2>
              <p>
                Biso helps everyone to create their own tokens and token sales
                in few seconds. Tokens created on Biso will be verified and
                published on explorer websites.
              </p>
              <div className={styles.operate}>
                {/* <Link href="/launchpad/list" passHref> */}
                <button>
                  Learn<i></i>
                </button>
                {/* </Link> */}
                {/* <a href="#">
                  Learn<i></i>
                </a> */}
              </div>
            </div>
          </div>
          <div className={styles.data}>
            <b></b>
            <ul>
              <li>
                <Image src={icon1} alt="icon" width={57} height={50} />
                <h1>3</h1>
                <h2>Projects</h2>
                <p>in the last 30 days</p>
              </li>
              <li>
                <Image src={icon2} alt="icon" width={60} height={60} />
                <h1>3481</h1>
                <h2>Total Users</h2>
                <p>in the last 30 days</p>
              </li>
              <li>
                <Image src={icon3} alt="icon" width={60} height={60} />
                <h1>17.8 BTC</h1>
                <h2>Total Liquidity Raised</h2>
                <p>in the last 30 days</p>
              </li>
              <li>
                <Image src={icon4} alt="icon" width={64} height={64} />
                <h1>$357M</h1>
                <h2>Total Values Locked</h2>
                <p>in the last 30 days</p>
              </li>
            </ul>
          </div>
          <div className={styles.current}>
            <div className={styles.banner}></div>
            {projectList.map((item,index) => {
              if (item.id == 15) {
                console.log("item", item);
                return (
                  <div className={styles.curinfo} key={index}>
                    <div className={styles.contacts}>
                      {/* <Link href="https://www.isekaiprotocol.com/" passHref>
                                <a className={styles.item}>
                                  <Image
                                    src={address}
                                    alt="twitter"
                                    width={20}
                                    height={20}
                                  ></Image>
                                </a>
                              </Link> */}
                      {/* <Link href={item.twitter} passHref>
                        <a className={styles.item}>
                          <Image
                            src={twitter}
                            alt="twitter"
                            width={20}
                            height={20}
                          ></Image>
                        </a>
                      </Link> */}
                      {/* <Link href={item.discord} passHref>
                        <a className={styles.item}>
                          <Image
                            src={discord}
                            alt="discord"
                            width={20}
                            height={20}
                          ></Image>
                        </a>
                      </Link> */}
                      {/* <Link href={item.medium} passHref>
                        <a className={styles.item}>
                          <Image
                            src={medium}
                            alt="medium"
                            width={20}
                            height={20}
                          ></Image>
                        </a>
                      </Link> */}
                    </div>
                    <div className={styles.title}>{item.title}</div>
                    {/* <div className={styles.subtitle}>{item.title}</div> */}
                    <p className={styles.intro}>{item.desc}</p>
                    <div className={styles.join}>
                      <Timer
                        formatValue={(value) =>
                          `${value < 10 ? `0${value}` : value} `
                        }
                        initialTime={
                          new Date(1702814400 * 1000).getTime() -
                          new Date().getTime()
                        }
                        lastUnit="d"
                        direction="backward"
                      >
                        <ul>
                          <li>
                            <h1>
                              <Timer.Days />
                            </h1>
                            <p>DAY</p>
                          </li>
                          <li>
                            <h1>
                              <Timer.Hours />
                            </h1>
                            <p>HRS</p>
                          </li>
                          <li>
                            <h1>
                              <Timer.Minutes />
                            </h1>
                            <p>MIN</p>
                          </li>
                          <li>
                            <h1>
                              <Timer.Seconds />
                            </h1>
                            <p>SEC</p>
                          </li>
                        </ul>
                      </Timer>
                      <div className={styles.operate}>
                        {/* <Link href="/launchpad/list" passHref> */}
                        <Link href={item.details} passHref>
                          <button>
                            Join <i></i>
                          </button>
                        </Link>
                        {/* </Link> */}
                        {/* <a href="#">
                                Learn<i></i>
                              </a> */}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

         
          <div className={styles.list}>
            {projectList.map((item) => {
              if (item.id != 15) {
                return ListItem(item);
              }
            })}
          </div>
        </div>
      </div>
    </HeaderFooter>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default withRouter(Launchpad);


