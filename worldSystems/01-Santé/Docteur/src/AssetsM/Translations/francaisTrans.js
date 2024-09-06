const FrancaisTrans = {
      translation : {
        menusAndTabsName:{
            leftBar:{
                profile:'Profile',
                parametre:'Paramétre',
                forum:'Forum',
                message:'Messages',
                sauvgarder:'Sauvegarder',
                syncro:'Syncronisation',
                documentation:'Documentation',
                deconextion:'Déconnextion'
            },
            topBar:{
                ma:'Acceuil',
                rq:'Rendy-Vous',
                sa:'Seances',
                pt:'Patient',
                or:'Ordonance',
                rp:'Rapport',
                tm:'Equipe',
            },
            alternativeLink :{
                1 :{
                  title:'Rendy-Vous',
                  descrip:'Interface Pour Gerer Les Rendy-Vous'
                },
                2 :{
                  title:'Calendrier',
                  descrip:'Interface Pour La Calendrier'
                },
            }
        },
        communUsed:{
            logInPage:{
              connectionTitle:'Connexion :',
              identifiant:'Identification',
              pwd:'Mot DP',
              logInBtn:'Connextion',
              inscrireLink:'Inscriez vous',
              downloadBtn:'Telecharger le System sur votre PC',
              logInBtn:'Connextion',
              toast:{
                addIdentif:'Entrer Un identifiant !',
                addPwd:'Entrer Le mot DP  !',
                successLog:'Connecteé !',
                notfound:'Erreur esseyez de nouveaux !',
              }
            },
            profilePage:{
              mainTitle:'Profile',
              numAvis:'Avis',
              numLikes:'J\'aimes',
              profileLinkBtn:'Profile',
              menuTabList:{
                generalEdit:'Modifier',
                pwdEdit:'MDP',
                horaireEdit:'Horaire',
                positionEdit:'Position',
                imagesEdit:'Images',
                avisShow:'Avis',
                printPromote:'Imprimer',
              },
              generalEditData:{
                title:'Information Génerale',
                name:'Nom et Prenon',
                phone:'Telephone',
                location:'Geolocation',
                gouv:'Selectionnez un region',
                deleg:'Selectionnez un departemment',
                adress:'Adresse',
                genre:'Genre',
                editBtn:'Modifier'
              },
              pwdEditData:{
                title:'Modification de la mot de passe',
                identifiant:'Identifiant',
                pwd:'Mot de passe',
                editBtn:'Modifier'
              },
              horaireEditData:{},
              positionEditData:{},
              imagesEditData:{
                noPhoto:'Vous n\'avait pas d\'images',
                clicToAdd:'Cliquer Pour Charger des Imgaes'
              },
              avisShowData:{},
              printPromoteData:{},
            },
            settingPage:{
              title:'Paramétre Generale',
              activationCard:{
                title:'Activation',
                jour:'Jour',
                isActivated:'Activée',
                isExpired:'Expiré',
                activeIci:'Activer Votre system ici',
                activeIciBtn:'Activer'
              },
              confirmerCard:{
                title:'Confirmation',
                isConfirmer:'Confirmé',
                isConfirmerText:'Votre Compte est Confirmé sur l\'aunnaire du abyedh.com',
                nonConfirmer:'Non Confirmé',
                nonConfirmerText:'Votre Compte n\'est Confirmé sur l\'aunnaire du abyedh.tn',
                nonConfirmerBtn:'Confirmer',

              },
              settingCard:{
                1: {
                  title:'Souscription',
                  desc:'Souscription , Nombre Maximele , Auto-Abonnemment '
                },
                2: {
                  title:'Seances',
                  desc:'Seances, Horaire , Membres'
                },
                3: {
                  title:'Equippement',
                  desc:'Articles , Modifier , Bon Entre/Sortie'
                },
                4: {
                  title:'Abonnemment',
                  desc:'Modification , Suppresssion , Credit'
                },
                5: {
                  title:'Membres',
                  desc:'Nouveaux , Modifier , Fidelité'
                },
                6: {
                  title:'Equipe',
                  desc:'Nouveaux , Presence , Avance'
                },

              },
            },
            paymmentPage:{
              montant:'500',
              currency:'€',
              montantAnnuel:'Montant d\'inscription annuel :',
              textOne:'Le paiement se fait par un virement a travers le Service Moneygram',
              textTwo:' vers le propritaire',
              textThree:'Telephone',
              afterFinishAlert:'Après avoir terminer le virement vous devez entrer les information ici : ',
              nomText:'Le non avec lequel envoyer le mondat',
              nomPlchText:'Nom',
              montantText:'Montant',
              montantPlchText:'Montant',
              codeText:'Code mondat',
              codePlchText:'code',
              phoneText:' Telephone',
              phonePlchText:' Telephone',
              posteText:'Bureaux de Poste',
              postePlchText:'Bureaux de Poste',
              postalCodeText:'Code Postale',
              postalCodePlchText:'Code Postale',
              saveBtn:'Enregistrer'
            },
            confirmPage:{},
            forumPage:{
              inoutPlch:'Ajouter Status Ici'
            },
            messagePage:{
              titleName:'Messages',
              alertMessage:'Vous n\'avez pas de messages',
            },
            savgarderPage:{
              selectItemsCard:{
                title:'Sauvegarder Vos Donneé Sur Votre Ordonateur ',
                itemsList:{
                  1:'Sauvgarder les Rendy-Vous',
                  2:'Sauvgarder les Offres',
                  3:'Sauvgarder les Seances',
                  4:'Sauvgarder les Rapports',
                  5:'Sauvgarder les Patients',
                  6:'Sauvgarder l\'equipe',
                  7:'Sauvgarder les Ordonances',
                },
                exportBtn:'Export',
                saveCopy:'Telecharger Copie'
              },
              netoyerCard:{
                title:'Nettoyage des ficher indeésirable sur le serveur',
                notoyerText:'Totale des volume des ficher est :',
                netoyerBtn:'Nettoyer le serveur'
              }
            },
            sysncroPage:{
              title:' Tableaux a jour',
              savingModal:'Enregistremment',
              mainCard:{
                topText:'Cliquer sur le botton pour mettre à jour vos donneé',
                bottomText:'lorsque vous mettre a jour les données enregistré sur le serveur internet vous pourrait egalemment utiliser votre appplication en mode  Offline, soiyer toujour à jour',
                btnText:'Mettre à Jour'
              },
              itemsList:{
                1:'Rendy-Vous',
                2:'Seances',
                3:'Rapports',
                4:'Patients',
                5:'Equipe',
                6:'Ordonances',
              },
            },
            documentPage :{
              itemsList:{
                1:'Rendy-Vous',
                2:'Seances',
                3:'Rapports',
                4:'Patients',
                5:'Equipe',
                6:'Ordonances',
              },
              savModal:{
                title:'Service Apres Vente',
                inputPlch:'Poser Votre Probléme Ici'
              }
            }
        },
        menuTabs:{
            mainPage:{
              LinksCardItems : {
                rapportNum :{
                  title:'Rapport',
                  desc:'Nouveaux'
                },
                seanceNum :{
                  title:'Seance',
                  desc:'Nouveaux'
                },
                patientNum :{
                  title:'Patient',
                  desc:'Ajouter'
                },
                ordonanceNum :{
                  title:'Ordonance',
                  desc:'Nouveaux'
                },
                equipeNum :{
                  title:'Equipe',
                  desc:'Presence'
                },
                 
              },
              evolutionCard:{
                title: 'Evolution des Seances',
              },
              tabsCard:{
                seance : {
                  tabName:'Seances',
                  cardTitle:'Distrubition des Seances'
                },
                rdv : {
                  tabName:'Rendy_Vous',
                  cardTitle:'Distrubition des Rendy-Vous'
                },
                patient : {
                  tabName:'Patient',
                  cardTitle:'Distrubition des Patient'
                },
              }
            },
            rdvPage:{
              calendarLink:'Calendrier',
              tabsTtems:{
                attent:'En Attent',
                seen:' Vu',
                accepte:'Accepteé',
                refuse:'Refuseé',
                retarde:'Retardeé',
                redirecte:'Redirecteé',
                termine:'Termineé',
              },
              infoBtn:'Info',
              tableHeaderItems: "'*','ID','Patient', 'Passé le','Volu le','Temps','Etat','Enreg.?','Voir'" ,
              calendarCardData: {
                searchCardTitle:' Recherche ...',
                searchCardBtn:'Recherche ',
                rdvToday:'Rendy-vous D\'aujourd\'hui'
              },
              rdvInfoCardData: {
                title:'Rendy Vous',
                tabs:{
                  one:'Rendy-vous Info',
                  two:'Patient Info'
                },
                controlBtnCard : {
                  title:'Controle',
                  rejectBtn:'Annulée',
                  acceptBtn:'Accepteé',
                  retardBtn:'Retardeé',
                  redirectBtn:'Redirecteé',
                  addToCalendae:'Ajouter Aux Calendrier',
                  termineBtn:'Terminer',
                  nonSeenBtn:'marquer comme non Vu',
                },
                infoReqCard : {
                  title:'Info du rendy Vous',
                  nameOfUser:'Nom Et Prenon',
                  wantedDate:'Date Volu',
                  wantedTime:'Temps Volu',
                  reqDay:'Passe Le',
                  comment:' Commentaire',
                },
                infoUserCard : {
                  title:'Info Patient',
                  wantYouSaveThisUser:'',
                  name:'Nom :',
                  phone:'Phone :',
                  delag:'Deleg :',
                  gouv:'Gouv :',
                  adress:'Adresse : ',
                  saveBtn:'Enregistrer Client',
                  stateItem: {
                    dejaEnreg:'Déja Enregistreé',
                    nouveaux:' Nouveaux Patient'
                  },
                  statItemNames:{
                      rdv:'Rendy-Vous',
                      ordonnace:'Ordonance',
                      seances:' Seances',
                  },
                  addUserCard:{
                    title:'Voulez Vous Enregistrer ce Patient ?'
                  }
                },
                sendMessageBox: {
                  reponseText: 'Reponses : ',
                  stateActionText:'',
                  addResponse: 'ecrire votre reponse '
                }
              },
            },
            seancePage:{
              tarifName:'Tarif',
              infoBtn:'Info',
              maladieStateItems:{
                Bonne:'En Bonne État',
                Malade:'Malade',
                Reanimation:'En Réanimation',
                Palliatifs:'En Soins Palliatifs',
                Quarantaine:'En Quarantaine',
                Observation:'En Observation',
              },
              seanceInfo : {
                tabsName:{
                    diagnostique:'Diagnostique ',
                    analyse:'Analyses',
                    ordonance:'Analyses',
                    info:'Info',
                },
                analyseList:'Listes des Analyse',
                ordonanceLit:' Listes des Medicamment',
                ordonanceTable :{
                    No:'No',
                    Designiation:'Designiation',
                    Dosage:'Dosage',
                    Forme:'Forme',
                    Presentation:'Presentation',
                },
                infoTable :{
                    date:'Date & Heure',
                    maladie:'Maladie',
                    degree:'Degre de La Maladie',
                    description:'Description de la maladie',
                },
                controlBtnCard : {
                  title:'Controle',
                  modifier:'Modifier',
                  supprimer:' Supprimer',
                  imprimer:'Imprimer Ordonance',
                  suppModal:{
                    voulezVous:'Voulez Vous Vraimment Supprimer Cette Seance',
                    suppBtn:'Supprimer'
                  }
                },

              },
              addSeanceInfo :{
                tabsName: {
                  selectPat:'Selectionnez Patient',
                  diagnostique:'Entrez Diagnostique',
                  analyse:'Faire Analyses',
                  ordonance:'Ecrire Ordonance',
                  terminer:'Terminer Le  Resultat',
                },
                selectTabsData: {
                    patientCardTitle:'Patient',
                    btnsText:{
                      patientUID :'Patient UID',
                      scanRDV :'Rendy-Vous',
                    },
                    patientInfo:{
                      Nom : 'Nom',
                      phone : 'Phone',
                      adress : 'Adresse ',
                      nbSeance : 'Nombre de Seance',
                      nbRDV : 'Nombre des Rendy-Vous',
                      nbOrdo : 'Nombre d\'Ordonnace ',
                      etatSnit : 'Etat Sanitaires',
                    },
                    leftTabs:{
                      seance:'Seances ',
                      rdv:'RendyVous',
                      ordonance:'Ordonance',
                      tableHearder : "'*','ID ','Date','Temps','Info'"
                    }

                },
                diagnosqtiqueTabsData: {
                  title:'Diagnostique'
                },
                analyseTabsData: {
                  title:'Ajouter Grandeur',
                  grandeurPlch:'Grandeur',
                  valeurPlch:'Valeur',
                  btnText:'Ajouter',
                  listeText:'Listes des Analyses'
                },
                ordonanceTabsData: {
                  title:'Ajouter article',
                  addPlch:'Entre Medicamment',
                  code:'Code a barre :',
                  Nom:'Nom :',
                  Dosage :'Dosage :',
                  Forme :'Forme :',
                  Presentation :'Presentation :',
                  modePlch:'Mode d\'emploi',
                  btnText:'Ajouter',
                  listeText:'Listes des Analyses'
                },
                terminerTabsData: {
                  maladie:' Maladie',
                  resultat:'Resultat : maladie',
                  resultatPlch:'Maladie',
                  date:'Date ',
                  degre:'Degreé de Danger',
                  genre:'Genre de Seance',
                  pasGenre: {one:'Pas des Genres Enregistreé ', two:'Cliquer Ici', three:'Pour le faire '},
                  saveBtn:'Enregistrer',
                  printBtn:'Imprimer Ordonance',
                }
              },
              editSeance :{
                editBtn:'Modifier',
                pasDordo:'Pad d\'ordonnace',
                editOrdonance: 'Vous Pouvez Modifier L\'ordonnace Ici :'
              },
              resumerCard:{
                cardTitle:'Entrer Une Periode',
                rechercheBtn:'Rechercher',
                tableHeader: "'*','Patient','Maldaie','Degreé','Jour','Temps','Voir'",
              },
              tarifCard:{
                cardTitle:'Ajouter Tarif :',
                Nom:'Nom :',
                Description:'Description:',
                Tarif:'Tarif:',
                addBtn:'Enregistrer',
                infoBtn:'Info'
              },
              tarifInfoCard:{
                prixText:'PRIX',
                tarifText:'TARIF',
                leftTab:{
                  seance:'Seance',
                  modifier:'Modifier'
                },
                seanceTableH: "'ID','Mmebre','Date','Temp','Voir'",
                modifierCard:{
                  nom:'Nom',
                  tarif:'Tarif',
                  descr:'Description',
                  modifierBtn:'Modifier'
                }
              }
            },
            patientPage:{
              assuranceText:'Assurance',
              infoText:'Info',
              addPatient:{
                nomEtPrenon:'Nom Et Prenon ',
                naissance:'Date de Naissance',
                phoneNum:'Telephone ',
                location :'Geolocalisation ',
                gouv:'Selectionner Region',
                deleg:'Selectionner Departememnt',
                adresse:'Adresse',
                saveBtn:'Enregistrer',
                rechercheAbyedh:{
                  tabsNames:{
                    enter:'Entrer',
                    scan:'Scanner'
                  },
                  title: 'Recherche Dans La Base Abyedh',
                  btnText:'Recherche',
                  clicToScan:'Cliquer pour scanner'
                }
              },
              patientInfo:{
                mainCardText:{
                    verification:'Verification',
                    telephone:'Telephone',
                    notVerifier:'Non Verifieé'
                },
                TabsCardText:{
                  seance:'Seances',
                  ordonance:'Ordonance',
                  rdv:'RDV',
                  modifier:'Modifier',
                  verifier:'Verification',
                  supprimer:'Supp..',
                },
                ordoTableaHeders:"'ID','Client','Jour','Temps', 'Voir'",
                rdvTableaHeders:"'ID','Client','Jour','Temps','Totale','Voir'",
                editCard:{
                  nomEtPrenon:'Nom Et Prenon :',
                  naissance:'Date de Naissance',
                  phoneNum:'Telephone ',
                  location :'Geolocalisation ',
                  gouv:'Selectionner Region',
                  deleg:'Selectionner Departememnt',
                  adresse:'Adresse',
                  editBtn:'Modifier',
                },
                verificationCard:{
                  isVerifier:'Ce Patient est Verifier',
                  searchInAbyedhDB:'Recherche Dans La Base Abyedh',
                  nom:'Nom',
                  phone:'Phone:',
                  gouv:'Gouv:',
                  deleg:'Deleg:',
                  verifBtn: 'Verifieé',
                  searchBtn:'Recherche'
                },
                deleteCard:{
                  mainTitle:'Voulez-Vous Vraimment Supprimer Ce Patient ?',
                  alertText:'Lorsque Vous Supprimer Un Patient',
                  conscOne:'le Patient ne sera pas visible dans la branche "Patients"',
                  conscTwo:'Tous les donneé relier a ce Patient peut s\'endomager',
                  conscThree:'vous ne pouver pas passer ni factures ni commandes avec ce Patients autremment',
                  deleteBtn:'Oui, Supprimer',
                },

              }
            },
            ordonancePage:{
              StockText:'Stock',
              InfoBtn:'Info',
              ordoState:{
                terminer:'Terminer',
                annule:'Annuleé',
                enCours:'En Attent',
                indefinie:'Indefine'
              },
              addOrdoPage:{
                listeText:'Listes des Analyses',
                tabsText:{
                  enter:'Entrer',
                  dateClient:'Date & Clients',
                  save:'Enregistrer',
                },
                enterCard: {
                  title:'Ajouter article',
                  addPlch:'Entre Medicamment',
                  code:'Code a barre :',
                  Nom:'Nom :',
                  Dosage :'Dosage :',
                  Generic:'DCI: ',
                  Forme :'Forme :',
                  Presentation :'Presentation :',
                  modePlch:'Mode d\'emploi',
                  btnText:'Ajouter',
                },
                dateClientCard:{
                  title: 'Date & Client',
                  nomClientText:'Nom:',
                  adresseClientText:'Adresse :'
                },
                finisCard:{
                  titleText:'Buttons',
                  saveBtn:'Enregistrer',
                  printBnt:'Imprimer'
                }
              },
              ordoInfoPage:{
                titleText:'ORDONANCE',
                ordoId:'ORDONANCE ID : ',
                ordoCode:'CODE ORDONANCE : ',
                patientText:'PATIENT:',
                dateText:'Date :',
                TimeText:'Temps: ',
                tableHeader :{
                    No:'No',
                    Designiation:'Designiation',
                    Dosage:'Dosage',
                    Forme:'Forme',
                    Presentation:'Presentation',
                },
                controlBtns: {
                  title:'Controle',
                  printBtn:'Imprimer',
                  editBtn:'Modifier',
                  deleteBtn:'Supprimer',
                  seeSeance:'Voir Seance',
                }
              },
              modifierOrdoPage:{
                editBtn:'Modifier'
              },
              stockCard:{
                addCard:{
                  title:'Ajouter Nouveaux Medicamment',
                  enregistrerBtn:'Enregistrer',
                  fermerBtn:'Fermer'
                },
                infoCard:{
                  tabsText:{
                    info:'Info',
                    modifier:'Modifier',
                    supprimer:'Supprimer'
                  },
                  cardData:{
                    dosage:'Dosage',
                    presentaion:'Presentation'
                  },
                  alertTer:'Vous ne pouvez pas ni modifier ni supprimer cette medicamment , car c\'est un medicament publique', 
                  deleteCard:{
                    mainTitle:'Voulez-Vous Vraimment Supprimer Ce Medicamment ?',
                    alertText:'Lorsque Vous Supprimer Un Medicamment',
                    conscOne:'le Medicamment ne sera pas visible dans la branche "Medicamments"',
                    conscTwo:'Tous les donneé relier a ce Medicamment peut s\'endomager',
                    conscThree:'vous ne pouver pas passer ni factures ni commandes avec ce Medicamments autremment',
                    deleteBtn:'Oui, Supprimer',
                  },
                }
              }
            },
            rapportPage:{
              infoBtn:'Info',
              addRapport:{
                tabsText:{
                  contenue:'Contenue ',
                  terminer:'Terminer',
                },
                rptPlch:'Ecrivez Ici Votre rapport  |',
                terminerCard:{
                  Titre:'Titre',
                  Sujet:'Sujet',
                  Date:'Date',
                  Genre:'Genre',
                  Titre:'Titre',
                  genreListe:{
                    1: 'Medicale Gébérale',
                    2:'Hospitalisation',
                    3:'Urgence',
                    4:'Consultation',
                    5:'Evaluation',
                    6:'Diagnostique',
                    7:'Suivie',
                    8:'Recherche Medicale',
                    9:'Cas Clinique',
                    10:'Medico-Légale',
                    11:'Autopsie',
                    12:'Sante Publique',
                    13:'Autre',
                  },
                  saveBtn:'Enregistrer',
                  printBtn:'Imprimer Rapport'
                }
              },
              rapportInfo:{
                titleText:'RAPPORT',
                rapportId:'RAPPORT ID : ',
                rapportTitre:'TITRE :',
                sujetText:'SUJET : ',
                dateText:'Date :',
                GenreText:'GENRE:: ',
                controlCard:{
                  title : 'Control',
                  editBtn:'Modifier',
                  printBtn:'Imprimer',
                  deleteBtn:'Supprimer'

                }
              },
              editRapport:{
                editBtn:'Modifier'
              }
            },
            teamPage :{
              interfaceLinkText: 'Interface RDV',
              infoBtn:'Info',
              addTeamPage: {
                cin:'Carte CIN:',
                nomEtPrenom:'Nom Et Prenon :',
                phone:'Telephone :',
                poste:'Poste:',
                adresse:'Adresse:',
                saveBtn:'Enregistrer',
                rechercheAbyedh:{
                  tabsNames:{
                    enter:'Entrer',
                    scan:'Scanner'
                  },
                  title: 'Recherche Dans La Base Abyedh',
                  btnText:'Recherche',
                  clicToScan:'Cliquer pour scanner'
                }
              },
              addPoste:{
                emptyListeText:'Ajouter des Poste à droite',
                currency:'D.T',
                cardTitle:'Ajouter Poste',
                poste:'Poste',
                salaire:'Salaire',
                experience:'Experience Exigeé',
                saveBtn:'Enregistrer',
                modifierTitle:'Modifier Poste',
                modifierBtn:'Modifier',
                supprimerModal:{
                  title:'Supprimer Famille',
                  confirmText:'Voulez-Vous Vraimment Supprimer Cette Famille',
                  nom:'Poste',
                  desc:'Description',
                  deleteBtn:'Supprimer Poste'
                }
              },
              anavcePage:{
                selectMembre:'Selectioner Membre',
                membrePlch:'Entrer Membre',
                montant:'Montant',
                montantPlch:'Valeur',
                addBtn:'Ajouter',
                tableaHeader: "'*','Nom','Jour', 'Valeur','X'",
                deleteModal:{
                  title:'Supprimer Avance',
                  confText:'Voulez-Vous Vraimment Supprimer Cette Avance ?',
                  valeur:' Valeur : ',
                  membre:' Membre :',
                  confirmBtn:'Supprimer'
                }
              },
              presencePage:{
                selectMembre:'Selectioner Membre',
                membrePlch:'Entrer Membre',
                genre:'Selectioner Genre',
                presence:'Presence',
                absance:'Absance',
                date:'Montant',
                addBtn:'Ajouter'
              },
              teamInfoPage:{
                mainCardText:{
                    verification:'Verification',
                    telephone:'Telephone',
                    notVerifier:'Non Verifieé'
                },
                TabsCardText:{
                  presence:'Presence',
                  avance:'Avances',
                  caissePWD:'Caisse PWD',
                  modifier:'Modifier',
                  verifier:'Verification',
                  supprimer:'Supp..',
                },
                presenceTableaHeders:"'ID','Client','Jour','Temps', 'Voir'",
                avanceTableaHeders:"'ID','Client','Jour','Temps','Totale','Voir'",
                editCard:{
                  cin:'Carte CIN',
                  nomEtPrenon:'Nom Et Prenon :',
                  phoneNum:'Telephone ',
                  poste:'Poste:',
                  location :'Geolocalisation ',
                  gouv:'Selectionner Region',
                  deleg:'Selectionner Departememnt',
                  adresse:'Adresse',
                  editBtn:'Modifier',
                },
                caissePWDData:{
                  identifiant:'Identifiant:',
                  pwd:'Mode de Passe :',
                  smartID:'Smart ID ',
                  editBtn:'Modifier',
                },
                verificationCard:{
                  isVerifier:'Ce Mmebre est Verifier',
                  searchInAbyedhDB:'Recherche Dans La Base Abyedh',
                  nom:'Nom',
                  phone:'Phone:',
                  gouv:'Gouv:',
                  deleg:'Deleg:',
                  verifBtn: 'Verifie',
                  searchBtn:'Recherche'
                },
                deleteCard:{
                  mainTitle:'Voulez-Vous Vraimment Supprimer Ce Membre ?',
                  alertText:'Lorsque Vous Supprimer Un Membre',
                  conscOne:'le Membre ne sera pas visible dans la branche "Membres"',
                  conscTwo:'Tous les donneé relier a ce Membre peut s\'endomager',
                  conscThree:'vous ne pouver pas passer ni factures ni commandes avec ce Membres autremment',
                  deleteBtn:'Oui, Supprimer',
                },

              }
            }
        },
        alternativeS:{
            rdvPortail: {
              loginInPage:{
                connextionText:' Connexion :',
                identifiant:'Identification',
                pwd:'mot de Passe',
                smartId:'Entrer le smart ID',
                connBtn:'Connextion',
                validBtn:'Entrer le smart ID'

              },
              mainPage:{
                cl:'PATIENTS',
                rdv:'RENDY-VOUS',
                cld:'CALENDRIER',
                clad:'AJOUTER PATIENT',
                
              },
              topTitlePage:{
                addPatien:''
              }
            }
        },
        TableHead:{
          seance:"'*','ID','Patient','Maldaie','Degreé','Jour','Temps','Analyse','Ordonance','Voir'",
          seance:"'*','ID','Patient','Maldaie','Degreé','Jour','Temps','Analyse','Ordonance','Voir'",
          facture:"'*','ID','Caisse','Client','Jour','Temps','Totale','Etat','Voir'",
          ordonance:"'*','ID','Patient','Date','Temps','Seance ?','Etat','Voir'",
          seances:"'*','ID','Caisse','Client','Jour','Temps','Etat','Voir'",
          request:"'*','ID','Client', 'Date','Table','Etat','X','Voir'",
          reservation:"'*','ID','Patient', 'Passé le','Volu le','Temps','Etat','Enreg.?','Voir'",
          menu:"'*','Code', 'Nom', 'Genre','Cout','P.vente','X','Voir'",
          stock:"'*','Code', 'Nom', 'Genre','Tarif','Voir'",
          camion:"'*','Camion','Matricule', 'Chauffeur','Fond','Recette','X','Voir'",
          camionStock:"'Code', 'Nom', 'Genre','Stock','Prix','Voir'",
          camionFacture:"'ID','Client','Jour','Totale','Voir'",
          camionFond:"'ID','Date','Totale', 'SDF','SCF','Voir'",
          client:"'*','Nom','Naissance', 'Tel', 'Location','Adresse','Voir'",
          clientCommande:"'ID', 'Passé le','Volu le','Totale','Etat','Voir'",
          clientFacture:"'ID','Client','Jour','Totale','Voir'",
          clientFactureC:"'ID','Client','Jour','Totale','Voir'",
          team:"'*','Nom','Tel', 'CIN','Commencé', 'Post','Voir'",
          medicammentPage:"'*','Code','Genre','Nom', 'Dosage','Forme', 'Presentation','Classe','Voir'",
          fournisseur:"'*','MF','Nom','Tel', 'Adresse','Genre', 'Jour','Voir'",
          addSeancePtientTab : "'*','ID ','Date','Temps','Info'"
  
        },
        BreadCrumb : {
          menuAddPlat: {
            '1': 'Menu',
            '2': 'Ajouter Plat'
          },
          menuFamille: {
            '1': 'Menu',
            '2': 'Familles'
          },
          platInfo: {
            '1': 'Menu',
            '2': 'Information'
          },
          forfraitInfo: {
            '1': 'Tarif',
            '2': 'Information'
          },
          stockAddArticle: {
            '1': 'Stock',
            '2': 'Ajouter Article'
          },
          stockFamille: {
            '1': 'Stock',
            '2': 'Familles'
          },
          stockBE: {
            '1': 'Stock',
            '2': 'Bon d\'entre'
          },
          stockBS: {
            '1': 'Stock',
            '2': 'Bon de sortie'
          },
          stockInfo: {
            '1': 'Stock',
            '2': 'Information'
          },
          factureAjouter: {
            '1': 'Seance',
            '2': 'Ajouter Seance'
          },
          factureInfo: {
            '1': 'Seance',
            '2': 'Info'
          },
          factureEdit: {
            '1': 'Rapport',
            '2': 'Modification'
          },
          factureResumer: {
            '1': 'Seance',
            '2': 'Resumer'
          },
          CamionAdd: {
            '1': 'Camion',
            '2': 'Ajouter Camion'
          },
          CamionAddFond: {
            '1': 'Camion',
            '2': 'Ajouter Fond'
          },
          CamionFondInfo: {
            '1': 'Camion',
            '2': 'Info',
            '3': 'Fond',
            '4': 'Voir'
          },
          CamionEditFond: {
            '1': 'Camion',
            '2': 'Info',
            '3': 'Fond',
            '4': 'Modifier'
          },
          CamionInv: {
            '1': 'Camion',
            '2': 'Inventaire Camion'
          },
          CamionInfo: {
            '1': 'Camion',
            '2': 'Info'
          },
          CamionArticleInfo: {
            '1': 'Camion',
            '2': 'Info',
            '3': 'Article'
          },
          CamionFactureInfo: {
            '1': 'Camion',
            '2': 'Info',
            '3': 'Seance',
            '4': 'Voir'
          },
          ClientAdd: {
            '1': 'Patient',
            '2': 'Ajouter Patient'
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
            '1': 'Rendy Vous',
            '2': 'Info'
          },
          RequestCalendar: {
            '1': 'Rendy-Vous',
            '2': 'Calendrier'
          },
          RequestCompte: {
            '1': 'Commandes',
            '2': 'Comptes'
          },
          RequestReg: {
            '1': 'Commandes',
            '2': 'Regrouppemment'
          },
          FournisseurAdd: {
            '1': 'Fournisseur',
            '2': 'Regrouppemment'
          },
          FournisseurCalendar: {
            '1': 'Fournisseur',
            '2': 'Regrouppemment'
          },
          FournisseurSearch: {
            '1': 'Fournisseur',
            '2': 'Regrouppemment'
          },
          FournisseurInfo: {
            '1': 'Fournisseur',
            '2': 'Regrouppemment'
          },
          TeamAdd: {
            '1': 'Equipe',
            '2': 'Ajouter'
          },
          TeamInfo: {
            '1': 'Equipe',
            '2': 'Info'
          },
          TeamPoste: {
            '1': 'Equipe',
            '2': 'Postes'
          },
          TeamDemande: {
            '1': 'Equipe',
            '2': 'Demmande emlpoi'
          }
        },
        SubNavs : {
            request: {
              '1': 'Accepté',
              '2': 'Refusé',
              '3': 'En Attent'
            },
            camion: {
              '1': 'Ajouter Ordonance'
            },
            Menu: {
              '1': 'Nouveaux Rapport'
            },
            Stock: {
              '1': 'Nouveaux Ordonance',
              '2': 'Famille des Plats',
              '3': 'Bond entre',
              '4': 'Bond Sortie'
            },
            facture: {
              '1': 'Nouveaux Seance',
              '2': 'Resumer'
            },
            client: {
              '1': 'Nouveaux Patient'
            },
            Commande: {
              '1': 'Comptes',
              '2': 'Calendrier'
            },
            Fournisseur: {
              '1': 'Nouveaux Fornisseur',
              '2': 'Calendrier',
              '3': 'Recherche'
            },
            Equipe: {
              '1': 'Nouveaux Membre',
              '2': 'Poste',
              '3': 'Avance',
              '4': 'Presence'
            }
        }
    },
}
export default FrancaisTrans