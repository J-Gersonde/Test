function renderCodePuzzle(container, content) {
  const box = document.createElement("div");
  box.className = "riddle-box";

  const text = document.createElement("pre");
  text.className = "code-puzzle";
  text.textContent = content;

  box.appendChild(text);
  container.appendChild(box);
}


function renderMemoryCards(container, cards) {
  const box = document.createElement("div");
  box.className = "memory-card-grid";

  cards
    .map((text) => ({ text, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .forEach((card) => {
      const element = document.createElement("div");
      element.className = "memory-card";
      element.textContent = card.text;
      box.appendChild(element);
    });

  container.appendChild(box);
}


const puzzles = [

  /* =====================================================
     KAPITEL 1 – LEERZEICHENRÄTSEL
     ===================================================== */

{
  id: "space-puzzle",

  chapter: 1,

  title: "Der Anfang",

  narrative: [
  "Es war einmal ein junger Mann namens Gax, der an Halloween als Luigi verkleidet feiern ging.",

  "Am nächsten Morgen erwachte er in seinem eigenen Bett. Sein Kostüm war zerrissen, seine Schuhe verschwunden und in seiner Hosentasche lagen ein Kirchenzettel, ein seltsamer Schlüssel und zwei Radmuttern.",

  "Gax wusste weder, woher diese Dinge kamen, noch wie er nach Hause gelangt war. Seine letzte klare Erinnerung führte ihn zu Celine, bei der der Abend mit Jan, Finlay, Elli, Sandra und Nick begonnen hatte.",

  "Dort standen Becher auf dem Tisch, Musik lief durch das Zimmer und eine harmlose Runde Bierpong wurde vorbereitet. Noch ahnte niemand, dass diese Nacht später kaum jemand vollständig erklären konnte.",

  "Gax versuchte angestrengt, sich an die letzten Minuten vor seinem Gedächtnisverlust zu erinnern. Doch in seinem Kopf erschienen nur einzelne Wörter, Namen und Gegenstände ohne erkennbaren Zusammenhang.",

  "In seinen Notizen fand sich schließlich ein seltsamer Eintrag aus scheinbar zusammenhanglosen Wortpaaren."
],

  question:
    "Lösungswort",

  solution: "VORGLÜHEN",

  answers: [
    "VORGLÜHEN",
    "VORGLUEHEN",
    "VORGLUHEN"
  ],

  hints: [
    "Die Wahrheit liegt nicht immer in den Worten.",
    "Achtet auf die Abstände zwischen den beiden Wörtern jeder Zeile.",
    "Zählt die Leerzeichen jeder Zeile und wandelt die Anzahl mit A = 1, B = 2, C = 3 … in Buchstaben um."
  ],

  storyTitle:
    "Das Vorglühen bei Celine",

  story: [
    "Langsam kehrte die erste Erinnerung zurück.",

    "Alles hatte beim Vorglühen bei Celine begonnen. Auf dem Tisch standen Becher, Getränke und ein Bierpongfeld, das bereits auf die erste Runde wartete.",

    "Gespielt wurde nach den gefürchteten Gersondischen Hausregeln, deren genaue Bedeutung niemand vollständig verstand. Man wusste nur: Wer verlor, trank. Wer gewann, trank ebenfalls. Und wer nachfragte, musste doppelt trinken.",

    "Jan, der als Mario verkleidet war, beobachtete seinen Bruder bereits nach den ersten Runden mit wachsender Sorge.",

    "„Gax, mach langsam“, sagte er.",

    "Doch Gax hob seinen Becher, grinste in die Runde und antwortete: „Luigi macht niemals langsam.“",

    "Von diesem Moment an begann sein Absturz."
  ],

  nextLocation: {
    title: "Nächster Ort",
    text: "Begebt euch jetzt zur Bushaltestelle.",
    buttonText: "Angekommen"
  },

  puzzleData: [
    { left: "BECHER", right: "NACHT", spaces: 22 },
    { left: "MARIO", right: "PEACH", spaces: 15 },
    { left: "BALL", right: "TISCH", spaces: 18 },
    { left: "LUIGI", right: "LANGSAM", spaces: 7 },
    { left: "CELINE", right: "PARTY", spaces: 12 },
    { left: "BIER", right: "BUS", spaces: 21 },
    { left: "JAN", right: "WARNUNG", spaces: 5 },
    { left: "HAUSREGEL", right: "DOPPELT", spaces: 8 },
    { left: "GEWINNER", right: "TRINKT", spaces: 5 },
    { left: "ANFANG", right: "ENDE", spaces: 14 }
  ],

  renderPuzzle(container, puzzle) {
    const puzzleBox = document.createElement("div");
    puzzleBox.className = "riddle-box";

    const puzzleText = document.createElement("pre");
    puzzleText.className = "space-puzzle";

    const lines = puzzle.puzzleData.map((line) => {
      return (
        line.left +
        " ".repeat(line.spaces) +
        line.right
      );
    });

    puzzleText.textContent = lines.join("\n");

    puzzleBox.appendChild(puzzleText);
    container.appendChild(puzzleBox);
  }
},

  /* =====================================================
     KAPITEL 2 – DIE FAHRT
     ===================================================== */

  {
    id: "bus-puzzle",

    chapter: 2,

    title: "Die Fahrt",

    narrative: [
      "Nachdem das letzte Bierpongspiel beendet war, machte sich die Gruppe auf den Weg zur Halloweenparty. Es war bereits dunkel geworden, als Jan, Celine, Finlay, Elli, Sandra, Nick und Gax gemeinsam in den Bus stiegen.",

      "Anfangs verlief die Fahrt erstaunlich unspektakulär. Gax setzte sich ans Fenster und beobachtete die vorbeiziehenden Straßen. Er war leise still, was nach dem Vorglühen vermutlich niemand erwartet hätte.",

      "Jan und Celine unterhielten sich noch über den Abend. Allerdings jedoch beteiligte sich Gax nicht an dem Gespräch.",

      "Stattdessen blickte er nach draußen. Dort gab es tatsächlich wirklich nichts Besonderes zu sehen.",

      "Einige Minuten später wirkte Gax eigentümlich seltsam angespannt. Sein Blick blieb plötzlich an etwas außerhalb des Busses hängen.",

      "Dann richtete er sich rasch schnell auf seinem Sitz auf. Jan fragte noch, was eigentlich los sei.",

      "Gax starrte noch weiterhin durch die Scheibe, als hätte er dort etwas entdeckt, das sonst niemand bemerkte.",

      "Einen Augenblick später drehte er sich erneut wieder zum Fenster.",

      "Was danach geschah, konnte später niemand mehr vernünftig erklären."
    ],

    question:
      "Lösungswort",

    solution: "LATERNE",

    answers: [
      "LATERNE",
      "EINE LATERNE",
      "STRASSENLATERNE",
      "STRASSEN LATERNE"
    ],

    hints: [
      "Im Text ist nichts zufällig doppelt.",
      "Achtet auf Stellen, an denen zwei Wörter fast dasselbe bedeuten.",
      "Nehmt aus jeder dieser Doppelungen das erste Wort und lest die Anfangsbuchstaben."
    ],

    storyTitle:
      "Die Laternen",

    story: [
      "Gax' Erinnerung wurde klarer.",

      "Er hatte tatsächlich minutenlang aus dem Fenster gestarrt. Dann sah er eine Straßenlaterne.",

      "„Was guckst du so?“, schrie er plötzlich durch den Bus.",

      "Bei der nächsten Laterne sprang er auf.",

      "„Die Laternen verfolgen mich!“",

      "Als sich an der nächsten Haltestelle die Türen öffneten, rannte Gax hinaus in die dunkle Nacht.",

      "Das war das letzte Mal, dass ihn alle gemeinsam gesehen hatten."
    ],

    nextLocation: {
      title: "Nächster Ort",
      text: "Gax verschwand allein in der Nacht. Seine nächste Spur führt euch zum W3.",
      buttonText: "Angekommen"
    },

    /* Der Erzähltext selbst ist das Rätsel. */
    renderPuzzle() {}
  },

  /* =====================================================
     KAPITEL 3 – VOR DEM CLUB
     ===================================================== */

  {
    id: "w3-puzzle",
    chapter: 3,
    title: "Vor dem Club",
    narrative: [
      "Eine Zeit lang verlor sich Gax’ Spur vollständig. Während die anderen weiter zur Halloweenparty gingen, irrte Luigi offenbar allein durch die Nacht.",
      "Erst später erinnerte sich Sandra daran, Gax noch einmal gesehen zu haben. In der Nähe des W3 entdeckte sie eine bekannte Gestalt: grüne Mütze, blaue Latzhose und den Blick eines Mannes, der nicht mehr ganz wusste, was er tat.",
      "Gax stand dort allein, hielt seinen Ausweis in der Hand und diskutierte offenbar mit jemandem über seinen Einlass. Er zeigte seinen Ausweis, wartete, zeigte ihn erneut und schüttelte schließlich enttäuscht den Kopf.",
      "Auf Gax’ Handy fand sich am nächsten Morgen lediglich diese merkwürdige Notiz:"
    ],
    question: "Lösungswort",
    solution: "GETRAENKEAUTOMAT",
    answers: [
      "GETRÄNKEAUTOMAT",
      "GETRAENKEAUTOMAT",
      "GETRANKEAUTOMAT",
      "EIN GETRÄNKEAUTOMAT"
    ],
    hints: [
      "Die Lösung steckt nicht nur auf dem Bildschirm.",
      "Euer aktueller Standort kann auch als Schlüssel verstanden werden.",
      "Probiert eine Caesar-Verschiebung um 3."
    ],
    storyTitle: "Der strengste Türsteher der Stadt",
    story: [
      "Sandra hatte Gax tatsächlich vor einem Getränkeautomaten gefunden.",
      "Immer wieder hielt er seinen Ausweis gegen die Scheibe und wartete geduldig auf eine Reaktion.",
      "„Gax, was machst du da?“, fragte Sandra. Gax deutete auf den Automaten: „Der Türsteher ist streng.“",
      "Sandra brauchte einige Sekunden, um zu verstehen, dass Gax versuchte, sich von einem Getränkeautomaten in den Club lassen zu lassen.",
      "Wie auch immer er es geschafft hatte: Wenig später war Gax tatsächlich im Club. Und dort sollte seine Nacht endgültig außer Kontrolle geraten."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zur Stadthalle.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container, "JHWUDHQNHDXWRPDW");
    }
  },

  /* =====================================================
     KAPITEL 4 – LUIGI WURDE AUSGEWÄHLT
     ===================================================== */

  {
    id: "playlist-puzzle",
    chapter: 4,
    title: "Luigi wurde ausgewählt",
    narrative: [
      "Drinnen war der Club inzwischen voll. Lichtblitze zogen durch den Raum, die Musik war laut und zwischen den Halloweenkostümen verlor man schnell den Überblick.",
      "Gax stand wenig später mitten auf der Tanzfläche. Was dort geschah, konnte niemand eindeutig erklären. Finlay traf ihn einige Minuten später grinsend an der Bar wieder.",
      "„Was ist passiert?“, fragte er. Gax blickte zufrieden durch den Raum: „Luigi wurde ausgewählt.“",
      "Am nächsten Morgen fand sich auf Gax’ Handy eine automatisch von Shazam erstellte Playlist."
    ],
    question: "Lösungswort",
    solution: "GEBLASEN",
    answers: ["GEBLASEN", "ER WURDE GEBLASEN", "GAX WURDE GEBLASEN"],
    hints: [
      "Nicht die Künstler erzählen euch, was passiert ist.",
      "Achtet darauf, wie die einzelnen Songtitel beginnen.",
      "Lest die ersten Buchstaben der acht Songtitel von oben nach unten."
    ],
    storyTitle: "Luigi wurde ausgewählt",
    story: [
      "Langsam setzte sich der nächste Teil der Nacht zusammen.",
      "Mitten auf der Tanzfläche war eine fremde Person auf Gax zugekommen. Was dort zwischen Musik, Nebel und Licht geschah, blieb schwer zu erklären.",
      "Fest stand nur: Gax wurde auf der Tanzfläche geblasen.",
      "Einige Minuten später fand Finlay ihn grinsend an der Bar. Gax blickte stolz in die Ferne: „Luigi wurde ausgewählt.“",
      "Kurz darauf begegnete Gax jemandem, der ihn deutlich besser kannte, als ihm in diesem Zustand lieb sein konnte."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zum Café Schilling am Bahnhof.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`SHAZAM – HALLOWEEN

01  Geiles Leben – Glasperlenspiel
02  Ein Kompliment – Sportfreunde Stiller
03  Bilder im Kopf – Sido
04  Lieblingsmensch – Namika
05  Atemlos durch die Nacht – Helene Fischer
06  Schrei nach Liebe – Die Ärzte
07  Einmal um die Welt – CRO
08  Nur noch kurz die Welt retten – Tim Bendzko`);
    }
  },

  /* =====================================================
     KAPITEL 5 – WER KENNT GAX BESSER?
     ===================================================== */

  {
    id: "nokia-puzzle",
    chapter: 5,
    title: "Wer kennt Gax besser?",
    narrative: [
      "Gax hatte die Tanzfläche verlassen und tauchte irgendwann in der Nähe des Bahnhofs auf. Dort traf er eine Person, die ihn offenbar ziemlich gut kannte.",
      "Was zunächst wie ein normales Gespräch aussah, entwickelte sich schnell zu einer vollkommen unnötigen Diskussion: Wer kennt Gax eigentlich besser?",
      "Am nächsten Morgen fand sich auf seinem Handy eine merkwürdige Zahlenfolge. Niemand wusste, warum er sie gespeichert hatte."
    ],
    question: "Gesuchte Person",
    solution: "ES WAR SEINE EX",
    answers: ["EX", "SEINE EX", "ES WAR SEINE EX", "EXFREUNDIN", "EX FREUNDIN"],
    hints: [
      "Diese Zahlen wurden früher öfter gedrückt als heute.",
      "Denkt an eine alte Handytastatur. Gleiche Zahlen gehören zusammen.",
      "Nach dem Entschlüsseln ist die Reihenfolge noch nicht richtig. Aus den Buchstaben entsteht ein Satz aus vier Wörtern."
    ],
    storyTitle: "Es war seine Ex",
    story: [
      "Langsam wurde klar, mit wem Gax sich angelegt hatte: Es war seine Ex.",
      "Was als kurzes Gespräch begonnen hatte, entwickelte sich schnell zu einem völlig unnötigen Streit darüber, wer Gax besser kannte.",
      "Gax sah das selbstverständlich anders: „Niemand kennt Luigi besser als Luigi.“",
      "Irgendwann trennten sich ihre Wege. Die nächste bestätigte Sichtung von Gax sollte deutlich schwerer zu erklären sein."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zum Hotel Gärtner.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container, "7777 33 777 9 2 33 7777 66 444 33 99 33");
    }
  },

  /* =====================================================
     KAPITEL 6 – EIN UNGEWÖHNLICHER GAST
     ===================================================== */

  {
    id: "sensor-puzzle",
    chapter: 6,
    title: "Ein ungewöhnlicher Gast",
    narrative: [
      "Wie Gax vom Club bis zum Hotel gekommen war, konnte später niemand nachvollziehen. Fest stand nur, dass er mitten in der Nacht im Hotel Gärtner auftauchte.",
      "Die Kamera im Eingangsbereich hatte keine Bilder gespeichert. Das Sicherheitssystem hatte jedoch die Zustände von fünf Sensoren aufgezeichnet."
    ],
    question: "Gesuchter Zustand",
    solution: "NACKT",
    answers: ["NACKT", "SPLITTERNACKT", "ER WAR NACKT", "HALBNACKT"],
    hints: [
      "Nicht alles, was aus 0 und 1 besteht, ist Binärcode.",
      "Betrachtet jeden Sensor einzeln von oben nach unten. Ersetzt die beiden Zustände durch A und B. Fünf Zeichen können einen Buchstaben ergeben.",
      "Lest die Spalten statt der Zeilen. Setzt 0 = A und 1 = B und entschlüsselt die entstehenden 5er-Gruppen mit der Bacon-Chiffre."
    ],
    storyTitle: "Nackt in der Hotellobby",
    story: [
      "Jetzt wurde klar, warum der Mitarbeiter an der Rezeption nicht gerne über die Nacht sprach: Gax war splitternackt in der Hotellobby aufgetaucht.",
      "Nick hatte ihn hinter einer künstlichen Palme gesehen. Mit deren Blättern versuchte Gax sich zu bedecken und nannte jeden vorbeilaufenden Gast „Laterne“.",
      "In seiner Hand hielt er einen Schlüssel, von dem er überzeugt war, dass er zu einem Hotelzimmer gehörte. Das Problem: Der Schlüssel gehörte überhaupt nicht zum Hotel."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zur Eisdiele Adria.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`          S1  S2  S3  S4  S5
02:41:01   0   0   0   0   1
02:41:02   1   0   0   1   0
02:41:03   1   0   0   0   0
02:41:04   0   0   1   1   1
02:41:05   1   0   0   0   1`);
    }
  },

  /* =====================================================
     KAPITEL 7 – DER FALSCHE SCHLÜSSEL
     ===================================================== */

  {
    id: "braille-puzzle",
    chapter: 7,
    title: "Der falsche Schlüssel",
    narrative: [
      "Am nächsten Morgen lag der merkwürdige Schlüssel noch immer zwischen den Fundstücken. Gax war sich sicher: „Hotelzimmer.“ Der Mitarbeiter des Hotels widersprach sofort.",
      "An dem Schlüssel hing ein stark beschädigter Anhänger. Die Vorderseite war zerkratzt, auf der Rückseite waren dagegen noch einige Vertiefungen zu erkennen."
    ],
    question: "Gesuchter Gegenstand",
    solution: "SPIND",
    answers: ["SPIND", "CLUBSPIND", "GARDEROBENSPIND", "EIN SPIND"],
    hints: [
      "Zehn Spalten sind vielleicht nicht zehn einzelne Zeichen.",
      "Teilt das Muster in fünf Felder mit jeweils 2 × 3 Punkten. Für genau so ein Raster gibt es ein bekanntes Schriftsystem.",
      "Es handelt sich um Brailleschrift. Ihr betrachtet den Anhänger von der Rückseite. Spiegelt das gesamte Muster horizontal und lest die fünf Zeichen."
    ],
    storyTitle: "Der Schlüssel zum Spind",
    story: [
      "Jetzt wurde klar, warum der Schlüssel zu keinem Hotelzimmer passte. Er gehörte zu einem Spind im Club.",
      "Wie Gax an ihn gekommen war, blieb ungeklärt. Damit ließ sich zumindest eines der seltsamen Fundstücke erklären.",
      "Doch Nick erinnerte sich an zwei Gestalten, deren Halloweenkostüme Gax für vollkommen echt hielt."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zum Heimatmuseum.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`● ● ● ● ● ○ ● ● ● ○
● ○ ● ○ ○ ● ○ ● ○ ●
○ ○ ○ ● ○ ○ ○ ● ○ ●`);
    }
  },

  /* =====================================================
     KAPITEL 8 – LUIGI GEGEN DAS UNBEKANNTE
     ===================================================== */

  {
    id: "elements-puzzle",
    chapter: 8,
    title: "Luigi gegen das Unbekannte",
    narrative: [
      "Nach dem Hotel begegnete Gax zwei Gestalten: einer grünen Figur mit riesigen schwarzen Augen und einer kreidebleichen Person mit Umhang und Fangzähnen.",
      "Für jeden normalen Menschen waren es ein Alien- und ein Vampirkostüm. Für Gax arbeiteten die beiden zusammen. Er ging hinter einem Mülleimer in Deckung und entwickelte einen Verteidigungsplan für Holzgerlingen.",
      "Am nächsten Morgen fand sich auf seinem Handy ein Eintrag mit dem Titel LUIGI DEFENCE LOG."
    ],
    question: "Gesuchte Gegenstände",
    solution: "BESEN UND KNOBLAUCHSOSSE",
    answers: [
      "BESEN UND KNOBLAUCHSOSSE",
      "BESEN KNOBLAUCHSOSSE",
      "BESEN UND KNOBLAUCHSOßE",
      "BESEN KNOBLAUCHSOßE"
    ],
    hints: [
      "Die Zahlen sollen nicht miteinander verrechnet werden. Einige davon sind für gewöhnliche Codes ziemlich hoch.",
      "Alle wichtigen Zahlen liegen zwischen 1 und 118. Es gibt eine bekannte Tabelle, in der jede Zahl in diesem Bereich eindeutig etwas bezeichnet.",
      "Die Zahlen sind Ordnungszahlen im Periodensystem. Sucht zu jeder Zahl das Elementsymbol und nehmt jeweils den ersten Buchstaben."
    ],
    storyTitle: "Luigis Verteidigungsplan",
    story: [
      "Gax hatte einen Besen aufgetrieben und hielt ihn wie ein mittelalterliches Schwert vor sich.",
      "Dann entdeckte er einen kleinen Becher Knoblauchsoße, tauchte die Spitze des Besens hinein und stürmte mit „MAMMA MIA!“ los.",
      "Das Alien wich aus, der Vampir brach vor Lachen zusammen und Knoblauchsoße flog über den Gehweg.",
      "Gax hob den Besen triumphierend: „Holzgerlingen ist sicher.“ Dann lief er davon. Kurz darauf hörte Nick ein metallisches Scheppern und Gax rief: „MARIO KART!“"
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zum Cap.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`LUIGI DEFENCE LOG

BEDROHUNG A
05 99 16 99 07

BEDROHUNG V
19 07 08 05 03 18 92 06 01 16 08 16 16 99

MISSION: HOLZGERLINGEN RETTEN`);
    }
  },

  /* =====================================================
     KAPITEL 9 – RAINBOW ROAD HOLZGERLINGEN
     ===================================================== */

  {
    id: "grid-puzzle",
    chapter: 9,
    title: "Rainbow Road Holzgerlingen",
    narrative: [
      "Nick sah zunächst Gax, dann etwas Metallisches und wenige Sekunden später bewegten sich beide erstaunlich schnell bergab.",
      "Gax hatte etwas gefunden, das für jeden normalen Menschen ungeeignet gewesen wäre, um damit durch Holzgerlingen zu fahren.",
      "Am nächsten Morgen fand sich auf seinem Handy eine Aufzeichnung mit dem Titel LUIGI GRAND PRIX. Die Startposition fehlte; alle vier Runden begannen jedoch am selben Feld."
    ],
    question: "Gesuchter Gegenstand",
    solution: "EINKAUFSWAGEN",
    answers: ["EINKAUFSWAGEN", "EIN EINKAUFSWAGEN", "EINKAUFS WAGEN"],
    hints: [
      "Die Pfeile gehören zum Buchstabenfeld.",
      "Euer Startpunkt befindet sich in der 4. Reihe.",
      "Alle vier Runden beginnen auf demselben Feld."
    ],
    storyTitle: "Luigis neues Kart",
    story: [
      "Gax war über einen Einkaufswagen gestolpert. Für ihn war es Luigis neues Kart.",
      "Er prüfte die Räder, nannte das Quietschen „Sportauspuff“, kletterte hinein und zählte herunter.",
      "Der Wagen wurde schneller. Gax sang Mario-Kart-Musik, rief „DRIFT!“, duckte sich vor einer Laterne und verschwand schließlich aus Nicks Blickfeld.",
      "Die nächste Spur führte zu einer Tankstelle, wo Gax mit seinem Einkaufswagen und ohne Schuhe wieder auftauchte."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zur HEM-Tankstelle.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`LUIGI GRAND PRIX
STARTPOSITION: ?

RUNDE 1  ↑ ↑ →
RUNDE 2  → → ↑
RUNDE 3  ↓ ← ←
RUNDE 4  ← ↑ ←

    1  2  3  4  5  6
1   T  R  O  P  L  Y
2   C  H  N  K  B  M
3   N  E  I  R  F  O
4   D  G  E  A  U  T
5   A  W  S  L  P  H
6   M  O  B  C  D  Y

„Pole Position ist was für Feiglinge.“`);
    }
  },

  /* =====================================================
     KAPITEL 10 – EIN FAIRER TAUSCH
     ===================================================== */

  {
    id: "ean-puzzle",
    chapter: 10,
    title: "Ein fairer Tausch",
    narrative: [
      "Gax erreichte die HEM-Tankstelle mit seinem Einkaufswagen und lenkte direkt auf eine Zapfsäule zu. „Einmal vollmachen.“ Der Mitarbeiter erklärte ihm, dass ein Einkaufswagen weder Diesel noch Super Plus brauche.",
      "Nach einer längeren Diskussion schlug Gax einen Tausch vor. Im Kassensystem fand sich später ein Fehlerprotokoll: Bei sieben Einträgen fehlte jeweils die letzte Ziffer des Codes."
    ],
    question: "Gesuchter Gegenstand",
    solution: "KUERBIS",
    answers: ["KÜRBIS", "KUERBIS", "KURBIS", "EIN KÜRBIS"],
    hints: [
      "Die letzte Stelle eines EAN-13-Codes ist keine zufällige Zahl. Sie hat eine besondere Funktion.",
      "Berechnet die fehlenden Prüfziffern. Ihr solltet auf 4 – 3 – 3 – 5 – 4 – 2 – 3 kommen.",
      "Benutzt jede Prüfziffer als Position in der Artikelbezeichnung derselben Zeile und lest die Buchstaben von oben nach unten."
    ],
    storyTitle: "Kart gegen Ei",
    story: [
      "Gax hatte tatsächlich versucht, seinen Einkaufswagen einzutauschen. Neben dem Eingang entdeckte er einen Kürbis.",
      "„Das ist ein Ei“, erklärte er. Der Mitarbeiter wollte nur, dass die Zapfsäule frei wurde, und akzeptierte schließlich: „Ja. Von mir aus.“",
      "Gax übergab sein „Kart“, setzte sich mit dem Kürbis auf den Bordstein und begann ihn auszubrüten.",
      "Er legte sein Ohr an den Kürbis. Stille. „Er schläft.“ Dann steckte er ihn unter sein Oberteil: „Papa ist da.“",
      "Schließlich beschloss Gax, einen Zauberer zu suchen, der das vermeintliche Ei zum Schlüpfen bringen konnte."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zur Mauritiuskirche.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`HEM – KASSENSYSTEM
TRANSAKTION 03:34

PARKTICKET       013389083863?
KAUGUMMI         812191361939?
ENERGYDRINK      346247510799?
MINERALWASSER    118384251354?
KLEBEBAND        433036541458?
EISKAFFEE        655698169340?
WASCHANLAGE      572628498776?

STATUS: PRÜFUNG FEHLGESCHLAGEN`);
    }
  },

  /* =====================================================
     KAPITEL 11 – NÄCHTLICHER BESUCH
     ===================================================== */

  {
    id: "pulse-puzzle",
    chapter: 11,
    title: "Nächtlicher Besuch",
    narrative: [
      "Wie Gax auf die Idee kam, mitten in der Nacht mit einem Kürbis eine Kirche aufzusuchen, konnte niemand erklären. Er selbst behauptete: „Es war ein medizinischer Notfall.“",
      "Seine Smartwatch hatte während des Aufenthalts sieben ungewöhnlich hohe Pulswerte gespeichert. Die Aufzeichnung begann genau in dem Moment, als Gax jemanden im Inneren entdeckte."
    ],
    question: "Gesuchte Person",
    solution: "GANDALF",
    answers: ["GANDALF", "GANDALF DER GRAUE", "ZAUBERER"],
    hints: [
      "Nicht nur die sieben Messungen sind Teil der Aufzeichnung.",
      "Gax’ persönlicher Ruhepuls von 60 BPM könnte helfen, die ungewöhnlichen Werte zu normalisieren.",
      "Zieht von jedem Messwert 60 ab. Die entstehenden Zahlen lassen sich mit einer bekannten Zeichencodierung in Buchstaben übersetzen."
    ],
    storyTitle: "Gandalf in der Kirche",
    story: [
      "Im Inneren der Kirche hatte Gax einen älteren Priester mit langem Gewand und weißem Bart entdeckt. Für Gax war er Gandalf.",
      "Gax hielt ihm den Kürbis entgegen: „Es schlüpft nicht.“ Der Priester antwortete: „Das ist ein Kürbis.“",
      "Als Elli auftauchte, erklärte sie: „Das ist der Pfarrer.“ Gax blieb überzeugt und verlangte schließlich: „DU KOMMST NICHT VORBEI!“",
      "Elli zog ihn nach draußen. Der Priester, Elli und vermutlich auch sein Körper rieten Gax, endlich nach Hause zu gehen."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zum P+R am Bahnhof.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`SMARTWATCH – HERZFREQUENZ
Persönlicher Ruhepuls: 60 BPM

03:56:12     131 BPM
03:56:19     125 BPM
03:56:27     138 BPM
03:56:34     128 BPM
03:56:41     125 BPM
03:56:49     136 BPM
03:56:56     130 BPM

7 ungewöhnliche Messwerte erkannt.`);
    }
  },

  /* =====================================================
     KAPITEL 12 – DIE HEIMFAHRT
     ===================================================== */

  {
    id: "polybius-puzzle",
    chapter: 12,
    title: "Die Heimfahrt",
    narrative: [
      "Gax erreichte den Parkplatz am Bahnhof, noch immer mit seinem Kürbis. Jetzt hatte er eine wichtigere Mission: sein Auto finden.",
      "Nach mehreren Versuchen blieb er vor einem Wagen stehen. „Yesss.“ Auf seinem Handy fand sich später ein beschädigtes Fahrzeugprofil mit fünf Positionsangaben."
    ],
    question: "Gesuchter Name",
    solution: "YOSHI",
    answers: ["YOSHI", "YOSCHI"],
    hints: [
      "Ein Parkplatz kann mehr sein als eine Liste von Stellplätzen. Betrachtet die Angaben als Positionen in einem Raster.",
      "Ihr benötigt fünf Reihen und fünf Plätze. 25 Felder reichen fast für das gesamte Alphabet.",
      "Schreibt das Alphabet in ein 5×5-Raster. I und J teilen sich ein Feld. Die erste Zahl gibt die Reihe an, die zweite den Platz."
    ],
    storyTitle: "Yoshi mit zwei Rädern",
    story: [
      "Gax hatte sein Auto Yoshi getauft. Als er darum herumging, bemerkte er: Dem Wagen fehlten zwei Räder.",
      "„Ein Auto braucht vier“, sagte ein Passant. Gax zeigte auf die verbliebenen Räder: „Ein Fahrrad hat auch nur zwei.“",
      "Er schnallte den Kürbis auf dem Beifahrersitz an und startete. Das Auto bewegte sich zehn Zentimeter und antwortete mit einem lauten KRKRKRKR.",
      "Zum ersten Mal in dieser Nacht traf Gax eine vernünftige Entscheidung: Er ließ das Auto stehen und bestellte ein Taxi."
    ],
    nextLocation: {
      title: "Nächster Ort",
      text: "Die nächste Spur führt euch zur legendären roten Garage.",
      buttonText: "Angekommen"
    },
    renderPuzzle(container) {
      renderCodePuzzle(container,
`FAHRZEUGPROFIL
NAME:

Reihe 5 / Platz 4
Reihe 3 / Platz 4
Reihe 4 / Platz 3
Reihe 2 / Platz 3
Reihe 2 / Platz 4

„Er bringt mich heim.“`);
    }
  },

  /* =====================================================
     KAPITEL 13 – LETZTE ETAPPE
     ===================================================== */

  {
    id: "logic-puzzle",
    chapter: 13,
    title: "Letzte Etappe",
    narrative: [
      "An der roten Garage beschloss Gax, keinen Meter mehr zu laufen, und bestellte ein Taxi. Zuerst setzte er den Kürbis auf den Rücksitz und schnallte ihn an: „Der Kleine wird schnell reisekrank.“",
      "Vor seinem Zuhause nannte der Fahrer den Preis. Gax hatte weder Bargeld noch Karte, aber angeblich „etwas Besseres“.",
      "Das beschädigte Sprachsystem rekonstruierte acht mögliche Angebote und neun Aussagen. Gax bot genau drei Dinge an; genau zwei Aussagen sind fehlerhaft."
    ],
    question: "Gesuchte drei Angebote",
    solution: "KUERBIS SCHLUESSEL RITTERSCHLAG",
    answers: [
      "KÜRBIS SCHLÜSSEL RITTERSCHLAG",
      "KÜRBIS, SCHLÜSSEL UND RITTERSCHLAG",
      "KUERBIS SCHLUESSEL RITTERSCHLAG",
      "KUERBIS UND SCHLUESSEL UND RITTERSCHLAG"
    ],
    hints: [
      "Zwei der neun Aussagen führen euch in die falsche Richtung. Die richtige Kombination sorgt dafür, dass genau sieben Aussagen stimmen.",
      "Aussage 1 und Aussage 4 können niemals gleichzeitig wahr sein. Mindestens eine davon ist fehlerhaft.",
      "Wenn Aussage 3 und 8 stimmen, haben Kirchenzettel, Luigi-Mütze und Radmuttern denselben Status. Neben Aussage 1 oder 4 darf nur eine weitere Aussage falsch sein."
    ],
    storyTitle: "Sir Taxalot",
    story: [
      "Gax bot dem Fahrer zuerst den Kürbis an: „Sehr selten.“ Danach den Schlüssel: „VIP-Schlüssel.“ Beides lehnte der Fahrer ab.",
      "Schließlich legte Gax ihm eine Hand auf die Schulter und verlieh ihm feierlich den Titel „SIR TAXALOT“.",
      "Der Fahrer warf ihn hinaus. Gax stand endlich vor seinem Zuhause – nach einer Nacht voller Laternen, Aliens, Gandalf und einem vermeintlichen Kürbisei.",
      "Einige Stunden später klingelte es. Vor der Tür standen ein Alien, ein Vampir und ein ziemlich wütender Hotelmitarbeiter. Einer der drei hielt etwas in der Hand, das Gax verdächtig bekannt vorkam."
    ],
    renderPuzzle(container) {
      renderCodePuzzle(container,
`MÖGLICHE ANGEBOTE
KÜRBIS · SCHLÜSSEL · RITTERSCHLAG · BESEN
RADMUTTERN · KIRCHENZETTEL · KNOBLAUCHSOSSE · LUIGI-MÜTZE

1. Von Ritterschlag, Radmuttern und Kirchenzettel wurde genau eines angeboten.
2. Von Schlüssel und Knoblauchsoße wurde genau eines angeboten.
3. Kirchenzettel und Luigi-Mütze wurden beide oder beide nicht angeboten.
4. Von Ritterschlag, Radmuttern und Kirchenzettel wurden genau zwei angeboten.
5. Von Schlüssel, Radmuttern und Kirchenzettel wurde genau eines angeboten.
6. Von Kürbis, Ritterschlag und Besen wurde genau eines angeboten.
7. Von Kürbis, Ritterschlag und Radmuttern wurden genau zwei angeboten.
8. Radmuttern und Luigi-Mütze wurden beide oder beide nicht angeboten.
9. Von Schlüssel, Ritterschlag und Besen wurden genau zwei angeboten.`);
    }
  },

  /* =====================================================
     KAPITEL 14 – UNGEBETENER BESUCH
     ===================================================== */

  {
    id: "archive-puzzle",
    chapter: 14,
    title: "Ungebetener Besuch",
    narrative: [
      "Gax saß mit Jan, Celine, Finlay, Elli, Sandra und Nick zwischen den Fundstücken der Nacht, als es klingelte.",
      "Vor der Tür standen der Alien, der Vampir und der Hotelmitarbeiter. Der Alien zeigte auf den Knoblauchfleck, der Hotelmitarbeiter hielt ein Stück Plastikpalme und der Vampir einen unbekannten Gegenstand.",
      "Gax’ Türkamera hatte nur vier merkwürdige Referenzen gespeichert. Darunter stand: OBJEKT NICHT ERKANNT."
    ],
    question: "Gesuchter Gegenstand",
    solution: "HOSE",
    answers: ["HOSE", "GAX HOSE", "GAX' HOSE", "SEINE HOSE", "GAX’ HOSE"],
    hints: [
      "Für dieses Rätsel habt ihr alles bereits gefunden.",
      "Die Zahlen sind keine Uhrzeiten. Die erste Zahl verweist auf etwas, das ihr schon abgeschlossen habt.",
      "Erste Zahl = Kapitel. Zweite Zahl = Buchstabenposition in dessen Lösung. Nutzt eure alten Lösungen und lest die vier Buchstaben der Reihe nach."
    ],
    storyTitle: "Die menschliche Hülle",
    story: [
      "Der Vampir hielt tatsächlich Gax’ Hose in der Hand. Gax fragte: „Warum hast du meine Hose?“ – „Das wollte ich eigentlich dich fragen.“",
      "Der Alien erklärte: „Du hast geschrien: Nimm meine menschliche Hülle, aber verschone das Königreich!“",
      "Bald redeten alle gleichzeitig über Getränkeautomaten, Bosskämpfe, Gandalf und Luigis Auswahl. Gax zählte seine absurde Nacht an den Fingern ab und urteilte: „Eigentlich stabile Nacht.“",
      "Als die Besucher gingen, sah Gax gegenüber eine einzelne Straßenlaterne. Er erstarrte und kniff die Augen zusammen: „Du.“"
    ],
    renderPuzzle(container) {
      renderCodePuzzle(container,
`TÜRKAMERA – OBJEKT NICHT ERKANNT

12:04
03:13
07:01
05:01`);
    }
  },

  /* =====================================================
     KAPITEL 15 – DIE LETZTE OFFENE SPUR
     ===================================================== */

  {
    id: "final-puzzle",
    chapter: 15,
    title: "Die letzte offene Spur",
    narrative: [
      "Nachdem der Vampir seine Hose zurückgebracht hatte, schien die Nacht vollständig rekonstruiert zu sein. Zumindest behauptete Jan das.",
      "Sandra hatte die wichtigsten Momente noch einmal zusammengestellt, doch alle Erinnerungsfetzen waren durcheinandergeraten.",
      "In den Karten stecken sieben Momente der vergangenen Nacht. Findet heraus, welche drei Karten jeweils zusammengehören. Eine Karte bleibt übrig."
    ],
    question: "Übrig gebliebene Karte",
    solution: "SCHUHE",
    answers: ["SCHUHE", "DIE SCHUHE", "GAX SCHUHE", "GAX' SCHUHE"],
    hints: [
      "Nicht jede Karte ist allein wichtig. Manche Erinnerungen gehören zusammen.",
      "Versucht Szenen der Nacht vollständig zu rekonstruieren. Zu einer Szene gehören jeweils drei Karten.",
      "Bildet sieben Gruppen aus jeweils einer Person, einem Gegenstand oder Ortsdetail und einer passenden Aussage. Eine Karte gehört zu keiner Szene."
    ],
    storyTitle: "Bis auf die Schuhe",
    story: [
      "Gax starrte auf die letzte Karte. „Schuhe.“ Alle wurden still.",
      "Sie gingen sämtliche Notizen noch einmal durch: Bus, Club, Hotel, Alien, Vampir, Einkaufswagen, Tankstelle, Kirche, Parkplatz und Taxi. Nirgendwo waren die Schuhe erklärt.",
      "Dann klingelte es. Vor der Tür lag nichts. Auf der anderen Straßenseite stand nur eine einzelne Laterne.",
      "Die Laterne flackerte. Gax zeigte auf sie: „SEHT IHR?! WO SIND MEINE SCHUHE?!“",
      "GAX’ VERLORENE HALLOWEEN-NACHT – vollständig rekonstruiert. Bis auf die Schuhe."
    ],
    memoryCards: [
      "JAN", "AUSWEIS", "„LUIGI WURDE AUSGEWÄHLT.“", "PALME",
      "TANKSTELLENMITARBEITER", "„MACH LANGSAM.“", "SICHERHEITSGURT",
      "FINLAY", "EINKAUFSWAGEN", "„DAS IST DER PFARRER.“", "SANDRA",
      "BECHER", "„DER TÜRSTEHER IST STRENG.“", "ELLI", "BAR",
      "„DAS IST EIN KÜRBIS.“", "NICK", "KÜRBIS", "„LATERNE.“",
      "TAXIFAHRER", "„DER KLEINE WIRD SCHNELL REISEKRANK.“", "SCHUHE"
    ],
    renderPuzzle(container, puzzle) {
      renderMemoryCards(container, puzzle.memoryCards);
    }
  }

];
