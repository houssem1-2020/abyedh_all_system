const GermanyTrans = {
    translation : {
        menusAndTabsName:{
            leftBar: {
                profile: "Profil",
                parametre: "Parameter",
                forum: "Forum",
                message: "Nachrichten",
                sauvgarder: "Speichern",
                syncro: "Synchronisation",
                documentation: "Dokumentation",
                deconextion: "Abmeldung"
            },
            topBar: {
                  ma: 'Startseite',
                  rq: 'Bestellungen',
                  mu: 'Speisekarte',
                  ca: 'Kasse',
                  ft: 'Rechnungen',
                  cl: 'Kunden',
                  tm: 'Team'
              },
            alternativeLink :{
              1: {
                title: "Kasse",
                descrip: "Schnittstelle für die Kasse"
              },
              2: {
                title: "Kellner",
                descrip: "Schnittstelle zum Bestellen"
              }
            }            
        },
        communUsed:{
            logInPage:{
              connectionTitle:'Verbindung:',
              identifiant:'Identifikation',
              pwd:'Passwort',
              logInBtn:'Einloggen',
              inscrireLink:'Registrieren Sie sich',
              downloadBtn:'Laden Sie das System auf Ihren PC herunter',
              toast:{
                addIdentif:'Geben Sie eine Identifikation ein!',
                addPwd:'Geben Sie das Passwort ein!',
                successLog:'Eingeloggt!',
                notfound:'Fehler, bitte versuchen Sie es erneut!',
              }
            },
            profilePage:{
              mainTitle:'Profil',
              numAvis:'Bewertungen',
              numLikes:'Gefällt mir',
              profileLinkBtn:'Profil',
              menuTabList:{
                generalEdit:'Bearbeiten',
                pwdEdit:'Passwort',
                horaireEdit:'Stundenplan',
                positionEdit:'Position',
                imagesEdit:'Bilder',
                avisShow:'Bewertungen',
                printPromote:'Drucken',
              },
              generalEditData:{
                title:'Allgemeine Informationen',
                name:'Name und Vorname',
                phone:'Telefon',
                location:'Geolocation',
                gouv:'Region auswählen',
                deleg:'Abteilung auswählen',
                adress:'Adresse',
                genre:'Geschlecht',
                editBtn:'Bearbeiten'
              },
              pwdEditData:{
                title:'Passwortänderung',
                identifiant:'Identifikation',
                pwd:'Passwort',
                editBtn:'Bearbeiten'
              },
              horaireEditData:{},
              positionEditData:{},
              imagesEditData:{
                noPhoto:'Sie haben keine Bilder',
                clicToAdd:'Klicken Sie hier, um Bilder hochzuladen'
              },
              avisShowData:{},
              printPromoteData:{},
            },
            settingPage:{
              title:'Allgemeine Einstellungen',
              activationCard:{
                title:'Aktivierung',
                jour:'Tag',
                isActivated:'Aktiviert',
                isExpired:'Abgelaufen',
                activeIci:'Aktivieren Sie Ihr System hier',
                activeIciBtn:'Aktivieren'
              },
              confirmerCard:{
                title:'Bestätigung',
                isConfirmer:'Bestätigt',
                isConfirmerText:'Ihr Konto ist auf abyedh.com bestätigt',
                nonConfirmer:'Nicht bestätigt',
                nonConfirmerText:'Ihr Konto ist auf abyedh.com nicht bestätigt',
                nonConfirmerBtn:'Bestätigen',
              },
              settingCard:{
                1: {
                  title:'Abonnement',
                  desc:'Abonnement, Maximale Anzahl, Auto-Abonnement'
                },
                2: {
                  title:'Sitzungen',
                  desc:'Sitzungen, Zeitplan, Mitglieder'
                },
                3: {
                  title:'Ausrüstung',
                  desc:'Artikel, Bearbeiten, Ein-/Ausgabe-Buchung'
                },
                4: {
                  title:'Abonnement',
                  desc:'Bearbeitung, Löschen, Guthaben'
                },
                5: {
                  title:'Mitglieder',
                  desc:'Neue, Bearbeiten, Treue'
                },
                6: {
                  title:'Team',
                  desc:'Neue, Anwesenheit, Vorauszahlung'
                },
              },
            },
            paymmentPage:{
              montant:'500',
              currency:'€',
              montantAnnuel:'Jährlicher Anmeldebetrag:',
              textOne:'Zahlung erfolgt über eine Überweisung über den Moneygram-Dienst',
              textTwo:' zum Eigentümer',
              textThree:'Telefon',
              afterFinishAlert:'Nach Abschluss der Überweisung müssen Sie hier die Informationen eingeben:',
              nomText:'Der Name, mit dem die Zahlung gesendet wird',
              nomPlchText:'Name',
              montantText:'Betrag',
              montantPlchText:'Betrag',
              codeText:'Zahlungscode',
              codePlchText:'Code',
              phoneText:'Telefon',
              phonePlchText:'Telefon',
              posteText:'Postämter',
              postePlchText:'Postämter',
              postalCodeText:'Postleitzahl',
              postalCodePlchText:'Postleitzahl',
              saveBtn:'Speichern'
            },          
            forumPage:{
              inoutPlch:'Status hier hinzufügen'
            },
            messagePage:{
              titleName:'Nachrichten',
              alertMessage:'Sie haben keine Nachrichten',
            },
            savgarderPage:{
              selectItemsCard:{
                title:'Speichern Sie Ihre Daten auf Ihrem Computer',
                itemsList:{
                  1:'Termine speichern',
                  2:'Angebote speichern',
                  3:'Sitzungen speichern',
                  4:'Berichte speichern',
                  5:'Patienten speichern',
                  6:'Team speichern',
                  7:'Rezepte speichern',
                },
                exportBtn:'Exportieren',
                saveCopy:'Kopie herunterladen'
              },
              netoyerCard:{
                title:'Löschen unerwünschter Dateien auf dem Server',
                notoyerText:'Gesamtvolumen der Dateien beträgt:',
                netoyerBtn:'Server bereinigen'
              }
            },
            sysncroPage:{
              title:'Aktualisieren von Tabellen',
              savingModal:'Speichern',
              mainCard:{
                topText:'Klicken Sie auf die Schaltfläche, um Ihre Daten zu aktualisieren',
                bottomText:'Wenn Sie die Daten auf dem Internetserver aktualisieren, können Sie Ihre Anwendung auch im Offline-Modus verwenden. Bleiben Sie immer auf dem neuesten Stand',
                btnText:'Aktualisieren'
              },
              itemsList:{
                1:'Termine',
                2:'Sitzungen',
                3:'Berichte',
                4:'Patienten',
                5:'Team',
                6:'Rezepte',
              },
            },
            documentPage :{
              itemsList:{
                1:'Termine',
                2:'Sitzungen',
                3:'Berichte',
                4:'Patienten',
                5:'Team',
                6:'Rezepte',
              },
              savModal:{
                title:'Kundendienst',
                inputPlch:'Geben Sie hier Ihr Problem ein'
              }
            }
        },
        menuTabs:{
            mainPage:{
              LinksCardItems : {
                rapportNum :{
                  title:'Bericht',
                  desc:'Neu'
                },
                seanceNum :{
                  title:'Sitzung',
                  desc:'Neu'
                },
                patientNum :{
                  title:'Patient',
                  desc:'Hinzufügen'
                },
                ordonanceNum :{
                  title:'Rezept',
                  desc:'Neu'
                },
                equipeNum :{
                  title:'Team',
                  desc:'Anwesend'
                },
              },
              evolutionCard:{
                title: 'Sitzungsentwicklung',
              },
              tabsCard:{
                seance : {
                  tabName:'Sitzungen',
                  cardTitle:'Verteilung der Sitzungen'
                },
                rdv : {
                  tabName:'Termine',
                  cardTitle:'Verteilung der Termine'
                },
                patient : {
                  tabName:'Patient',
                  cardTitle:'Verteilung der Patienten'
                },
              }
            },
            rdvPage: {
              calendarLink: 'Kalender',
              tabsTtems: {
                  attent: 'Wartend',
                  seen: 'Gesehen',
                  accepte: 'Akzeptiert',
                  refuse: 'Abgelehnt',
                  retarde: 'Verspätet',
                  redirecte: 'Umgeleitet',
                  termine: 'Abgeschlossen',
              },
              infoBtn: 'Info',
              tableHeaderItems: "'*','ID','Patient', 'Vergangen am','Volumen','Zeit','Zustand','Aufgenommen?','Ansehen'",
              calendarCardData: {
                  searchCardTitle: 'Suche...',
                  searchCardBtn: 'Suche',
                  rdvToday: 'Termine für heute'
              },
              rdvInfoCardData: {
                  title: 'Termin',
                  controlBtnCard: {
                      title: 'Steuerung',
                      rejectBtn: 'Abbrechen',
                      acceptBtn: 'Akzeptieren',
                      retardBtn: 'Verzögern',
                      redirectBtn: 'Umleiten',
                      saveBtn: 'Sitzung speichern',
                      termineBtn: 'Beenden',
                      nonSeenBtn: 'Als nicht gesehen markieren',
                  },
                  infoReqCard: {
                      title: 'Termininformationen',
                      nameOfUser: 'Name und Vorname',
                      wantedDate: 'Gewünschtes Datum',
                      wantedTime: 'Gewünschte Zeit',
                      reqDay: 'Vergangener Tag',
                      comment: 'Kommentar',
                  },
                  infoUserCard: {
                      title: 'Patienteninformationen',
                      wantYouSaveThisUser: '',
                      name: 'Name:',
                      phone: 'Telefon:',
                      delag: 'Delegat:',
                      gouv: 'Regierung:',
                      adress: 'Adresse:',
                      saveBtn: 'Kunden speichern',
                      stateItem: {
                          dejaEnreg: 'Bereits gespeichert',
                          nouveaux: 'Neue Patienten'
                      },
                      statItemNames: {
                          rdv: 'Termine',
                          ordonnace: 'Rezepte',
                          seances: 'Sitzungen',
                      },
                      addUserCard: {
                          title: 'Möchten Sie diesen Patienten speichern?'
                      }
                  }
              }
            },
            seancePage:{
              tarifName:'Tarif',
              infoBtn:'Info',
              maladieStateItems:{
                Bonne:'In gutem Zustand',
                Malade:'Krank',
                Reanimation:'In Reanimation',
                Palliatifs:'In Palliativpflege',
                Quarantaine:'In Quarantäne',
                Observation:'In Beobachtung',
              },
              seanceInfo : {
                tabsName:{
                    diagnostique:'Diagnose',
                    analyse:'Analysen',
                    ordonance:'Rezept',
                    info:'Info',
                },
                analyseList:'Liste der Analysen',
                ordonanceLit:' Liste der Medikamente',
                ordonanceTable :{
                    No:'Nr.',
                    Designiation:'Bezeichnung',
                    Dosage:'Dosierung',
                    Forme:'Form',
                    Presentation:'Präsentation',
                },
                infoTable :{
                    date:'Datum & Uhrzeit',
                    maladie:'Krankheit',
                    degree:'Krankheitsgrad',
                    description:'Krankheitsbeschreibung',
                },
                controlBtnCard : {
                  title:'Kontrolle',
                  modifier:'Ändern',
                  supprimer:'Löschen',
                  imprimer:'Rezept drucken',
                  suppModal:{
                    voulezVous:'Möchten Sie diese Sitzung wirklich löschen?',
                    suppBtn:'Löschen'
                  }
                },

              },
              addSeanceInfo :{
                tabsName: {
                  selectPat:'Patient auswählen',
                  diagnostique:'Diagnose eingeben',
                  analyse:'Analysen durchführen',
                  ordonance:'Rezept schreiben',
                  terminer:'Ergebnis abschließen',
                },
                selectTabsData: {
                    patientCardTitle:'Patient',
                    btnsText:{
                      patientUID :'Patienten UID',
                      scanRDV :'Termin scannen',
                    },
                    patientInfo:{
                      Nom : 'Name',
                      phone : 'Telefon',
                      adress : 'Adresse ',
                      nbSeance : 'Anzahl der Sitzungen',
                      etatSnit : 'Gesundheitszustand:',
                    },
                    leftTabs:{
                      seance:'Sitzungen ',
                      rdv:'Termine',
                      ordonance:'Rezept',
                      tableHearder : "'*','ID ','Datum','Zeit','Info'"
                    }

                },
                diagnosqtiqueTabsData: {
                  title:'Diagnose'
                },
                analyseTabsData: {
                  title:'Größe hinzufügen',
                  grandeurPlch:'Größe',
                  valeurPlch:'Wert',
                  btnText:'Hinzufügen',
                  listeText:'Liste der Analysen'
                },
                ordonanceTabsData: {
                  title:'Artikel hinzufügen',
                  addPlch:'Medikament eingeben',
                  code:'Barcode :',
                  Nom:'Name :',
                  Dosage :'Dosierung :',
                  Forme :'Form :',
                  Presentation :'Präsentation :',
                  modePlch:'Anwendungsmodus',
                  btnText:'Hinzufügen',
                  listeText:'Liste der Analysen'
                },
                terminerTabsData: {
                  maladie:' Krankheit',
                  resultat:'Ergebnis: Krankheit',
                  resultatPlch:'Krankheit',
                  date:'Datum ',
                  degre:'Gefährdungsgrad',
                  genre:'Art der Sitzung',
                  pasGenre: {one:'Keine Art gespeichert', two:'Klicken Sie hier', three:'um eine hinzuzufügen '},
                  saveBtn:'Speichern',
                  printBtn:'Rezept drucken',
                }
              },
              editSeance :{
                editBtn:'Bearbeiten',
                pasDordo:'Kein Rezept',
                editOrdonance: 'Sie können das Rezept hier bearbeiten:'
              },
              resumerCard:{
                cardTitle:'Zeitraum eingeben',
                rechercheBtn:'Suchen',
                tableHeader: "'*','Patient','Krankheit','Grad','Tag','Zeit','Anzeigen'",
              },
              tarifCard:{
                cardTitle:'Tarif hinzufügen :',
                Nom:'Name :',
                Description:'Beschreibung:',
                Tarif:'Tarif:',
                addBtn:'Speichern',
                infoBtn:'Info'
              },
              tarifInfoCard:{
                prixText:'PREIS',
                tarifText:'TARIF',
                leftTab:{
                  seance:'Sitzung',
                  modifier:'Ändern'
                },
                seanceTableH: "'ID','Mitglied','Datum','Zeit','Anzeigen'",
                modifierCard:{
                  nom:'Name',
                  tarif:'Tarif',
                  descr:'Beschreibung',
                  modifierBtn:'Ändern'
                }
              }
            },
            patientPage: {
              assuranceText: "Versicherung",
              infoText: "Info",
              addPatient: {
                nomEtPrenon: "Name und Vorname",
                naissance: "Geburtsdatum",
                phoneNum: "Telefon",
                location: "Ortung",
                gouv: "Region auswählen",
                deleg: "Abteilung auswählen",
                adresse: "Adresse",
                saveBtn: "Speichern",
                rechercheAbyedh: {
                  tabsNames: {
                    enter: "Eingeben",
                    scan: "Scannen"
                  },
                  title: "In der Abyedh-Datenbank suchen",
                  btnText: "Suchen",
                  clicToScan: "Zum Scannen klicken"
                }
              },
              patientInfo: {
                mainCardText: {
                  verification: "Überprüfung",
                  telephone: "Telefon"
                },
                TabsCardText: {
                  seance: "Sitzungen",
                  ordonance: "Rezept",
                  rdv: "Termin",
                  modifier: "Ändern",
                  verifier: "Überprüfen",
                  supprimer: "Löschen"
                },
                ordoTableaHeders: "'ID','Kunde','Datum','Zeit','Anzeigen'",
                rdvTableaHeders: "'ID','Kunde','Datum','Zeit','Gesamt','Anzeigen'",
                editCard: {
                  nomEtPrenon: "Name und Vorname:",
                  naissance: "Geburtsdatum",
                  phoneNum: "Telefon",
                  location: "Ortung",
                  gouv: "Region auswählen",
                  deleg: "Abteilung auswählen",
                  adresse: "Adresse",
                  editBtn: "Bearbeiten"
                },
                verificationCard: {
                  isVerifier: "Dieser Patient ist überprüft",
                  searchInAbyedhDB: "In der Abyedh-Datenbank suchen",
                  nom: "Name",
                  phone: "Telefon:",
                  gouv: "Region:",
                  deleg: "Abteilung:",
                  verifBtn: "Bestätigen",
                  searchBtn: "Suchen"
                },
                deleteCard: {
                  mainTitle: "Möchten Sie diesen Patienten wirklich löschen?",
                  alertText: "Wenn Sie einen Patienten löschen",
                  conscOne: "Der Patient wird im Zweig „Patienten“ nicht mehr angezeigt",
                  conscTwo: "Alle mit diesem Patienten verbundenen Daten können beschädigt werden",
                  conscThree: "Sie können keine Rechnungen oder Bestellungen mehr mit diesem Patienten erstellen",
                  deleteBtn: "Ja, löschen"
                }
              }
            },
            ordonancePage:{
              StockText:'Bestand',
              InfoBtn:'Info',
              ordoState:{
                terminer:'Abgeschlossen',
                annule:'Abgebrochen',
                enCours:'In Bearbeitung',
                indefinie:'Undefiniert'
              },
              addOrdoPage:{
                listeText:'Listen der Analysen',
                tabsText:{
                  enter:'Eingeben',
                  dateClient:'Datum & Kunden',
                  save:'Speichern',
                },
                enterCard: {
                  title:'Artikel hinzufügen',
                  addPlch:'Geben Sie ein Medikament ein',
                  code:'Strichcode:',
                  Nom:'Name:',
                  Dosage :'Dosierung:',
                  Forme :'Form:',
                  Presentation :'Präsentation:',
                  modePlch:'Gebrauchsanweisung',
                  btnText:'Hinzufügen',
                },
                dateClientCard:{
                  title: 'Datum & Kunde',
                  nomClientText:'Name:',
                  adresseClientText:'Adresse:',
                },
                finisCard:{
                  titleText:'Tasten',
                  saveBtn:'Speichern',
                  printBnt:'Drucken'
                }
              },
              ordoInfoPage:{
                titleText:'REZEPT',
                ordoId:'REZEPT-ID:',
                ordoCode:'REZEPTCODE:',
                patientText:'PATIENT:',
                dateText:'Datum:',
                TimeText:'Zeit:',
                tableHeader :{
                  No:'Nr.',
                  Designiation:'Bezeichnung',
                  Dosage:'Dosierung',
                  Forme:'Form',
                  Presentation:'Präsentation',
                },
                controlBtns: {
                  title:'Steuerung',
                  printBtn:'Drucken',
                  editBtn:'Bearbeiten',
                  deleteBtn:'Löschen',
                  seeSeance:'Sitzung anzeigen',
                }
              },
              modifierOrdoPage:{
                editBtn:'Bearbeiten'
              },
              stockCard:{
                addCard:{
                  title:'Neue Medikamente hinzufügen',
                  enregistrerBtn:'Speichern',
                  fermerBtn:'Schließen'
                },
                infoCard:{
                  tabsText:{
                    info:'Info',
                    modifier:'Ändern',
                    supprimer:'Löschen'
                  },
                  cardData:{
                    dosage:'Dosierung',
                    presentaion:'Präsentation'
                  },
                  alertTer:'Sie können dieses Medikament nicht bearbeiten oder löschen, da es sich um ein öffentliches Medikament handelt.',
                  deleteCard:{
                    mainTitle:'Möchten Sie dieses Medikament wirklich löschen?',
                    alertText:'Beim Löschen eines Medikaments',
                    conscOne:'Das Medikament wird im Bereich "Medikamente" nicht mehr sichtbar sein.',
                    conscTwo:'Alle mit diesem Medikament verbundenen Daten können beschädigt werden.',
                    conscThree:'Sie können keine Rechnungen oder Bestellungen mit diesem Medikament mehr bearbeiten.',
                    deleteBtn:'Ja, löschen',
                  },
                }
              }
            },
            rapportPage: {
                infoBtn: "Info",
                addRapport: {
                  tabsText: {
                    contenue: "Inhalt",
                    terminer: "Beenden"
                  },
                  rptPlch: "Schreiben Sie hier Ihren Bericht |",
                  terminerCard: {
                    Titre: "Titel",
                    Sujet: "Thema",
                    Date: "Datum",
                    Genre: "Genre",
                    genreListe: {
                      1: "Allgemeinmedizin",
                      2: "Hospitalisierung",
                      3: "Notfall",
                      4: "Beratung",
                      5: "Bewertung",
                      6: "Diagnose",
                      7: "Follow-up",
                      8: "Medizinische Forschung",
                      9: "Fallstudie",
                      10: "Medizinrechtlich",
                      11: "Autopsie",
                      12: "Gesundheitswesen",
                      13: "Andere"
                    },
                    saveBtn: "Speichern",
                    printBtn: "Bericht drucken"
                  }
                },
                rapportInfo: {
                  titleText: "BERICHT",
                  rapportId: "BERICHT ID :",
                  rapportTitre: "TITEL :",
                  sujetText: "THEMA :",
                  dateText: "Datum :",
                  GenreText: "GENRE :",
                  controlCard: {
                    title: "Steuerung",
                    editBtn: "Bearbeiten",
                    printBtn: "Drucken",
                    deleteBtn: "Löschen"
                  }
                },
                editRapport: {
                  editBtn: "Bearbeiten"
                }
            },
            teamPage: {
              interfaceLinkText: 'RDV Schnittstelle',
              infoBtn: 'Info',
              addTeamPage: {
                cin: 'CIN-Karte:',
                nomEtPrenom: 'Name und Vorname:',
                phone: 'Telefon:',
                poste: 'Position:',
                adresse: 'Adresse:',
                saveBtn: 'Speichern',
                rechercheAbyedh: {
                  tabsNames: {
                    enter: 'Eingeben',
                    scan: 'Scannen'
                  },
                  title: 'Suche in der Abyedh-Datenbank',
                  btnText: 'Suche',
                  clicToScan: 'Klicken zum Scannen'
                }
              },
              addPoste: {
                emptyListeText: 'Fügen Sie rechts Positionen hinzu',
                currency: 'D.T',
                cardTitle: 'Position hinzufügen',
                poste: 'Position',
                salaire: 'Gehalt',
                experience: 'Erfahrung erforderlich',
                saveBtn: 'Speichern',
                modifierTitle: 'Position bearbeiten',
                modifierBtn: 'Ändern',
                supprimerModal: {
                  title: 'Familie löschen',
                  confirmText: 'Möchten Sie diese Familie wirklich löschen?',
                  nom: 'Position',
                  desc: 'Beschreibung',
                  deleteBtn: 'Position löschen'
                }
              },
              anavcePage: {
                selectMembre: 'Mitglied auswählen',
                membrePlch: 'Mitglied eingeben',
                montant: 'Betrag',
                montantPlch: 'Wert',
                addBtn: 'Hinzufügen',
                tableaHeader: "'*','Name','Tag', 'Wert','X'",
                deleteModal: {
                  title: 'Vorschuss löschen',
                  confText: 'Möchten Sie diesen Vorschuss wirklich löschen?',
                  valeur: ' Wert:',
                  membre: ' Mitglied:',
                  confirmBtn: 'Löschen'
                }
              },
              presencePage: {
                selectMembre: 'Mitglied auswählen',
                membrePlch: 'Mitglied eingeben',
                genre: 'Typ auswählen',
                presence: 'Anwesenheit',
                absance: 'Abwesenheit',
                date: 'Datum',
                addBtn: 'Hinzufügen'
              },
              teamInfoPage: {
                mainCardText: {
                  verification: 'Überprüfung',
                  telephone: 'Telefon',
                  notVerifier: 'Nicht überprüft'
                },
                TabsCardText: {
                  presence: 'Anwesenheit',
                  avance: 'Vorschüsse',
                  caissePWD: 'Kasse PWD',
                  modifier: 'Ändern',
                  verifier: 'Überprüfen',
                  supprimer: 'Löschen'
                },
                presenceTableaHeders: "'ID','Kunde','Tag','Zeit','Anzeigen'",
                avanceTableaHeders: "'ID','Kunde','Tag','Zeit','Gesamt','Anzeigen'",
                editCard: {
                  cin: 'CIN-Karte',
                  nomEtPrenon: 'Name und Vorname:',
                  phoneNum: 'Telefon ',
                  poste: 'Position:',
                  location: 'Geolokalisierung ',
                  gouv: 'Region auswählen',
                  deleg: 'Abteilung auswählen',
                  adresse: 'Adresse',
                  editBtn: 'Bearbeiten',
                },
                caissePWDData: {
                  identifiant: 'Kennung:',
                  pwd: 'Passwortmodus:',
                  smartID: 'Smart-ID ',
                  editBtn: 'Bearbeiten',
                },
                verificationCard: {
                  isVerifier: 'Dieses Mitglied ist überprüft',
                  searchInAbyedhDB: 'Suche in der Abyedh-Datenbank',
                  nom: 'Name',
                  phone: 'Telefon:',
                  gouv: 'Gouvernement:',
                  deleg: 'Delegation:',
                  verifBtn: 'Überprüfen',
                  searchBtn: 'Suche'
                },
                deleteCard: {
                  mainTitle: 'Möchten Sie dieses Mitglied wirklich löschen?',
                  alertText: 'Beim Löschen eines Mitglieds',
                  conscOne: 'Das Mitglied ist in der "Mitglieder" -Zweig nicht sichtbar',
                  conscTwo: 'Alle mit diesem Mitglied verbundenen Daten können beschädigt werden',
                  conscThree: 'Sie können keine Rechnungen oder Bestellungen mit diesem Mitglied sonst durchführen',
                  deleteBtn: 'Ja, löschen',
                },
              }
            }
        },
        TableHead: {
          seance: "'*','ID','Patient','Krankheit','Grad','Tag','Zeit','Analyse','Rezept','Ansehen'",
          seance: "'*','ID','Patient','Krankheit','Grad','Tag','Zeit','Analyse','Rezept','Ansehen'",
          facture: "'*','ID','Kasse','Kunde','Tag','Zeit','Gesamt','Status','Ansehen'",
          ordonance: "'*','ID','Patient','Datum','Zeit','Sitzung?','Status','Ansehen'",
          seances: "'*','ID','Kasse','Kunde','Tag','Zeit','Status','Ansehen'",
          request: "'*','ID','Kunde', 'Datum','Tabelle','Status','X','Ansehen'",
          reservation: "'*','ID','Patient', 'Vorbei','Volumen','Zeit','Status','Aufgenommen?','Ansehen'",
          menu: "'*','Code', 'Name', 'Art','Kosten','Verkaufspreis','X','Ansehen'",
          stock: "'*','Code', 'Name', 'Art','Preis','Ansehen'",
          camion: "'*','Lastwagen','Kennzeichen', 'Fahrer','Fonds','Einnahmen','X','Ansehen'",
          camionStock: "'Code', 'Name', 'Art','Bestand','Preis','Ansehen'",
          camionFacture: "'ID','Kunde','Tag','Gesamt','Ansehen'",
          camionFond: "'ID','Datum','Gesamt', 'SDF','SCF','Ansehen'",
          client: "'*','Name','Geburt', 'Tel', 'Ort','Adresse','Ansehen'",
          clientCommande: "'ID', 'Vorbei','Volumen','Gesamt','Status','Ansehen'",
          clientFacture: "'ID','Kunde','Tag','Gesamt','Ansehen'",
          clientFactureC: "'ID','Kunde','Tag','Gesamt','Ansehen'",
          team: "'*','Name','Tel', 'CIN','Gestartet', 'Posten','Ansehen'",
          medicammentPage: "'*','Code','Art','Name', 'Dosierung','Form', 'Präsentation','Klasse','Ansehen'",
          fournisseur: "'*','MF','Name','Tel', 'Adresse','Art', 'Tag','Ansehen'"
        },
        BreadCrumb: {
            menuAddPlat: {
                '1': 'Menü',
                '2': 'Gericht hinzufügen'
            },
            menuFamille: {
                '1': 'Menü',
                '2': 'Familien'
            },
            platInfo: {
                '1': 'Menü',
                '2': 'Information'
            },
            forfraitInfo: {
                '1': 'Preis',
                '2': 'Information'
            },
            stockAddArticle: {
                '1': 'Bestand',
                '2': 'Artikel hinzufügen'
            },
            stockFamille: {
                '1': 'Bestand',
                '2': 'Familien'
            },
            stockBE: {
                '1': 'Bestand',
                '2': 'Wareneingang'
            },
            stockBS: {
                '1': 'Bestand',
                '2': 'Warenausgang'
            },
            stockInfo: {
                '1': 'Bestand',
                '2': 'Information'
            },
            factureAjouter: {
                '1': 'Sitzung',
                '2': 'Sitzung hinzufügen'
            },
            factureInfo: {
                '1': 'Sitzung',
                '2': 'Info'
            },
            factureEdit: {
                '1': 'Bericht',
                '2': 'Bearbeiten'
            },
            factureResumer: {
                '1': 'Sitzung',
                '2': 'Zusammenfassung'
            },
            CamionAdd: {
                '1': 'Lastwagen',
                '2': 'Lastwagen hinzufügen'
            },
            CamionAddFond: {
                '1': 'Lastwagen',
                '2': 'Fonds hinzufügen'
            },
            CamionFondInfo: {
                '1': 'Lastwagen',
                '2': 'Info',
                '3': 'Fonds',
                '4': 'Anzeigen'
            },
            CamionEditFond: {
                '1': 'Lastwagen',
                '2': 'Info',
                '3': 'Fonds',
                '4': 'Bearbeiten'
            },
            CamionInv: {
                '1': 'Lastwagen',
                '2': 'Lastwageninventar'
            },
            CamionInfo: {
                '1': 'Lastwagen',
                '2': 'Info'
            },
            CamionArticleInfo: {
                '1': 'Lastwagen',
                '2': 'Info',
                '3': 'Artikel'
            },
            CamionFactureInfo: {
                '1': 'Lastwagen',
                '2': 'Info',
                '3': 'Sitzung',
                '4': 'Anzeigen'
            },
            ClientAdd: {
                '1': 'Patient',
                '2': 'Patient hinzufügen'
            },
            ClientInfo: {
                '1': 'Kunde',
                '2': 'Info'
            },
            ClientMap: {
                '1': 'Kunde',
                '2': 'Karte'
            },
            ClientRegion: {
                '1': 'Kunde',
                '2': 'Regionen'
            },
            RequestInfo: {
                '1': 'Rendezvous',
                '2': 'Info'
            },
            RequestCalendar: {
                '1': 'Rendezvous',
                '2': 'Kalender'
            },
            RequestCompte: {
                '1': 'Bestellungen',
                '2': 'Konten'
            },
            RequestReg: {
                '1': 'Bestellungen',
                '2': 'Gruppierung'
            },
            FournisseurAdd: {
                '1': 'Lieferant',
                '2': 'Gruppierung'
            },
            FournisseurCalendar: {
                '1': 'Lieferant',
                '2': 'Gruppierung'
            },
            FournisseurSearch: {
                '1': 'Lieferant',
                '2': 'Gruppierung'
            },
            FournisseurInfo: {
                '1': 'Lieferant',
                '2': 'Gruppierung'
            },
            TeamAdd: {
                '1': 'Team',
                '2': 'Hinzufügen'
            },
            TeamInfo: {
                '1': 'Team',
                '2': 'Info'
            },
            TeamPoste: {
                '1': 'Team',
                '2': 'Positionen'
            },
            TeamDemande: {
                '1': 'Team',
                '2': 'Arbeitsanforderung'
            }
        },
        SubNavs: {
            request: {
                '1': 'Akzeptiert',
                '2': 'Abgelehnt',
                '3': 'Ausstehend'
            },
            camion: {
                '1': 'Rezept hinzufügen'
            },
            Menu: {
                '1': 'Neuer Bericht'
            },
            Stock: {
                '1': 'Neues Rezept',
                '2': 'Speisefamilien',
                '3': 'Wareneingang',
                '4': 'Warenausgang'
            },
            facture: {
                '1': 'Neue Sitzung',
                '2': 'Zusammenfassung'
            },
            client: {
                '1': 'Neuer Patient'
            },
            Commande: {
                '1': 'Konten',
                '2': 'Kalender'
            },
            Fournisseur: {
                '1': 'Neuer Lieferant',
                '2': 'Kalender',
                '3': 'Suche'
            },
            Equipe: {
                '1': 'Neues Mitglied',
                '2': 'Position',
                '3': 'Fortgeschritten',
                '4': 'Anwesenheit'
            }
        }
    },
}
export default GermanyTrans