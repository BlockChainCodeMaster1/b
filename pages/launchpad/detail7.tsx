// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Timer from 'react-compound-timer';
import HeaderFooter from '../../layout/HeaderFooter';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter, useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/launchpad_detail.module.scss';
import 'animate.css';
import axios from 'axios';
import avatar from '../../public/launchpad/edoAvatar.jpg';
import address from '../../public/launchpad/address.png';
import github from '../../public/launchpad/github.png';
import twitter from '../../public/launchpad/twitter.png';
import telegram from '../../public/launchpad/telegram.png';
import discord from '../../public/launchpad/discord.png';
import meta from '../../public/launchpad/meta.png';
import yellowArrow from '../../public/home/yellow_arrow.svg';
import whiteArrow from '../../public/home/white_arrow.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Echart from '../../components/Echart';
import { utils, BigNumber } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { mintSale, getAmountByAddress, getTotalSale, projectCheckWhitelist } from '../../api/api';

const toastConfig = {
  position: 'bottom-left',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark'
};

const LaunchpadDetails = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const options = {
    color: ['#64708B', '#F3BA2F', '#282D34', '#482D34'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center',
      top: '20px'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '55%'],
        center: ['50%', '70%'],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 2100000, name: 'IDO' },
          { value: 18900000, name: 'OTHER' },
        ]
      }
    ]
  };

  interface Member {
    id: number;
    name: string;
    position: string;
    avatar: StaticImageData;
    intro: string;
  }

  const myTeam: Member[] = [
    {
      id: 1,
      name: 'Barney',
      position: 'Project initiator',
      avatar,
      intro: `has many years of experience in the encryption industry, a senior expert in the underlying basic products of the encryption industry, has a rich understanding of data processing and chain security, and is also a senior player in NFT, DEFI and other products;`
    },
    {
      id: 2,
      name: 'Jonathan',
      position: 'Technical person in charge',
      avatar,
      intro: `Encryption product technology enthusiast, participated in the development of several public chain products, senior data, chain security expert;`
    },
    {
      id: 3,
      name: 'Priya',
      position: 'Marketing Manager',
      avatar,
      intro: `many years of marketing work in the encryption industry, rich experience in industry operations, in the field of web3, has created a number of phenomenal IP products;`
    }
  ];

  const [tokenPrice, setTokenPrice] = useState('23.1 Sats');
  const [percentage, setPercentage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [whitelistActualAmount, setWhitelistActualAmount] = useState(0);
  const [actualAmount, setActualAmount] = useState(0);
  const [whitelistFundraisers, setWhitelistFundraisers] = useState(0);
  const [fundraisers, setFundraisers] = useState(0);
  const [whitelistObtained, setWhitelistObtained] = useState(0);
  const [obtained, setObtained] = useState(0);
  const [balance, setBalance] = useState('0');
  const [team, setTeam] = useState<Member[]>(myTeam);
  const [status, setStatus] = useState('Listed');
  const [currentRate, setCurrentRate] = useState(65.3212345);
  const [myContribution, setMyContribution] = useState(0.0);
  const [totalContribution, setTotalContribution] = useState(65);
  const [audit, setAudit] = useState('No');
  const [KYC, setKYC] = useState('No');
  const [supply, setSupply] = useState(14);
  const [lockDuration, setLockDuration] = useState(32542);
  const [lockPercent, setLockPercent] = useState(25);
  const [btnEnable, setBtnEnable] = useState(false);
  const [whitelistInput, setWhitelistInput] = useState(0.001);
  const [publicInput, setPublicInput] = useState(0.01);
  const [myWhitelistBtc, setMyWhitelistBtc] = useState(0);
  const [myPublicBtc, setMyPublicBtc] = useState(0);
  const [isWhitelist, setIsWhitelist] = useState(false);

  const wallet = [
    '',
    'bc1pgnahrhgv665qqfhh7jyy0tsfdrxjjlrrk2ma75d0e6jrj00upkfqyn5rey',
    'bc1pgnahrhgv665qqfhh7jyy0tsfdrxjjlrrk2ma75d0e6jrj00upkfqyn5rey'
  ];

  useEffect(() => {
    // updateBalance();

      const timer = setInterval(async () => {
        update();
      }, 5000);
      return () => {
        clearInterval(timer);
      };
  }, []);

  const whiteAmount = 3,
    publicAmount = 3;

  const update = async () => {
    const totalWhitelistSale = await getTotalSale(7, 1);
    console.log('totalSale', totalWhitelistSale.data);
    setWhitelistFundraisers(totalWhitelistSale.data.totalUsers);
    setWhitelistActualAmount(totalWhitelistSale.data.totalSale);
    const totalPublicSale = await getTotalSale(7, 2);
    console.log('totalPublicSale', totalPublicSale.data);
    setFundraisers(totalPublicSale.data.totalUsers);
    setActualAmount(totalPublicSale.data.totalSale);
    let accounts = await window.unisat.getAccounts();
    if (accounts[0]) {
      // accounts[0] =
      //   "bc1pmhsfvsy0s5antfw32hmav7vsa34rxvsxel3u5w42mh5ate9rdnhsqampvf";
      const balance = await window.unisat.getBalance();
      setBalance(utils.formatUnits(String(balance.total), 8).toString());
      const whitelistTotalSale = await getAmountByAddress(accounts[0], 7, 1);
      console.log('whitelistTotalSale', whitelistTotalSale);
      setMyWhitelistBtc(whitelistTotalSale.data.totalBuy);
      console.log('totalWhitelistSale', totalWhitelistSale.data.totalBuy);
      const WhitelistObtained =
        totalWhitelistSale.data.totalSale * 1 < whiteAmount
          ? (whitelistTotalSale.data.totalBuy * 1) / 0.0000000571428
          : (whitelistTotalSale.data.totalBuy * 1) /
            ((totalWhitelistSale.data.totalSale * 1) / whiteAmount) /
            0.0000000571428;
      setWhitelistObtained(WhitelistObtained);

      const publicTotalSale = await getAmountByAddress(accounts[0], 7, 2);
      setMyPublicBtc(publicTotalSale.data.totalBuy);
      console.log('publicTotalSale', publicTotalSale);
      const publicObtained =
        totalPublicSale.data.totalSale * 1 < publicAmount
          ? (publicTotalSale.data.totalBuy * 1) / 0.0000000571428
          : (publicTotalSale.data.totalBuy * 1) / ((totalPublicSale.data.totalSale * 1) / publicAmount) / 0.0000000571428;
      console.log('publicTotalSale', publicTotalSale.data.totalBuy, publicTotalSale.data.totalSale);

      setObtained(publicObtained);
      const isWhiteList = await projectCheckWhitelist(accounts[0]);
      setIsWhitelist(isWhiteList.data.isWhitelist);
    }
  };
  const setMax = async (value: number, type: number) => {
    let accounts = await window.unisat.getAccounts();
    const totalSale = await getAmountByAddress(accounts[0], 7, type);
    console.log('totalSale11', totalSale.data.totalBuy);
    if (type == 1) {
      setWhitelistInput(
        utils.formatUnits(
          utils.parseUnits(String('0.001'), 8).sub(utils.parseUnits(String(totalSale.data.totalBuy), 8)),
          8
        )
      );
    } else if (type == 2) {
      console.log(0.5 - totalSale.data.totalBuy);
      setPublicInput(
        utils.formatUnits(
          utils.parseUnits(String('0.5'), 8).sub(utils.parseUnits(String(totalSale.data.totalBuy), 8)),
          8
        )
      );
    }
  };

  const mint = async (type: number) => {
    console.log('btnEnable', btnEnable);
    if (btnEnable) return;
    setBtnEnable(true);
    setTimeout(() => {
      setBtnEnable(false);
    }, 1000);

    if(whitelistActualAmount * 1 >= 0.5){
      toast.warning("The Whitelist have already recruited.", toastConfig);
      return;
    }

    if (new Date().getTime() < 1700830800 * 1000 && type == 1) {
      toast.warning("The Whitelist sale round has yet to begin", toastConfig);
      return;
    }
    // if (new Date().getTime() > 1000 && type == 1) {
    //   toast.warning('The Whitelist sale round has yet to begin', toastConfig);
    //   return;
    // }

    if (new Date().getTime() > 1700830800 * 1000 + 27 * 60 * 60 * 1000 && type == 1) {
      toast.warning('The Whitelist sale round has end', toastConfig);
      return;
    }

    if (new Date().getTime() < 1700834400 * 1000 && type == 2) {
      toast.warning("The Public sale round has yet to begin", toastConfig);
      return;
    }

    // if (new Date().getTime() > 1000 && type == 2) {
    //   toast.warning('The Public sale round has yet to begin', toastConfig);
    //   return;
    // }

    if (new Date().getTime() > 1700834400 * 1000 + 26 * 60 * 60 * 1000 && type == 2) {
      toast.warning('The Whitelist sale round has end', toastConfig);
      return;
    }

    if ((type == 1 && whitelistInput * 1 < 0.01) || whitelistInput * 1 > 0.08) {
      toast.warning('Your contribution amount must be between 0.01 to 0.08!', toastConfig);
      return;
    }

    let accounts = await window.unisat.requestAccounts();

    const whitelistInputSale = await getAmountByAddress(accounts[0], 7, 1);
    if (type == 1 && whitelistInputSale.data.totalBuy * 1 + whitelistInput * 1 > 0.08) {
      toast.warning('Your contribution amount cannot exceed 0.08', toastConfig);
      return;
    }

    const publicInputSale = await getAmountByAddress(accounts[0], 7, 2);
    console.log('publicInputSale', publicInputSale);
    if (type == 2 && publicInputSale.data.totalBuy * 1 + publicInput * 1 > 0.5) {
      toast.warning('Your contribution amount cannot exceed 0.5', toastConfig);
      return;
    }

    if (type == 2 && (publicInput * 1 < 0.01 || publicInput * 1 > 0.5)) {
      toast.warning('Your contribution amount must be between 0.01 to 0.5!', toastConfig);
      return;
    }

    // let accounts = await window.unisat.getAccounts();

    const isWhitelist = await projectCheckWhitelist(accounts[0]);
    console.log('isWhitelist', isWhitelist.data.isWhitelist);
    if (type == 1 && !isWhitelist.data.isWhitelist) {
      toast.warning('Your address are not in whitelist.', toastConfig);
      return;
    }
    // let txid =
    //     "a7a83f036208bebf6577a2c76d9b49ab6fe03e6944bcfe066e8c0d35c20aa414";
    if (type == 1) {
      let inputValue = utils.parseUnits(String(whitelistInput), 8).add('68000').toString() * 1;
      let txid = await window.unisat.sendBitcoin(wallet[type], inputValue);
      if (txid) {
        const res = await mintSale(accounts[0], txid, type, whitelistInput, 7);
        console.log('res', res);
        toast.success('Payment success', toastConfig);
      }
    } else if (type == 2) {
      let inputValue = utils.parseUnits(String(publicInput), 8).add('68000').toString() * 1;
      let txid = await window.unisat.sendBitcoin(wallet[type], inputValue);
      if (txid) {
        const res = await mintSale(accounts[0], txid, type, publicInput, 7);
        console.log('res', res);
        toast.success('Payment success', toastConfig);
      }
    }
  };

  const publicInputChange = (e: any) => {
    let obj: any = {};
    let value: any = e.target.value;
    value = value.match(/^\d*(\.?\d{0,8})/g)[0] || null;
    obj[e.target.id] = value;
    setPublicInput(value);
  };

  const whilistInputChange = (e: any) => {
    let obj: any = {};
    let value: any = e.target.value;
    value = value.match(/^\d*(\.?\d{0,8})/g)[0] || null;
    obj[e.target.id] = value;
    console.log(value);
    setWhitelistInput(value);
  };

  return (
    <HeaderFooter activeIndex={2}>
      <ToastContainer />
      <div className={styles.wrapper}>
        <div className={styles.topimg}></div>
        <div className={styles.container}>
          <div className={styles.card + ' ' + styles.project}>
            <div className={styles.banner7}></div>
            <div className={styles.info}>
              <div className={styles.title}>PingMe</div>
              {/* <div className={styles.avatar}>
                <Image src={avatar} alt="avatar" width={35} height={35} />
                <div className={styles.name}>Cloris Chen</div>
              </div> */}
              <p className={styles.intro}>
              "Pingme" emerges as a cutting-edge social Dapp, revolutionizing how you cultivate meaningful connections through on-chain credentials. Step into a new era of social interaction, where ambiguity about others' feelings becomes a thing of the past. Pingme delivers clarity, eliminates misunderstandings, and simplifies the joy of socializing.
              </p>
              <div className={styles.contact}>
                <Link href="https://www.pingme.love" passHref>
                  <a className={styles.item}>
                    <Image src={address} alt="address" width={20} height={20}></Image>
                  </a>
                </Link>
                <Link href="https://twitter.com/Pingme_love" passHref>
                  <a className={styles.item}>
                    <Image src={twitter} alt="twitter" width={20} height={20}></Image>
                  </a>
                </Link>
                <Link href="https://t.me/PingMe_CN" passHref>
                  <a className={styles.item}>
                    <Image src={telegram} alt="telegram" width={20} height={20}></Image>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.swap}>
            <div className={styles.card + ' ' + styles.item }>
              <div className={styles.title}>
                <div>
                  <div className={styles.ori}>PingMe</div>
                  <div>Whitelist Public Sale</div>
                </div>
                <div className={styles.deadline}>
                  {new Date().getTime() < 1702814400 * 1000 ? (
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
                  ) : (
                    <Timer
                      formatValue={(value) =>
                        `${value < 10 ? `0${value}` : value} `
                      }
                      initialTime={
                        new Date(1700830800 * 1000).getTime() -
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
                  )}
                  {/* <Timer
                    formatValue={value => `${value < 10 ? `0${value}` : value} `}
                    initialTime={0}
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
                  </Timer>*/}
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Token Price</div>
                <div className={styles.val + ' ' + styles.ori}>{tokenPrice}</div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Fundraising percentage</div>
                <div className={styles.val + ' ' + styles.ori}>
                  {((whitelistActualAmount / whiteAmount) * 100).toFixed(2)} %
                </div>
              </div>
              <div className={styles.amount}>
                <div className={styles.list}>
                  <div className={styles.label}>Total fundraising amount</div>
                  <div className={styles.val + ' ' + styles.ori}>{whiteAmount} BTC</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Actual fundraising amount</div>
                  <div className={styles.val + ' ' + styles.ori}>{whitelistActualAmount} BTC</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of fundraisers</div>
                  <div className={styles.val + ' ' + styles.ori}>{whitelistFundraisers}</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of my fundraising amount</div>
                  <div className={styles.val + ' ' + styles.ori}>{myWhitelistBtc} $BTC</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of tokens obtained</div>
                  <div className={styles.val + ' ' + styles.ori}>{whitelistObtained} $PGME</div>
                </div>
              </div>
              {/* <Input
                value={whitelistInput}
                handleClick={(val) => setMax(val, 1)}
                btnText="MAX"
              ></Input> */}
              <div className={styles.list + ' ' + styles.small}>
                <div className={styles.label}>IDO Whitelist Round Quota</div>
                <div className={styles.val + ' ' + styles.ori}>0.001 $BTC</div>
              </div>
              <span className={styles.wrap}>
                <input
                  type="text"
                  min="0.001"
                  max="0.001"
                  value={whitelistInput}
                  onChange={e => whilistInputChange(e)}
                />
                <button onClick={() => setMax(whitelistInput, 1)}>Max</button>
              </span>
              <div className={styles.list + ' ' + styles.small}>
                <div className={styles.label}>Balance</div>
                <div className={styles.val + ' ' + styles.ori}>{balance} $BTC</div>
              </div>
              <Button
                backgroundColor="#383838"
                handleClick={() => mint(1)}
                renderContent={() => (
                  <>
                    <span className={styles.btnText + ' ' + styles.ori}>{isWhitelist ? 'Buy' : 'Not in whitelis'}</span>
                    <Image src={yellowArrow} alt="mint" width={12} height={12} />
                  </>
                )}
              ></Button>
            </div>
            <div className={styles.card + ' ' + styles.item + ' ' + styles.op}>
              <div className={styles.title}>
                <div>
                  <div className={styles.ori}>PingMe</div>
                  <div>Public Sale</div>
                </div>
                <div className={styles.deadline}>
                  {new Date().getTime() < 1700834400 * 1000 ? (
                    <Timer
                      formatValue={(value) =>
                        `${value < 10 ? `0${value}` : value} `
                      }
                      initialTime={
                        new Date(1700834400 * 1000).getTime() -
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
                  ) : (
                    <Timer
                      formatValue={(value) =>
                        `${value < 10 ? `0${value}` : value} `
                      }
                      initialTime={
                        new Date(1700834400 * 1000).getTime() -
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
                  )}
                  {/* <Timer
                    formatValue={value => `${value < 10 ? `0${value}` : value} `}
                    initialTime={0}
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
                  </Timer> */}
                </div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Token Price</div>
                <div className={styles.val + ' ' + styles.ori}>{tokenPrice}</div>
              </div>
              <div className={styles.list}>
                <div className={styles.label}>Fundraising percentage</div>
                <div className={styles.val + ' ' + styles.ori}>
                  {((actualAmount / publicAmount) * 100).toFixed(2)} %
                </div>
              </div>
              <div className={styles.amount}>
                <div className={styles.list}>
                  <div className={styles.label}>Total fundraising amount</div>
                  <div className={styles.val + ' ' + styles.ori}>{publicAmount} BTC</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Actual fundraising amount</div>
                  <div className={styles.val + ' ' + styles.ori}>{actualAmount} BTC</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of fundraisers</div>
                  <div className={styles.val + ' ' + styles.ori}>{fundraisers}</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of my fundraising amount</div>
                  <div className={styles.val + ' ' + styles.ori}>{myPublicBtc} $BTC</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Number of tokens obtained</div>
                  <div className={styles.val + ' ' + styles.ori}>{obtained} $PGME</div>
                </div>
              </div>
              {/* <Input
                value={publicInput}
                handleClick={(val) => setMax(val, 2)}
                btnText="MAX"
              ></Input> */}
              <div className={styles.list + ' ' + styles.small}>
                <div className={styles.label}>IDO Public Round Quota</div>
                <div className={styles.val + ' ' + styles.ori}>0.01 $BTC - 0.5 $BTC</div>
              </div>
              <span className={styles.wrap}>
                <input type="text" min="0.01" max="0.5" value={publicInput} onChange={e => publicInputChange(e)} />
                <button onClick={() => setMax(publicInput, 2)}>Max</button>
              </span>
              <div className={styles.list + ' ' + styles.small}>
                <div className={styles.label}>Balance</div>
                <div className={styles.val + ' ' + styles.ori}>{balance} $BTC</div>
              </div>

              <Button
                backgroundColor="#383838"
                handleClick={() => mint(2)}
                renderContent={() => (
                  <>
                    <span className={styles.btnText}>Buy</span>
                    <Image src={yellowArrow} alt="buy" width={12} height={12} />
                  </>
                )}
              ></Button>
            </div>
          </div>
          {/* <div className={styles.card + ' ' + styles.team}>
            <div className={styles.title}>About Team</div>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log('slide change')}
              onSwiper={swiper => console.log(swiper)}
            >
              {team.map((member: Member) => (
                <SwiperSlide className={styles.member} key={member.id}>
                  <div className={styles.avatar}>
                    <Image src={member.avatar} alt={member.name} width={80} height={80} />
                  </div>
                  <div className={styles.name}>{member.name}</div>
                  <div className={styles.position + ' ' + styles.ori}>{member.position}</div>
                  <p className={styles.intro}>{member.intro}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> */}
          <div className={styles.data}>
            <div className={styles.card + ' ' + styles.protocol}>
              <div className={styles.item}>
                <div className={styles.title}>Introduction of project advantages</div>
                <p>
                1、Multi-Protocol Support: It integrates various Bitcoin protocols, enhancing accessibility and vastly enriching users&apos; trading options.

2、Advanced Trading Engine: The platform utilizes Automated Market Maker (AMM) models and liquidity pools, significantly increasing the efficiency and liquidity of asset trades.

3、High-Performance Blockchain Synchronization and Processing Engine: Designed for real-time 4、tracking and processing of transactions on the Bitcoin network, it ensures users receive up-to-date block information and transaction data.

4、Advanced Smart Contract Platform: This feature allows users and developers to create, deploy, and execute complex transaction logic, thus expanding the functionality beyond traditional Bitcoin transactions.

5、User-Friendly Interface: SatoshiFlow prioritizes a user-friendly and intuitive trading experience, catering to the needs of diverse traders.

6、Continuous Innovation and Technological Iteration: The platform is committed to ongoing technological advancements, maintaining a competitive edge in the rapidly evolving blockchain and cryptocurrency market.

                </p>
                <div className={styles.title}>IDO - 10%</div>
                <div className={styles.title}>Other - 90%</div>
              </div>
            </div>
            <div className={styles.other}>
              {/* <div className={styles.card + " " + styles.status}>
                <div className={styles.list}>
                  <div className={styles.label}>Status</div>
                  <div className={styles.val + " " + styles.blue}>{status}</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Current Rate</div>
                  <div className={styles.val}>1ETH = {currentRate} Xmm</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>My Contribution</div>
                  <div className={styles.val}>{myContribution} Xmm</div>
                </div>
                <div className={styles.list}>
                  <div className={styles.label}>Total Contribution</div>
                  <div className={styles.val}>{totalContribution} Xmm</div>
                </div>
                <div className={styles.inner}>
                  <div className={styles.list}>
                    <div className={styles.label}>Audit</div>
                    <div className={styles.val + " " + styles.red}>{audit}</div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>KYC</div>
                    <div className={styles.val + " " + styles.red}>{KYC}</div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>
                      Token supply owned by Team
                    </div>
                    <div className={styles.val + " " + styles.ori}>
                      {supply} %
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>Lock duration</div>
                    <div className={styles.val + " " + styles.ori}>
                      {lockDuration} Days
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>Lock percentage</div>
                    <div className={styles.val + " " + styles.ori}>
                      {lockPercent} %
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.label}>Unsafe functions</div>
                    <div className={styles.val}>...</div>
                  </div>
                  <div className={styles.tips}>
                    Unsafe functions Powered by OKCA
                  </div>
                </div>
              </div> */}
              <div className={styles.card + ' ' + styles.metric}>
                <div className={styles.title}>Tokenomics</div>
                <div className={styles.chart}>
                  <Echart options={options} />
                </div>
              </div>
              <div className={styles.card + ' ' + styles.grayback + ' ' + styles.prompt}>
                <div className={styles.title}>IDO Special Announcement</div>
                <p>To protect the rights of our users, BisoSwap has prepared a special parachute mechanism</p>
                <p>This will be maximum ensure user token in reasonable price</p>
                <p>BisoSwap will release 70% of the funds raised to the project owner at the end of the fundraising</p>
                <p>
                  If the token falls below the issue price within three days, BisoSwap will activate the parachute
                  mechanism to protect the community. We will provide 23% of the funds raised for market capitalisation
                  and marketing
                </p>
                <p>
                  If the token does not fall below the issue price within three days, we will release 23% of the funds
                  raised to the project team.
                </p>
                <p>7% of the funds will be used as a platform service fee for marketing purposes 🪙</p>
                <p className={styles.red}>
                  * Before participating in the launch, you must confirm that you are not located, incorporated, or a
                  citizen or resident of the United States of America, People’s Republic of China, Bermuda, Burundi,
                  Central African Republic, Cuba, Democratic Republic of Congo, Eritrea, Guinea-Bissau, Iran, Libya,
                  Mali, North Korea, Palestine, Republic of Seychelles, Somalia, South Sudan, Sudan, Syria, Western
                  Sahara, Yemen, Crimea and Sevastopol, or any other state, country, or jurisdiction where participation
                  in this launch would be illegal according to applicable law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderFooter>
  );
};
// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});

export default withRouter(LaunchpadDetails);
