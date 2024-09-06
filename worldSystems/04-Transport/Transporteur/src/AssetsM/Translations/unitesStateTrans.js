const USTrans = {
    translation : {
        menusAndTabsName:{
            leftBar: {
                profile: "Profile",
                parametre: "Parameters",
                forum: "Forum",
                message: "Messages",
                sauvgarder: "Save",
                syncro: "Synchronization",
                documentation: "Documentation",
                deconextion: "Disconnection"
            },
            topBar: {
                ma: 'Home',
                rq: 'Requests',
                op: 'Operations',
                sk: 'Stock',
                cm: 'Cars',
                cl: 'Clients',
                tm: 'Team',
            },
            alternativeLink :{
              1 :{
                title:'Appointment',
                descrip:'Interface for managing appointments'
              },
              2 :{
                title:'Calendar',
                descrip:'Interface for the calendar'
              },
          }
        },
        communUsed:{
            logInPage:{
              connectionTitle:'Connection:',
              identifiant:'Identification',
              pwd:'Password',
              logInBtn:'Login',
              inscrireLink:'Sign Up',
              downloadBtn:'Download the System on your PC',
              toast:{
                addIdentif:'Enter an Identification!',
                addPwd:'Enter the password!',
                successLog:'Logged in!',
                notfound:'Error, please try again!',
              }
            },
            profilePage: {
              mainTitle: 'Profile',
              numAvis: 'Reviews',
              numLikes: 'Likes',
              profileLinkBtn: 'Profile',
              menuTabList: {
                generalEdit: 'Edit',
                pwdEdit: 'Password',
                horaireEdit: 'Schedule',
                positionEdit: 'Position',
                imagesEdit: 'Images',
                avisShow: 'Reviews',
                printPromote: 'Print'
              },
              generalEditData: {
                title: 'General Information',
                name: 'Name',
                phone: 'Phone',
                location: 'Geolocation',
                gouv: 'Select a region',
                deleg: 'Select a department',
                adress: 'Address',
                genre: 'Gender',
                editBtn: 'Edit'
              },
              pwdEditData: {
                title: 'Change Password',
                identifiant: 'Username',
                pwd: 'Password',
                editBtn: 'Edit'
              },
              horaireEditData: {},
              positionEditData: {},
              imagesEditData: {
                noPhoto: 'You have no images',
                clicToAdd: 'Click to Upload Images'
              },
              avisShowData: {},
              printPromoteData: {}
            },
            settingPage: {
              title: 'General Settings',
              activationCard: {
                title: 'Activation',
                jour: 'Day',
                isActivated: 'Activated',
                isExpired: 'Expired',
                activeIci: 'Activate your system here',
                activeIciBtn: 'Activate'
              },
              confirmerCard: {
                title: 'Confirmation',
                isConfirmer: 'Confirmed',
                isConfirmerText: 'Your account is confirmed on abyedh.com',
                nonConfirmer: 'Not Confirmed',
                nonConfirmerText: 'Your account is not confirmed on abyedh.com',
                nonConfirmerBtn: 'Confirm'
              },
              settingCard: {
                '1': {
                  title: 'Subscription',
                  desc: 'Subscription, Maximum Number, Auto-Subscription'
                },
                '2': {
                  title: 'Sessions',
                  desc: 'Sessions, Schedule, Members'
                },
                '3': {
                  title: 'Equipment',
                  desc: 'Items, Modify, In/Out Records'
                },
                '4': {
                  title: 'Subscription',
                  desc: 'Modification, Deletion, Credit'
                },
                '5': {
                  title: 'Members',
                  desc: 'New, Modify, Loyalty'
                },
                '6': {
                  title: 'Team',
                  desc: 'New, Presence, Advance'
                }
              }
            },
            paymmentPage:{
              montant:'500',
              currency:'$',
              montantAnnuel:'Annual registration amount:',
              textOne:'Payment is made through a transfer via Moneygram service',
              textTwo:' to the owner',
              textThree:'Telephone',
              afterFinishAlert:'After completing the transfer, you must enter the information here:',
              nomText:'The name with which to send the payment',
              nomPlchText:'Name',
              montantText:'Amount',
              montantPlchText:'Amount',
              codeText:'Payment code',
              codePlchText:'Code',
              phoneText:'Telephone',
              phonePlchText:'Telephone',
              posteText:'Post Offices',
              postePlchText:'Post Offices',
              postalCodeText:'Postal Code',
              postalCodePlchText:'Postal Code',
              saveBtn:'Save'
            },          
            forumPage: {
              inoutPlch: 'Add Status Here'
            },
            messagePage: {
              titleName: 'Messages',
              alertMessage: 'You have no messages'
            },
            savgarderPage: {
              selectItemsCard: {
                title: 'Save Your Data on Your Computer',
                itemsList: {
                  '1': 'Save Appointments',
                  '2': 'Save Offers',
                  '3': 'Save Sessions',
                  '4': 'Save Reports',
                  '5': 'Save Patients',
                  '6': 'Save Team',
                  '7': 'Save Prescriptions'
                },
                exportBtn: 'Export',
                saveCopy: 'Download Copy'
              },
              netoyerCard: {
                title: 'Cleaning Unwanted Files on the Server',
                notoyerText: 'Total volume of files:',
                netoyerBtn: 'Clean Server'
              }
            },
            sysncroPage: {
              title: 'Keep Tables Updated',
              savingModal: 'Saving',
              mainCard: {
                topText: 'Click the button to update your data',
                bottomText: 'When you update the data stored on the internet server, you can also use your application in Offline mode, always stay updated',
                btnText: 'Update'
              },
              itemsList: {
                '1': 'Appointments',
                '2': 'Sessions',
                '3': 'Reports',
                '4': 'Patients',
                '5': 'Team',
                '6': 'Prescriptions'
              }
            },
            documentPage: {
              itemsList: {
                '1': 'Appointments',
                '2': 'Sessions',
                '3': 'Reports',
                '4': 'Patients',
                '5': 'Team',
                '6': 'Prescriptions'
              },
              savModal: {
                title: 'After Sales Service',
                inputPlch: 'Enter Your Issue Here'
              }
            }
        },
        menuTabs:{
            mainPage:{
              LinksCardItems : {
                rapportNum :{
                  title:'Report',
                  desc:'New'
                },
                seanceNum :{
                  title:'Session',
                  desc:'New'
                },
                patientNum :{
                  title:'Patient',
                  desc:'Add'
                },
                ordonanceNum :{
                  title:'Prescription',
                  desc:'New'
                },
                equipeNum :{
                  title:'Team',
                  desc:'Present'
                },
              },
              evolutionCard:{
                title: 'Session Evolution',
              },
              tabsCard:{
                seance : {
                  tabName:'Sessions',
                  cardTitle:'Distribution of Sessions'
                },
                rdv : {
                  tabName:'Appointments',
                  cardTitle:'Distribution of Appointments'
                },
                patient : {
                  tabName:'Patient',
                  cardTitle:'Distribution of Patients'
                },
              }
            },
            rdvPage: {
              calendarLink: 'Calendar',
              tabsTtems: {
                  attent: 'Pending',
                  seen: 'Seen',
                  accepte: 'Accepted',
                  refuse: 'Refused',
                  retarde: 'Delayed',
                  redirecte: 'Redirected',
                  termine: 'Completed',
              },
              infoBtn: 'Info',
              tableHeaderItems: "'*','ID','Patient', 'Past','Volume','Time','State','Recorded?','View'",
              calendarCardData: {
                  searchCardTitle: 'Search...',
                  searchCardBtn: 'Search',
                  rdvToday: 'Today\'s Appointments'
              },
              rdvInfoCardData: {
                  title: 'Appointment',
                  controlBtnCard: {
                      title: 'Control',
                      rejectBtn: 'Cancel',
                      acceptBtn: 'Accept',
                      retardBtn: 'Delay',
                      redirectBtn: 'Redirect',
                      saveBtn: 'Save Session',
                      termineBtn: 'Finish',
                      nonSeenBtn: 'Mark as Unseen',
                  },
                  infoReqCard: {
                      title: 'Appointment Information',
                      nameOfUser: 'Name and Surname',
                      wantedDate: 'Desired Date',
                      wantedTime: 'Desired Time',
                      reqDay: 'Past Day',
                      comment: 'Comment',
                  },
                  infoUserCard: {
                      title: 'Patient Information',
                      wantYouSaveThisUser: '',
                      name: 'Name:',
                      phone: 'Phone:',
                      delag: 'Delegate:',
                      gouv: 'Government:',
                      adress: 'Address:',
                      saveBtn: 'Save Customer',
                      stateItem: {
                          dejaEnreg: 'Already Recorded',
                          nouveaux: 'New Patients'
                      },
                      statItemNames: {
                          rdv: 'Appointments',
                          ordonnace: 'Prescriptions',
                          seances: 'Sessions',
                      },
                      addUserCard: {
                          title: 'Do you want to save this patient?'
                      }
                  }
              }
            },
            seancePage:{
              tarifName:'Tariff',
              infoBtn:'Information',
              maladieStateItems:{
                Bonne:'In Good Condition',
                Malade:'Sick',
                Reanimation:'In Reanimation',
                Palliatifs:'In Palliative Care',
                Quarantaine:'In Quarantine',
                Observation:'Under Observation',
              },
              seanceInfo : {
                tabsName:{
                    diagnostique:'Diagnosis',
                    analyse:'Analyses',
                    ordonance:'Prescription',
                    info:'Information',
                },
                analyseList:'Analysis List',
                ordonanceLit:'Medication List',
                ordonanceTable :{
                    No:'No',
                    Designiation:'Designation',
                    Dosage:'Dosage',
                    Forme:'Form',
                    Presentation:'Presentation',
                },
                infoTable :{
                    date:'Date & Time',
                    maladie:'Disease',
                    degree:'Disease Degree',
                    description:'Disease Description',
                },
                controlBtnCard : {
                  title:'Control',
                  modifier:'Modify',
                  supprimer:'Delete',
                  imprimer:'Print Prescription',
                  suppModal:{
                    voulezVous:'Do you really want to delete this session?',
                    suppBtn:'Delete'
                  }
                },

              },
              addSeanceInfo :{
                tabsName: {
                  selectPat:'Select Patient',
                  diagnostique:'Enter Diagnosis',
                  analyse:'Perform Analyses',
                  ordonance:'Write Prescription',
                  terminer:'Finish Result',
                },
                selectTabsData: {
                    patientCardTitle:'Patient',
                    btnsText:{
                      patientUID :'Patient UID',
                      scanRDV :'Scan Appointment',
                    },
                    patientInfo:{
                      Nom : 'Name',
                      phone : 'Phone',
                      adress : 'Address ',
                      nbSeance : 'Number of Sessions',
                      etatSnit : 'Health Status:',
                    },
                    leftTabs:{
                      seance:'Sessions ',
                      rdv:'Appointments',
                      ordonance:'Prescription',
                      tableHearder : "'*','ID ','Date','Time','Info'"
                    }

                },
                diagnosqtiqueTabsData: {
                  title:'Diagnosis'
                },
                analyseTabsData: {
                  title:'Add Measurement',
                  grandeurPlch:'Measurement',
                  valeurPlch:'Value',
                  btnText:'Add',
                  listeText:'Analysis List'
                },
                ordonanceTabsData: {
                  title:'Add Item',
                  addPlch:'Enter Medication',
                  code:'Barcode :',
                  Nom:'Name :',
                  Dosage :'Dosage :',
                  Forme :'Form :',
                  Presentation :'Presentation :',
                  modePlch:'Mode of Use',
                  btnText:'Add',
                  listeText:'Analysis List'
                },
                terminerTabsData: {
                  maladie:' Disease',
                  resultat:'Result: Disease',
                  resultatPlch:'Disease',
                  date:'Date ',
                  degre:'Degree of Danger',
                  genre:'Session Genre',
                  pasGenre: {one:'No Genre Recorded', two:'Click Here', three:'To Add'},
                  saveBtn:'Save',
                  printBtn:'Print Prescription',
                }
              },
              editSeance :{
                editBtn:'Edit',
                pasDordo:'No Prescription',
                editOrdonance: 'You Can Edit Prescription Here:'
              },
              resumerCard:{
                cardTitle:'Enter a Period',
                rechercheBtn:'Search',
                tableHeader: "'*','Patient','Disease','Degree','Day','Time','View'",
              },
              tarifCard:{
                cardTitle:'Add Tariff:',
                Nom:'Name:',
                Description:'Description:',
                Tarif:'Tariff:',
                addBtn:'Save',
                infoBtn:'Information'
              },
              tarifInfoCard:{
                prixText:'PRICE',
                tarifText:'TARIFF',
                leftTab:{
                  seance:'Session',
                  modifier:'Modify'
                },
                seanceTableH: "'ID','Member','Date','Time','View'",
                modifierCard:{
                  nom:'Name',
                  tarif:'Tariff',
                  descr:'Description',
                  modifierBtn:'Modify'
                }
              }
            },
            patientPage: {
              assuranceText: 'Confidence',
              infoText: 'Information',
              addPatient: {
                nomEtPrenon: 'Name and Surname',
                naissance: 'Date of Birth',
                phoneNum: 'Phone',
                location: 'Location',
                gouv: 'Select Region',
                deleg: 'Select Department',
                adresse: 'Address',
                saveBtn: 'Save',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: 'Enter',
                    scan: 'Scan'
                  },
                  title: 'Search in Abyedh Database',
                  btnText: 'Search',
                  clicToScan: 'Click to Scan'
                }
              },
              patientInfo: {
                mainCardText: {
                  verification: 'Verification',
                  telephone: 'Phone'
                },
                TabsCardText: {
                  seance: 'Sessions',
                  ordonance: 'Prescription',
                  rdv: 'Appointment',
                  modifier: 'Edit',
                  verifier: 'Verify',
                  supprimer: 'Delete'
                },
                ordoTableaHeders: "'ID','Client','Date','Time','View'",
                rdvTableaHeders: "'ID','Client','Date','Time','Total','View'",
                editCard: {
                  nomEtPrenon: 'Name and Surname:',
                  naissance: 'Date of Birth',
                  phoneNum: 'Phone',
                  location: 'Location',
                  gouv: 'Select Region',
                  deleg: 'Select Department',
                  adresse: 'Address',
                  editBtn: 'Edit'
                },
                verificationCard: {
                  isVerifier: 'This Patient is Verified',
                  searchInAbyedhDB: 'Search in Abyedh Database',
                  nom: 'Name',
                  phone: 'Phone:',
                  gouv: 'Region:',
                  deleg: 'Department:',
                  verifBtn: 'Verify',
                  searchBtn: 'Search'
                },
                deleteCard: {
                  mainTitle: 'Do You Really Want to Delete This Patient?',
                  alertText: 'When You Delete a Patient',
                  conscOne: 'The Patient will no longer be visible in the "Patients" branch',
                  conscTwo: 'All data related to this Patient may be damaged',
                  conscThree: 'You will not be able to create invoices or orders with this Patient anymore',
                  deleteBtn: 'Yes, Delete'
                }
              }
            },
            ordonancePage:{
              StockText:'Stock',
              InfoBtn:'Info',
              ordoState:{
                terminer:'Completed',
                annule:'Cancelled',
                enCours:'In Progress',
                indefinie:'Undefined'
              },
              addOrdoPage:{
                listeText:'Analysis Lists',
                tabsText:{
                  enter:'Enter',
                  dateClient:'Date & Clients',
                  save:'Save',
                },
                enterCard: {
                  title:'Add Item',
                  addPlch:'Enter Medicine',
                  code:'Barcode:',
                  Nom:'Name:',
                  Dosage :'Dosage:',
                  Forme :'Form:',
                  Presentation :'Presentation:',
                  modePlch:'Instructions for Use',
                  btnText:'Add',
                },
                dateClientCard:{
                  title: 'Date & Client',
                  nomClientText:'Name:',
                  adresseClientText:'Address:',
                },
                finisCard:{
                  titleText:'Buttons',
                  saveBtn:'Save',
                  printBnt:'Print'
                }
              },
              ordoInfoPage:{
                titleText:'PRESCRIPTION',
                ordoId:'PRESCRIPTION ID:',
                ordoCode:'PRESCRIPTION CODE:',
                patientText:'PATIENT:',
                dateText:'Date:',
                TimeText:'Time:',
                tableHeader :{
                  No:'No',
                  Designiation:'Designation',
                  Dosage:'Dosage',
                  Forme:'Form',
                  Presentation:'Presentation',
                },
                controlBtns: {
                  title:'Control',
                  printBtn:'Print',
                  editBtn:'Edit',
                  deleteBtn:'Delete',
                  seeSeance:'See Session',
                }
              },
              modifierOrdoPage:{
                editBtn:'Edit'
              },
              stockCard:{
                addCard:{
                  title:'Add New Medicine',
                  enregistrerBtn:'Save',
                  fermerBtn:'Close'
                },
                infoCard:{
                  tabsText:{
                    info:'Info',
                    modifier:'Modify',
                    supprimer:'Delete'
                  },
                  cardData:{
                    dosage:'Dosage',
                    presentaion:'Presentation'
                  },
                  alertTer:'You cannot edit or delete this medicine because it is a public medicine.',
                  deleteCard:{
                    mainTitle:'Are you sure you want to delete this medicine?',
                    alertText:'When deleting a medicine',
                    conscOne:'The medicine will no longer be visible in the "Medicines" branch.',
                    conscTwo:'All data associated with this medicine may be damaged.',
                    conscThree:'You will not be able to process invoices or orders with this medicine.',
                    deleteBtn:'Yes, delete',
                  },
                }
              }
            },
            rapportPage: {
                infoBtn: "Information",
                addRapport: {
                  tabsText: {
                    contenue: "Content",
                    terminer: "Finish"
                  },
                  rptPlch: "Write your report here |",
                  terminerCard: {
                    Titre: "Title",
                    Sujet: "Subject",
                    Date: "Date",
                    Genre: "Genre",
                    genreListe: {
                      1: "General Medicine",
                      2: "Hospitalization",
                      3: "Emergency",
                      4: "Consultation",
                      5: "Evaluation",
                      6: "Diagnosis",
                      7: "Follow-up",
                      8: "Medical Research",
                      9: "Case Study",
                      10: "Medico-Legal",
                      11: "Autopsy",
                      12: "Public Health",
                      13: "Other"
                    },
                    saveBtn: "Save",
                    printBtn: "Print Report"
                  }
                },
                rapportInfo: {
                  titleText: "REPORT",
                  rapportId: "REPORT ID :",
                  rapportTitre: "TITLE :",
                  sujetText: "SUBJECT :",
                  dateText: "Date :",
                  GenreText: "GENRE :",
                  controlCard: {
                    title: "Control",
                    editBtn: "Edit",
                    printBtn: "Print",
                    deleteBtn: "Delete"
                  }
                },
                editRapport: {
                  editBtn: "Edit"
                }
            },
            teamPage: {
              interfaceLinkText: 'Interface RDV',
              infoBtn: 'Info',
              addTeamPage: {
                cin: 'CIN Card:',
                nomEtPrenom: 'Name And Surname:',
                phone: 'Telephone:',
                poste: 'Position:',
                adresse: 'Address:',
                saveBtn: 'Save',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: 'Enter',
                    scan: 'Scan'
                  },
                  title: 'Search In Abyedh Database',
                  btnText: 'Search',
                  clicToScan: 'Click to scan'
                }
              },
              addPoste: {
                emptyListeText: 'Add Poste to right',
                currency: 'D.T',
                cardTitle: 'Add Poste',
                poste: 'Position',
                salaire: 'Salary',
                experience: 'Required Experience',
                saveBtn: 'Save',
                modifierTitle: 'Modify Poste',
                modifierBtn: 'Modify',
                supprimerModal: {
                  title: 'Delete Family',
                  confirmText: 'Do you really want to delete this family?',
                  nom: 'Poste',
                  desc: 'Description',
                  deleteBtn: 'Delete Poste'
                }
              },
              anavcePage: {
                selectMembre: 'Select Member',
                membrePlch: 'Enter Member',
                montant: 'Amount',
                montantPlch: 'Value',
                addBtn: 'Add',
                tableaHeader: "'*','Name','Day', 'Value','X'",
                deleteModal: {
                  title: 'Delete Advance',
                  confText: 'Do you really want to delete this advance?',
                  valeur: ' Value:',
                  membre: ' Member:',
                  confirmBtn: 'Delete'
                }
              },
              presencePage: {
                selectMembre: 'Select Member',
                membrePlch: 'Enter Member',
                genre: 'Select Genre',
                presence: 'Presence',
                absance: 'Absance',
                date: 'Date',
                addBtn: 'Add'
              },
              teamInfoPage: {
                mainCardText: {
                  verification: 'Verification',
                  telephone: 'Telephone',
                  notVerifier: 'Not Verified'
                },
                TabsCardText: {
                  presence: 'Presence',
                  avance: 'Advances',
                  caissePWD: 'Cash PWD',
                  modifier: 'Modify',
                  verifier: 'Verification',
                  supprimer: 'Delete'
                },
                presenceTableaHeders: "'ID','Client','Day','Time','View'",
                avanceTableaHeders: "'ID','Client','Day','Time','Total','View'",
                editCard: {
                  cin: 'CIN Card',
                  nomEtPrenon: 'Name And Surname:',
                  phoneNum: 'Telephone ',
                  poste: 'Position:',
                  location: 'Geolocation ',
                  gouv: 'Select Region',
                  deleg: 'Select Department',
                  adresse: 'Address',
                  editBtn: 'Edit',
                },
                caissePWDData: {
                  identifiant: 'Identifier:',
                  pwd: 'Password Mode:',
                  smartID: 'Smart ID ',
                  editBtn: 'Edit',
                },
                verificationCard: {
                  isVerifier: 'This Member is Verified',
                  searchInAbyedhDB: 'Search In Abyedh Database',
                  nom: 'Name',
                  phone: 'Phone:',
                  gouv: 'Gouv:',
                  deleg: 'Deleg:',
                  verifBtn: 'Verified',
                  searchBtn: 'Search'
                },
                deleteCard: {
                  mainTitle: 'Do you really want to delete this Member?',
                  alertText: 'When You Delete A Member',
                  conscOne: 'The Member will not be visible in the "Members" branch',
                  conscTwo: 'All data related to this Member may be damaged',
                  conscThree: 'You cannot issue invoices or orders with this Member otherwise',
                  deleteBtn: 'Yes, Delete',
                },
              }
            }
        },
        TableHead: {
          seance: "'*','ID','Patient','Disease','Degree','Day','Time','Analysis','Prescription','View'",
          seance: "'*','ID','Patient','Disease','Degree','Day','Time','Analysis','Prescription','View'",
          facture: "'*','ID','Cashier','Client','Day','Time','Total','Status','View'",
          ordonance: "'*','ID','Patient','Date','Time','Session?','Status','View'",
          seances: "'*','ID','Cashier','Client','Day','Time','Status','View'",
          request: "'*','ID','Client','Date','Table','Status','X','View'",
          reservation: "'*','ID','Patient','Past','Volume','Time','Status','Recorded?','View'",
          menu: "'*','Code','Name','Genre','Cost','Sale Price','X','View'",
          stock: "'*','Code','Name','Genre','Rate','View'",
          camion: "'*','Truck','Plate Number','Driver','Fund','Receipt','X','View'",
          camionStock: "'Code','Name','Genre','Stock','Price','View'",
          camionFacture: "'ID','Client','Day','Total','View'",
          camionFond: "'ID','Date','Total','SDF','SCF','View'",
          client: "'*','Name','Birthdate','Phone','Location','Address','View'",
          clientCommande: "'ID','Past','Volume','Total','Status','View'",
          clientFacture: "'ID','Client','Day','Total','View'",
          clientFactureC: "'ID','Client','Day','Total','View'",
          team: "'*','Name','Phone','CIN','Started','Position','View'",
          medicammentPage: "'*','Code','Genre','Name','Dosage','Form','Presentation','Class','View'",
          fournisseur: "'*','MF','Name','Phone','Address','Genre','Day','View'"
        },
        BreadCrumb: {
            menuAddPlat: {
                '1': 'Menu',
                '2': 'Add Dish'
            },
            menuFamille: {
                '1': 'Menu',
                '2': 'Families'
            },
            platInfo: {
                '1': 'Menu',
                '2': 'Information'
            },
            forfraitInfo: {
                '1': 'Rate',
                '2': 'Information'
            },
            stockAddArticle: {
                '1': 'Stock',
                '2': 'Add Article'
            },
            stockFamille: {
                '1': 'Stock',
                '2': 'Families'
            },
            stockBE: {
                '1': 'Stock',
                '2': 'Incoming Goods'
            },
            stockBS: {
                '1': 'Stock',
                '2': 'Outgoing Goods'
            },
            stockInfo: {
                '1': 'Stock',
                '2': 'Information'
            },
            factureAjouter: {
                '1': 'Session',
                '2': 'Add Session'
            },
            factureInfo: {
                '1': 'Session',
                '2': 'Info'
            },
            factureEdit: {
                '1': 'Report',
                '2': 'Edit'
            },
            factureResumer: {
                '1': 'Session',
                '2': 'Summary'
            },
            CamionAdd: {
                '1': 'Truck',
                '2': 'Add Truck'
            },
            CamionAddFond: {
                '1': 'Truck',
                '2': 'Add Fund'
            },
            CamionFondInfo: {
                '1': 'Truck',
                '2': 'Info',
                '3': 'Fund',
                '4': 'View'
            },
            CamionEditFond: {
                '1': 'Truck',
                '2': 'Info',
                '3': 'Fund',
                '4': 'Edit'
            },
            CamionInv: {
                '1': 'Truck',
                '2': 'Truck Inventory'
            },
            CamionInfo: {
                '1': 'Truck',
                '2': 'Information'
            },
            CamionArticleInfo: {
                '1': 'Truck',
                '2': 'Information',
                '3': 'Article'
            },
            CamionFactureInfo: {
                '1': 'Truck',
                '2': 'Information',
                '3': 'Session',
                '4': 'View'
            },
            ClientAdd: {
                '1': 'Client',
                '2': 'Add Client'
            },
            ClientInfo: {
                '1': 'Client',
                '2': 'Info'
            },
            ClientMap: {
                '1': 'Client',
                '2': 'Map'
            },
            ClientRegion: {
                '1': 'Client',
                '2': 'Regions'
            },
            RequestInfo: {
                '1': 'Appointment',
                '2': 'Info'
            },
            RequestCalendar: {
                '1': 'Appointment',
                '2': 'Calendar'
            },
            RequestCompte: {
                '1': 'Orders',
                '2': 'Accounts'
            },
            RequestReg: {
                '1': 'Orders',
                '2': 'Grouping'
            },
            FournisseurAdd: {
                '1': 'Supplier',
                '2': 'Grouping'
            },
            FournisseurCalendar: {
                '1': 'Supplier',
                '2': 'Grouping'
            },
            FournisseurSearch: {
                '1': 'Supplier',
                '2': 'Grouping'
            },
            FournisseurInfo: {
                '1': 'Supplier',
                '2': 'Grouping'
            },
            TeamAdd: {
                '1': 'Team',
                '2': 'Add'
            },
            TeamInfo: {
                '1': 'Team',
                '2': 'Info'
            },
            TeamPoste: {
                '1': 'Team',
                '2': 'Positions'
            },
            TeamDemande: {
                '1': 'Team',
                '2': 'Job Requests'
            }
        },
        SubNavs: {
            request: {
                '1': 'Accepted',
                '2': 'Rejected',
                '3': 'Pending'
            },
            camion: {
                '1': 'Add Prescription'
            },
            Menu: {
                '1': 'New Report'
            },
            Stock: {
                '1': 'New Prescription',
                '2': 'Food Families',
                '3': 'Incoming Goods',
                '4': 'Outgoing Goods'
            },
            facture: {
                '1': 'New Session',
                '2': 'Summary'
            },
            client: {
                '1': 'New Patient'
            },
            Commande: {
                '1': 'Accounts',
                '2': 'Calendar'
            },
            Fournisseur: {
                '1': 'New Supplier',
                '2': 'Calendar',
                '3': 'Search'
            },
            Equipe: {
                '1': 'New Member',
                '2': 'Position',
                '3': 'Advanced',
                '4': 'Presence'
            }
        }
    },
}
export default USTrans