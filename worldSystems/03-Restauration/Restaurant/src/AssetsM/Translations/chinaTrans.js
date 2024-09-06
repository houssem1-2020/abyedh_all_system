const ChinaTrans = {
    translation : {
        menusAndTabsName:{
            leftBar: {
                profile: "个人资料",
                parametre: "参数",
                forum: "论坛",
                message: "消息",
                sauvgarder: "保存",
                syncro: "同步",
                documentation: "文档",
                deconextion: "登出"
            },
            topBar: {
                ma: '主页',
                rq: '订单',
                mu: '菜单',
                ca: '收银台',
                ft: '发票',
                cl: '客户',
                tm: '团队'
            },
            alternativeLink :{
              1: {
                title: "收银台",
                descrip: "收银台界面"
              },
              2: {
                title: "服务器",
                descrip: "下订单界面"
              }
            }            
        },
        communUsed:{
            logInPage:{
              connectionTitle:'连接：',
              identifiant:'身份证',
              pwd:'密码',
              logInBtn:'登录',
              inscrireLink:'注册',
              downloadBtn:'下载系统到您的电脑',
              toast:{
                addIdentif:'输入身份证！',
                addPwd:'输入密码！',
                successLog:'已连接！',
                notfound:'错误，请重试！',
              }
            },
            profilePage: {
              mainTitle: '个人资料',
              numAvis: '评论数',
              numLikes: '点赞数',
              profileLinkBtn: '个人资料',
              menuTabList: {
                generalEdit: '编辑',
                pwdEdit: '密码',
                horaireEdit: '时间表',
                positionEdit: '位置',
                imagesEdit: '图片',
                avisShow: '评论',
                printPromote: '打印',
              },
              generalEditData: {
                title: '一般信息',
                name: '姓名',
                phone: '电话',
                location: '地理位置',
                gouv: '选择一个地区',
                deleg: '选择一个部门',
                adress: '地址',
                genre: '类型',
                editBtn: '编辑'
              },
              pwdEditData: {
                title: '密码修改',
                identifiant: '识别码',
                pwd: '密码',
                editBtn: '编辑'
              },
              horaireEditData: {},
              positionEditData: {},
              imagesEditData: {
                noPhoto: '您没有照片',
                clicToAdd: '点击上传图片'
              },
              avisShowData: {},
              printPromoteData: {},
            },
            settingPage: {
              title: '常规设置',
              activationCard: {
                title: '激活',
                jour: '天',
                isActivated: '已激活',
                isExpired: '已过期',
                activeIci: '在这里激活您的系统',
                activeIciBtn: '激活'
              },
              confirmerCard: {
                title: '确认',
                isConfirmer: '已确认',
                isConfirmerText: '您的帐户在 abyedh.com 上已确认',
                nonConfirmer: '未确认',
                nonConfirmerText: '您的帐户在 abyedh.com 上未确认',
                nonConfirmerBtn: '确认'
              },
              settingCard: {
                1: {
                  title: '订阅',
                  desc: '订阅，最大数量，自动订阅'
                },
                2: {
                  title: '课程',
                  desc: '课程，时间表，成员'
                },
                3: {
                  title: '设备',
                  desc: '物品，修改，进出库单'
                },
                4: {
                  title: '订阅',
                  desc: '修改，删除，信用'
                },
                5: {
                  title: '成员',
                  desc: '新增，修改，忠诚度'
                },
                6: {
                  title: '团队',
                  desc: '新增，出席，预付款'
                },
              },
            },
            paymmentPage:{
              montant:'500',
              currency:'¥',
              montantAnnuel:'年费金额：',
              textOne:'付款通过Moneygram服务进行转账',
              textTwo:' 至所有者',
              textThree:'电话',
              afterFinishAlert:'完成转账后，请在此处输入信息：',
              nomText:'付款人姓名',
              nomPlchText:'姓名',
              montantText:'金额',
              montantPlchText:'金额',
              codeText:'转账代码',
              codePlchText:'代码',
              phoneText:'电话',
              phonePlchText:'电话',
              posteText:'邮局',
              postePlchText:'邮局',
              postalCodeText:'邮政编码',
              postalCodePlchText:'邮政编码',
              saveBtn:'保存'
            },          
            forumPage:{
              inoutPlch:'在此处添加状态'
            },
            messagePage:{
              titleName:'消息',
              alertMessage:'您没有消息',
            },
            savgarderPage:{
              selectItemsCard:{
                title:'将您的数据保存到计算机上',
                itemsList:{
                  1:'保存约会',
                  2:'保存优惠',
                  3:'保存课程',
                  4:'保存报告',
                  5:'保存患者',
                  6:'保存团队',
                  7:'保存处方',
                },
                exportBtn:'导出',
                saveCopy:'下载副本'
              },
              netoyerCard:{
                title:'清理服务器上的无用文件',
                notoyerText:'文件总占用空间为：',
                netoyerBtn:'清理服务器'
              }
            },
            sysncroPage:{
              title:'更新表格',
              savingModal:'正在保存',
              mainCard:{
                topText:'单击按钮更新您的数据',
                bottomText:'当您更新服务器上的数据时，您还可以在脱机模式下使用您的应用程序，请始终保持最新状态',
                btnText:'更新'
              },
              itemsList:{
                1:'约会',
                2:'课程',
                3:'报告',
                4:'患者',
                5:'团队',
                6:'处方',
              },
            },
            documentPage:{
              itemsList:{
                1:'约会',
                2:'课程',
                3:'报告',
                4:'患者',
                5:'团队',
                6:'处方',
              },
              savModal:{
                title:'售后服务',
                inputPlch:'在这里提出您的问题'
              }
            }
        },
        menuTabs:{
            mainPage:{
              LinksCardItems : {
                rapportNum :{
                  title:'报告',
                  desc:'新'
                },
                seanceNum :{
                  title:'会话',
                  desc:'新'
                },
                patientNum :{
                  title:'患者',
                  desc:'添加'
                },
                ordonanceNum :{
                  title:'处方',
                  desc:'新'
                },
                equipeNum :{
                  title:'团队',
                  desc:'存在'
                },
              },
              evolutionCard:{
                title: '会话发展',
              },
              tabsCard:{
                seance : {
                  tabName:'会话',
                  cardTitle:'会话分布'
                },
                rdv : {
                  tabName:'预约',
                  cardTitle:'预约分布'
                },
                patient : {
                  tabName:'患者',
                  cardTitle:'患者分布'
                },
              }
            },
            rdvPage:{
              calendarLink:'日历',
              tabsTtems: {
                attent: '等待中',
                seen: '已查看',
                accepte: '已接受',
                refuse: '已拒绝',
                retarde: '已延迟',
                redirecte: '已重定向',
                termine: '已完成',
              },
              infoBtn: '信息',
              tableHeaderItems: "'*','ID','患者', '過去の', '量', '時間', '状態', '記録?', '見る'" ,
              calendarCardData: {
                searchCardTitle: '搜索...',
                searchCardBtn: '搜索',
                rdvToday: '今天的约会'

              },
              rdvInfoCardData: {
                  title: '预约',
                  controlBtnCard: {
                      title: '控制',
                      rejectBtn: '取消',
                      acceptBtn: '接受',
                      retardBtn: '延迟',
                      redirectBtn: '重定向',
                      saveBtn: '保存会话',
                      termineBtn: '完成',
                      nonSeenBtn: '标记为未查看',
                  },
                  infoReqCard: {
                      title: '预约信息',
                      nameOfUser: '姓名',
                      wantedDate: '期望日期',
                      wantedTime: '期望时间',
                      reqDay: '请求日期',
                      comment: '评论',
                  },
                  infoUserCard: {
                      title: '患者信息',
                      wantYouSaveThisUser: '',
                      name: '姓名：',
                      phone: '电话：',
                      delag: '代表：',
                      gouv: '政府：',
                      adress: '地址：',
                      saveBtn: '保存客户',
                      stateItem: {
                          dejaEnreg: '已经保存',
                          nouveaux: '新患者',
                      },
                      statItemNames: {
                          rdv: '预约',
                          ordonnace: '处方',
                          seances: '会话',
                      },
                      addUserCard: {
                          title: '您想要保存这个患者吗？',
                      },
                  },
              },
            },
            seancePage:{
              tarifName:'价格',
              infoBtn:'信息',
              maladieStateItems:{
                Bonne:'良好',
                Malade:'生病',
                Reanimation:'复苏',
                Palliatifs:'姑息治疗',
                Quarantaine:'隔离',
                Observation:'观察',
              },
              seanceInfo: {
                  tabsName:{
                    diagnostique:'诊断',
                    analyse:'分析',
                    ordonance:'处方',
                    info:'信息',
                  },
                  analyseList:'分析列表',
                  ordonanceLit:'处方清单',
                  ordonanceTable :{
                    No:'编号',
                    Designiation:'指示',
                    Dosage:'剂量',
                    Forme:'形式',
                    Presentation:'介绍',
                  },
                  infoTable :{
                    date:'日期和时间',
                    maladie:'疾病',
                    degree:'疾病程度',
                    description:'疾病描述',
                  },
                  controlBtnCard : {
                    title:'控制',
                    modifier:'修改',
                    supprimer:'删除',
                    imprimer:'打印处方',
                    suppModal:{
                      voulezVous:'确定要删除此次会议吗？',
                      suppBtn:'删除'
                    }
                  },
              },
              addSeanceInfo: {
                tabsName: {
                  selectPat: '选择患者',
                  diagnostique: '输入诊断',
                  analyse: '进行分析',
                  ordonance: '写处方',
                  terminer: '完成结果',
                },
                selectTabsData: {
                  patientCardTitle: '患者',
                  btnsText: {
                    patientUID: '患者UID',
                    scanRDV: '预约',
                  },
                  patientInfo: {
                    Nom: '姓名',
                    phone: '电话',
                    adress: '地址',
                    nbSeance: '会议次数',
                    etatSnit : '健康状况：',
                  },
                  leftTabs: {
                    seance: '会议',
                    rdv: '预约',
                    ordonance: '处方',
                    tableHearder: "'*','ID ','日期','时间','信息'",
                  },
                },
                diagnosqtiqueTabsData: {
                  title: '诊断',
                },
                analyseTabsData: {
                  title: '添加参数',
                  grandeurPlch: '参数',
                  valeurPlch: '数值',
                  btnText: '添加',
                  listeText: '分析列表'
                },
                ordonanceTabsData: {
                  title: '添加药品',
                  addPlch: '输入药品',
                  code: '条形码：',
                  Nom: '名称：',
                  Dosage: '剂量：',
                  Forme: '形式：',
                  Presentation: '介绍：',
                  modePlch: '使用方法',
                  btnText: '添加',
                  listeText: '分析列表'
                },
                terminerTabsData: {
                  maladie: '疾病',
                  resultat: '结果：疾病',
                  resultatPlch: '疾病',
                  date: '日期',
                  degre: '危险程度',
                  genre: '会话类型',
                  pasGenre: { one: '未记录类型', two: '点击这里', three: '以完成' },
                  saveBtn: '保存',
                  printBtn: '打印处方',
                },
              },
              editSeance :{
                editBtn:'编辑',
                pasDordo:'无处方',
                editOrdonance: '您可以在此处编辑处方：'
              },
              resumerCard: {
                cardTitle: '输入一个期限',
                rechercheBtn: '搜索',
                tableHeader: "'*','病人','疾病','危险程度','日期','时间','查看'",
              },
              tarifCard: {
                cardTitle: '添加价格：',
                Nom: '名称：',
                Description: '描述：',
                Tarif: '价格：',
                addBtn: '保存',
                infoBtn: '信息'
              },
              tarifInfoCard: {
                prixText: '价格',
                tarifText: '费率',
                leftTab: {
                  seance: '会议',
                  modifier: '修改'
                },
                seanceTableH: "'ID','成员','日期','时间','查看'",
                modifierCard: {
                  nom: '名称',
                  tarif: '费率',
                  descr: '描述',
                  modifierBtn: '修改'
                }
              }
            },
            patientPage: {
              assuranceText: '保证',
              infoText: '信息',
              addPatient: {
                nomEtPrenon: '名字和姓氏',
                naissance: '出生日期',
                phoneNum: '电话',
                location: '地理位置',
                gouv: '选择区域',
                deleg: '选择部门',
                adresse: '地址',
                saveBtn: '保存',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: '输入',
                    scan: '扫描'
                  },
                  title: '在 Abyedh 数据库中搜索',
                  btnText: '搜索',
                  clicToScan: '点击扫描'
                }
              },
              patientInfo: {
                mainCardText: {
                  verification: '验证',
                  telephone: '电话',
                  notVerifier: '未验证'
                },
                TabsCardText: {
                  seance: '会话',
                  ordonance: '处方',
                  rdv: '预约',
                  modifier: '修改',
                  verifier: '验证',
                  supprimer: '删除'
                },
                ordoTableaHeders: "'ID','客户','日期','时间','查看'",
                rdvTableaHeders: "'ID','客户','日期','时间','总计','查看'",
                editCard: {
                  nomEtPrenon: '名字和姓氏：',
                  naissance: '出生日期',
                  phoneNum: '电话',
                  location: '地理位置',
                  gouv: '选择区域',
                  deleg: '选择部门',
                  adresse: '地址',
                  editBtn: '修改'
                },
                verificationCard: {
                  isVerifier: '该患者已验证',
                  searchInAbyedhDB: '在 Abyedh 数据库中搜索',
                  nom: '姓名',
                  phone: '电话：',
                  gouv: '区域：',
                  deleg: '部门：',
                  verifBtn: '验证',
                  searchBtn: '搜索'
                },
                deleteCard: {
                  mainTitle: '您确定要删除此患者吗？',
                  alertText: '当您删除患者时',
                  conscOne: '该患者将不会在“患者”分支中可见',
                  conscTwo: '与此患者相关的所有数据可能会受损',
                  conscThree: '您将无法以其他方式生成发票或订单',
                  deleteBtn: '是的，删除'
                }
              }
            },
            ordonancePage:{
              StockText:'库存',
              InfoBtn:'信息',
              ordoState:{
                terminer:'完成',
                annule:'取消',
                enCours:'进行中',
                indefinie:'未定义'
              },
              addOrdoPage:{
                listeText:'检查清单',
                tabsText:{
                  enter:'输入',
                  dateClient:'日期和客户',
                  save:'保存',
                },
                enterCard: {
                  title:'添加项目',
                  addPlch:'输入药品',
                  code:'条形码：',
                  Nom:'名称：',
                  Dosage :'剂量：',
                  Forme :'形式：',
                  Presentation :'介绍：',
                  modePlch:'使用方法',
                  btnText:'添加',
                },
                dateClientCard:{
                  title: '日期和客户',
                  nomClientText:'姓名:',
                  adresseClientText:'地址：'
                },
                finisCard:{
                  titleText:'按钮',
                  saveBtn:'保存',
                  printBnt:'打印'
                }
              },
              ordoInfoPage:{
                titleText:'处方',
                ordoId:'处方ID：',
                ordoCode:'处方代码：',
                patientText:'患者：',
                dateText:'日期：',
                TimeText:'时间：',
                tableHeader :{
                  No:'编号',
                  Designiation:'项目名称',
                  Dosage:'剂量',
                  Forme:'形式',
                  Presentation:'介绍',
                },
                controlBtns: {
                  title:'控制',
                  printBtn:'打印',
                  editBtn:'编辑',
                  deleteBtn:'删除',
                  seeSeance:'查看会话',
                }
              },
              modifierOrdoPage:{
                editBtn:'编辑'
              },
              stockCard:{
                addCard:{
                  title:'添加新药品',
                  enregistrerBtn:'保存',
                  fermerBtn:'关闭'
                },
                infoCard:{
                  tabsText:{
                    info:'信息',
                    modifier:'修改',
                    supprimer:'删除'
                  },
                  cardData:{
                    dosage:'剂量',
                    presentaion:'介绍'
                  },
                  alertTer:'您无法修改或删除此药品，因为它是公共药品',
                  deleteCard:{
                    mainTitle:'您确定要删除此药品吗？',
                    alertText:'删除药品时',
                    conscOne:'药品将不会在"药品"分支中可见',
                    conscTwo:'所有与此药品相关的数据可能会受损',
                    conscThree:'否则，您将无法对此药品进行发票或订单',
                    deleteBtn:'是的，删除',
                  },
                }
              }
            },
            rapportPage:{
              infoBtn:'信息',
              addRapport:{
                tabsText:{
                  contenue:'内容',
                  terminer:'完成',
                },
                rptPlch:'在这里写下您的报告 |',
                terminerCard:{
                  Titre:'标题',
                  Sujet:'主题',
                  Date:'日期',
                  Genre:'类型',
                  genreListe:{
                    1: '一般医学',
                    2:'住院',
                    3:'紧急',
                    4:'咨询',
                    5:'评估',
                    6:'诊断',
                    7:'跟进',
                    8:'医学研究',
                    9:'临床案例',
                    10:'医疗法律',
                    11:'尸检',
                    12:'公共卫生',
                    13:'其他',
                  },
                  saveBtn:'保存',
                  printBtn:'打印报告'
                }
              },
              rapportInfo:{
                titleText:'报告',
                rapportId:'报告 ID : ',
                rapportTitre:'标题 :',
                sujetText:'主题 : ',
                dateText:'日期 :',
                GenreText:'类型 : ',
                controlCard:{
                  title : '控制',
                  editBtn:'编辑',
                  printBtn:'打印',
                  deleteBtn:'删除'
              
                }
              },
              editRapport:{
                editBtn:'编辑'
              }
            },
            teamPage: {
              interfaceLinkText: 'RDV界面',
              infoBtn: '信息',
              addTeamPage: {
                cin: '身份证号：',
                nomEtPrenom: '姓名：',
                phone: '电话：',
                poste: '职位：',
                adresse: '地址：',
                saveBtn: '保存',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: '输入',
                    scan: '扫描'
                  },
                  title: '在Abyedh数据库中搜索',
                  btnText: '搜索',
                  clicToScan: '点击扫描'
                }
              },
              addPoste: {
                eemptyListeText: '在右侧添加职位',
                currency:'¥',
                cardTitle: '添加职位',
                poste: '职位',
                salaire: '薪水',
                experience: '所需经验',
                saveBtn: '保存',
                modifierTitle: '修改职位',
                modifierBtn: '修改',
                supprimerModal: {
                  title: '删除家庭',
                  confirmText: '确定要删除这个家庭吗？',
                  nom: '职位',
                  desc: '描述',
                  deleteBtn: '删除职位'
                }
              },
              anavcePage: {
                selectMembre: '选择成员',
                membrePlch: '输入成员',
                montant: '金额',
                montantPlch: '数值',
                addBtn: '添加',
                tableaHeader: "'*','姓名','日期', '数值','X'",
                deleteModal:{
                  title:'删除预付款',
                  confText:'您确定要删除此预付款吗？',
                  valeur:' 数值：',
                  membre:' 成员：',
                  confirmBtn:'删除'
                }
              },
              presencePage: {
                selectMembre: '选择成员',
                membrePlch: '输入成员',
                genre: '选择类型',
                presence: '出席',
                absance: '缺席',
                date: '日期',
                addBtn: '添加',

              },
              teamInfoPage: {
                mainCardText: {
                  verification: '验证',
                  telephone: '电话',
                  notVerifier: '未验证'
                },
                TabsCardText: {
                  presence: '出席',
                  avance: '预付款',
                  caissePWD: '密码保险柜',
                  modifier: '修改',
                  verifier: '验证',
                  supprimer: '删除'
                },
                presenceTableaHeders: "'ID', '客户', '日期', '时间', '查看'",
                avanceTableaHeders: "'ID', '客户', '日期', '时间', '总额', '查看'",
                editCard: {
                  cin: '身份证号',
                  nomEtPrenon: '姓名：',
                  phoneNum: '电话 ',
                  poste: '职位：',
                  location: '地理位置 ',
                  gouv: '选择地区',
                  deleg: '选择部门',
                  adresse: '地址',
                  editBtn: '编辑',
                },
                caissePWDData: {
                  identifiant: '标识符：',
                  pwd: '密码模式：',
                  smartID: '智能ID ',
                  editBtn: '编辑',
                },
                verificationCard: {
                  isVerifier: '该患者已验证',
                  searchInAbyedhDB: '在Abyedh数据库中搜索',
                  nom: '姓名',
                  phone: '电话：',
                  gouv: '省：',
                  deleg: '市：',
                  verifBtn: '验证',
                  searchBtn: '搜索'
                },
                deleteCard: {
                  mainTitle: '您确定要删除此成员吗？',
                  alertText: '删除成员后',
                  conscOne: '该成员将在“成员”分支中不可见',
                  conscTwo: '与该成员相关的所有数据可能会受损',
                  conscThree: '否则，您无法使用该成员进行发票或订单',
                  deleteBtn: '是的，删除',
                },
              }
            }
            
        },
        alternativeS:{
          rdvPortail: {
              loginInPage:{
                  connextionText:'连接：',
                  identifiant:'身份验证',
                  pwd:'密码',
                  smartId:'输入智能ID',
                  connBtn:'连接',
                  validBtn:'输入智能ID'
              },
              mainPage:{
                cl:'患者',
                rdv:'预约',
                cld:'日历',
              }
          }
        },
        TableHead: {
            seance: "'*','ID','患者','病','程度','日','时间','分析','处方','查看'",
            facture: "'*','ID','现金','客户','日','时间','总额','状态','查看'",
            ordonance: "'*','ID','患者','日期','时间','会话？','状态','查看'",
            seances: "'*','ID','现金','客户','日','时间','状态','查看'",
            request: "'*','ID','客户', '日期','表','状态','X','查看'",
            reservation: "'*','ID','患者', '过去的','体积','时间','状态','记录？','查看'",
            menu: "'*','代码', '名称', '类型','成本','销售价格','X','查看'",
            stock: "'*','代码', '名称', '类型','费率','查看'",
            camion: "'*','卡车','编号', '司机','资金','收入','X','查看'",
            camionStock: "'代码', '名称', '类型','库存','价格','查看'",
            camionFacture: "'ID','客户','日期','总额','查看'",
            camionFond: "'ID','日期','总额', 'SDF','SCF','查看'",
            client: "'*','名称','出生日期', '电话', '位置','地址','查看'",
            clientCommande: "'ID', '过去的','体积','总额','状态','查看'",
            clientFacture: "'ID','客户','日期','总额','查看'",
            clientFactureC: "'ID','客户','日期','总额','查看'",
            team: "'*','名称','电话', '身份证号','开始', '岗位','查看'",
            medicammentPage: "'*','代码','类型','名称', '剂量','形式', '演示','类别','查看'",
            fournisseur: "'*','MF','名称','电话', '地址','类型', '日','查看'",
            addSeancePtientTab : "'*','ID ','日期','时间','信息'"
        },      
        BreadCrumb: {
          menuAddPlat: {
              '1': '菜单',
              '2': '添加菜品'
          },
          menuFamille: {
              '1': '菜单',
              '2': '分类'
          },
          platInfo: {
              '1': '菜单',
              '2': '信息'
          },
          forfraitInfo: {
              '1': '费率',
              '2': '信息'
          },
          stockAddArticle: {
              '1': '库存',
              '2': '添加商品'
          },
          stockFamille: {
              '1': '库存',
              '2': '分类'
          },
          stockBE: {
              '1': '库存',
              '2': '入库单'
          },
          stockBS: {
              '1': '库存',
              '2': '出库单'
          },
          stockInfo: {
              '1': '库存',
              '2': '信息'
          },
          factureAjouter: {
              '1': '会话',
              '2': '添加会话'
          },
          factureInfo: {
              '1': '会话',
              '2': '信息'
          },
          factureEdit: {
              '1': '报告',
              '2': '编辑'
          },
          factureResumer: {
              '1': '会话',
              '2': '总结'
          },
          CamionAdd: {
              '1': '卡车',
              '2': '添加卡车'
          },
          CamionAddFond: {
              '1': '卡车',
              '2': '添加基金'
          },
          CamionFondInfo: {
              '1': '卡车',
              '2': '信息',
              '3': '基金',
              '4': '查看'
          },
          CamionEditFond: {
              '1': '卡车',
              '2': '信息',
              '3': '基金',
              '4': '编辑'
          },
          CamionInv: {
              '1': '卡车',
              '2': '卡车盘点'
          },
          CamionInfo: {
              '1': '卡车',
              '2': '信息'
          },
          CamionArticleInfo: {
              '1': '卡车',
              '2': '信息',
              '3': '商品'
          },
          CamionFactureInfo: {
              '1': '卡车',
              '2': '信息',
              '3': '会话',
              '4': '查看'
          },
          ClientAdd: {
              '1': '患者',
              '2': '添加患者'
          },
          ClientInfo: {
              '1': '客户',
              '2': '信息'
          },
          ClientMap: {
              '1': '客户',
              '2': '地图'
          },
          ClientRegion: {
              '1': '客户',
              '2': '地区'
          },
          RequestInfo: {
              '1': '预约',
              '2': '信息'
          },
          RequestCalendar: {
              '1': '预约',
              '2': '日历'
          },
          RequestCompte: {
              '1': '订单',
              '2': '账户'
          },
          RequestReg: {
              '1': '订单',
              '2': '分类'
          },
          FournisseurAdd: {
              '1': '供应商',
              '2': '添加供应商'
          },
          FournisseurCalendar: {
              '1': '供应商',
              '2': '日历'
          },
          FournisseurSearch: {
              '1': '供应商',
              '2': '搜索'
          },
          FournisseurInfo: {
              '1': '供应商',
              '2': '信息'
          },
          TeamAdd: {
              '1': '团队',
              '2': '添加'
          },
          TeamInfo: {
              '1': '团队',
              '2': '信息'
          },
          TeamPoste: {
              '1': '团队',
              '2': '职位'
          },
          TeamDemande: {
              '1': '团队',
              '2': '职位请求'
          }
        },
        SubNavs: {
            request: {
                '1': '已接受',
                '2': '已拒绝',
                '3': '等待中'
            },
            camion: {
                '1': '添加医嘱'
            },
            Menu: {
                '1': '新报告'
            },
            Stock: {
                '1': '新医嘱',
                '2': '菜品家族',
                '3': '入库单',
                '4': '出库单'
            },
            facture: {
                '1': '新会话',
                '2': '总结'
            },
            client: {
                '1': '新患者'
            },
            Commande: {
                '1': '账户',
                '2': '日历'
            },
            Fournisseur: {
                '1': '新供应商',
                '2': '日历',
                '3': '搜索'
            },
            Equipe: {
                '1': '新成员',
                '2': '岗位',
                '3': '前进',
                '4': '出勤'
            }
        }
    },
}
export default ChinaTrans