import db from "../database/db.js";
import fs from "fs";
import Sequelize from "sequelize";
import e from "express";

const Op = db.Op;
const PROJECT = db.PROJECT;
const PROJECT_TEAM = db.PROJECT_TEAM;
const PROJECT_TOKEN = db.PROJECT_TOKEN;
const PROJECT_MEDIA = db.PROJECT_MEDIA;
const PROJECT_IDO = db.PROJECT_IDO;
const PROJECT_IDO_DETAIL = db.PROJECT_IDO_DETAIL;

PROJECT.hasMany(PROJECT_TEAM, {
  foreignKey: "projectID",
});

PROJECT_TEAM.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

PROJECT.hasMany(PROJECT_TOKEN, {
  foreignKey: "projectID",
});

PROJECT_TOKEN.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

PROJECT.hasMany(PROJECT_MEDIA, {
  foreignKey: "projectID",
});

PROJECT_MEDIA.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

PROJECT.hasMany(PROJECT_IDO, {
  foreignKey: "projectID",
});

PROJECT_IDO.belongsTo(PROJECT, {
  foreignKey: "projectID",
});

const WHITELIST = [
  "bc1pnstt80m6mdhj2nfm6qcrl9czeq8rj5h9k4skwecg52u0kpdrqq8s7h22jh",
  "bc1ps0f06etqpyt37tkek72qehecxhaj7qlr5u5l70rrnaug3ncht8gss4wfmv",
"bc1q24n29wy5x0n6chzx9ekrd9gc5s56sx7hadd2ut",
"bc1pzepgx6hhaj00z6z00l38jez3zzn3vhls7trhszurvzpzurkwp4gqtcptwr",
"bc1p0tttca6ddnep7dv9s8ewzeyckxz38nq5gz27cnfhhrc9xnsv7d4sj9kq6g",
"bc1p79j8fwy7vqu2sfydrpqcqxtluwhycrg6laz7t6egmzvljmpcqwhqr95wce",
"bc1prlasxztddw5k3uu78j8qf7pjk5nfp7as3pz7q975f57m46j3x8esv9a0nw",
"bc1p8dgqadak3gtlmtp77jk9l34z0zk52v5k895nc68jmxpx5kru4s5s4uxr5r",
"bc1qc6qu2v4wtt2g08d7z9qtt629uzdrmac3t2ezgc",
"bc1p46cze3n6qf02yxq0s4wh9yd2f52sthplxwq3apmnkt2qpvc56e6s932yal",
"bc1pr678a9l2dl5qqwdadskjhc92fryk2msucun0y2nj6z82ajefstdsp5t3q9",
"bc1pyy2rwpe6lensl5g0rf3hmkjczh970uw5q432lkuna0geuafdgnaq903qhy",
"bc1pfwmr59x2mp5wr0a3ppyfgee2wf79rvyhtpyeucrkshv5jdsuq4wq5sxcxj",
"bc1qdude7av8k9cu6anuwkhunslx3fqgnax62m2uty",
"bc1pjxagmp2l2wak8em36muhzurhrgc9w472q04vagejavs952nl3jfsht8mma",
"1iKSFL6tUEjLTZ2V8c9bRisAxuK1eiurx",
"1Af278gQdHXQRAY332KPxysxGME3sPKy2f",
"bc1qtshzvv78d8f99htcqj29amcfwvte34canghyq3",
"1RseSUgkuZ613gkNXWoeewqxCHsr35qRL",
"16G1xYBbiNG78LSuZdMqp6tux5xvVp9Wxh",
"14UhjAMwWikTBKfDZ8ziynR14JZWHHCa3Q",
"1Cb2vK5q5qXbp44tmXCo1kZz3a1MjQhFhv",
"bc1qx05gty05n7efeu07mgt2yadvkyppu27vqy9m4d",
"bc1qlkyjkfkd588se7ta29ddwz302jwzs8pd9j8scm",
"1DwsvgW9sR3tkFDPHZmGh6CDg2zroBtZLp",
"bc1qzf264wvx5vncxmx30vjnrfktpdsv5wkw64z06h",
"14zBzBmHgHQ6zj8ruJCn1Y5S4D81iHEHC1",
"bc1p76wq3zenl3khp5n3e7p26x2we5k7u3w9gv359pjrfszlxyz7keqqslea7u",
"1BYzcpfxves8QSGnMZKJFZYVEg9MipBJfX",
"178ix2M2wd6EwvZooAjVVKZReBbHKSDToQ",
"1EyZUW5vzZrCzWY5HCKUFQabavoDX1agkv",
"1Maxua5K1vrraCQeXSVgjpAydxr9JmnzPn",
"17T3JadAhbxkjZA91xn3KBJpwq8qUS3C3q",
"3FLacLoQGwV4qmdFQPEpAUDtMVnF3NHht3",
"1GiHPSyH8CivtTovAonUfe7ZfXU7f2tA3e",
"bc1qv0an2sqc95s00dkrv5jy0ypdzcdph2q4emszfr",
"bc1qn3znvceu4zrh8fp8f8934naynx8l3ltw72qfex",
"18GZuSZTTCgCTYZah1tHiCQdNXw4sVMQKX",
"1KqCBR9r3iv9K9WhjkigLueGPFfL5j6fQm",
"3MmFJa2BzD8Z7idXMgikZAyJK4Agpmcy3Q",
"1DJziGXXAhxUV3E9rGQ2aJb92gmL2efRzH",
"1KW7of91kMRKKHqzRzAjr2D5ALGZd25tCy",
"bc1q8rqqt0wm6zrwkkvyxu8yj2att3us390u5ywav9",
"bc1p7hgxvgu4c7wlakqnpxa48acd4yevhrrrydjlpm3ncygnzqpdl3hsmncpfm",
"1CPh7DhGGAHFtpCGC8Zq8x3r6Joj6bMWym",
"bc1qtneeukjrxsw0f8zruhcllpla7u5ryethe73dul",
"bc1q87zzkuam7h9dz5r7fvpmw6gajdxk3wjfnn4ujw",
"19q6DXghJ8yss7KRAe33h79hyTc4h6dh6W",
"bc1pg6q0w2nh4fhl9vgnvppcq4rq8t9dhysuyrqx4mk7k54429yhquwsg77vkn",
"bc1q5aq7kck327f8t5crfdxzc4g6f2gc0ynvl95wx0",
"bc1pmgw2uywhw6zqte6fqxp5usaf4my5zsp9g7h8a9xkhhnn40a587ksw9ep33",
"1NBePU3N1DXgrmmKCaSwbyYo1vnz4kLJVC",
"bc1plqp4a28qcqjr3qhx407xv9d32cddt6j38xeu2ssmux5q0j8ajrlqt8xsrw",
"bc1qxx7kxvr48ay98ugmpttmdgkrtjvkk356mh0zw9",
"bc1p0e9eqkdd0qmhmpkp77u6zj82ykm90vy488d52ad665xufw26thrq967sls",
"bc1qmwwk2xdqdrgx8tay4h64v0e20t7auccj2klf2e",
"115uUNw2FRAJeyQB97K74y2WWLy9L4YvR5",
"bc1pj4pkmc59d2pyc05veuwkva8f5zlf28q5p8t4wauwkeq4ur27trdq7qzcv6",
"bc1pyutmju52guuyxmqlyah5hchvccl3yqapwjqc3q53kgf83eerskhslasy8y",
"1EADJzWSkz3S3cyzxEKFuCdoKDQ5xPB8xR",
"bc1p0vlf7np3kzv99f25hdzlq4q9z7deh7wvq0jq0qf7cez3ygnu7eysmvzjse",
"1ALcnAtYwnvn4Mzkp28VUiH4LxiK9W7spD",
"bc1pwvfzrndkveauw7z2l77ghrnrpv85tucekyljmfy4kwnt6aeh97rs6lh7tw",
"bc1plcf5de390j6jx9k24yq8zz295vn9g6qwx50jry05m3dekcfxpkzsu4jx0a",
"bc1qck3c3t989uyavfk6gdrhlncw48fz39cd82jz58",
"bc1qvgm4ae49cktgpm33p0pr3s3ln7j203xu9z59t7",
"34eEtSPzXKRtDzSZoM258CxWxiGUs1jyfo",
"1TrHqdJX9HnKMJ9qdh9indaESJCNvHXSf",
"1CbosaQZcg9CfX9cMK6Du3EzmxpQ6s9Rgj",
"bc1qryfpdlmvg9pexum5dmzsafuqfprn7q2qg0wtzd",
"1MRJ7cG9SRuGtjcvrRDGm154NR8piJ4cJu",
"bc1q0gx97kq06x0hw7utlhlyxryt4sp26xsae7z7rm",
"bc1paeaza66ykvnzhk989mnryyqvpgjxr6ezamwfghjhkjt3vx62llnqctfkhf",
"bc1q69kqft7spjg639shl0d4ewvty2ccj8jefmsahj",
"bc1pc2rhex9qx00ggnu4mqvmfnu2zhgy2g0q2l5lc3qaz8zny7sthpqs9q9j24",
"bc1qujavnxk7e9rvs74mrurqk8uyaz7qu097u9s4f9",
"bc1p4460csemn5lxzn4m4j5qe7v6wvzfj5vkn65y4n503qte7vlwmd7sv6t278",
"bc1qcqy4runarlj4cqhvms2gp4zpqxsf7klq0729se",
"bc1q4wgh6qz9haz9ns05nzehmn6x2d32s8m7ul0jy4",
"bc1pkzgr03fwcwqaru6xqerxlp8yuexxwc7rfjv0mkkapsvk0m5jsvgqnjnw20",
"bc1py3y7qwu66shlthv279a83kd74hfpns03tpnt0zlnv7944wmerkeqkax39k",
"bc1pk7k65pmx99xwgegj2gc34tq3pc5u0r44nlr0672tm3r08edf42ysjplya0",
"14FRHzLL6CW4kySH2Ndj22ap4FQGDAFsFo",
"1KmQws9iDFP3C3zJ2rVPxKwV3vcaePyPFV",
"bc1qx2mtxmvhfc5kqp7kkm06ar0c3en7mdtyh8se04",
"bc1ps4p9y5yehzz9luw39memg3w2c3yak579y3tme7cku0tv22yup24saprsuw",
"bc1p34zwxzdxx8u9ezx26g0mmfrprpnzlp9pvavr50hfup9cauwwms2qspk6nk",
"16uR6WekPNFebdGQmQYZGzVUwfmPXVbvWP",
"bc1pxh9zn60r6n4snaxdx2xl59rw6mgawcl42azl4nj0389cvz0n8cgqen0x4v",
"1pTjiJDLH8bRTmbqxSLiRtDd147SUwdME",
"1F8pg9nW2FydzLjCFgVtXEB3V9cUXAJqxy",
"1Msb1cX2sJH973fqN2wJu8mCfRCeqgwJ6c",
"19Df1ocnL9eVVEn2EByKi9voPxtKd6Xc3R",
"bc1pgz5999p4j5hdm2a9tp42ycyhq2j7rq4szdqndlzma555eytl57jssdwru7",
"bc1pzry4scmtj5hwwypplyjag0auc4k38nc2jugwva363pklmf5pthjqmgxz8s",
"34HsiYL8He7KSCPf6AV5EhwnhbwEKtHB3C",
"bc1qklpt2ju35vwrc83zk8sqwh9nq5z9gw2nlvsvld",
"bc1p4945phg4fegydukqq0fttyfcm9j2cfl7mw957mavkhc0cvmkzdfsr22v2d",
"bc1psr0yydwgzhsptvv2erkn46dargutt0rxkkw6y94pjndvkx5g4w4qccz6j4",
"bc1pfjp68wlsec8f3s70pmxpjfpynt60sefzvcamansy2qazh3pzu8xq38n0n0",
"bc1pyngrd5hthuyk2ltfrglpu6kacdjzcdlt092x7hmtzt8nvpe0gwvsdczj50",
"bc1padqydly0veykdnstwkktf4xhnytxuzxkcwu4c3he982ed7n8ayysdk6jk7",
"bc1pv980s2f65wd05xk0q698ys47hmkav656nu566nyqsq656e30k7us3hgnv6",
"bc1plsfzwcly9fmcg82dul6g8cldplv3d9rs3elnhdxqycku6emgp9nqufexnd",
"bc1pyqca90evs6qknjpl0e0x95xxp6yvx9kkvpcuqc7lcpdf8sjse0psu6g7rr",
"bc1pyphf4yvzpkqjx99u2hwkpgpwtuxlz2w05zwnccdpqf8ptqtrcw6qlxv37y",
"bc1p5gwqdp5ejgj6gavjdtxzg0z2m939wffw2xjxdr6pjgxl49q02kzstylwtt",
"bc1pn25djvt2qyxpnazv7065pvur8yfdvcw8mn05xn4m5m093r9c6h3q3y6um4",
"bc1pquz9fjtherpg28gq7dns5llhha90x7rzckwkpae2squrrm82e53slpjl74",
"bc1pr678a9l2dl5qqwdadskjhc92fryk2msucun0y2nj6z82ajefstdsp5t3q9",
"bc1qu82ynctlxup0r893kvkwj5fmzk5w2tevwzny2w",
"bc1q6pvpksyvzpp3r535cqhvqva6tfeceq4zdrv65q",
"bc1qcrd6narun04gl9wzmgx0u3pcrx54js6drdqk46",
"bc1q0cljwfm0t2qhwk2h53f6nr2refe9l0zwrjwxvt",
"bc1q9a9zl644mpthjcq55v9stc7k6xctgs594myq4v",
"bc1pj8v8n9zyla3egfc8j7snytdgn0prgfeq5kar8xg5aev70p69j5dsxy7s0g",
"bc1psfpasjy0x2f2m7qrdgcc3jzykzrf26efjkac0ak8d34lnyvkk7hq62d807",
"bc1pme9cdlz6t2wdn6avnc52ew3knw3g88kzthjk7yk88qjcvemw44usp7cw3c",
"bc1pnyumj7vxj7fp43dlrdyes2d0rn9vduc2cf2rf3w3wmplrkzg4e0qxzwqvu",
"bc1pah5j3f22kw6ra4ech5aduhw39pdnj7lfc72d95vsldqzmsfg4pwqh4ddj",
"bc1pspxg9c7fncxvfr9lu570pml69capsqp9naarycj0jnzknxh4vjasyl04p0",
"bc1pklu7ac85n8klrq650cwqh884yyamsxsg9m9j0ex8hpfdue4lpu0qrk4ju2",
"bc1pt32s7krr24q3pf96akr7gqt2vh3a9dv2y2hlz7zp7cyyglt274yqeht8m4",
"bc1pkqxqfjx20q6xcnu5eg976ctp35wphrzl5lx5mxt7uxjcvvhc6w6qqc8ea8",
"bc1ppds2stvxsctvmmvhmflue9sxsygg50cw46tm25hu8axlm0grt4jqjtqpwv",
"bc1pc6qpnjgsl5yzf42k9xatckpxmwnvh82kl5d5jdl0fvanv936u4ms23ncv4",
"bc1p67tjvx9t992xeydn3alcetupfgjrtst8leu9hh8gss64cu2vu7mqygfkj7",
"bc1p67rekuu0futhx0ktsw426scadlmd0jlgvq4cem40y9f09ul7w07sqmv3yz",
"bc1pwzh55clhkku9z96tefmdsrh4qjffxry8k3sewyycjnx3cpcz99csw7ypxj",
"bc1pfxpvzvfr6kq6wfr7ap3qt6k7fdlgjn6fe0jqhtm3a0l87p067qvql6vvwa",
"bc1pvcf6rarsppkgjphvmkvn6u53utfjzmp7x2h4pcp24mzqekufrt2s4e2hzc",
"bc1pss5tvuumnjavwpznaucjse3chuss846edkk9d9l5w993v752cc4qu8cl79",
"bc1ptk4zl8lgcwg66g38y3sxtu6873qyt3ldvd33vwmk5se76ej5r37s2qmtxp",
"bc1pj2dd8rwnfxqktessdavnqrxr6uhu0uwsmy2437e5t54kqh3hpcssq4asxn",
"bc1ptyfsq0xjsaesnxuapg6r5h029598mw9jkfw3dp487nxgpv7dre8sdujnlr",
"bc1ph035m5k52ceuazm5vn99g5nurymg0p66dfmhn8dmrzg8lay7z6aq2tlysz",
"bc1p9x97ecp2zadmlqz3263fy4s0pcjjv4lhfqge3p8qnw2mlxw92wns2wl7r4",
"bc1p27ru59qhruu0yh2qdqe2u0mxwsetrmruxvcuvekr80rwudlclw4qnhq3gt",
"bc1pdjz9nshkmcvtg06nkgqszc8hvts6nctvu3d4uvdufuy8svnz8hts4c5qvx",
"bc1py7dxj0zp466gwyhx2t638plj9cuekzf3hzh9g0dqvyvh858yd8fsy8427m",
"bc1pj3ergdq9k7qs25ded0p48qu9chwa3u0e3hg6jhprs6jfn6ppf8fqlj3whf",
"bc1pfdd2gumtjdfwe2356smqk2yxatx6rujhpv8czkqccdt0zmqpazfs029t53",
"bc1pvvrmqqurgmmeduleqeeuq2p33q9p7wsmjsmalhp7jckkwudmgwhsjk08mr",
"bc1p8v74ut6c7wru83twdc8g80r7hasmrxl7ljcv2h98caar7qr7xrsquud7dc",
"bc1pyevkw9cy7qyk88l24s9wx2afhjuz6nmf46jp0q629px88jq8kcds4rjpyq",
"bc1p47rfj9jq6undm989wkdwefnl7gupm883yg8wm5hmfchzeggy8m9se2yur2",
"bc1pkrp0peqpwqvdfxw4qj7nvkaxkun4kzd30mc64neqlhfxplnzn42qufrqlc",
"bc1p20qht7wz38klv200c9h4u4x86c2207595eutsxd69t8vfngnl4xs3xhrkk",
"bc1p9mh23qgeahqyphnge03vj23z0cnpxw4laazs5hhyz95rwsfweyysexfwqa",
"bc1pzfuetq3esu7m96h4wuekchpamp2r8n24pdr2rkwpaa5ahx63e8qqnlayzm",
"bc1phfxplqkacuun3a9wcdgwdv8sulcshkqen7y5mlx979ftzm64vpyqxyfvhj",
"bc1p0py6c024rhjr6r6gnu6zuhewud55wt2gdyurc6wp65d09swl0a3svflapz",
"bc1pda4jkvga228zz5z7l6dn0jvvzsm6sg6kx4948zykxsk305epwfns70etsl",
"bc1pptjwvnjuxrl9z53fe577fl3e84mzxfv9dymtqw7kzf9j25lamv5qhutpfu",
"bc1pk2ceuy0nfv2y4puxqnzedv5dequwu6ad089zacvad5yu97umsu0swankt6",
"bc1pvrj0x3p3rpkrrgh4hsmu6835xnuj3a960xtgpzauclcv7yxs7sus050jml",
"bc1pfhcuag8f8am90ymg8fka34g4x2pum96x5wln8jw35f6vew880agqqlhg9y",
"bc1pfnvt7933slnj52cdvuknankw6s9tw6sx5cvcspprswp9udkm7yaq5rhjvf",
"bc1pfjp68wlsec8f3s70pmxpjfpynt60sefzvcamansy2qazh3pzu8xq38n0n0",
"bc1prszwwysqmdaxz0uyu9dz6usexzzh38v49lfg9pe7k4f4nrqrkfwqhde0l2",
"bc1p743u3te3q32fkgs9zvvwk5c7w75qzen8uuxwgj6k44lu9aq8j2gswx3mg4",
"bc1psxw8g4f34anynfcpgeegudwaudsver7pq8exntq5ntujth9k9t4stj2jvw",
"bc1pg6dyhslllx0f5gpel9ulljmuj0zwjngr8u3pj70ckdgzykel26yscnsyv2",
"bc1pvc2awgvxcr2aq8muh24hg8sxqf2wmq7hsaygzs2tzwaljqgvc7fsqvzdc8",
"bc1pd727tffd9eqqudge3w53y2upxsd46c2pxgreddj6rpt4mgsz3wgsla7h99",
"bc1p5yjc55neazfaqehxpve0clumukq7xe735zknzxtrcn9600h28esqf77qz4",
"bc1p4f7e2y2ped3njdyw5es7vahvmazenqsdkemqfac86vxzpjy5a8wsug798c",
"bc1pm2qqxm585d4m4p49mmth4sfa8u2keuj6ccmekhvjgqtfwk3j4gxqd8ev95",
"bc1ptknrxk9hurdjen7rjnc99ftyux8g8jevspmkrcqrl64cqynttfhqjgp27l",
"bc1psu74w32rn88p7dsevpz04zapc0f3qg7hm495w7a759nftf9ey3psd232cv",
"bc1p53ztpsshv63q22lh7agh4a4xnp7472m3zk75wp8dcgnnw9lu3k9s7kk4eq",
"bc1pza2l4ga7sd2exdkhntpxvzyxv3v28qjmp78qvtzvqgcdme99xclqryzlkw",
"bc1pvr7wdanlmg24cmcam433c8kpg5a5z7ke3nf0alhh8tqcj4jaf3fss9gs67",
"bc1phqnjyfhhhjkrrxl6vmepx8v9esw3aq4hsvrhd33jy452jar2403qndd004",
"bc1pkkz0syvv70lp3xh9sgq4k2kvzuem363rydkum3ky3qsanfajg0zqhk40pf",
"bc1pccczrpnh6zvmf7e4ngm2lsu2n6665zjygc9dvkmqs7q7w72mpa9sll9fx2",
"bc1psa0u587fxdr47tx5tf2cunynaz47yh6ms25l2wgfvelmxlwh74xqn6520r",
"bc1p5du5vfh7methj7eds2ja8pq94h5mgx59fd870wj9a8wp4fgeu23qcuyet6",
"bc1pg0ta46gh2sez24jgg49st5mrkhm6tp9ygatfd24ke32afym02gnq0mdv4v",
"bc1pv2lyw3hajl3yrv4lrdhfh0v7v6sc0478a7044u99lgutuk07jexsmrgava",
"bc1pn2jv65272n2hsxpygmthr6wlc2yglnlyetl2qfd52jltt5v66qpqp5ryuh",
"bc1pkvcxtc55x2vut8yffwupfu8d5zuus0xh83fvqvm7g4a46204cdjqqkz6jn",
"bc1p37lxhd8zadntz5pcsqk48u56q5uwp3v3zqnyq0j4zra6w3s99x8qw05wg4",
"bc1pe654vmpvywy90s5wpzmt3lf5pvh6gfgfjjmsqkkae9e7vntlleuqxcz3p9",
"bc1pdz6ccsqjslca0kj2ay2fa39g93dyr5j6lvwf60maqt8p3t40pelqynjhl5",
"bc1purssfn7gu7lqeezmnjxa6gdagwlmwy62l7gg8wa8vva6vmdu2m8s9kanxa",
"bc1prs2f339aej6akqq0ut322j07j7clp9xmatmwzr88zj598sl9knfs7vy0vp",
"bc1phsm6cmf7pegjke7je7xk79x328tgt6rlfjj7tgtf8gykf2p9mgns80uqf6",
"bc1p05htm4tn9qcl8e8ujqt22hqspvmx7w0yx69dlqdq3pmkne5g72dsazpjxn",
"bc1plhhz05fcteag6ts604vpww55j4fruwnawypx6y7z8tcf4stanl0sk4f6un",
"bc1pkylldnjrqn899k89arsttxzurh2wkgf633gk9qxypefvp9fd8fgqdv0kqe",
"bc1p0vmh98mea8vaww4dksq5zkla7lqf85jzn6965pqy9h7xpr0z2q8sdtefh7",
"bc1pam5fakr7vc9x8fsp9vjw3g5aukekvn0dxgqqczle668g9zsmcfpqj3yjyc",
"bc1p78wqkj68gdy23gy4r0hwpv2lrtdxhqs8zxq0sh3f0yzh9sltql5szqfmcy",
"bc1plqtkzddnh3y95jnhlzf3rfxyuyd20ks0ks3xg5nw4z26axj6v58sg3qwnm",
"bc1puveelrvwr0hqhr50m5nlvjh9w3tfwf50q6ezvhy5w8cqghsp67nq4spf3d",
"bc1pag7dm53ewan6yfe2eakz84r57pa6ruznc9st4tqljh37racqehrsj7easl",
"bc1pk37ygem8exv6yrkpfmlqn02tczg5xw36adaxrc9fhcx4uu8el5dqmk0zn6",
"bc1pkl9xphzgwdgj7kq43ljdzlwwdedgd0y34cpffjm85y90djexamasdcgyvh",
"bc1pexy4m5grx4hgtm5awz3td9446as9qfnll32gz2fq9m0jl63apyyshntjv7",
"bc1psuutwagy0vrzdckeaxtxwhrsmqyflpu8yyd5jezytauap8m07d2s0v23ag",
"bc1pd6dp34zy3sy3q29s06gacjfhzxwmpsdmapn4qcdtljwfvxv6p8nqgwwjmd",
"bc1p0x4net8fryn94m90yaykhun2vn0u7exaq4epn4f4plv8m6nqrn8q5l4r9z",
"bc1px70junmz7yglav70z7n0284vk03cwzfnpt50suke8hp7egntjcyqlqj9fp",
"bc1pkkzgc73dnrk6m4tn43jl7w4wft4jjl2l85c65d3ghjp9w4g3z5gsjptg2q",
"bc1pk0v6s3z0d0funruy8cmzh324uyzu5u7uwzhmswkpj94nlkmrmyasvep27t",
"bc1ptglegpt0lwt3c5q3xcw4zr0eadxcl0ytj6933x54s4xagdykhs0q5nkn0j",
"bc1ptr2a9a46wymukxujfe3r79sq0rkmgzajatzx8sq8kgnrdt26zcqqm85vte",
"bc1pkw9r3p3aw9nd7x9ujuln5znt8gaf5pdlm2vpcp8u97rv6wr4344s0z6hza",
"bc1pe73pdxe9ee0ec5836fwu7kgglys2yjps8n3kayluxdcl2lhwlqvstnwfud",
"bc1pqfe4sr5vu37qtvp4zyxt65vjxvgpesyn9zu64uv526vrud5whhwqjpuxyf",
"bc1ppjkjk2rx74dg9a7ps87grjm0ezevhgmgrcl8q4pr5wylkyj48glqr6hq2x",
"bc1pn5f6e9s32mnkxqa03qltdmc9wk8huce0hfp4naz207ggumhuxtvq5mmz02",
"bc1pezrmvp0dptvch69qyj8fczhxljsv5nm3wwzhyrw8elld4rk98nvsjdqhyr",
"bc1pytrle8pj0aa5vus6mjwanpy4m0r74p6jgye4d7kv2jw67pjmnpkswy9g0f",
"bc1pqzs6ydll3jdfvdq699cqjh0rjjwqy3dwyz8ctf5yxjeqw0a9h8msnr8aw4",
"bc1pz5kgqmhhg8kktsz4452p534r67rts52kkeg4qmn47k032ptecrjsvr29uw",
"bc1pc8hel7tteyer6f9yaz9t3a6p4jalrupfwdd9grjcvc337rryygdse8uxd8",
"bc1p727rljed04emvkmxquh6unug0gdf53h7sqv3vktd4uezc0twwfvqw2gwms",
"bc1pmaed88uwnwmu4npq7k3a7u54ha4cazjma5rc249ra53kmnazg3jqf4cfy7",
"bc1phxm9asq7em274ypjderukk2sl0wv8p58m0nzydkuvuwrs3mfw2sslqwwk9",
"bc1pcwhyqeqevmmztah9c0fh27yjru6m6lxjpzhmkrs4gg58nwf8yvgspr8jta",
"bc1pluz3mn87tlxsufc3ulry0hgpgn2sewhj2s5aju3hnczsf26nm7eqsr26el",
"bc1ph6cl3htnxw56uqjvz0zkdlnvh99tz67m3l5zr45e8mrfn7mx7smqap0rmz",
"bc1pvrvpqspuuyy7yp8p59u6ewvhf7rs7q0trye2j32pjaw3rn98y36sl5ga5e",
"bc1px8277vmm24zxaty0w4ve9csyslaqrwe6tm2pkttktjx9cj7fenuswsnvax",
"bc1p4fx0wdh5efdhsx2m4uz4nlgyq6wzxqc2jz999ndxmeazluz08psqzawg8j",
"bc1phnjc2ajdphxqt6m8vhcmqusruupsp4qmc9caas3rwyzwy2qhz9lq9tspe4",
"bc1p2x2yxm2rv2ltsmt4l4x35662r9ejmw0emjslj6vd286tcfrjva4s8nm3cl",
"bc1p9gvzsjyewaem3zecwpcm2nj24hv9d52sc7j64g7uyk9vfh6vlspqm0hdu0",
"bc1p4rl4f8jklnlcfd6k2qf6hc977m748k9yfpzujlhdejzjq2drh7lqdmpg8a",
"bc1psljqcw0gr2vx67k72vnel7225mjycvewvc28jmyveurz32ede78s9z6z5x",
"bc1pzfrn7t0phal4q3jtxqxjvp38de3q3utcjgmt0xfx4re9tm8cljuqsqsj5t",
"bc1pzs75wj439cqmlkrgg05uzdp428c6mnyurx0mxfkcu6hynpz55dus75phzt",
"bc1p0ccyz38h5njvy9z98jj93f38kjnw34q8tn3j39pkapww3t0f5n7s0hs0dl",
"bc1pemc0dw99daxvt7c6dhz08wwxgzzcxq267mn4h3lhc8zeqzqfp4kskrkxg4",
"bc1pju4aquqf4f2y8e7x3lvwg3qaalyjchxzeqty8xtv2jzf48v2fdqszsvahu",
"bc1pddlt56rjyyghlvk4x7c02gs0d8lqlxetqekjahe2lam904jygf4q9zvh2z",
"bc1pdd227hcvc0654nuurrt33s98st5fuxxjj52pjnnd7guuakax27qs56r3fx",
"bc1p8jr963hzqnqxnzy5nur0f9gaezgzh88c5jsrx3pd72cwlcpt70es97scym",
"bc1ppqu5j366l6smskw9s47tfaj6p4h2gvc4fqd20dadznkdacegv7kq8am7z4",
"bc1pa5cr5du4vvm9jrmewv3746kpqsv7ja6gxjztwzh43g5uld285rqqqlyfpg",
"bc1plkjks2c90p8l9mdexg2dalp5e5zgl3ngqduwryl39knt3kaajsqsa7ws26",
"bc1pvrhf9prew8npcu4rlke6c77c9tecgmy5x4xcutsces7kq6stqsnsq0e3ks",
"bc1pumr9adrnztq3wjd6pkppene79qraxkqzjwlgm3mxyrfz9kjtadus3y5gkx",
"bc1pzml8lp4yn9cc6457fvhxdzzlvd3vecnrpt8ez3hrpwslt66kktpqq9ds5g",
"bc1pnya9sg7xc0gn7mhrpqm9xp3ccmk5699an2xnczf05e780ah8gl6szgr972",
"bc1pmxtqmt32xg3pqu5qnz5ggu8kc2nlu2am7psdvuahvcqstm2jx83sa36acm",
"bc1psxtkkzwqgw6rhywny26xsrhgf0a8mhaezv2uftkng9ed5vngd09s67kfq2",
"bc1pa83vduw66xvhdrww65q68nrp77ckt2cwncky59e590a7fy8ge5xqdrqfyr",
"bc1p9gg0ncd4rqn4n95xqc0sj0pcq6zxzf5ue77rhtel87x4vrdw3ynq8vzvmd",
"bc1p5703u326lnc6xz90hr59mv3u29unn20f20fzj69u4t98gz708kfs3nwm32",
"bc1pt47l3rpulj8vr4qnhdnv087nn35y09wl7vsl7s0a22cajxu2x38sgvh026",
"bc1pdd0sj28rnqz8yyrfya802swlvmygmek6rzcdnww2efkrhrq2t79sy5gdj6",
"bc1pamnu0a5ew4khtwplgju9dc5d0294m503h95xpfctd5kyaa2hy9eqv89muq",
"bc1pr96ytmc49um3t0w5jydrgafnwcwg27gtrytmka4l6jqf6ax2hafqtzzp48",
"bc1pgh90epff6whx9dvc0q0gmpwrj2v5m5znsp5eu86yagvup8yvgjjsxaujkl",
"bc1pegqzmndkvrve0yzuxdgka40jled52ywnewx76e0x8aqu7z5gfuxqxssnng",
"bc1p338cv23sfsdedxrgp6vfmfh4wwvd7gzafn4klj8kschpdpy2d5usqs9gd2",
"bc1pv43w5q88zly37u4w2zqq3nwj5xxq2cvdnyt277p2kezt37lp8lssaqdg8e",
"bc1pkz0uf63nzvp5dmgt2e5kvcfsysr8prkzvuh45jevlqa43x9nfdpsul389v",
"bc1pmfestrjsrrdv57r84mczr4lzqp0zruh20enyunxd6xycgjszwsssysxk2n",
"bc1pkdq3rj6re2wez37v0w7v9pw0zy4dd5cr22j8fvsssyn05wzaam9sv4meyj",
"bc1pz734uvu0e5wplay97gt340mv0r8ltnu2j3rm42ma09skacpupwtq3ufhnx",
"bc1pfncweucrrnjs36tazw6e05l4w9hp5z5nngjtdznhefwy328rcqzssf97a7",
"bc1p8sphf2d47p9raltrlwushz9ugqw46xaat27vf663xp7arldma0asqq7m6r",
"bc1przua6v64y4tr25rcz80y4qrclflqs9963qq4t8w2qeq660awj4ysq3uxc7",
"bc1p4du3dgy2cmfkyllzscc88pq72yk2ywlkyseezzvy04jfpcpjasjscdt8u4",
"bc1px6aapl30petwanlawpst3td0gg2tqpepnhxgwzsdd8pe08gjxf6q3spjcl",
"bc1p2dc7mxqkdtqp03fhwqettxwdt4e4qepqufg0hrtmx05l0a0pyjeqc6hew0",
"bc1pvrvpqspuuyy7yp8p59u6ewvhf7rs7q0trye2j32pjaw3rn98y36sl5ga5e",
"bc1p4zx224739rg7slcufqdvkw966umyw790rykpyws70shzsscsg3psvdttc5",
"bc1p33twcmf2q0yng36t9layyg0mpp6epvx3hfa4wcaasvlw7ny883lsu98kvx",
"bc1qqagpzxfhaetnxye566sqfvrvyrl0gc6g9630kc",
"bc1q4x0hmrpvf9fyz42xqyl285j6ve2kuu8zfqraqa",
"bc1qumtxhn62fukpjxw4xm4s6zvyest937fl3c0k8j",
"bc1qaxr3lpsm47qmmlnltrwhrruu7hvz3rpd6jp3nt",
"bc1qcyzmn9pte4wupqhdrp0egmwrq0h63yqc2vt4q5",
"bc1qgu676vufq5qwl3hsv20dhnrwt9rm8lq5p534g2",
"bc1pvrvpqspuuyy7yp8p59u6ewvhf7rs7q0trye2j32pjaw3rn98y36sl5ga5e",
"bc1p4zx224739rg7slcufqdvkw966umyw790rykpyws70shzsscsg3psvdttc5",
]


// 获取Launchpad总数据
export async function getProjectTotalInfo(req, res) {
  const totalProjectCount = await PROJECT.count({
    where: {
      state: 1,
    },
  });

  console.log(totalProjectCount);

  res.send({
    msg: "success",
    code: 1,
    totalProjectCount: totalProjectCount,
    totalUser: 0,
    totalLiquidityRaised: 0,
    totalLockLiquidity: 0,
  });
}

export async function getProjectInfo(req, res) {
  const { projectID } = req.params;
  if (!projectID) {
    res.send({
      msg: "Incomplete parameter",
      code: 0,
    });
    return;
  }
  const projectInfo = await PROJECT.findOne({
    where: {
      id: projectID,
      state: 1,
    },
    include: [
      {
        model: PROJECT_TEAM,
        required: true,
      },
      {
        model: PROJECT_TOKEN,
        required: true,
      },
      {
        model: PROJECT_MEDIA,
        required: true,
      },
      {
        model: PROJECT_IDO,
        required: true,
      },
    ],
  });

  if (projectInfo) {
    res.send({
      msg: "Find!",
      code: 1,
      projectInfo: projectInfo,
    });
  } else {
    res.send({
      msg: "Not Find",
      code: 0,
    });
  }
}

//IDO
export async function mintSale(req, res) {
  let { address, tx, amount, type, projectID } = req.body;

  if (type == 1 && WHITELIST.indexOf(address) == -1) {
    res.send({
      msg: "Not on the whitelist",
      code: 0,
    });
    return;
  }

  if (!address || !tx || !amount || !type || !projectID) {
    res.send({
      msg: "Incomplete parameter",
      code: 0,
    });
    return;
  }

  const totalBuy = await PROJECT_IDO_DETAIL.sum("amount", {
    where: {
      projectID: projectID,
      type: type,
      address: address,
      state: 1,
    },
  });
  console.log("totalBuy", totalBuy);

  // if (type == 1 && (totalBuy > 0.077 || totalBuy * 1 + amount * 1 > 0.077)) {
  //   res.send({
  //     msg: "Have exceeded the limit",
  //     code: 0,
  //   });
  //   return;
  // }

  // if (type == 2 && (totalBuy > 0.577 || totalBuy * 1 + amount * 1 > 0.577)) {
  //   res.send({
  //     msg: "Have exceeded the limit",
  //     code: 0,
  //   });
  //   return;
  // }

  if (type == 1 && (totalBuy * 1 > 500000 || totalBuy * 1 + amount * 1 > 500000)) {
    res.send({
      msg: "Have exceeded the limit",
      code: 0,
    });
    return;
  }

  if (type == 2 && (totalBuy * 1 > 500000 || totalBuy * 1 + amount * 1 > 500000)) {
    res.send({
      msg: "Have exceeded the limit",
      code: 0,
    });
    return;
  }

  const ga = !!req.cookies._ga ? req.cookies._ga : "";

  const result = await PROJECT_IDO_DETAIL.create({
    projectID: projectID,
    address: address,
    type: type,
    tx: tx,
    amount: amount,
    ga: ga,
    date: new Date().getTime(),
    state: 1,
  });

  if (result) {
    res.send({
      msg: "Success",
      code: 1,
    });
  } else {
    res.send({
      msg: "Save failure",
      code: 0,
    });
  }
}

export async function getAmountByAddress(req, res) {
  const { address, projectID, type } = req.params;
  console.log(req.query);
  if (!address || !projectID || !type) {
    res.send({
      msg: "empty",
      code: 0,
    });
    return;
  }

  const totalBuy = await PROJECT_IDO_DETAIL.sum("amount", {
    where: {
      address: address,
      projectID: projectID,
      type: type,
      state: 1,
    },
  });

  res.send({
    msg: "success",
    code: 1,
    data: {
      address: address,
      totalBuy: totalBuy,
    },
  });
}

export async function getTotalSale(req, res) {
  const { projectID, type } = req.params;

  if (!projectID || !type) {
    res.send({
      msg: "empty",
      code: 0,
    });
    return;
  }

  const totalSale = await PROJECT_IDO_DETAIL.sum("amount", {
    where: {
      projectID: projectID,
      type: type,
      state: 1,
    },
  });

  const totalUsers = await PROJECT_IDO_DETAIL.count({
    distinct: true,
    col: "address",
    where: {
      projectID: projectID,
      type: type,
      state: 1,
    },
  });

  console.log(totalUsers);

  res.send({
    msg: "success",
    code: 1,
    data: {
      totalSale: totalSale,
      totalUsers: totalUsers,
    },
  });
}

export async function projectCheckWhitelist(req, res) {
  const { address } = req.params;
  console.log(address, WHITELIST.indexOf(address));
  res.send({
    msg: "success",
    code: 1,
    data: {
      isWhitelist: WHITELIST.indexOf(address) != -1 ? true : false,
    },
  });
}
