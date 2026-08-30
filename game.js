/* =========================================================
   1. SPIELEINSTELLUNGEN
   ========================================================= */

const gameConfig = {
  title: "Gax' verlorene Halloween-Nacht",
  subtitle: "Outdoor Escape Game",

  totalChapters: 15,

  startingScore: 0,
  pointsPerSolution: 100
};

/* =========================================================
   FLÜCHE

   chance: 0.30 bedeutet eine Chance von 30 Prozent.
   firstPossibleChapter: 2 schützt den Spieleinstieg.
   Zwei Kapitel hintereinander können nie verflucht sein.
   ========================================================= */

const curseConfig = {
  chance: 0.30,
  firstPossibleChapter: 2
};

const curseInformation = {
  1: {
    title: "UwU",
    description:
      "Die Geschichte ist plötzlich verdächtig niedlich, Senpai."
  },
  2: {
    title: "Echo",
    description:
      "Wörter und Satzteile wiederholen sich wie ein unheimliches Echo."
  },
  3: {
    title: "Buchstabensalat",
    description:
      "In vielen Wörtern wurden Buchstaben durcheinandergewirbelt."
  },
  4: {
    title: "Vokalraub",
    description:
      "Die Vokale wurden aus den Texten gestohlen."
  },
  5: {
    title: "Rückwärts",
    description:
      "Die Texte dieses Kapitels laufen rückwärts."
  },
  6: {
    title: "Glitch",
    description:
      "Buchstaben zerfallen in Zahlen und Sonderzeichen."
  },
  7: {
    title: "Autokorrektur",
    description:
      "Eine völlig überforderte Autokorrektur verändert den Text."
  },
  8: {
    title: "Lügenpresse",
    description:
      "DIE DA OBEN mischen sich in die Geschichte ein."
  },
  9: {
    title: "Capslock",
    description:
      "DAS GESAMTE KAPITEL SCHREIT EUCH AN."
  },
  10: {
    title: "Der Motivator",
    description:
      "Eine Stimme feuert euch an. Du bist gut genuuuug!"
  }
};

/* =========================================================
   2. SPIELSTAND
   ========================================================= */

const gameState = {
  currentPuzzleIndex: 0,

  score: gameConfig.startingScore,

  solvedPuzzles: [],

  revealedHints: {},

  reachedLocations: [],

  currentView: "start",

  archiveReturnView: "start",

  activeStoryId: null,

  chapterCurses: {},

  acknowledgedCurseChapters: [],

  savedView: "start"
};


/* =========================================================
   3. SPIELSTAND SPEICHERN
   ========================================================= */

function saveGame() {
  const saveData = {
    currentPuzzleIndex:
      gameState.currentPuzzleIndex,

    score:
      gameState.score,

    solvedPuzzles:
      gameState.solvedPuzzles,

    revealedHints:
      gameState.revealedHints,

    reachedLocations:
      gameState.reachedLocations,

    currentView:
      gameState.currentView,

    activeStoryId:
      gameState.activeStoryId,

    chapterCurses:
      gameState.chapterCurses,

    acknowledgedCurseChapters:
      gameState.acknowledgedCurseChapters
  };

  localStorage.setItem(
    "gaxEscapeSave",
    JSON.stringify(saveData)
  );
}


function loadGame() {
  const savedData =
    localStorage.getItem("gaxEscapeSave");

  if (!savedData) {
    return false;
  }

  try {
    const parsedData =
      JSON.parse(savedData);

    gameState.currentPuzzleIndex =
      parsedData.currentPuzzleIndex ?? 0;

    gameState.score =
      parsedData.score ?? 0;

    gameState.solvedPuzzles =
      Array.isArray(parsedData.solvedPuzzles)
        ? parsedData.solvedPuzzles
        : [];

    gameState.revealedHints =
      parsedData.revealedHints ?? {};

    gameState.reachedLocations =
      Array.isArray(parsedData.reachedLocations)
        ? parsedData.reachedLocations
        : [];

    gameState.currentView =
      parsedData.currentView ?? "puzzle";

    gameState.activeStoryId =
      parsedData.activeStoryId ?? null;

    gameState.chapterCurses =
      parsedData.chapterCurses &&
      typeof parsedData.chapterCurses === "object"
        ? parsedData.chapterCurses
        : {};

    gameState.acknowledgedCurseChapters =
      Array.isArray(parsedData.acknowledgedCurseChapters)
        ? parsedData.acknowledgedCurseChapters
        : [];

    /*
      Übernimmt alte Speicherstände,
      die noch hintsUsed verwendet haben.
    */
    if (
      !parsedData.revealedHints &&
      Array.isArray(parsedData.hintsUsed)
    ) {
      parsedData.hintsUsed.forEach((puzzleId) => {
        gameState.revealedHints[puzzleId] = 1;
      });
    }

    return true;

  } catch (error) {
    console.error(
      "Spielstand konnte nicht geladen werden:",
      error
    );

    localStorage.removeItem(
      "gaxEscapeSave"
    );

    return false;
  }
}

function hasMeaningfulSave() {
  return (
    gameState.solvedPuzzles.length > 0 ||
    gameState.currentPuzzleIndex > 0 ||
    gameState.currentView === "puzzle" ||
    gameState.currentView === "story" ||
    Object.keys(
      gameState.revealedHints
    ).length > 0
  );
}

/* =========================================================
   4. ALLGEMEINE HILFSFUNKTIONEN
   ========================================================= */

function createElement(
  tag,
  className = "",
  text = ""
) {
  const element =
    document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}


function createButton(
  text,
  className,
  clickFunction
) {
  const button = createElement(
    "button",
    className,
    text
  );

  button.type = "button";

  button.addEventListener(
    "click",
    clickFunction
  );

  return button;
}


function clearApp() {
  const app =
    document.getElementById("app");

  app.innerHTML = "";

  return app;
}


function normalizeAnswer(value) {
  return value
    .trim()
    .toUpperCase()
    .replaceAll("Ä", "AE")
    .replaceAll("Ö", "OE")
    .replaceAll("Ü", "UE")
    .replaceAll("ß", "SS")
    .replace(/[^A-Z0-9]/g, "");
}


function isAnswerCorrect(
  userAnswer,
  validAnswers
) {
  const normalizedUserAnswer =
    normalizeAnswer(userAnswer);

  return validAnswers.some((answer) => {
    return (
      normalizeAnswer(answer) ===
      normalizedUserAnswer
    );
  });
}


function findPuzzleById(puzzleId) {
  return puzzles.find((puzzle) => {
    return puzzle.id === puzzleId;
  });
}


function getGameTextChapter(puzzle) {
  const gameText = window.GAX_GAME_TEXT;

  if (
    !gameText ||
    !Array.isArray(gameText.chapters)
  ) {
    return null;
  }

  return gameText.chapters[puzzle.chapter - 1] || null;
}


function getTextVariant(
  value,
  curseIndex,
  fallback = ""
) {
  if (Array.isArray(value)) {
    return value[curseIndex] || value[0] || fallback;
  }

  return value || fallback;
}


function getSavedCurseIndex(puzzle) {
  const savedValue =
    gameState.chapterCurses[puzzle.id];

  return Number.isInteger(savedValue)
    ? savedValue
    : 0;
}


function ensureChapterCurse(puzzle) {
  if (
    Object.prototype.hasOwnProperty.call(
      gameState.chapterCurses,
      puzzle.id
    )
  ) {
    return getSavedCurseIndex(puzzle);
  }

  const chapterIndex = puzzle.chapter - 1;
  const previousPuzzle = puzzles[chapterIndex - 1];
  const previousWasCursed =
    previousPuzzle &&
    getSavedCurseIndex(previousPuzzle) > 0;

  const mayBeCursed =
    puzzle.chapter >= curseConfig.firstPossibleChapter &&
    !gameState.solvedPuzzles.includes(puzzle.id) &&
    !previousWasCursed &&
    Boolean(getGameTextChapter(puzzle));

  let curseIndex = 0;

  if (
    mayBeCursed &&
    Math.random() < curseConfig.chance
  ) {
    const availableCurses =
      Object.keys(curseInformation)
        .map(Number);

    curseIndex = availableCurses[
      Math.floor(
        Math.random() * availableCurses.length
      )
    ];
  }

  gameState.chapterCurses[puzzle.id] =
    curseIndex;

  return curseIndex;
}


function appendCursedStoryText(
  card,
  storyText
) {
  if (!storyText) {
    return;
  }

  storyText
    .split(/\n\s*\n/)
    .filter(Boolean)
    .forEach((paragraph) => {
      card.appendChild(
        createElement(
          "p",
          "game-text",
          paragraph
        )
      );
    });
}


function appendCursedPuzzleText(
  card,
  questionText
) {
  if (!questionText) {
    return;
  }

  const puzzleText = createElement(
    "pre",
    "code-puzzle cursed-question-text"
  );

  puzzleText.textContent = questionText;
  card.appendChild(puzzleText);
}


function createActiveCurseBadge(curseIndex) {
  const information =
    curseInformation[curseIndex];

  if (!information) {
    return null;
  }

  return createElement(
    "div",
    "active-curse-badge",
    `☠ ${information.title} wirkt`
  );
}


function showCurseAnnouncement(
  puzzle,
  curseIndex
) {
  const information =
    curseInformation[curseIndex];

  if (
    !information ||
    gameState.acknowledgedCurseChapters.includes(
      puzzle.id
    ) ||
    document.querySelector(
      ".curse-announcement-overlay"
    )
  ) {
    return;
  }

  const overlay = createElement(
    "div",
    "curse-announcement-overlay"
  );

  const announcement = createElement(
    "section",
    "curse-announcement"
  );

  announcement.setAttribute(
    "role",
    "alertdialog"
  );
  announcement.setAttribute(
    "aria-modal",
    "true"
  );
  announcement.setAttribute(
    "aria-labelledby",
    "curse-announcement-title"
  );

  const heading = createElement(
    "h2",
    "curse-announcement-title",
    "Du wurdest verflucht"
  );
  heading.id = "curse-announcement-title";

  const acceptButton = createButton(
    "Fluch annehmen",
    "main-button curse-accept-button",
    () => {
      if (
        !gameState.acknowledgedCurseChapters.includes(
          puzzle.id
        )
      ) {
        gameState.acknowledgedCurseChapters.push(
          puzzle.id
        );
      }

      saveGame();
      overlay.remove();
      document.body.classList.remove(
        "modal-open"
      );
    }
  );

  announcement.append(
    createElement(
      "div",
      "curse-skull",
      "☠"
    ),
    heading,
    createElement(
      "p",
      "curse-announcement-label",
      "Dieser Fluch wirkt:"
    ),
    createElement(
      "strong",
      "curse-announcement-name",
      information.title
    ),
    createElement(
      "p",
      "curse-announcement-description",
      information.description
    ),
    acceptButton
  );

  overlay.appendChild(announcement);
  document.body.classList.add("modal-open");
  document.body.appendChild(overlay);
  acceptButton.focus();
}


/* =========================================================
   5. KOPFBEREICH
   ========================================================= */

function createStatusBox(label, value) {
  const box = createElement(
    "div",
    "status-box"
  );

  box.append(
    createElement(
      "span",
      "",
      label
    ),

    createElement(
      "strong",
      "",
      String(value)
    )
  );

  return box;
}


function createGameHeader() {
  const header = createElement(
    "header",
    "game-header"
  );

  const titleArea = createElement(
    "div",
    "title-area"
  );

  titleArea.append(
    createElement(
      "p",
      "small-title",
      gameConfig.subtitle
    ),

    createElement(
      "h1",
      "",
      gameConfig.title
    )
  );


  const headerActions = createElement(
    "div",
    "header-actions"
  );


  const statusArea = createElement(
    "div",
    "game-status"
  );

  statusArea.append(
    createStatusBox(
      "Punkte",
      gameState.score
    ),

    createStatusBox(
      "Fortschritt",
      `${gameState.solvedPuzzles.length} / ${gameConfig.totalChapters}`
    )
  );


  headerActions.appendChild(
    statusArea
  );


  const showChapterNavigation =
    gameState.currentView === "puzzle" ||
    gameState.currentView === "story";

  if (showChapterNavigation) {
    headerActions.appendChild(
      createChapterNavigation()
    );
  }


  headerActions.appendChild(
    createButton(
      "Alte Lösungen",
      "archive-button",
      openArchive
    )
  );


  header.append(
    titleArea,
    headerActions
  );

  return header;
}


function createProgressBar() {
  const background = createElement(
    "div",
    "progress-background"
  );

  const bar = createElement(
    "div",
    "progress-bar"
  );

  const solvedCount =
    gameState.solvedPuzzles.length;

  const progress =
    solvedCount /
    gameConfig.totalChapters;

  bar.style.width =
    `${progress * 100}%`;

  background.appendChild(bar);

  return background;
}


function createPageContainer() {
  const app = clearApp();

  const container = createElement(
    "main",
    "game-container"
  );

  container.append(
    createGameHeader(),
    createProgressBar()
  );

  app.appendChild(container);

  return container;
}

function updateHeader() {
  const oldHeader =
    document.querySelector(".game-header");

  const oldProgress =
    document.querySelector(
      ".progress-background"
    );

  if (oldHeader) {
    oldHeader.replaceWith(
      createGameHeader()
    );
  }

  if (oldProgress) {
    oldProgress.replaceWith(
      createProgressBar()
    );
  }
}


/* =========================================================
   6. STARTSCREEN
   ========================================================= */

function renderStartScreen() {
  gameState.currentView = "start";

  const container = createPageContainer();

  const card = createElement(
    "section",
    "card start-card"
  );

  card.append(
    createElement(
      "p",
      "chapter-label",
      "Ein chaotisches Halloween-Märchen"
    ),

    createElement(
      "h2",
      "",
      "Eine Nacht fehlt."
    ),

    createElement(
      "p",
      "game-text",
      "Gax kann sich an fast nichts mehr erinnern. Findet heraus, was in seiner verlorenen Halloween-Nacht geschehen ist."
    ),

    createButton(
      gameState.solvedPuzzles.length > 0
        ? "Spiel fortsetzen"
        : "Geschichte beginnen",

      "main-button",

      renderCurrentPuzzle
    )
  );

  container.appendChild(card);
}


/* =========================================================
   7. AKTUELLES RÄTSEL
   ========================================================= */

function renderCurrentPuzzle() {
  gameState.currentView = "puzzle";

  const puzzle = puzzles[gameState.currentPuzzleIndex];

  if (!puzzle) {
    renderGameFinished();
    return;
  }

  const curseIndex =
    ensureChapterCurse(puzzle);

  const chapterText =
    getGameTextChapter(puzzle);

  const displayedTitle = chapterText
    ? getTextVariant(
        chapterText.title,
        curseIndex,
        puzzle.title
      )
    : puzzle.title;

  const displayedQuestion = chapterText
    ? getTextVariant(
        chapterText.question,
        curseIndex,
        puzzle.question
      )
    : puzzle.question;

  gameState.activeStoryId = null;

  saveGame();

  const container = createPageContainer();

  const card = createElement(
    "section",
    "card"
  );

  /* Kapitel und Überschrift */

  card.append(
    createElement(
      "p",
      "chapter-label",
      `Kapitel ${puzzle.chapter}`
    ),

    createElement(
      "h2",
      "",
      displayedTitle
    )
  );


  const curseBadge =
    createActiveCurseBadge(curseIndex);

  if (curseBadge) {
    card.appendChild(curseBadge);
  }


  /* Erzählertext */

  if (chapterText) {
    appendCursedStoryText(
      card,
      getTextVariant(
        chapterText.storyText,
        curseIndex
      )
    );
  } else if (
    Array.isArray(puzzle.narrative) &&
    puzzle.narrative.length > 0
  ) {
    puzzle.narrative.forEach((paragraph) => {
      card.appendChild(
        createElement(
          "p",
          "game-text",
          paragraph
        )
      );
    });
  }


  /* Eigentliches Rätsel */

const alreadySolved =
  gameState.solvedPuzzles.includes(
    puzzle.id
  );

if (alreadySolved) {
  const solvedBox = createElement(
    "div",
    "completed-box"
  );

  solvedBox.append(
    createElement(
      "strong",
      "",
      "Dieses Kapitel wurde bereits gelöst."
    ),

    createElement(
      "span",
      "",
      `Lösung: ${puzzle.solution || puzzle.answers[0]}`
    )
  );

  card.append(
    solvedBox,

    createButton(
      "Geschichte erneut ansehen",
      "main-button",
      () => renderStory(puzzle)
    )
  );

  container.appendChild(card);

  showCurseAnnouncement(
    puzzle,
    curseIndex
  );

  return;
}

  if (chapterText) {
    appendCursedPuzzleText(
      card,
      getTextVariant(
        chapterText.questionText,
        curseIndex
      )
    );
  } else if (
    typeof puzzle.renderPuzzle === "function"
  ) {
    puzzle.renderPuzzle(
      card,
      puzzle
    );
  } else {
    console.error(
      `Für ${puzzle.id} fehlt renderPuzzle().`
    );
  }


  /* Frage */

  const question = createElement(
    "p",
    "game-text puzzle-question",
    displayedQuestion
  );


  /* Antwortformular */

  const form = createElement(
    "form",
    "answer-form"
  );

  const answerArea = createElement(
    "div",
    "answer-area"
  );

  const input = createElement(
    "input",
    "answer-input"
  );

  input.type = "text";
  input.placeholder = "Lösungswort eingeben";
  input.autocomplete = "off";


  const submitButton = createElement(
    "button",
    "main-button",
    "Prüfen"
  );

  submitButton.type = "submit";


  const feedback = createElement(
    "p",
    "feedback"
  );


  answerArea.append(
    input,
    submitButton
  );

  form.appendChild(answerArea);


  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      checkPuzzleAnswer(
        puzzle,
        input,
        feedback,
        submitButton
      );
    }
  );


  card.append(
    question,
    form,
    feedback,
    createHintArea(puzzle, feedback)
  );


  container.appendChild(card);

  /*
    Das Antwortfeld erhält absichtlich keinen automatischen Fokus.
    Auf mobilen Geräten würde der Browser sonst direkt dorthin
    scrollen und häufig zusätzlich die Tastatur öffnen.
  */
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });

  showCurseAnnouncement(
    puzzle,
    curseIndex
  );
}

/* =========================================================
   8. ANTWORT ÜBERPRÜFEN
   ========================================================= */

function checkPuzzleAnswer(
  puzzle,
  input,
  feedback,
  submitButton
) {
  const correct =
    isAnswerCorrect(
      input.value,
      puzzle.answers
    );

  if (!correct) {
    feedback.textContent =
      "Das ist noch nicht die richtige Lösung.";

    feedback.className =
      "feedback error";

    return;
  }


  const alreadySolved =
    gameState.solvedPuzzles.includes(
      puzzle.id
    );


  if (!alreadySolved) {
    gameState.score +=
      gameConfig.pointsPerSolution;

    gameState.solvedPuzzles.push(
      puzzle.id
    );

    feedback.textContent =
      `Richtig! +${gameConfig.pointsPerSolution} Punkte`;

  } else {
    feedback.textContent =
      "Richtig. Dieses Kapitel wurde bereits gelöst.";
  }


  feedback.className =
    "feedback success";

  input.disabled = true;
  submitButton.disabled = true;

  gameState.activeStoryId =
    puzzle.id;

  saveGame();
  updateHeader();


  window.setTimeout(() => {
    renderStory(puzzle);
  }, 900);
}


/* =========================================================
   9. HINWEISSYSTEM
   ========================================================= */

function getPuzzleHints(puzzle) {
  const defaultHints = [
    "Die Wahrheit liegt nicht immer in den Worten.",
    "Achtet auf die Abstände zwischen den Wortpaaren. Sie sind nicht in jeder Zeile gleich groß.",
    "Zählt die Leerzeichen zwischen den Wörtern. Wandelt die Anzahl anschließend mit A = 1, B = 2, C = 3 und so weiter in Buchstaben um."
  ];

  const chapterText =
    getGameTextChapter(puzzle);

  if (chapterText) {
    const curseIndex =
      getSavedCurseIndex(puzzle);

    return [
      getTextVariant(
        chapterText.hint1,
        curseIndex,
        defaultHints[0]
      ),
      getTextVariant(
        chapterText.hint2,
        curseIndex,
        defaultHints[1]
      ),
      getTextVariant(
        chapterText.hint3,
        curseIndex,
        defaultHints[2]
      )
    ];
  }

  if (!Array.isArray(puzzle.hints)) {
    return defaultHints;
  }

  /* Fehlende Einträge alter Rätsel werden auf drei ergänzt. */
  return defaultHints.map((defaultHint, index) => {
    return puzzle.hints[index] || defaultHint;
  });
}

function getRevealedHintCount(puzzleId) {
  const count =
    gameState.revealedHints[puzzleId];

  if (
    typeof count !== "number" ||
    count < 0
  ) {
    return 0;
  }

  return count;
}


function createHintArea(
  puzzle,
  feedback
) {
  const hintArea = createElement(
    "div",
    "hint-area"
  );

  renderHintAreaContent(
    hintArea,
    puzzle,
    feedback
  );

  return hintArea;
}


function renderHintAreaContent(
  hintArea,
  puzzle,
  feedback
) {
  hintArea.innerHTML = "";

  const hints = getPuzzleHints(puzzle);

  if (hints.length === 0) {
    return;
  }


  const revealedCount =
    Math.min(
      getRevealedHintCount(
        puzzle.id
      ),
      hints.length
    );


  if (revealedCount > 0) {
    const hintList = createElement(
      "div",
      "hint-list"
    );

    for (
      let index = 0;
      index < revealedCount;
      index++
    ) {
      const hintCard = createElement(
        "div",
        "hint-card"
      );

      hintCard.append(
        createElement(
          "strong",
          "hint-number",
          `Hinweis ${index + 1}`
        ),

        createElement(
          "p",
          "hint-text",
          hints[index]
        )
      );

      hintList.appendChild(
        hintCard
      );
    }

    hintArea.appendChild(
      hintList
    );
  }


  if (revealedCount < hints.length) {
    const nextHintNumber =
      revealedCount + 1;

    const hintButton = createButton(
      `Hinweis ${nextHintNumber} anzeigen`,
      "secondary-button",
      () => {
        revealNextHint(
          puzzle,
          hintArea,
          feedback
        );
      }
    );

    hintArea.appendChild(
      hintButton
    );

  } else {
    hintArea.appendChild(
      createElement(
        "p",
        "all-hints-used",
        "Alle drei Hinweise wurden verwendet."
      )
    );
  }
}


function revealNextHint(
  puzzle,
  hintArea,
  feedback
) {
  const hints = getPuzzleHints(puzzle);

  const revealedCount =
    getRevealedHintCount(
      puzzle.id
    );

  if (
    revealedCount >= hints.length
  ) {
    return;
  }


  const nextHintNumber =
    revealedCount + 1;

  /* Verhindert mehrere offene Bestätigungen. */
  if (
    hintArea.querySelector(
      ".hint-confirmation"
    )
  ) {
    return;
  }

  const confirmation = createElement(
    "div",
    "hint-card hint-confirmation"
  );

  const confirmationActions = createElement(
    "div",
    "load-choice-actions"
  );

  const yesButton = createButton(
    "Ja",
    "main-button",
    () => {
      gameState.revealedHints[puzzle.id] =
        nextHintNumber;

      feedback.textContent =
        `Hinweis ${nextHintNumber} wurde freigeschaltet.`;

      feedback.className =
        "feedback hint-feedback";

      saveGame();

      renderHintAreaContent(
        hintArea,
        puzzle,
        feedback
      );
    }
  );

  const noButton = createButton(
    "Nein",
    "secondary-button",
    () => {
      renderHintAreaContent(
        hintArea,
        puzzle,
        feedback
      );
    }
  );

  confirmationActions.append(
    yesButton,
    noButton
  );

  confirmation.append(
    createElement(
      "p",
      "hint-text",
      `Hinweis ${nextHintNumber} wirklich ziehen?`
    ),
    confirmationActions
  );

  const revealButton =
    hintArea.querySelector("button");

  if (revealButton) {
    revealButton.disabled = true;
  }

  hintArea.appendChild(confirmation);
}


/* =========================================================
   10. GESCHICHTE ANZEIGEN
   ========================================================= */

function renderStory(puzzle) {
  gameState.currentView = "story";

  gameState.activeStoryId =
    puzzle.id;

  saveGame();


  const container =
    createPageContainer();


  const card = createElement(
    "section",
    "card success-card"
  );


  card.append(
    createElement(
      "p",
      "chapter-label",
      "Kapitel rekonstruiert"
    ),

    createElement(
      "h2",
      "",
      puzzle.storyTitle
    )
  );


  puzzle.story.forEach((paragraph) => {
  card.appendChild(
    createElement(
      "p",
      "game-text",
      paragraph
    )
  );
});


  const completedBox = createElement(
    "div",
    "completed-box"
  );


  completedBox.append(
    createElement(
      "strong",
      "",
      `Kapitel ${puzzle.chapter} abgeschlossen`
    ),

    createElement(
      "span",
      "",
      `Lösung: ${puzzle.solution || puzzle.answers[0]}`
    )
  );


  card.appendChild(completedBox);


  if (puzzle.nextLocation) {
    const locationBox = createElement(
      "div",
      "location-box"
    );

    locationBox.append(
      createElement(
        "p",
        "chapter-label",
        puzzle.nextLocation.title || "Nächster Ort"
      ),

      createElement(
        "p",
        "game-text",
        puzzle.nextLocation.text
      ),

      createButton(
        puzzle.nextLocation.buttonText || "Angekommen",
        "main-button",
        () => {
          if (!gameState.reachedLocations.includes(puzzle.id)) {
            gameState.reachedLocations.push(puzzle.id);
          }

          saveGame();
          goToNextChapter();
        }
      )
    );

    card.appendChild(locationBox);
  } else {
    card.appendChild(
      createButton(
        gameState.currentPuzzleIndex < puzzles.length - 1
          ? "Nächstes Kapitel"
          : "Aktuellen Stand beenden",
        "main-button",
        goToNextChapter
      )
    );
  }


  card.appendChild(
    createButton(
      "Alte Lösungen ansehen",
      "secondary-button",
      openArchive
    )
  );


  container.appendChild(card);
}


function goToNextChapter() {
  if (
    gameState.currentPuzzleIndex <
    puzzles.length - 1
  ) {
    gameState.currentPuzzleIndex++;
    gameState.currentView = "puzzle";
    gameState.activeStoryId = null;

    saveGame();
    renderCurrentPuzzle();
  } else {
    renderGameFinished();
  }
}


/* =========================================================
   11. ARCHIV ÖFFNEN
   ========================================================= */

function openArchive() {
  if (
    gameState.currentView !== "archive" &&
    gameState.currentView !== "archive-detail"
  ) {
    gameState.archiveReturnView =
      gameState.currentView;
  }

  renderArchive();
}


/* =========================================================
   12. ARCHIVÜBERSICHT
   ========================================================= */

function renderArchive() {
  gameState.currentView = "archive";


  const container =
    createPageContainer();


  const card = createElement(
    "section",
    "card archive-card"
  );


  card.append(
    createElement(
      "p",
      "chapter-label",
      "Ermittlungsarchiv"
    ),

    createElement(
      "h2",
      "",
      "Alte Lösungen"
    ),

    createElement(
      "p",
      "",
      "Hier findet ihr alle bereits gelösten Kapitel, " +
      "Lösungen und rekonstruierten Erinnerungen."
    )
  );


  const solvedPuzzleObjects =
    gameState.solvedPuzzles
      .map(findPuzzleById)
      .filter(Boolean);


  if (solvedPuzzleObjects.length === 0) {
    card.appendChild(
      createElement(
        "div",
        "archive-empty",
        "Bisher wurde noch kein Kapitel gelöst."
      )
    );

  } else {
    const archiveList = createElement(
      "div",
      "archive-list"
    );


    solvedPuzzleObjects.forEach(
      (puzzle) => {
        const archiveEntry =
          createElement(
            "button",
            "archive-entry"
          );

        archiveEntry.type = "button";


        const entryInformation =
          createElement(
            "div",
            "archive-entry-information"
          );


        entryInformation.append(
          createElement(
            "span",
            "archive-chapter",
            `Kapitel ${puzzle.chapter}`
          ),

          createElement(
            "strong",
            "",
            puzzle.storyTitle
          ),

          createElement(
            "small",
            "",
            `Lösung: ${puzzle.solution || puzzle.answers[0]}`
          )
        );


        const arrow = createElement(
          "span",
          "archive-arrow",
          "›"
        );


        archiveEntry.append(
          entryInformation,
          arrow
        );


        archiveEntry.addEventListener(
          "click",
          () => {
            renderArchiveDetail(
              puzzle
            );
          }
        );


        archiveList.appendChild(
          archiveEntry
        );
      }
    );


    card.appendChild(
      archiveList
    );
  }


  card.appendChild(
    createButton(
      "Zurück zum Spiel",
      "secondary-button",
      returnFromArchive
    )
  );


  container.appendChild(card);
}


/* =========================================================
   13. EIN ARCHIVKAPITEL ANZEIGEN
   ========================================================= */

function renderArchiveDetail(puzzle) {
  gameState.currentView =
    "archive-detail";


  const container =
    createPageContainer();


  const card = createElement(
    "section",
    "card archive-detail-card"
  );


  card.append(
    createElement(
      "p",
      "chapter-label",
      `Kapitel ${puzzle.chapter}`
    ),

    createElement(
      "h2",
      "",
      puzzle.storyTitle
    )
  );


  const solutionBox = createElement(
    "div",
    "archive-solution"
  );


  solutionBox.append(
    createElement(
      "span",
      "",
      "Lösung"
    ),

    createElement(
      "strong",
      "",
      puzzle.solution ||
      puzzle.answers[0]
    )
  );


  card.appendChild(solutionBox);


  puzzle.story.forEach((paragraph) => {
  card.appendChild(
    createElement(
      "p",
      "game-text",
      paragraph
    )
  );
});


  card.appendChild(
    createButton(
      "Zurück zu alten Lösungen",
      "secondary-button",
      renderArchive
    )
  );


  card.appendChild(
    createButton(
      "Zurück zum Spiel",
      "main-button",
      returnFromArchive
    )
  );


  container.appendChild(card);
}


/* =========================================================
   14. ARCHIV VERLASSEN
   ========================================================= */

function returnFromArchive() {
  switch (
    gameState.archiveReturnView
  ) {
    case "puzzle":
      renderCurrentPuzzle();
      break;

    case "story": {
      const storyPuzzle =
        findPuzzleById(
          gameState.activeStoryId
        );

      if (storyPuzzle) {
        renderStory(storyPuzzle);
      } else {
        renderCurrentPuzzle();
      }

      break;
    }

    case "finished":
      renderGameFinished();
      break;

    default:
      renderStartScreen();
  }
}


/* =========================================================
   15. SPIELENDE
   ========================================================= */

function renderGameFinished() {
  gameState.currentView =
    "finished";


  const container =
    createPageContainer();


  const card = createElement(
    "section",
    "card success-card"
  );


  card.append(
    createElement(
      "p",
      "chapter-label",
      "Aktueller Stand"
    ),

    createElement(
      "h2",
      "",
      "Fortsetzung folgt"
    ),

    createElement(
      "p",
      "",
      "Alle bisher eingebauten Rätsel wurden gelöst."
    ),

    createElement(
      "p",
      "final-score",
      `Aktueller Punktestand: ${gameState.score}`
    ),

    createButton(
      "Alte Lösungen ansehen",
      "main-button",
      openArchive
    ),

    createButton(
      "Spiel neu starten",
      "secondary-button danger-button",
      resetGame
    )
  );


  container.appendChild(card);
}


/* =========================================================
   16. SPIEL ZURÜCKSETZEN
   ========================================================= */

function resetGame(askForConfirmation = true) {
  if (askForConfirmation) {
    const confirmed =
      window.confirm(
        "Soll wirklich ein komplett neues Spiel begonnen werden? Der alte Spielstand wird gelöscht."
      );

    if (!confirmed) {
      return;
    }
  }

  gameState.currentPuzzleIndex = 0;

  gameState.score =
    gameConfig.startingScore;

  gameState.solvedPuzzles = [];

  gameState.revealedHints = {};

  gameState.reachedLocations = [];

  gameState.currentView =
    "start";

  gameState.savedView =
    "start";

  gameState.activeStoryId =
    null;

  gameState.chapterCurses = {};

  gameState.acknowledgedCurseChapters = [];

  localStorage.removeItem(
    "gaxEscapeSave"
  );

  renderStartScreen();
}


/* =========================================================
   17. SPIEL LADEN
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const saveFound =
      loadGame();

    if (
      saveFound &&
      hasMeaningfulSave()
    ) {
      renderLoadChoiceScreen();
    } else {
      renderStartScreen();
    }
  }
);

function renderLoadChoiceScreen() {
  gameState.savedView =
    gameState.currentView;

  gameState.currentView =
    "load-choice";

  const container =
    createPageContainer();

  const card = createElement(
    "section",
    "card start-card"
  );

  card.append(
    createElement(
      "p",
      "chapter-label",
      "Gespeicherter Spielstand"
    ),

    createElement(
      "h2",
      "",
      "Wie möchtet ihr fortfahren?"
    ),

    createElement(
      "p",
      "game-text",
      `Ihr habt ${gameState.score} Punkte und ${gameState.solvedPuzzles.length} von ${gameConfig.totalChapters} Kapiteln gelöst.`
    )
  );

  const actions = createElement(
    "div",
    "load-choice-actions"
  );

  renderLoadChoiceActions(actions);

  card.appendChild(actions);
  container.appendChild(card);
}


function renderLoadChoiceActions(actions) {
  actions.innerHTML = "";

  actions.append(
    createButton(
      "Weitermachen",
      "main-button",
      continueSavedGame
    ),

    createButton(
      "Neu anfangen",
      "secondary-button danger-button",
      () => renderNewGameConfirmation(actions)
    )
  );
}


function renderNewGameConfirmation(actions) {
  actions.innerHTML = "";

  actions.append(
    createElement(
      "p",
      "game-text",
      "Wirklich neu anfangen? Der alte Spielstand wird gelöscht."
    ),

    createButton(
      "Ja",
      "secondary-button danger-button",
      () => resetGame(false)
    ),

    createButton(
      "Nein",
      "main-button",
      () => renderLoadChoiceActions(actions)
    )
  );
}


function continueSavedGame() {
  const previousView =
    gameState.savedView;

  if (
    previousView === "story" &&
    gameState.activeStoryId
  ) {
    const puzzle =
      findPuzzleById(
        gameState.activeStoryId
      );

    if (puzzle) {
      renderStory(puzzle);
      return;
    }
  }

  if (previousView === "finished") {
    renderGameFinished();
    return;
  }

  renderCurrentPuzzle();
}

function createChapterNavigation() {
  const navigation = createElement(
    "div",
    "chapter-navigation"
  );

  const currentPuzzle =
    puzzles[gameState.currentPuzzleIndex];

  const canGoBack =
    gameState.currentPuzzleIndex > 0;

  const currentPuzzleSolved =
    currentPuzzle &&
    gameState.solvedPuzzles.includes(
      currentPuzzle.id
    );

  const locationReached =
    !currentPuzzle?.nextLocation ||
    gameState.reachedLocations.includes(
      currentPuzzle.id
    );

  const canGoForward =
    currentPuzzleSolved &&
    locationReached &&
    gameState.currentPuzzleIndex <
      puzzles.length - 1;


  const backButton = createButton(
    "← Zurück",
    "chapter-nav-button",
    () => navigateToChapter(-1)
  );

  const forwardButton = createButton(
    "Vorwärts →",
    "chapter-nav-button",
    () => navigateToChapter(1)
  );


  backButton.disabled =
    !canGoBack;

  forwardButton.disabled =
    !canGoForward;


  navigation.append(
    backButton,
    forwardButton
  );

  return navigation;
}


function navigateToChapter(direction) {
  const currentPuzzle =
    puzzles[gameState.currentPuzzleIndex];

  if (!currentPuzzle) {
    return;
  }

  if (
    direction > 0 &&
    (
      !gameState.solvedPuzzles.includes(
        currentPuzzle.id
      ) ||
      (
        currentPuzzle.nextLocation &&
        !gameState.reachedLocations.includes(
          currentPuzzle.id
        )
      )
    )
  ) {
    return;
  }

  const newIndex =
    gameState.currentPuzzleIndex +
    direction;

  if (
    newIndex < 0 ||
    newIndex >= puzzles.length
  ) {
    return;
  }

  gameState.currentPuzzleIndex =
    newIndex;

  gameState.currentView =
    "puzzle";

  gameState.activeStoryId =
    null;

  saveGame();
  renderCurrentPuzzle();
}
