const RussiaTrans = {
    translation : {
        menusAndTabsName:{
            leftBar: {
                profile: "Профиль",
                parametre: "Параметры",
                forum: "Форум",
                message: "Сообщения",
                sauvgarder: "Сохранить",
                syncro: "Синхронизация",
                documentation: "Документация",
                deconextion: "Выход"
            },
            topBar: {
                ma: 'Главная страница',
                rq: 'заказы',
                mu: 'Меню',
                ca: 'касса',
                ft: 'Счета',
                cl: 'Клиенты',
                tm: 'команда'
            },
            alternativeLink :{
              1: {
                title: "Касса",
                descrip: "Интерфейс для кассы"
              },
              2: {
                title: "Официант",
                descrip: "Интерфейс для размещения заказов"
              }
            }            
        },
        communUsed:{
            logInPage:{
              connectionTitle:'Подключение:',
              identifiant:'Идентификация',
              pwd:'Пароль',
              logInBtn:'Войти',
              inscrireLink:'Зарегистрируйтесь',
              downloadBtn:'Скачать систему на ваш ПК',
              alternativeLink :{
                  R :{
                    title:'',
                    descrip:''
                  },
                  C :{
                    title:'',
                    descrip:''
                  },
              },
              toast:{
                addIdentif:'Введите идентификацию!',
                addPwd:'Введите пароль!',
                successLog:'Вход выполнен!',
                notfound:'Ошибка, попробуйте еще раз!',
              }
            },
            profilePage: {
              mainTitle: 'Профиль',
              numAvis: 'Отзывы',
              numLikes: 'Нравится',
              profileLinkBtn: 'Профиль',
              menuTabList: {
                generalEdit: 'Редактировать',
                pwdEdit: 'Пароль',
                horaireEdit: 'Расписание',
                positionEdit: 'Позиция',
                imagesEdit: 'Изображения',
                avisShow: 'Отзывы',
                printPromote: 'Печать'
              },
              generalEditData: {
                title: 'Общая информация',
                name: 'Имя и фамилия',
                phone: 'Телефон',
                location: 'Местоположение',
                gouv: 'Выберите область',
                deleg: 'Выберите отделение',
                adress: 'Адрес',
                genre: 'Жанр',
                editBtn: 'Редактировать'
              },
              pwdEditData: {
                title: 'Изменение пароля',
                identifiant: 'Идентификатор',
                pwd: 'Пароль',
                editBtn: 'Редактировать'
              },
              horaireEditData: {},
              positionEditData: {},
              imagesEditData: {
                noPhoto: 'У вас нет фотографий',
                clicToAdd: 'Щелкните, чтобы загрузить изображения'
              },
              avisShowData: {},
              printPromoteData: {}
            },
            settingPage: {
              title: 'Общие настройки',
              activationCard: {
                title: 'Активация',
                jour: 'День',
                isActivated: 'Активировано',
                isExpired: 'Истек срок',
                activeIci: 'Активировать вашу систему здесь',
                activeIciBtn: 'Активировать'
              },
              confirmerCard: {
                title: 'Подтверждение',
                isConfirmer: 'Подтверждено',
                isConfirmerText: 'Ваш аккаунт подтвержден на сайте abyedh.com',
                nonConfirmer: 'Не подтверждено',
                nonConfirmerText: 'Ваш аккаунт не подтвержден на сайте abyedh.com',
                nonConfirmerBtn: 'Подтвердить'
              },
              settingCard: {
                '1': {
                  title: 'Подписка',
                  desc: 'Подписка, максимальное количество, автоподписка'
                },
                '2': {
                  title: 'Сеансы',
                  desc: 'Сеансы, расписание, участники'
                },
                '3': {
                  title: 'Оборудование',
                  desc: 'Товары, редактирование, ввод/вывод товара'
                },
                '4': {
                  title: 'Подписка',
                  desc: 'Изменение, удаление, кредит'
                },
                '5': {
                  title: 'Участники',
                  desc: 'Новые, редактирование, лояльность'
                },
                '6': {
                  title: 'Команда',
                  desc: 'Новые, присутствие, аванс'
                }
              }
            },
            paymmentPage:{
              montant:'500',
              currency:'₽',
              montantAnnuel:'Годовая сумма регистрации:',
              textOne:'Оплата производится посредством перевода через службу Moneygram  ',
              textTwo:' владельцу',
              textThree:'Телефон',
              afterFinishAlert:'После завершения перевода вы должны ввести информацию здесь:',
              nomText:'Имя, с которым отправляется платеж',
              nomPlchText:'Имя',
              montantText:'Сумма',
              montantPlchText:'Сумма',
              codeText:'Код платежа',
              codePlchText:'Код',
              phoneText:'Телефон',
              phonePlchText:'Телефон',
              posteText:'Почтовые отделения',
              postePlchText:'Почтовые отделения',
              postalCodeText:'Почтовый индекс',
              postalCodePlchText:'Почтовый индекс',
              saveBtn:'Сохранить'
            },          
            forumPage: {
              inoutPlch: 'Добавить статус здесь'
            },
            messagePage: {
              titleName: 'Сообщения',
              alertMessage: 'У вас нет сообщений'
            },
            savgarderPage: {
              selectItemsCard: {
                title: 'Сохранить ваши данные на вашем компьютере',
                itemsList: {
                  '1': 'Сохранить встречи',
                  '2': 'Сохранить предложения',
                  '3': 'Сохранить сеансы',
                  '4': 'Сохранить отчеты',
                  '5': 'Сохранить пациентов',
                  '6': 'Сохранить команду',
                  '7': 'Сохранить рецепты'
                },
                exportBtn: 'Экспорт',
                saveCopy: 'Загрузить копию'
              },
              netoyerCard: {
                title: 'Очистка нежелательных файлов на сервере',
                notoyerText: 'Общий объем файлов:',
                netoyerBtn: 'Очистить сервер'
              }
            },
            sysncroPage: {
              title: 'Обновленные таблицы',
              savingModal: 'Сохранение',
              mainCard: {
                topText: 'Щелкните кнопку для обновления ваших данных',
                bottomText: 'После обновления данных, сохраненных на интернет-сервере, вы также можете использовать приложение в автономном режиме. Будьте в курсе последних событий',
                btnText: 'Обновить'
              },
              itemsList: {
                '1': 'Встречи',
                '2': 'Сеансы',
                '3': 'Отчеты',
                '4': 'Пациенты',
                '5': 'Команда',
                '6': 'Рецепты'
              }
            },
            documentPage: {
              itemsList: {
                '1': 'Встречи',
                '2': 'Сеансы',
                '3': 'Отчеты',
                '4': 'Пациенты',
                '5': 'Команда',
                '6': 'Рецепты'
              },
              savModal: {
                title: 'Послепродажное обслуживание',
                inputPlch: 'Введите свою проблему здесь'
              }
            }
        },
        menuTabs:{
            mainPage:{
              LinksCardItems : {
                rapportNum :{
                  title:'Отчет',
                  desc:'Новый'
                },
                seanceNum :{
                  title:'Сеанс',
                  desc:'Новый'
                },
                patientNum :{
                  title:'Пациент',
                  desc:'Добавить'
                },
                ordonanceNum :{
                  title:'Рецепт',
                  desc:'Новый'
                },
                equipeNum :{
                  title:'Команда',
                  desc:'Присутствует'
                },
              },
              evolutionCard:{
                title: 'Эволюция сеансов',
              },
              tabsCard:{
                seance : {
                  tabName:'Сеансы',
                  cardTitle:'Распределение сеансов'
                },
                rdv : {
                  tabName:'Встречи',
                  cardTitle:'Распределение встреч'
                },
                patient : {
                  tabName:'Пациент',
                  cardTitle:'Распределение пациентов'
                },
              }
            },
            rdvPage: {
              calendarLink: 'Календарь',
              tabsTtems: {
                  attent: 'В ожидании',
                  seen: 'Просмотрено',
                  accepte: 'Принято',
                  refuse: 'Отклонено',
                  retarde: 'Задержано',
                  redirecte: 'Перенаправлено',
                  termine: 'Завершено',
              },
              infoBtn: 'Информация',
              tableHeaderItems: "'*','ID','Пациент', 'Прошло','Объем','Время','Состояние','Зарегистрировано?','Показать'",
              calendarCardData: {
                  searchCardTitle: 'Поиск...',
                  searchCardBtn: 'Поиск',
                  rdvToday: 'Сегодняшние встречи'
              },
              rdvInfoCardData: {
                  title: 'Встреча',
                  controlBtnCard: {
                      title: 'Управление',
                      rejectBtn: 'Отменить',
                      acceptBtn: 'Принять',
                      retardBtn: 'Задержать',
                      redirectBtn: 'Перенаправить',
                      saveBtn: 'Сохранить сеанс',
                      termineBtn: 'Завершить',
                      nonSeenBtn: 'Отметить как непросмотренное',
                  },
                  infoReqCard: {
                      title: 'Информация о встрече',
                      nameOfUser: 'Имя и фамилия',
                      wantedDate: 'Желаемая дата',
                      wantedTime: 'Желаемое время',
                      reqDay: 'Прошлый день',
                      comment: 'Комментарий',
                  },
                  infoUserCard: {
                      title: 'Информация о пациенте',
                      wantYouSaveThisUser: '',
                      name: 'Имя:',
                      phone: 'Телефон:',
                      delag: 'Делегат:',
                      gouv: 'Государство:',
                      adress: 'Адрес:',
                      saveBtn: 'Сохранить клиента',
                      stateItem: {
                          dejaEnreg: 'Уже зарегистрирован',
                          nouveaux: 'Новые пациенты'
                      },
                      statItemNames: {
                          rdv: 'Встречи',
                          ordonnace: 'Рецепты',
                          seances: 'Сеансы',
                      },
                      addUserCard: {
                          title: 'Хотите сохранить этого пациента?'
                      }
                  }
              }
            },
            seancePage:{
              tarifName:'Тариф',
              infoBtn:'Информация',
              maladieStateItems:{
                Bonne:'В хорошем состоянии',
                Malade:'Больной',
                Reanimation:'В реанимации',
                Palliatifs:'На паллиативном уходе',
                Quarantaine:'На карантине',
                Observation:'На наблюдении',
              },
              seanceInfo : {
                tabsName:{
                    diagnostique:'Диагностика',
                    analyse:'Анализы',
                    ordonance:'Рецепт',
                    info:'Информация',
                },
                analyseList:'Список анализов',
                ordonanceLit:'Список препаратов',
                ordonanceTable :{
                    No:'№',
                    Designiation:'Наименование',
                    Dosage:'Дозировка',
                    Forme:'Форма',
                    Presentation:'Представление',
                },
                infoTable :{
                    date:'Дата и время',
                    maladie:'Заболевание',
                    degree:'Степень заболевания',
                    description:'Описание заболевания',
                },
                controlBtnCard : {
                  title:'Управление',
                  modifier:'Изменить',
                  supprimer:'Удалить',
                  imprimer:'Печать рецепта',
                  suppModal:{
                    voulezVous:'Вы действительно хотите удалить эту сессию?',
                    suppBtn:'Удалить'
                  }
                },

              },
              addSeanceInfo :{
                tabsName: {
                  selectPat:'Выберите пациента',
                  diagnostique:'Введите диагноз',
                  analyse:'Пройти анализы',
                  ordonance:'Написать рецепт',
                  terminer:'Завершить результат',
                },
                selectTabsData: {
                    patientCardTitle:'Пациент',
                    btnsText:{
                      patientUID :'UID пациента',
                      scanRDV :'Сканировать прием',
                    },
                    patientInfo:{
                      Nom : 'Имя',
                      phone : 'Телефон',
                      adress : 'Адрес ',
                      nbSeance : 'Количество сеансов',
                      etatSnit : 'Состояние здоровья:',
                    },
                    leftTabs:{
                      seance:'Сеансы ',
                      rdv:'Приемы',
                      ordonance:'Рецепт',
                      tableHearder : "'*','ID ','Дата','Время','Информация'"
                    }

                },
                diagnosqtiqueTabsData: {
                  title:'Диагностика'
                },
                analyseTabsData: {
                  title:'Добавить показатель',
                  grandeurPlch:'Показатель',
                  valeurPlch:'Значение',
                  btnText:'Добавить',
                  listeText:'Список анализов'
                },
                ordonanceTabsData: {
                  title:'Добавить пункт',
                  addPlch:'Введите лекарство',
                  code:'Штрих-код :',
                  Nom:'Название :',
                  Dosage :'Дозировка :',
                  Forme :'Форма :',
                  Presentation :'Представление :',
                  modePlch:'Способ применения',
                  btnText:'Добавить',
                  listeText:'Список анализов'
                },
                terminerTabsData: {
                  maladie:' Болезнь',
                  resultat:'Результат: болезнь',
                  resultatPlch:'Болезнь',
                  date:'Дата ',
                  degre:'Степень опасности',
                  genre:'Тип сеанса',
                  pasGenre: {one:'Тип не сохранен', two:'Нажмите здесь', three:'чтобы добавить '},
                  saveBtn:'Сохранить',
                  printBtn:'Печать рецепта',
                }
              },
              editSeance :{
                editBtn:'Изменить',
                pasDordo:'Нет рецепта',
                editOrdonance: 'Вы можете изменить рецепт здесь:'
              },
              resumerCard:{
                cardTitle:'Введите период',
                rechercheBtn:'Поиск',
                tableHeader: "'*','Пациент','Болезнь','Степень','День','Время','Просмотр'",
              },
              tarifCard:{
                cardTitle:'Добавить тариф :',
                Nom:'Имя :',
                Description:'Описание:',
                Tarif:'Тариф:',
                addBtn:'Сохранить',
                infoBtn:'Информация'
              },
              tarifInfoCard:{
                prixText:'ЦЕНА',
                tarifText:'ТАРИФ',
                leftTab:{
                  seance:'Сеанс',
                  modifier:'Изменить'
                },
                seanceTableH: "'ID','Член','Дата','Время','Просмотр'",
                modifierCard:{
                  nom:'Имя',
                  tarif:'Тариф',
                  descr:'Описание',
                  modifierBtn:'Изменить'
                }
              }
            },
            patientPage: {
              assuranceText: 'Уверенность',
              infoText: 'Информация',
              addPatient: {
                nomEtPrenon: 'Имя и фамилия',
                naissance: 'Дата рождения',
                phoneNum: 'Телефон',
                location: 'Местоположение',
                gouv: 'Выберите регион',
                deleg: 'Выберите отделение',
                adresse: 'Адрес',
                saveBtn: 'Сохранить',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: 'Ввести',
                    scan: 'Сканировать'
                  },
                  title: 'Поиск в базе данных Abyedh',
                  btnText: 'Поиск',
                  clicToScan: 'Нажмите, чтобы сканировать'
                }
              },
              patientInfo: {
                mainCardText: {
                  verification: 'Проверка',
                  telephone: 'Телефон'
                },
                TabsCardText: {
                  seance: 'Сеансы',
                  ordonance: 'Рецепт',
                  rdv: 'Запись',
                  modifier: 'Изменить',
                  verifier: 'Проверить',
                  supprimer: 'Удалить'
                },
                ordoTableaHeders: "'ID','Клиент','Дата','Время','Просмотр'",
                rdvTableaHeders: "'ID','Клиент','Дата','Время','Всего','Просмотр'",
                editCard: {
                  nomEtPrenon: 'Имя и фамилия:',
                  naissance: 'Дата рождения',
                  phoneNum: 'Телефон',
                  location: 'Местоположение',
                  gouv: 'Выберите регион',
                  deleg: 'Выберите отделение',
                  adresse: 'Адрес',
                  editBtn: 'Редактировать'
                },
                verificationCard: {
                  isVerifier: 'Этот пациент проверен',
                  searchInAbyedhDB: 'Поиск в базе данных Abyedh',
                  nom: 'Имя',
                  phone: 'Телефон:',
                  gouv: 'Регион:',
                  deleg: 'Отделение:',
                  verifBtn: 'Подтвердить',
                  searchBtn: 'Поиск'
                },
                deleteCard: {
                  mainTitle: 'Вы действительно хотите удалить этого пациента?',
                  alertText: 'При удалении пациента',
                  conscOne: 'Пациент больше не будет виден в разделе "Пациенты"',
                  conscTwo: 'Все данные, связанные с этим пациентом, могут быть повреждены',
                  conscThree: 'Вы не сможете создавать счета или заказы с этим пациентом',
                  deleteBtn: 'Да, удалить'
                }
              }
            },
            ordonancePage:{
              StockText:'Склад',
              InfoBtn:'Информация',
              ordoState:{
                terminer:'Завершено',
                annule:'Отменено',
                enCours:'В процессе',
                indefinie:'Неопределено'
              },
              addOrdoPage:{
                listeText:'Список анализов',
                tabsText:{
                  enter:'Ввести',
                  dateClient:'Дата и клиенты',
                  save:'Сохранить',
                },
                enterCard: {
                  title:'Добавить элемент',
                  addPlch:'Введите лекарство',
                  code:'Штрих-код:',
                  Nom:'Название:',
                  Dosage :'Дозировка:',
                  Forme :'Форма:',
                  Presentation :'Презентация:',
                  modePlch:'Режим применения',
                  btnText:'Добавить',
                },
                dateClientCard:{
                  title: 'Дата и клиент',
                  nomClientText:'Имя:',
                  adresseClientText:'Адрес:',
                },
                finisCard:{
                  titleText:'Кнопки',
                  saveBtn:'Сохранить',
                  printBnt:'Печать'
                }
              },
              ordoInfoPage:{
                titleText:'Рецепт',
                ordoId:'ID рецепта:',
                ordoCode:'Код рецепта:',
                patientText:'Пациент:',
                dateText:'Дата:',
                TimeText:'Время:',
                tableHeader :{
                  No:'Номер',
                  Designiation:'Обозначение',
                  Dosage:'Дозировка',
                  Forme:'Форма',
                  Presentation:'Презентация',
                },
                controlBtns: {
                  title:'Управление',
                  printBtn:'Печать',
                  editBtn:'Изменить',
                  deleteBtn:'Удалить',
                  seeSeance:'Просмотр сеанса',
                }
              },
              modifierOrdoPage:{
                editBtn:'Изменить'
              },
              stockCard:{
                addCard:{
                  title:'Добавить новое лекарство',
                  enregistrerBtn:'Сохранить',
                  fermerBtn:'Закрыть'
                },
                infoCard:{
                  tabsText:{
                    info:'Информация',
                    modifier:'Изменить',
                    supprimer:'Удалить'
                  },
                  cardData:{
                    dosage:'Дозировка',
                    presentaion:'Презентация'
                  },
                  alertTer:'Вы не можете изменить или удалить это лекарство, потому что оно является общественным.',
                  deleteCard:{
                    mainTitle:'Вы уверены, что хотите удалить это лекарство?',
                    alertText:'При удалении лекарства',
                    conscOne:'Лекарство больше не будет видно в разделе "Лекарства".',
                    conscTwo:'Все данные, связанные с этим лекарством, могут быть повреждены.',
                    conscThree:'Вы не сможете обрабатывать счета или заказы с этим лекарством.',
                    deleteBtn:'Да, удалить',
                  },
                }
              }
            },
            rapportPage: {
                infoBtn: "Инфо",
                addRapport: {
                  tabsText: {
                    contenue: "Содержание",
                    terminer: "Закончить"
                  },
                  rptPlch: "Напишите здесь свой отчет |",
                  terminerCard: {
                    Titre: "Название",
                    Sujet: "Тема",
                    Date: "Дата",
                    Genre: "Жанр",
                    genreListe: {
                      1: "Общая медицина",
                      2: "Госпитализация",
                      3: "Экстренная помощь",
                      4: "Консультация",
                      5: "Оценка",
                      6: "Диагностика",
                      7: "Наблюдение",
                      8: "Медицинские исследования",
                      9: "Клинический случай",
                      10: "Медико-легальный",
                      11: "Аутопсия",
                      12: "Здравоохранение",
                      13: "Другое"
                    },
                    saveBtn: "Сохранить",
                    printBtn: "Печать отчета"
                  }
                },
                rapportInfo: {
                  titleText: "ОТЧЕТ",
                  rapportId: "ID ОТЧЕТА :",
                  rapportTitre: "НАЗВАНИЕ :",
                  sujetText: "ТЕМА :",
                  dateText: "Дата :",
                  GenreText: "ЖАНР :",
                  controlCard: {
                    title: "Управление",
                    editBtn: "Изменить",
                    printBtn: "Печать",
                    deleteBtn: "Удалить"
                  }
                },
                editRapport: {
                  editBtn: "Изменить"
                }
            },
            teamPage: {
              interfaceLinkText: 'Интерфейс RDV',
              infoBtn: 'Информация',
              addTeamPage: {
                cin: 'Карта CIN:',
                nomEtPrenom: 'Имя и фамилия:',
                phone: 'Телефон:',
                poste: 'Должность:',
                adresse: 'Адрес:',
                saveBtn: 'Сохранить',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: 'Ввести',
                    scan: 'Сканировать'
                  },
                  title: 'Поиск в базе данных Abyedh',
                  btnText: 'Поиск',
                  clicToScan: 'Нажмите, чтобы сканировать'
                }
              },
              addPoste: {
                emptyListeText: 'Добавить должности справа',
                currency: 'Д.Т.',
                cardTitle: 'Добавить должность',
                poste: 'Должность',
                salaire: 'Зарплата',
                experience: 'Требуемый опыт',
                saveBtn: 'Сохранить',
                modifierTitle: 'Изменить должность',
                modifierBtn: 'Изменить',
                supprimerModal: {
                  title: 'Удалить семью',
                  confirmText: 'Вы действительно хотите удалить эту семью?',
                  nom: 'Должность',
                  desc: 'Описание',
                  deleteBtn: 'Удалить должность'
                }
              },
              anavcePage: {
                selectMembre: 'Выбрать участника',
                membrePlch: 'Введите участника',
                montant: 'Сумма',
                montantPlch: 'Значение',
                addBtn: 'Добавить',
                tableaHeader: "'*','Имя','День', 'Значение','X'",
                deleteModal: {
                  title: 'Удалить аванс',
                  confText: 'Вы действительно хотите удалить этот аванс?',
                  valeur: ' Значение:',
                  membre: ' Участник:',
                  confirmBtn: 'Удалить'
                }
              },
              presencePage: {
                selectMembre: 'Выбрать участника',
                membrePlch: 'Введите участника',
                genre: 'Выберите жанр',
                presence: 'Присутствие',
                absance: 'Отсутствие',
                date: 'Дата',
                addBtn: 'Добавить'
              },
              teamInfoPage: {
                mainCardText: {
                  verification: 'Проверка',
                  telephone: 'Телефон',
                  notVerifier: 'Не проверено'
                },
                TabsCardText: {
                  presence: 'Присутствие',
                  avance: 'Авансы',
                  caissePWD: 'Касса PWD',
                  modifier: 'Изменить',
                  verifier: 'Проверить',
                  supprimer: 'Удалить'
                },
                presenceTableaHeders: "'ID','Клиент','День','Время','Посмотреть'",
                avanceTableaHeders: "'ID','Клиент','День','Время','Всего','Посмотреть'",
                editCard: {
                  cin: 'Карта CIN',
                  nomEtPrenon: 'Имя и фамилия:',
                  phoneNum: 'Телефон ',
                  poste: 'Должность:',
                  location: 'Геолокация ',
                  gouv: 'Выберите регион',
                  deleg: 'Выберите отделение',
                  adresse: 'Адрес',
                  editBtn: 'Редактировать',
                },
                caissePWDData: {
                  identifiant: 'Идентификатор:',
                  pwd: 'Режим пароля:',
                  smartID: 'Умный ID ',
                  editBtn: 'Редактировать',
                },
                verificationCard: {
                  isVerifier: 'Этот участник проверен',
                  searchInAbyedhDB: 'Поиск в базе данных Abyedh',
                  nom: 'Имя',
                  phone: 'Телефон:',
                  gouv: 'Gouv:',
                  deleg: 'Deleg:',
                  verifBtn: 'Проверено',
                  searchBtn: 'Поиск'
                },
                deleteCard: {
                  mainTitle: 'Вы действительно хотите удалить этого участника?',
                  alertText: 'При удалении участника',
                  conscOne: 'Участник не будет виден в разделе "Участники"',
                  conscTwo: 'Все данные, связанные с этим участником, могут быть повреждены',
                  conscThree: 'В противном случае вы не сможете создавать ни счета, ни заказы с этим участником',
                  deleteBtn: 'Да, удалить',
                },
              }
            }
            
        },
        TableHead: {
          seance: "'*','ID','Пациент','Заболевание','Степень','День','Время','Анализ','Назначение','Просмотр'",
          seance: "'*','ID','Пациент','Заболевание','Степень','День','Время','Анализ','Назначение','Просмотр'",
          facture: "'*','ID','Касса','Клиент','День','Время','Всего','Статус','Просмотр'",
          ordonance: "'*','ID','Пациент','Дата','Время','Сессия?','Статус','Просмотр'",
          seances: "'*','ID','Касса','Клиент','День','Время','Статус','Просмотр'",
          request: "'*','ID','Клиент','Дата','Таблица','Статус','X','Просмотр'",
          reservation: "'*','ID','Пациент','Прошло','Объем','Время','Статус','Записано?','Просмотр'",
          menu: "'*','Код','Название','Жанр','Стоимость','Цена продажи','X','Просмотр'",
          stock: "'*','Код','Название','Жанр','Тариф','Просмотр'",
          camion: "'*','Грузовик','Номерной знак','Водитель','Фонд','Прибыль','X','Просмотр'",
          camionStock: "'Код','Название','Жанр','Запас','Цена','Просмотр'",
          camionFacture: "'ID','Клиент','День','Всего','Просмотр'",
          camionFond: "'ID','Дата','Всего','SDF','SCF','Просмотр'",
          client: "'*','Имя','Дата рождения','Телефон','Место','Адрес','Просмотр'",
          clientCommande: "'ID','Прошло','Объем','Всего','Статус','Просмотр'",
          clientFacture: "'ID','Клиент','День','Всего','Просмотр'",
          clientFactureC: "'ID','Клиент','День','Всего','Просмотр'",
          team: "'*','Имя','Телефон','CIN','Начато','Должность','Просмотр'",
          medicammentPage: "'*','Код','Жанр','Название','Дозировка','Форма','Представление','Класс','Просмотр'",
          fournisseur: "'*','MF','Название','Телефон','Адрес','Жанр','День','Просмотр'"
        },
        BreadCrumb: {
            menuAddPlat: {
                '1': 'Меню',
                '2': 'Добавить блюдо'
            },
            menuFamille: {
                '1': 'Меню',
                '2': 'Семьи'
            },
            platInfo: {
                '1': 'Меню',
                '2': 'Информация'
            },
            forfraitInfo: {
                '1': 'Тариф',
                '2': 'Информация'
            },
            stockAddArticle: {
                '1': 'Склад',
                '2': 'Добавить товар'
            },
            stockFamille: {
                '1': 'Склад',
                '2': 'Семьи'
            },
            stockBE: {
                '1': 'Склад',
                '2': 'Поступление'
            },
            stockBS: {
                '1': 'Склад',
                '2': 'Списание'
            },
            stockInfo: {
                '1': 'Склад',
                '2': 'Информация'
            },
            factureAjouter: {
                '1': 'Сеанс',
                '2': 'Добавить сеанс'
            },
            factureInfo: {
                '1': 'Сеанс',
                '2': 'Инфо'
            },
            factureEdit: {
                '1': 'Отчет',
                '2': 'Редактировать'
            },
            factureResumer: {
                '1': 'Сеанс',
                '2': 'Резюме'
            },
            CamionAdd: {
                '1': 'Грузовик',
                '2': 'Добавить грузовик'
            },
            CamionAddFond: {
                '1': 'Грузовик',
                '2': 'Добавить фонд'
            },
            CamionFondInfo: {
                '1': 'Грузовик',
                '2': 'Информация',
                '3': 'Фонд',
                '4': 'Просмотр'
            },
            CamionEditFond: {
                '1': 'Грузовик',
                '2': 'Информация',
                '3': 'Фонд',
                '4': 'Изменить'
            },
            CamionInv: {
                '1': 'Грузовик',
                '2': 'Инвентарь грузовика'
            },
            CamionInfo: {
                '1': 'Грузовик',
                '2': 'Информация'
            },
            CamionArticleInfo: {
                '1': 'Грузовик',
                '2': 'Информация',
                '3': 'Товар'
            },
            CamionFactureInfo: {
                '1': 'Грузовик',
                '2': 'Информация',
                '3': 'Сеанс',
                '4': 'Просмотр'
            },
            ClientAdd: {
                '1': 'Клиент',
                '2': 'Добавить клиента'
            },
            ClientInfo: {
                '1': 'Клиент',
                '2': 'Информация'
            },
            ClientMap: {
                '1': 'Клиент',
                '2': 'Карта'
            },
            ClientRegion: {
                '1': 'Клиент',
                '2': 'Регионы'
            },
            RequestInfo: {
                '1': 'Встреча',
                '2': 'Информация'
            },
            RequestCalendar: {
                '1': 'Встреча',
                '2': 'Календарь'
            },
            RequestCompte: {
                '1': 'Заказы',
                '2': 'Счета'
            },
            RequestReg: {
                '1': 'Заказы',
                '2': 'Группировка'
            },
            FournisseurAdd: {
                '1': 'Поставщик',
                '2': 'Группировка'
            },
            FournisseurCalendar: {
                '1': 'Поставщик',
                '2': 'Группировка'
            },
            FournisseurSearch: {
                '1': 'Поставщик',
                '2': 'Группировка'
            },
            FournisseurInfo: {
                '1': 'Поставщик',
                '2': 'Группировка'
            },
            TeamAdd: {
                '1': 'Команда',
                '2': 'Добавить'
            },
            TeamInfo: {
                '1': 'Команда',
                '2': 'Информация'
            },
            TeamPoste: {
                '1': 'Команда',
                '2': 'Должности'
            },
            TeamDemande: {
                '1': 'Команда',
                '2': 'Запросы на работу'
            }
        },
        SubNavs: {
            request: {
                '1': 'Принято',
                '2': 'Отклонено',
                '3': 'В ожидании'
            },
            camion: {
                '1': 'Добавить рецепт'
            },
            Menu: {
                '1': 'Новый отчет'
            },
            Stock: {
                '1': 'Новый рецепт',
                '2': 'Семьи блюд',
                '3': 'Поступление товара',
                '4': 'Отпуск товара'
            },
            facture: {
                '1': 'Новая сессия',
                '2': 'Сводка'
            },
            client: {
                '1': 'Новый пациент'
            },
            Commande: {
                '1': 'Счета',
                '2': 'Календарь'
            },
            Fournisseur: {
                '1': 'Новый поставщик',
                '2': 'Календарь',
                '3': 'Поиск'
            },
            Equipe: {
                '1': 'Новый участник',
                '2': 'Позиция',
                '3': 'Продвинутый',
                '4': 'Присутствие'
            }
        }
    },
}
export default RussiaTrans