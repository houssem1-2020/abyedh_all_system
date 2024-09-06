const JapanTrans = {
    translation : {
        menusAndTabsName:{
            leftBar: {
                profile: "プロフィール",
                parametre: "パラメータ",
                forum: "フォーラム",
                message: "メッセージ",
                sauvgarder: "保存",
                syncro: "同期",
                documentation: "ドキュメンテーション",
                deconextion: "ログアウト"
            },
            topBar: {
                ma: 'ホーム',
                rq: 'リクエスト',
                op: 'オペレーション',
                sk: '在庫',
                cm: '車両',
                cl: '顧客',
                tm: 'チーム',
            },
            alternativeLink :{
              1 :{
                title:'アポイントメント',
                descrip:'アポイントメントを管理するためのインターフェース'
              },
              2 :{
                title:'カレンダー',
                descrip:'カレンダーのインターフェース'
              },
          }
        },
        communUsed:{
            logInPage:{
              connectionTitle:'接続：',
              identifiant:'識別',
              pwd:'パスワード',
              logInBtn:'ログイン',
              inscrireLink:'サインアップ',
              downloadBtn:'システムをPCにダウンロード',
              toast:{
                addIdentif:'識別を入力してください！',
                addPwd:'パスワードを入力してください！',
                successLog:'ログインしました！',
                notfound:'エラーが発生しました。もう一度お試しください！',
              }
            },
            profilePage: {
              mainTitle: 'プロフィール',
              numAvis: 'レビュー',
              numLikes: 'いいね',
              profileLinkBtn: 'プロフィール',
              menuTabList: {
                generalEdit: '編集',
                pwdEdit: 'パスワード',
                horaireEdit: '営業時間',
                positionEdit: '位置',
                imagesEdit: '画像',
                avisShow: 'レビュー',
                printPromote: '印刷'
              },
              generalEditData: {
                title: '一般情報',
                name: '名前と姓',
                phone: '電話',
                location: '場所',
                gouv: '地域を選択',
                deleg: '部門を選択',
                adress: '住所',
                genre: 'ジャンル',
                editBtn: '編集'
              },
              pwdEditData: {
                title: 'パスワードの変更',
                identifiant: '識別子',
                pwd: 'パスワード',
                editBtn: '編集'
              },
              horaireEditData: {},
              positionEditData: {},
              imagesEditData: {
                noPhoto: '画像がありません',
                clicToAdd: '画像をアップロードするにはクリック'
              },
              avisShowData: {},
              printPromoteData: {}
            },
            settingPage: {
              title: '一般設定',
              activationCard: {
                title: 'アクティベーション',
                jour: '日',
                isActivated: 'アクティブ化されました',
                isExpired: '期限切れ',
                activeIci: 'ここでシステムをアクティブにします',
                activeIciBtn: 'アクティブ'
              },
              confirmerCard: {
                title: '確認',
                isConfirmer: '確認済み',
                isConfirmerText: 'あなたのアカウントはabyedh.comで確認されています',
                nonConfirmer: '未確認',
                nonConfirmerText: 'あなたのアカウントはabyedh.comで未確認です',
                nonConfirmerBtn: '確認する'
              },
              settingCard: {
                '1': {
                  title: '購読',
                  desc: '購読、最大数、自動購読'
                },
                '2': {
                  title: 'セッション',
                  desc: 'セッション、営業時間、メンバー'
                },
                '3': {
                  title: '装備',
                  desc: 'アイテム、編集、入出庫ボン'
                },
                '4': {
                  title: 'サブスクリプション',
                  desc: '変更、削除、クレジット'
                },
                '5': {
                  title: 'メンバー',
                  desc: '新規、編集、忠誠心'
                },
                '6': {
                  title: 'チーム',
                  desc: '新規、プレゼンス、アドバンス'
                }
              }
            },
            paymmentPage:{
              montant:'500',
              currency:'¥',
              montantAnnuel:'年間登録料：',
              textOne:'支払いはMoneygramサービスを通じて送金されます',
              textTwo:' 所有者へ',
              textThree:'電話',
              afterFinishAlert:'送金を完了した後、こちらに情報を入力してください：',
              nomText:'支払いを送信する名前',
              nomPlchText:'名前',
              montantText:'金額',
              montantPlchText:'金額',
              codeText:'支払いコード',
              codePlchText:'コード',
              phoneText:'電話',
              phonePlchText:'電話',
              posteText:'郵便局',
              postePlchText:'郵便局',
              postalCodeText:'郵便番号',
              postalCodePlchText:'郵便番号',
              saveBtn:'保存'
            },          
            forumPage: {
              inoutPlch: 'ステータスをここに追加'
            },
            messagePage: {
              titleName: 'メッセージ',
              alertMessage: 'メッセージがありません'
            },
            savgarderPage: {
              selectItemsCard: {
                title: 'コンピューターにデータを保存します',
                itemsList: {
                  '1': '予約を保存する',
                  '2': 'オファーを保存する',
                  '3': 'セッションを保存する',
                  '4': 'レポートを保存する',
                  '5': '患者を保存する',
                  '6': 'チームを保存する',
                  '7': '処方箋を保存する'
                },
                exportBtn: 'エクスポート',
                saveCopy: 'コピーをダウンロード'
              },
              netoyerCard: {
                title: 'サーバー上の不要なファイルのクリーンアップ',
                notoyerText: 'ファイルの合計体積は：',
                netoyerBtn: 'サーバーをクリーンアップ'
              }
            },
            sysncroPage: {
              title: '更新されたテーブル',
              savingModal: '保存中',
              mainCard: {
                topText: 'データを更新するにはボタンをクリック',
                bottomText: 'インターネットサーバーに保存されたデータを更新すると、オフラインモードでもアプリを使用できます。常に最新の情報を確認してください',
                btnText: '更新'
              },
              itemsList: {
                '1': '予約',
                '2': 'セッション',
                '3': 'レポート',
                '4': '患者',
                '5': 'チーム',
                '6': '処方箋'
              }
            },
            documentPage: {
              itemsList: {
                '1': '予約',
                '2': 'セッション',
                '3': 'レポート',
                '4': '患者',
                '5': 'チーム',
                '6': '処方箋'
              },
              savModal: {
                title: 'アフターサービス',
                inputPlch: 'ここに問題を記入してください'
              }
            }
        },
        menuTabs:{
            mainPage:{
              LinksCardItems : {
                rapportNum :{
                  title:'レポート',
                  desc:'新着'
                },
                seanceNum :{
                  title:'セッション',
                  desc:'新着'
                },
                patientNum :{
                  title:'患者',
                  desc:'追加'
                },
                ordonanceNum :{
                  title:'処方',
                  desc:'新着'
                },
                equipeNum :{
                  title:'チーム',
                  desc:'出席'
                },
              },
              evolutionCard:{
                title: 'セッションの進化',
              },
              tabsCard:{
                seance : {
                  tabName:'セッション',
                  cardTitle:'セッションの分布'
                },
                rdv : {
                  tabName:'予約',
                  cardTitle:'予約の分布'
                },
                patient : {
                  tabName:'患者',
                  cardTitle:'患者の分布'
                },
              }
            },
            rdvPage: {
              calendarLink: 'カレンダー',
              tabsTtems: {
                  attent: '保留中',
                  seen: '表示済み',
                  accepte: '承諾済み',
                  refuse: '拒否済み',
                  retarde: '遅延',
                  redirecte: 'リダイレクト',
                  termine: '完了',
              },
              infoBtn: '情報',
              tableHeaderItems: "'*','ID','患者', '経過','ボリューム','時間','状態','登録済み?','表示'",
              calendarCardData: {
                  searchCardTitle: '検索...',
                  searchCardBtn: '検索',
                  rdvToday: '今日の予約'
              },
              rdvInfoCardData: {
                  title: '予約',
                  controlBtnCard: {
                      title: 'コントロール',
                      rejectBtn: 'キャンセル',
                      acceptBtn: '承諾',
                      retardBtn: '遅延',
                      redirectBtn: 'リダイレクト',
                      saveBtn: 'セッションを保存',
                      termineBtn: '終了',
                      nonSeenBtn: '未表示としてマーク',
                  },
                  infoReqCard: {
                      title: '予約情報',
                      nameOfUser: '名前と姓',
                      wantedDate: '希望日付',
                      wantedTime: '希望時間',
                      reqDay: '過去の日',
                      comment: 'コメント',
                  },
                  infoUserCard: {
                      title: '患者情報',
                      wantYouSaveThisUser: '',
                      name: '名前：',
                      phone: '電話番号：',
                      delag: '代表：',
                      gouv: '政府：',
                      adress: '住所：',
                      saveBtn: '顧客を保存',
                      stateItem: {
                          dejaEnreg: '既に登録済み',
                          nouveaux: '新規患者'
                      },
                      statItemNames: {
                          rdv: '予約',
                          ordonnace: '処方箋',
                          seances: 'セッション',
                      },
                      addUserCard: {
                          title: 'この患者を保存しますか？'
                      }
                  }
              }
            },
            seancePage:{
              tarifName:'料金',
              infoBtn:'情報',
              maladieStateItems:{
                Bonne:'良好な状態',
                Malade:'病気',
                Reanimation:'再生',
                Palliatifs:'緩和ケア',
                Quarantaine:'隔離',
                Observation:'観察中',
              },
              seanceInfo : {
                tabsName:{
                    diagnostique:'診断',
                    analyse:'分析',
                    ordonance:'処方箋',
                    info:'情報',
                },
                analyseList:'分析リスト',
                ordonanceLit:'薬剤リスト',
                ordonanceTable :{
                    No:'番号',
                    Designiation:'名称',
                    Dosage:'用量',
                    Forme:'形状',
                    Presentation:'表示',
                },
                infoTable :{
                    date:'日付＆時間',
                    maladie:'病気',
                    degree:'病気の程度',
                    description:'病気の説明',
                },
                controlBtnCard : {
                  title:'コントロール',
                  modifier:'修正',
                  supprimer:'削除',
                  imprimer:'処方箋を印刷',
                  suppModal:{
                    voulezVous:'本当にこのセッションを削除しますか？',
                    suppBtn:'削除'
                  }
                },

              },
              addSeanceInfo :{
                tabsName: {
                  selectPat:'患者を選択',
                  diagnostique:'診断を入力',
                  analyse:'分析を実施',
                  ordonance:'処方箋を書く',
                  terminer:'結果を終了する',
                },
                selectTabsData: {
                    patientCardTitle:'患者',
                    btnsText:{
                      patientUID :'患者 UID',
                      scanRDV :'予定をスキャン',
                    },
                    patientInfo:{
                      Nom : '名前',
                      phone : '電話',
                      adress : '住所 ',
                      nbSeance : 'セッション数',
                      etatSnit : '健康状態:',
                    },
                    leftTabs:{
                      seance:'セッション ',
                      rdv:'予定',
                      ordonance:'処方箋',
                      tableHearder : "'*','ID ','日付','時間','情報'"
                    }

                },
                diagnosqtiqueTabsData: {
                  title:'診断'
                },
                analyseTabsData: {
                  title:'サイズを追加',
                  grandeurPlch:'サイズ',
                  valeurPlch:'値',
                  btnText:'追加',
                  listeText:'分析リスト'
                },
                ordonanceTabsData: {
                  title:'アイテムを追加',
                  addPlch:'薬剤を入力',
                  code:'バーコード :',
                  Nom:'名前 :',
                  Dosage :'用量 :',
                  Forme :'形状 :',
                  Presentation :'表示 :',
                  modePlch:'使用方法',
                  btnText:'追加',
                  listeText:'分析リスト'
                },
                terminerTabsData: {
                  maladie:' 病気',
                  resultat:'結果: 病気',
                  resultatPlch:'病気',
                  date:'日付 ',
                  degre:'危険度',
                  genre:'セッションのタイプ',
                  pasGenre: {one:'保存されたタイプなし', two:'ここをクリック', three:'追加する '},
                  saveBtn:'保存',
                  printBtn:'処方箋を印刷',
                }
              },
              editSeance :{
                editBtn:'編集',
                pasDordo:'処方箋なし',
                editOrdonance: 'ここで処方箋を編集できます:'
              },
              resumerCard:{
                cardTitle:'期間を入力',
                rechercheBtn:'検索',
                tableHeader: "'*','患者','病気','程度','日','時間','表示'",
              },
              tarifCard:{
                cardTitle:'料金を追加 :',
                Nom:'名前 :',
                Description:'説明:',
                Tarif:'料金:',
                addBtn:'保存',
                infoBtn:'情報'
              },
              tarifInfoCard:{
                prixText:'価格',
                tarifText:'料金',
                leftTab:{
                  seance:'セッション',
                  modifier:'修正'
                },
                seanceTableH: "'ID','メンバー','日付','時間','表示'",
                modifierCard:{
                  nom:'名前',
                  tarif:'料金',
                  descr:'説明',
                  modifierBtn:'修正'
                }
              }
            },
            patientPage: {
              assuranceText: '保証',
              infoText: '情報',
              addPatient: {
                nomEtPrenon: '名前と苗字',
                naissance: '生年月日',
                phoneNum: '電話',
                location: '位置情報',
                gouv: '地域を選択',
                deleg: '部門を選択',
                adresse: '住所',
                saveBtn: '保存',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: '入力',
                    scan: 'スキャン'
                  },
                  title: 'Abyedh データベースで検索',
                  btnText: '検索',
                  clicToScan: 'スキャンするにはクリック'
                }
              },
              patientInfo: {
                mainCardText: {
                  verification: '検証',
                  telephone: '電話'
                },
                TabsCardText: {
                  seance: 'セッション',
                  ordonance: '処方箋',
                  rdv: '予約',
                  modifier: '修正',
                  verifier: '確認',
                  supprimer: '削除'
                },
                ordoTableaHeders: "'ID','顧客','日付','時間','表示'",
                rdvTableaHeders: "'ID','顧客','日付','時間','合計','表示'",
                editCard: {
                  nomEtPrenon: '名前と苗字：',
                  naissance: '生年月日',
                  phoneNum: '電話',
                  location: '位置情報',
                  gouv: '地域を選択',
                  deleg: '部門を選択',
                  adresse: '住所',
                  editBtn: '編集'
                },
                verificationCard: {
                  isVerifier: 'この患者は確認済みです',
                  searchInAbyedhDB: 'Abyedh データベースで検索',
                  nom: '名前',
                  phone: '電話：',
                  gouv: '地域：',
                  deleg: '部門：',
                  verifBtn: '確認',
                  searchBtn: '検索'
                },
                deleteCard: {
                  mainTitle: 'この患者を本当に削除しますか？',
                  alertText: '患者を削除すると',
                  conscOne: '患者は「患者」ブランチで表示されなくなります',
                  conscTwo: 'この患者に関連するすべてのデータが損傷する可能性があります',
                  conscThree: 'この患者を使用して請求書や注文を作成することはできません',
                  deleteBtn: 'はい、削除'
                }
              }
            },
            ordonancePage:{
              StockText:'在庫',
              InfoBtn:'情報',
              ordoState:{
                terminer:'完了',
                annule:'キャンセル',
                enCours:'進行中',
                indefinie:'未定義'
              },
              addOrdoPage:{
                listeText:'分析リスト',
                tabsText:{
                  enter:'入力',
                  dateClient:'日付と顧客',
                  save:'保存',
                },
                enterCard: {
                  title:'アイテムを追加',
                  addPlch:'薬品を入力',
                  code:'バーコード：',
                  Nom:'名前：',
                  Dosage :'投与量：',
                  Forme :'形式：',
                  Presentation :'プレゼンテーション：',
                  modePlch:'使用方法',
                  btnText:'追加',
                },
                dateClientCard:{
                  title: '日付と顧客',
                  nomClientText:'名前：',
                  adresseClientText:'住所：',
                },
                finisCard:{
                  titleText:'ボタン',
                  saveBtn:'保存',
                  printBnt:'印刷'
                }
              },
              ordoInfoPage:{
                titleText:'処方箋',
                ordoId:'処方箋ID：',
                ordoCode:'処方箋コード：',
                patientText:'患者：',
                dateText:'日付：',
                TimeText:'時間：',
                tableHeader :{
                  No:'番号',
                  Designiation:'デザイン',
                  Dosage:'投与量',
                  Forme:'形式',
                  Presentation:'プレゼンテーション',
                },
                controlBtns: {
                  title:'コントロール',
                  printBtn:'印刷',
                  editBtn:'編集',
                  deleteBtn:'削除',
                  seeSeance:'セッションを見る',
                }
              },
              modifierOrdoPage:{
                editBtn:'編集'
              },
              stockCard:{
                addCard:{
                  title:'新しい薬を追加',
                  enregistrerBtn:'保存',
                  fermerBtn:'閉じる'
                },
                infoCard:{
                  tabsText:{
                    info:'情報',
                    modifier:'修正',
                    supprimer:'削除'
                  },
                  cardData:{
                    dosage:'投与量',
                    presentaion:'プレゼンテーション'
                  },
                  alertTer:'この薬品は公共の薬品であるため、編集または削除することはできません。',
                  deleteCard:{
                    mainTitle:'この薬品を削除しますか？',
                    alertText:'薬品を削除すると、',
                    conscOne:'薬品は「薬品」の枝に表示されなくなります。',
                    conscTwo:'この薬品に関連するすべてのデータが損傷する可能性があります。',
                    conscThree:'この薬品で請求書や注文を処理できなくなります。',
                    deleteBtn:'はい、削除',
                  },
                }
              }
            },
            rapportPage: {
                infoBtn: "情報",
                addRapport: {
                  tabsText: {
                    contenue: "内容",
                    terminer: "終了"
                  },
                  rptPlch: "ここにあなたのレポートを書いてください |",
                  terminerCard: {
                    Titre: "タイトル",
                    Sujet: "トピック",
                    Date: "日付",
                    Genre: "ジャンル",
                    genreListe: {
                      1: "一般医学",
                      2: "入院",
                      3: "緊急",
                      4: "相談",
                      5: "評価",
                      6: "診断",
                      7: "フォローアップ",
                      8: "医学研究",
                      9: "ケーススタディ",
                      10: "メディコ・リーガル",
                      11: "解剖",
                      12: "公衆衛生",
                      13: "その他"
                    },
                    saveBtn: "保存",
                    printBtn: "レポートを印刷"
                  }
                },
                rapportInfo: {
                  titleText: "レポート",
                  rapportId: "レポートID :",
                  rapportTitre: "タイトル :",
                  sujetText: "トピック :",
                  dateText: "日付 :",
                  GenreText: "ジャンル :",
                  controlCard: {
                    title: "制御",
                    editBtn: "編集",
                    printBtn: "印刷",
                    deleteBtn: "削除"
                  }
                },
                editRapport: {
                  editBtn: "編集"
                }
            },
            teamPage: {
              interfaceLinkText: 'RDV インターフェース',
              infoBtn: '情報',
              addTeamPage: {
                cin: 'CIN カード：',
                nomEtPrenom: '名前と苗字：',
                phone: '電話：',
                poste: '役職：',
                adresse: '住所：',
                saveBtn: '保存',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: '入力',
                    scan: 'スキャン'
                  },
                  title: 'Abyedh データベースで検索',
                  btnText: '検索',
                  clicToScan: 'スキャンするにはクリック'
                }
              },
              addPoste: {
                emptyListeText: '右にポジションを追加',
                currency: 'D.T',
                cardTitle: 'ポジションを追加',
                poste: '役職',
                salaire: '給料',
                experience: '必要な経験',
                saveBtn: '保存',
                modifierTitle: 'ポジションを編集',
                modifierBtn: '変更',
                supprimerModal: {
                  title: '家族を削除',
                  confirmText: '本当にこの家族を削除しますか？',
                  nom: '役職',
                  desc: '説明',
                  deleteBtn: 'ポジションを削除'
                }
              },
              anavcePage: {
                selectMembre: 'メンバーを選択',
                membrePlch: 'メンバーを入力',
                montant: '金額',
                montantPlch: '値',
                addBtn: '追加',
                tableaHeader: "'*','名前','日', '値','X'",
                deleteModal: {
                  title: '前負担を削除',
                  confText: '本当にこの前負担を削除しますか？',
                  valeur: ' 価値：',
                  membre: ' メンバー：',
                  confirmBtn: '削除'
                }
              },
              presencePage: {
                selectMembre: 'メンバーを選択',
                membrePlch: 'メンバーを入力',
                genre: 'ジャンルを選択',
                presence: '出席',
                absance: '欠席',
                date: '日付',
                addBtn: '追加'
              },
              teamInfoPage: {
                mainCardText: {
                  verification: '検証',
                  telephone: '電話',
                  notVerifier: '未検証'
                },
                TabsCardText: {
                  presence: '出席',
                  avance: '前負担',
                  caissePWD: 'キャッシュ PWD',
                  modifier: '変更',
                  verifier: '検証',
                  supprimer: '削除'
                },
                presenceTableaHeders: "'ID','クライアント','日','時間','表示'",
                avanceTableaHeders: "'ID','クライアント','日','時間','合計','表示'",
                editCard: {
                  cin: 'CIN カード',
                  nomEtPrenon: '名前と苗字：',
                  phoneNum: '電話 ',
                  poste: '役職：',
                  location: 'ジオロケーション ',
                  gouv: '地域を選択',
                  deleg: '部門を選択',
                  adresse: '住所',
                  editBtn: '編集',
                },
                caissePWDData: {
                  identifiant: '識別子：',
                  pwd: 'パスワードモード：',
                  smartID: 'スマート ID ',
                  editBtn: '編集',
                },
                verificationCard: {
                  isVerifier: 'このメンバーは検証済みです',
                  searchInAbyedhDB: 'Abyedh データベースで検索',
                  nom: '名前',
                  phone: '電話：',
                  gouv: 'Gouv：',
                  deleg: 'Deleg：',
                  verifBtn: '確認',
                  searchBtn: '検索'
                },
                deleteCard: {
                  mainTitle: '本当にこのメンバーを削除しますか？',
                  alertText: 'メンバーを削除すると',
                  conscOne: 'メンバーは "メンバー" ブランチで見えなくなります',
                  conscTwo: 'このメンバーに関連するすべてのデータが損傷する可能性があります',
                  conscThree: 'それ以外の場合、このメンバーで請求書や注文を行うことはできません',
                  deleteBtn: 'はい、削除',
                },
              }
            }
          
        },
        TableHead: {
          seance: "'*','ID','患者','病気','度合い','日','時間','分析','処方','表示'",
          seance: "'*','ID','患者','病気','度合い','日','時間','分析','処方','表示'",
          facture: "'*','ID','キャッシュ','顧客','日','時間','合計','状態','表示'",
          ordonance: "'*','ID','患者','日付','時間','セッション?','状態','表示'",
          seances: "'*','ID','キャッシュ','顧客','日','時間','状態','表示'",
          request: "'*','ID','顧客','日付','テーブル','状態','X','表示'",
          reservation: "'*','ID','患者','経過した','ボリューム','時間','状態','登録済み?','表示'",
          menu: "'*','コード','名前','ジャンル','コスト','販売価格','X','表示'",
          stock: "'*','コード','名前','ジャンル','料金','表示'",
          camion: "'*','トラック','ナンバープレート','ドライバー','基金','収益','X','表示'",
          camionStock: "'コード','名前','ジャンル','在庫','価格','表示'",
          camionFacture: "'ID','顧客','日','合計','表示'",
          camionFond: "'ID','日付','合計','SDF','SCF','表示'",
          client: "'*','名前','誕生日','電話番号','場所','住所','表示'",
          clientCommande: "'ID','経過した','ボリューム','合計','状態','表示'",
          clientFacture: "'ID','顧客','日','合計','表示'",
          clientFactureC: "'ID','顧客','日','合計','表示'",
          team: "'*','名前','電話番号','CIN','開始された','役職','表示'",
          medicammentPage: "'*','コード','ジャンル','名前','投与量','形態','プレゼンテーション','クラス','表示'",
          fournisseur: "'*','MF','名前','電話番号','住所','ジャンル','日','表示'"
        },
        BreadCrumb: {
            menuAddPlat: {
                '1': 'メニュー',
                '2': '料理を追加'
            },
            menuFamille: {
                '1': 'メニュー',
                '2': 'ファミリー'
            },
            platInfo: {
                '1': 'メニュー',
                '2': '情報'
            },
            forfraitInfo: {
                '1': '料金',
                '2': '情報'
            },
            stockAddArticle: {
                '1': '在庫',
                '2': '記事を追加'
            },
            stockFamille: {
                '1': '在庫',
                '2': 'ファミリー'
            },
            stockBE: {
                '1': '在庫',
                '2': '入庫伝票'
            },
            stockBS: {
                '1': '在庫',
                '2': '出庫伝票'
            },
            stockInfo: {
                '1': '在庫',
                '2': '情報'
            },
            factureAjouter: {
                '1': 'セッション',
                '2': 'セッションを追加'
            },
            factureInfo: {
                '1': 'セッション',
                '2': '情報'
            },
            factureEdit: {
                '1': 'レポート',
                '2': '編集'
            },
            factureResumer: {
                '1': 'セッション',
                '2': '要約'
            },
            CamionAdd: {
                '1': 'トラック',
                '2': 'トラックを追加'
            },
            CamionAddFond: {
                '1': 'トラック',
                '2': '基金を追加'
            },
            CamionFondInfo: {
                '1': 'トラック',
                '2': '情報',
                '3': 'ファンド',
                '4': '見る'
            },
            CamionEditFond: {
                '1': 'トラック',
                '2': '情報',
                '3': 'ファンド',
                '4': '編集'
            },
            CamionInv: {
                '1': 'トラック',
                '2': 'トラックの在庫'
            },
            CamionInfo: {
                '1': 'トラック',
                '2': '情報'
            },
            CamionArticleInfo: {
                '1': 'トラック',
                '2': '情報',
                '3': '記事'
            },
            CamionFactureInfo: {
                '1': 'トラック',
                '2': '情報',
                '3': 'セッション',
                '4': '見る'
            },
            ClientAdd: {
                '1': '顧客',
                '2': '顧客を追加'
            },
            ClientInfo: {
                '1': '顧客',
                '2': '情報'
            },
            ClientMap: {
                '1': '顧客',
                '2': 'マップ'
            },
            ClientRegion: {
                '1': '顧客',
                '2': '地域'
            },
            RequestInfo: {
                '1': 'アポイントメント',
                '2': '情報'
            },
            RequestCalendar: {
                '1': 'アポイントメント',
                '2': 'カレンダー'
            },
            RequestCompte: {
                '1': '注文',
                '2': 'アカウント'
            },
            RequestReg: {
                '1': '注文',
                '2': 'グループ化'
            },
            FournisseurAdd: {
                '1': 'サプライヤー',
                '2': 'グループ化'
            },
            FournisseurCalendar: {
                '1': 'サプライヤー',
                '2': 'グループ化'
            },
            FournisseurSearch: {
                '1': 'サプライヤー',
                '2': 'グループ化'
            },
            FournisseurInfo: {
                '1': 'サプライヤー',
                '2': 'グループ化'
            },
            TeamAdd: {
                '1': 'チーム',
                '2': '追加'
            },
            TeamInfo: {
                '1': 'チーム',
                '2': '情報'
            },
            TeamPoste: {
                '1': 'チーム',
                '2': 'ポスト'
            },
            TeamDemande: {
                '1': 'チーム',
                '2': '求人'
            }
        },
        SubNavs: {
            request: {
                '1': '承認された',
                '2': '拒否された',
                '3': '保留中'
            },
            camion: {
                '1': '処方箋を追加'
            },
            Menu: {
                '1': '新しいレポート'
            },
            Stock: {
                '1': '新しい処方箋',
                '2': '料理ファミリー',
                '3': '入庫',
                '4': '出庫'
            },
            facture: {
                '1': '新しいセッション',
                '2': '要約'
            },
            client: {
                '1': '新しい患者'
            },
            Commande: {
                '1': 'アカウント',
                '2': 'カレンダー'
            },
            Fournisseur: {
                '1': '新しいサプライヤー',
                '2': 'カレンダー',
                '3': '検索'
            },
            Equipe: {
                '1': '新しいメンバー',
                '2': 'ポジション',
                '3': '進行',
                '4': '出席'
            }
        }
    },
    
}
export default JapanTrans