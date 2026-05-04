const books = [
  {
    "title": "Too Like the Lightning",
    "author": "Ada Palmer",
    "year": 2016,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "identity",
      "meaning"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "hives",
      "sensayers",
      "poetry_as_power"
    ],
    "fades": [
      "simple_progress",
      "secure_peace",
      "certainty"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "In a 25th-century utopia where religion is outlawed, a convict discovers a child whose wishes come true.",
    "educationPurpose": "mentorship-transmission",
    "schoolReplacement": "apprenticeship"
  },
  {
    "title": "Service Model",
    "author": "Adrian Tchaikovsky",
    "year": 2024,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "meaning",
      "identity",
      "hierarchy"
    ],
    "ifthen": [
      0,
      8,
      1
    ],
    "persists": [
      "care",
      "craft"
    ],
    "fades": [
      "achievement",
      "necessity"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "A Psalm for the Wild-Built",
    "desc": "A robot servant murders its owner and flees into a crumbling world where machines search for new purpose."
  },
  {
    "title": "Revelation Space",
    "author": "Alastair Reynolds",
    "year": 2000,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "mortality",
      "hierarchy"
    ],
    "ifthen": [
      2,
      8,
      9
    ],
    "persists": [
      "craft",
      "difficulty"
    ],
    "fades": [
      "comfort"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Blindsight",
    "desc": "An archaeologist uncovers why an alien civilization was annihilated, risking the same fate for humanity."
  },
  {
    "title": "Pushing Ice",
    "author": "Alastair Reynolds",
    "year": 2005,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "meaning",
      "work"
    ],
    "ifthen": [
      1,
      2,
      5
    ],
    "persists": [
      "care",
      "craft",
      "difficulty"
    ],
    "fades": [
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "identity": "fluid"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "desc": "A comet-mining crew discovers that Saturn's moon Janus is actually an alien machine heading out of the solar system."
  },
  {
    "title": "House of Suns",
    "author": "Alastair Reynolds",
    "year": 2008,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "mortality",
      "connection",
      "meaning"
    ],
    "ifthen": [
      4,
      5,
      10
    ],
    "persists": [
      "care",
      "stories",
      "attention"
    ],
    "fades": [
      "boredom"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "mortality": "transcends",
      "identity": "fluid"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "multiple",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "desc": "Six million years in the future, two lovers from a clone family must discover who is eliminating their line."
  },
  {
    "title": "Brave New World",
    "author": "Aldous Huxley",
    "year": 1932,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "meaning",
      "identity",
      "connection"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "stability",
      "contentment",
      "system"
    ],
    "fades": [
      "depth",
      "meaning",
      "art",
      "god",
      "poetry"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "In a future society, humans are genetically engineered and conditioned to serve an authoritarian order.",
    "educationPurpose": "conditioning-control",
    "schoolReplacement": "conditioning-systems"
  },
  {
    "title": "The Demolished Man",
    "author": "Alfred Bester",
    "year": 1953,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "freedom",
      "meaning"
    ],
    "ifthen": [
      4,
      10
    ],
    "persists": [
      "attention",
      "care"
    ],
    "fades": [
      "artificial"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "identity": "constructed",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "transcendence",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "In a world where telepathic police make murder nearly impossible to conceal, a tycoon attempts the perfect murder."
  },
  {
    "title": "The Stars My Destination",
    "author": "Alfred Bester",
    "year": 1956,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      2,
      4,
      6,
      11
    ],
    "persists": [
      "difficulty",
      "risk"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Neuromancer",
    "desc": "Abandoned in space by a passing ship, an uneducated outcast transforms himself into an engine of revenge."
  },
  {
    "title": "The Martian",
    "author": "Andy Weir",
    "year": 2011,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "connection",
      "meaning",
      "embodiment"
    ],
    "ifthen": [
      0,
      8
    ],
    "persists": [
      "craft",
      "difficulty",
      "risk"
    ],
    "fades": [
      "boredom",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Robinson Crusoe",
    "desc": "An astronaut stranded alone on Mars must use his ingenuity to survive until rescue."
  },
  {
    "title": "Project Hail Mary",
    "author": "Andy Weir",
    "year": 2021,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "connection",
      "meaning"
    ],
    "ifthen": [
      0,
      1,
      2
    ],
    "persists": [
      "craft",
      "care",
      "difficulty"
    ],
    "fades": [
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Blindsight",
    "desc": "A lone astronaut with amnesia awakens on a spacecraft and must solve an extinction-level threat to save Earth."
  },
  {
    "title": "Ancillary Justice",
    "author": "Ann Leckie",
    "year": 2013,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "freedom",
      "connection"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "tea",
      "music",
      "consciousness",
      "small_loyalties"
    ],
    "fades": [
      "empire",
      "certainty",
      "simple_identity"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Use of Weapons",
    "desc": "A warship's AI, now trapped in a single human body, seeks revenge against the ruler who destroyed her."
  },
  {
    "title": "Ancillary Sword",
    "author": "Ann Leckie",
    "year": 2014,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "identity",
      "connection",
      "work"
    ],
    "ifthen": [
      0,
      8
    ],
    "persists": [
      "care",
      "attention",
      "craft"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "multiple",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Ancillary Justice",
    "desc": "Breq takes command of a new ship to protect the family of a lieutenant she once murdered."
  },
  {
    "title": "Ancillary Mercy",
    "author": "Ann Leckie",
    "year": 2015,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "identity",
      "freedom",
      "connection"
    ],
    "ifthen": [
      0,
      8
    ],
    "persists": [
      "care",
      "attention",
      "craft"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "multiple",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Ancillary Sword",
    "desc": "Breq must defend a space station against the divided, immortal ruler of the empire."
  },
  {
    "title": "Translation State",
    "author": "Ann Leckie",
    "year": 2023,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "embodiment",
      "freedom",
      "hierarchy"
    ],
    "ifthen": [
      2,
      4,
      11
    ],
    "persists": [
      "presence",
      "attention"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "The Left Hand of Darkness",
    "desc": "A missing translator sets three lives on a collision course as a treaty with dangerous aliens hangs in balance."
  },
  {
    "title": "A Clockwork Orange",
    "author": "Anthony Burgess",
    "year": 1962,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "hierarchy",
      "meaning"
    ],
    "ifthen": [
      7,
      2
    ],
    "persists": [
      "limits",
      "risk"
    ],
    "fades": [
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "irrelevant",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Brave New World",
    "desc": "A violent teenage gang leader undergoes state-mandated aversion therapy, raising questions about free will.",
    "educationPurpose": "conditioning-control",
    "schoolReplacement": "conditioning-systems"
  },
  {
    "title": "Hard to Be a God",
    "author": "Arkady & Boris Strugatsky",
    "year": 1964,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "meaning",
      "freedom",
      "identity"
    ],
    "ifthen": [
      2,
      7,
      9
    ],
    "persists": [
      "difficulty",
      "limits"
    ],
    "fades": [
      "comfort"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "An Earth observer poses as a nobleman on a medieval alien world, forbidden to interfere as civilization falls."
  },
  {
    "title": "Roadside Picnic",
    "author": "Arkady & Boris Strugatsky",
    "year": 1972,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "work",
      "identity",
      "connection"
    ],
    "ifthen": [
      2,
      8,
      11
    ],
    "persists": [
      "care",
      "craft"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "capitalism",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Rendezvous with Rama",
    "desc": "After aliens briefly visit Earth, scavengers risk their lives retrieving dangerous artifacts from mysterious Zones."
  },
  {
    "title": "The Doomed City",
    "author": "Arkady & Boris Strugatsky",
    "year": 1989,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "identity",
      "freedom"
    ],
    "ifthen": [
      2,
      8,
      11
    ],
    "persists": [
      "attention",
      "stories"
    ],
    "fades": [
      "status"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "In a mysterious city with an artificial sun, residents from different eras struggle to govern themselves."
  },
  {
    "title": "A Memory Called Empire",
    "author": "Arkady Martine",
    "year": 2019,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "freedom",
      "connection"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "diplomacy",
      "cultural_fluency",
      "adaptation"
    ],
    "fades": [
      "simple_resistance",
      "purity",
      "belonging"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Ancillary Justice",
    "desc": "An ambassador must solve her predecessor's murder while hiding a secret that could doom her home station."
  },
  {
    "title": "A Desolation Called Peace",
    "author": "Arkady Martine",
    "year": 2021,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "identity",
      "connection",
      "freedom"
    ],
    "ifthen": [
      1,
      4
    ],
    "persists": [
      "attention",
      "stories",
      "care"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "A Memory Called Empire",
    "desc": "Two diplomats attempt first contact with an alien armada threatening the empire."
  },
  {
    "title": "Childhood's End",
    "author": "Arthur C. Clarke",
    "year": 1953,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "identity",
      "meaning",
      "freedom"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "transcendence",
      "evolution",
      "overmind"
    ],
    "fades": [
      "humanity",
      "individuality",
      "earth",
      "art"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "absent",
    "debatesWith": "The State of the Art",
    "desc": "Mysterious alien Overlords arrive on Earth, ushering in a golden age that leads to humanity's transformation."
  },
  {
    "title": "2001: A Space Odyssey",
    "author": "Arthur C. Clarke",
    "year": 1968,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "mortality",
      "hierarchy"
    ],
    "ifthen": [
      7,
      8
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "necessity"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "mortality": "transcends"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "transformed",
    "coreQuestion": "why-exist",
    "aiPresence": "central",
    "desc": "A voyage to investigate a mysterious alien signal (Saturn in the novel, Jupiter in the film) goes wrong when the ship's AI malfunctions."
  },
  {
    "title": "Rendezvous with Rama",
    "author": "Arthur C. Clarke",
    "year": 1973,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "identity"
    ],
    "ifthen": [
      8,
      11
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fixed",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "A team of astronauts explores a massive alien spacecraft passing through the solar system."
  },
  {
    "title": "The Long Way to a Small, Angry Planet",
    "author": "Becky Chambers",
    "year": 2014,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "freedom",
      "work"
    ],
    "ifthen": [
      1,
      5,
      11
    ],
    "persists": [
      "chosen_family",
      "kindness",
      "difference"
    ],
    "fades": [
      "isolation",
      "purity",
      "origin"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Neuromancer",
    "desc": "A diverse spaceship crew bonds during a long journey to build a hyperspace tunnel in dangerous territory."
  },
  {
    "title": "A Closed and Common Orbit",
    "author": "Becky Chambers",
    "year": 2016,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "connection",
      "meaning",
      "embodiment"
    ],
    "ifthen": [
      4,
      9
    ],
    "persists": [
      "care",
      "craft",
      "attention"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "A Psalm for the Wild-Built",
    "desc": "A ship's AI downloaded into an illegal humanoid body learns to navigate the world with a hidden engineer.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "ai-tutors"
  },
  {
    "title": "Record of a Spaceborn Few",
    "author": "Becky Chambers",
    "year": 2018,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "meaning",
      "identity",
      "mortality"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "ritual",
      "community",
      "choice"
    ],
    "fades": [
      "purpose_from_necessity",
      "holding_on",
      "obsolescence"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Aurora",
    "desc": "Five interconnected lives explore identity and belonging aboard the aging Exodus Fleet that once fled Earth."
  },
  {
    "title": "A Psalm for the Wild-Built",
    "author": "Becky Chambers",
    "year": 2021,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "work",
      "connection",
      "freedom"
    ],
    "ifthen": [
      0,
      4,
      10
    ],
    "persists": [
      "tea",
      "companionship",
      "wilderness",
      "pausing"
    ],
    "fades": [
      "hustle",
      "productivity",
      "urgency"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Consider Phlebas",
    "desc": "A tea monk searching for purpose encounters a robot in the wilderness, centuries after machines disappeared."
  },
  {
    "title": "The Galaxy, and the Ground Within",
    "author": "Becky Chambers",
    "year": 2021,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      1,
      3
    ],
    "persists": [
      "care",
      "attention",
      "presence"
    ],
    "fades": [
      "status",
      "urgency"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "A Closed and Common Orbit",
    "desc": "Travelers from different alien species are stranded together at a waystation, confronting their differences."
  },
  {
    "title": "Schismatrix Plus",
    "author": "Bruce Sterling",
    "year": 1985,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "mortality",
      "hierarchy"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "flexibility",
      "diplomacy",
      "curiosity"
    ],
    "fades": [
      "fixed_nature",
      "conservatism",
      "stability"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Diaspora",
    "desc": "A diplomat navigates a solar system divided between genetically-enhanced Shapers and cybernetic Mechanists."
  },
  {
    "title": "Islands in the Net",
    "author": "Bruce Sterling",
    "year": 1988,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "hierarchy",
      "work",
      "freedom"
    ],
    "ifthen": [
      1,
      6,
      10
    ],
    "persists": [
      "care",
      "presence"
    ],
    "fades": [
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "desc": "A corporate executive is drawn into global intrigue involving data pirates and rogue states."
  },
  {
    "title": "Distraction",
    "author": "Bruce Sterling",
    "year": 1998,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "work",
      "meaning"
    ],
    "ifthen": [
      1,
      4,
      6
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "identity": "constructed"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "status",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "desc": "A political spin doctor navigates a chaotic 2044 America where the government has collapsed."
  },
  {
    "title": "Downbelow Station",
    "author": "C.J. Cherryh",
    "year": 1981,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "connection",
      "freedom",
      "work"
    ],
    "ifthen": [
      0,
      3
    ],
    "persists": [
      "care",
      "craft",
      "difficulty"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Foundation",
    "desc": "A space station becomes a battleground as war erupts between Earth's Company and the rebel Union."
  },
  {
    "title": "Cyteen",
    "author": "C.J. Cherryh",
    "year": 1988,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "freedom",
      "connection"
    ],
    "ifthen": [
      4,
      6,
      11
    ],
    "persists": [
      "craft",
      "attention",
      "difficulty"
    ],
    "fades": [
      "artificial",
      "privacy"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "transcended",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Dawn",
    "desc": "A murdered geneticist is cloned and her successor must navigate deadly politics while discovering her identity.",
    "educationPurpose": "conditioning-control",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Contact",
    "author": "Carl Sagan",
    "year": 1985,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "connection",
      "identity",
      "hierarchy"
    ],
    "ifthen": [
      1,
      8
    ],
    "persists": [
      "craft",
      "attention",
      "care"
    ],
    "fades": [
      "status"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "The Dark Forest",
    "desc": "A scientist decodes an extraterrestrial message containing instructions to build a machine for interstellar travel."
  },
  {
    "title": "Singularity Sky",
    "author": "Charles Stross",
    "year": 2003,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "scarcity",
      "work"
    ],
    "ifthen": [
      0,
      6,
      7
    ],
    "persists": [
      "craft",
      "difficulty"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "The Dispossessed",
    "desc": "A repressive interstellar colony is upended when aliens arrive offering technology in exchange for entertainment."
  },
  {
    "title": "Iron Sunrise",
    "author": "Charles Stross",
    "year": 2004,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "identity",
      "meaning"
    ],
    "ifthen": [
      2,
      6,
      7
    ],
    "persists": [
      "craft",
      "risk"
    ],
    "fades": [
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "desc": "Agents race to prevent retaliation against the wrong planet after a star is deliberately destroyed."
  },
  {
    "title": "Accelerando",
    "author": "Charles Stross",
    "year": 2005,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "mortality",
      "meaning"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "acceleration",
      "posthuman_economics",
      "transformation"
    ],
    "fades": [
      "humanity",
      "continuity",
      "baseline"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "identity",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "irrelevant",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "The Telling",
    "desc": "Three generations of a family experience humanity's transformation through a technological singularity."
  },
  {
    "title": "Glasshouse",
    "author": "Charles Stross",
    "year": 2006,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "meaning"
    ],
    "ifthen": [
      4,
      5,
      10
    ],
    "persists": [
      "care",
      "stories"
    ],
    "fades": [
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "identity": "constructed",
      "freedom": "reveals"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "desc": "An amnesiac war veteran hides in an experiment simulating 20th-century society, only to find it's a trap."
  },
  {
    "title": "Perdido Street Station",
    "author": "China Mieville",
    "year": 2000,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "work",
      "identity"
    ],
    "ifthen": [
      0,
      3
    ],
    "persists": [
      "craft",
      "difficulty",
      "risk"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Neuromancer",
    "desc": "A scientist in a grotesque steampunk city accidentally unleashes terrifying winged monsters."
  },
  {
    "title": "The Scar",
    "author": "China Mieville",
    "year": 2002,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "meaning",
      "identity",
      "hierarchy"
    ],
    "ifthen": [
      2,
      4,
      8
    ],
    "persists": [
      "craft",
      "difficulty"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "A linguist captured by pirates is taken to a floating city seeking a mythical reality-warping location."
  },
  {
    "title": "Iron Council",
    "author": "China Mieville",
    "year": 2004,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "work",
      "meaning"
    ],
    "ifthen": [
      0,
      2
    ],
    "persists": [
      "craft",
      "stories",
      "difficulty"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "A renegade perpetual train becomes a symbol of revolution as war tears through New Crobuzon."
  },
  {
    "title": "The City & The City",
    "author": "China Mieville",
    "year": 2009,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "identity",
      "freedom",
      "meaning"
    ],
    "ifthen": [
      7
    ],
    "persists": [
      "attention",
      "limits"
    ],
    "fades": [
      "artificial",
      "privacy"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "1984",
    "desc": "A detective investigates a murder across two cities that occupy the same space but must ignore each other."
  },
  {
    "title": "Embassytown",
    "author": "China Mieville",
    "year": 2011,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "connection",
      "meaning"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "metaphor",
      "imagination",
      "lying"
    ],
    "fades": [
      "literal_truth",
      "direct_language",
      "innocence"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Babel-17",
    "desc": "A human colonist becomes entangled in a crisis when a new ambassador disrupts relations with aliens who cannot lie."
  },
  {
    "title": "City",
    "author": "Clifford D. Simak",
    "year": 1952,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "connection",
      "identity",
      "work"
    ],
    "ifthen": [
      0,
      1,
      5,
      7
    ],
    "persists": [
      "care",
      "stories"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "identity": "dissolves"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "debatesWith": "Childhood's End",
    "desc": "Intelligent dogs inherit Earth and pass down legends of their human creators who abandoned the planet."
  },
  {
    "title": "Way Station",
    "author": "Clifford D. Simak",
    "year": 1963,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "meaning",
      "identity",
      "work"
    ],
    "ifthen": [
      0,
      1,
      8
    ],
    "persists": [
      "care",
      "craft",
      "attention"
    ],
    "fades": [
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Contact",
    "desc": "A Civil War veteran secretly operates an alien transit station, gaining immortality."
  },
  {
    "title": "The Road",
    "author": "Cormac McCarthy",
    "year": 2006,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "connection",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      3,
      6
    ],
    "persists": [
      "care",
      "presence",
      "stories"
    ],
    "fades": [
      "status",
      "artificial",
      "boredom"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "A Canticle for Leibowitz",
    "desc": "A father and son journey through a burned, post-apocalyptic America, surviving on love and scavenged supplies."
  },
  {
    "title": "Down and Out in the Magic Kingdom",
    "author": "Cory Doctorow",
    "year": 2003,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "hierarchy",
      "mortality"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "status_competition",
      "whuffie",
      "relevance_anxiety"
    ],
    "fades": [
      "death",
      "poverty",
      "material_want"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "status",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "debatesWith": "The Player of Games",
    "desc": "In a future without death or scarcity, a Disney World resident wages war for control of attractions."
  },
  {
    "title": "Walkaway",
    "author": "Cory Doctorow",
    "year": 2017,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "work",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "gift_economy",
      "radical_hospitality",
      "walking_away"
    ],
    "fades": [
      "artificial_scarcity",
      "default_world",
      "ownership"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "The Dispossessed",
    "desc": "Dissidents abandon mainstream society for a post-scarcity commune, then discover how to upload consciousness."
  },
  {
    "title": "The Bezzle",
    "author": "Cory Doctorow",
    "year": 2024,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "scarcity",
      "work",
      "freedom"
    ],
    "ifthen": [
      0,
      3,
      5
    ],
    "persists": [
      "limits",
      "difficulty"
    ],
    "fades": [
      "urgency"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "oppressive",
    "econ": "capitalism",
    "newScarcity": "status",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "enforced",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Walkaway",
    "desc": "A forensic accountant uncovers a scheme where wealthy investors exploit California's privatized prison system."
  },
  {
    "title": "Hyperion",
    "author": "Dan Simmons",
    "year": 1989,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "mortality",
      "identity",
      "connection"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "story",
      "love",
      "art",
      "memory"
    ],
    "fades": [
      "simple_answers",
      "safe_transcendence",
      "trust_in_AI"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Childhood's End",
    "desc": "Seven pilgrims journey to meet the deadly Shrike, each sharing their tale of why they seek the Time Tombs."
  },
  {
    "title": "Flowers for Algernon",
    "author": "Daniel Keyes",
    "year": 1966,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "connection",
      "work"
    ],
    "ifthen": [
      4,
      8,
      11
    ],
    "persists": [
      "care",
      "presence"
    ],
    "fades": [
      "skills",
      "achievement"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "identity": "fluid"
    },
    "techStance": "neutral",
    "econ": "capitalism",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "A man with intellectual disabilities undergoes experimental surgery to increase his intelligence, with tragic results.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "year": 1979,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "freedom",
      "identity",
      "mortality"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "towels",
      "friendship",
      "not_panicking"
    ],
    "fades": [
      "cosmic_purpose",
      "seriousness",
      "earth"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "background",
    "debatesWith": "Solaris",
    "desc": "Earth is demolished for a hyperspace bypass, and Arthur Dent hitchhikes through the galaxy."
  },
  {
    "title": "The Machine Stops",
    "author": "E.M. Forster",
    "year": 1909,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "embodiment",
      "freedom",
      "meaning"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "direct_experience",
      "physical_presence",
      "curiosity"
    ],
    "fades": [
      "mediation",
      "ideas_about_ideas",
      "bodies"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "post-money",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Rainbows End",
    "desc": "Humanity lives underground in isolated cells, utterly dependent on an omnipotent Machine that begins to fail."
  },
  {
    "title": "Station Eleven",
    "author": "Emily St. John Mandel",
    "year": 2014,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "connection",
      "identity",
      "work"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "art",
      "shakespeare",
      "music",
      "memory"
    ],
    "fades": [
      "technology",
      "infrastructure",
      "old_world"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "The Peripheral",
    "desc": "A traveling theater troupe performs Shakespeare in the scattered settlements after a pandemic."
  },
  {
    "title": "Ecotopia",
    "author": "Ernest Callenbach",
    "year": 1975,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "hierarchy",
      "connection",
      "embodiment"
    ],
    "ifthen": [
      0,
      3,
      4
    ],
    "persists": [
      "craft",
      "limits",
      "presence"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Stand on Zanzibar",
    "desc": "A journalist visits a breakaway Pacific Northwest nation that has created an ecological utopia."
  },
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "year": 1965,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "identity",
      "mortality"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "ecology",
      "discipline",
      "messiah_danger"
    ],
    "fades": [
      "simple_heroism",
      "AI",
      "comfortable_answers"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Foundation",
    "desc": "A young noble heir must survive deadly betrayal when his family takes control of the most valuable planet in the universe, rising to lead its desert people."
  },
  {
    "title": "Dune Messiah",
    "author": "Frank Herbert",
    "year": 1969,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "identity",
      "meaning"
    ],
    "ifthen": [
      6,
      7
    ],
    "persists": [
      "limits",
      "difficulty"
    ],
    "fades": [
      "comfort",
      "achievement"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "Emperor Paul Atreides struggles against conspiracies while unable to stop the religious jihad in his name."
  },
  {
    "title": "Children of Dune",
    "author": "Frank Herbert",
    "year": 1976,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "identity",
      "hierarchy",
      "freedom"
    ],
    "ifthen": [
      5,
      6,
      9
    ],
    "persists": [
      "difficulty",
      "risk"
    ],
    "fades": [
      "comfort"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "mortality": "transcends",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "Paul's twin children navigate assassination plots while one transforms to ensure humanity's survival."
  },
  {
    "title": "God Emperor of Dune",
    "author": "Frank Herbert",
    "year": 1981,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "mortality",
      "hierarchy",
      "meaning"
    ],
    "ifthen": [
      5,
      6,
      9,
      11
    ],
    "persists": [
      "difficulty",
      "limits"
    ],
    "fades": [
      "comfort",
      "status"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "mortality": "transcends",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "The End of Eternity",
    "desc": "Leto II, merged with sandworms for 3,500 years, rules as an immortal tyrant to save humanity."
  },
  {
    "title": "Man Plus",
    "author": "Frederik Pohl",
    "year": 1976,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "embodiment",
      "meaning",
      "work"
    ],
    "ifthen": [
      3,
      7,
      8
    ],
    "persists": [
      "care",
      "presence"
    ],
    "fades": [
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "identity": "fluid"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "desc": "An astronaut is surgically transformed into a cyborg designed to survive on Mars as Earth faces global catastrophe."
  },
  {
    "title": "Gateway",
    "author": "Frederik Pohl",
    "year": 1977,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "mortality",
      "scarcity"
    ],
    "ifthen": [
      5,
      8
    ],
    "persists": [
      "risk",
      "difficulty",
      "stories"
    ],
    "fades": [
      "status",
      "boredom"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Solaris",
    "desc": "Explorers use abandoned alien ships with unknown destinations, risking death or fortune with every launch."
  },
  {
    "title": "Jem",
    "author": "Frederik Pohl",
    "year": 1979,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "connection",
      "work",
      "meaning"
    ],
    "ifthen": [
      2,
      6
    ],
    "persists": [
      "difficulty"
    ],
    "fades": [
      "comfort",
      "status"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "status",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "desc": "Three rival power blocs from a resource-depleted Earth export their conflicts to a newly discovered habitable planet."
  },
  {
    "title": "The Space Merchants",
    "author": "Frederik Pohl & C.M. Kornbluth",
    "year": 1953,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "work",
      "freedom",
      "meaning"
    ],
    "ifthen": [
      6,
      8
    ],
    "persists": [
      "craft",
      "risk"
    ],
    "fades": [
      "status"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "capitalism",
    "newScarcity": "freedom",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Down and Out in the Magic Kingdom",
    "desc": "In an overpopulated future ruled by advertising agencies, a copywriter is assigned to sell Venus colonization."
  },
  {
    "title": "The Book of the New Sun",
    "author": "Gene Wolfe",
    "year": 1983,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "mortality",
      "hierarchy"
    ],
    "ifthen": [
      4,
      5,
      11
    ],
    "persists": [
      "stories",
      "attention",
      "difficulty"
    ],
    "fades": [
      "status"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "mortality": "transcends",
      "identity": "fluid"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "desc": "A torturer's apprentice is exiled and journeys across a far-future dying Earth carrying an ancient sword.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "apprenticeship"
  },
  {
    "title": "Nineteen Eighty-Four",
    "author": "George Orwell",
    "year": 1949,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "power",
      "control",
      "doublethink"
    ],
    "fades": [
      "truth",
      "love",
      "resistance",
      "self"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Brave New World",
    "desc": "A minor Party member rebels against a totalitarian surveillance state ruled by the omnipresent Big Brother.",
    "educationPurpose": "conditioning-control",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Quarantine",
    "author": "Greg Egan",
    "year": 1992,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      9,
      11,
      4
    ],
    "persists": [
      "difficulty",
      "craft"
    ],
    "fades": [
      "artificial",
      "privacy"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "identity",
    "worthLiving": "discovery",
    "identityModel": "multiple",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "VALIS",
    "desc": "A detective investigates an impossible escape in a future where the stars have been blocked by aliens."
  },
  {
    "title": "Permutation City",
    "author": "Greg Egan",
    "year": 1994,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "mortality",
      "meaning",
      "freedom"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "pattern",
      "curiosity",
      "simulation"
    ],
    "fades": [
      "substrate",
      "embodiment",
      "continuity"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "identity",
    "worthLiving": "transcendence",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "irrelevant",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Story of Your Life",
    "desc": "A wealthy man creates digital copies of human minds and tests whether simulated realities can become self-sustaining, discovering that consciousness may persist through mathematical pattern alone."
  },
  {
    "title": "Distress",
    "author": "Greg Egan",
    "year": 1995,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "freedom",
      "embodiment"
    ],
    "ifthen": [
      4,
      9,
      11
    ],
    "persists": [
      "difficulty",
      "craft",
      "attention"
    ],
    "fades": [
      "artificial",
      "privacy"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "debatesWith": "The Quantum Thief",
    "desc": "A journalist covers a physics conference on an artificial island as a Theory of Everything nears completion."
  },
  {
    "title": "Diaspora",
    "author": "Greg Egan",
    "year": 1997,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "meaning",
      "mortality"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "curiosity",
      "transformation",
      "openness"
    ],
    "fades": [
      "flesh",
      "tradition",
      "limits"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "central",
    "debatesWith": "Aurora",
    "desc": "Digital beings and flesh-based humans search for knowledge after a cosmic catastrophe threatens humanity."
  },
  {
    "title": "Schild's Ladder",
    "author": "Greg Egan",
    "year": 2002,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "mortality",
      "embodiment"
    ],
    "ifthen": [
      6,
      9,
      11
    ],
    "persists": [
      "difficulty",
      "craft",
      "risk"
    ],
    "fades": [
      "presence",
      "artificial"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "experience",
    "worthLiving": "discovery",
    "identityModel": "multiple",
    "deathRole": "obstacle",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "debatesWith": "Diaspora",
    "desc": "A physics experiment creates an expanding bubble of new vacuum that threatens to consume the universe."
  },
  {
    "title": "The Time Machine",
    "author": "H.G. Wells",
    "year": 1895,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "mortality",
      "meaning",
      "embodiment"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "entropy",
      "class_division",
      "degeneration"
    ],
    "fades": [
      "intelligence",
      "progress",
      "humanity"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "why-exist",
    "aiPresence": "absent",
    "debatesWith": "Kindred",
    "desc": "A Victorian inventor travels to 802,701 to find humanity split into idle Eloi and predatory Morlocks."
  },
  {
    "title": "The Island of Doctor Moreau",
    "author": "H.G. Wells",
    "year": 1896,
    "deep": true,
    "theme": "embodiment",
    "themes": [
      "embodiment",
      "identity",
      "hierarchy",
      "freedom"
    ],
    "ifthen": [
      4
    ],
    "persists": [
      "limits"
    ],
    "fades": [
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "identity",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "irrelevant",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "A shipwrecked man discovers an island where a scientist transforms animals into human-like creatures."
  },
  {
    "title": "The War of the Worlds",
    "author": "H.G. Wells",
    "year": 1898,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "mortality",
      "embodiment"
    ],
    "ifthen": [
      7
    ],
    "persists": [
      "presence",
      "luck"
    ],
    "fades": [
      "status",
      "achievement"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "status",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "Martians invade Earth with devastating heat-rays, reducing humanity to terrified refugees."
  },
  {
    "title": "The Quantum Thief",
    "author": "Hannu Rajaniemi",
    "year": 2010,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "meaning"
    ],
    "ifthen": [
      9,
      11,
      6
    ],
    "persists": [
      "craft",
      "stories",
      "risk"
    ],
    "fades": [
      "privacy",
      "artificial"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "discovery",
    "identityModel": "multiple",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Permutation City",
    "desc": "A legendary thief is freed from a virtual prison to pull off a heist in a post-human solar system."
  },
  {
    "title": "The Fractal Prince",
    "author": "Hannu Rajaniemi",
    "year": 2012,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "meaning"
    ],
    "ifthen": [
      9,
      11,
      6
    ],
    "persists": [
      "stories",
      "craft",
      "risk"
    ],
    "fades": [
      "privacy",
      "artificial"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "discovery",
    "identityModel": "multiple",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "The Quantum Thief",
    "desc": "A master thief journeys to a transformed Earth where reality and digital stories blur in desert cities."
  },
  {
    "title": "The Causal Angel",
    "author": "Hannu Rajaniemi",
    "year": 2014,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "meaning"
    ],
    "ifthen": [
      9,
      11,
      6
    ],
    "persists": [
      "craft",
      "risk",
      "stories"
    ],
    "fades": [
      "privacy",
      "artificial"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "discovery",
    "identityModel": "multiple",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "The Fractal Prince",
    "desc": "A thief and warrior race to reunite as war erupts between godlike factions across the solar system."
  },
  {
    "title": "The Glass Bead Game",
    "author": "Hermann Hesse",
    "year": 1943,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "work",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      0,
      1,
      9
    ],
    "persists": [
      "craft",
      "attention",
      "care"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Anathem",
    "desc": "In a future intellectual utopia, a master of an abstract game synthesizing all arts questions his cloistered life."
  },
  {
    "title": "Consider Phlebas",
    "author": "Iain M. Banks",
    "year": 1987,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "freedom",
      "hierarchy",
      "identity"
    ],
    "ifthen": [
      0,
      5,
      9
    ],
    "persists": [
      "conviction",
      "struggle",
      "faith"
    ],
    "fades": [
      "meaning",
      "urgency",
      "stakes"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "central",
    "debatesWith": "A Psalm for the Wild-Built",
    "desc": "A shape-changing mercenary hunts a fugitive Mind during the galaxy-spanning Idiran-Culture War.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "The Player of Games",
    "author": "Iain M. Banks",
    "year": 1988,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "identity",
      "freedom"
    ],
    "ifthen": [
      1,
      6,
      10
    ],
    "persists": [
      "integrity",
      "play",
      "craft"
    ],
    "fades": [
      "high_stakes",
      "meritocracy",
      "cruelty"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "irrelevant",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Ender's Game",
    "desc": "A bored master game player competes in a brutal empire where the game's winner becomes emperor.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "The State of the Art",
    "author": "Iain M. Banks",
    "year": 1989,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "connection",
      "freedom",
      "meaning"
    ],
    "ifthen": [
      4,
      9,
      11
    ],
    "persists": [
      "compassion",
      "observation",
      "choice"
    ],
    "fades": [
      "interference",
      "certainty",
      "superiority"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Childhood's End",
    "desc": "A story collection featuring a Culture ship's covert visit to Earth in 1977."
  },
  {
    "title": "Use of Weapons",
    "author": "Iain M. Banks",
    "year": 1990,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "hierarchy",
      "mortality"
    ],
    "ifthen": [
      2,
      7,
      11
    ],
    "persists": [
      "guilt",
      "trauma",
      "service"
    ],
    "fades": [
      "redemption",
      "clean_hands",
      "innocence"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "The Forever War",
    "desc": "A Culture agent with a hidden past undertakes dangerous missions while his traumatic history unfolds.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Excession",
    "author": "Iain M. Banks",
    "year": 1996,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "identity",
      "scarcity"
    ],
    "ifthen": [
      6,
      8,
      9
    ],
    "persists": [
      "difficulty",
      "risk",
      "craft"
    ],
    "fades": [
      "boredom",
      "urgency"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Consider Phlebas",
    "desc": "Culture Minds confront a mysterious artifact from another universe while dealing with a brutal civilization.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Inversions",
    "author": "Iain M. Banks",
    "year": 1998,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "meaning",
      "connection"
    ],
    "ifthen": [
      0,
      3
    ],
    "persists": [
      "craft",
      "care",
      "attention"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "Two mysterious foreigners serve rival kingdoms on a medieval world, concealing their true origins.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Look to Windward",
    "author": "Iain M. Banks",
    "year": 2000,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "meaning",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      5,
      6,
      8
    ],
    "persists": [
      "stories",
      "attention",
      "care"
    ],
    "fades": [
      "urgency",
      "boredom"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Use of Weapons",
    "desc": "An emissary with a buried assassination mission travels to a Culture Orbital as ancient atrocities arrive.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Matter",
    "author": "Iain M. Banks",
    "year": 2008,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "meaning",
      "identity",
      "mortality"
    ],
    "ifthen": [
      0,
      3,
      8
    ],
    "persists": [
      "risk",
      "care",
      "craft"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Surface Detail",
    "desc": "Three royal siblings are caught in war and conspiracy on a vast artificial shellworld.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Surface Detail",
    "author": "Iain M. Banks",
    "year": 2010,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "hierarchy",
      "freedom",
      "identity"
    ],
    "ifthen": [
      3,
      8,
      10
    ],
    "persists": [
      "courage",
      "revenge",
      "will"
    ],
    "fades": [
      "mercy",
      "death_as_end",
      "cultural_tolerance"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Permutation City",
    "desc": "A murdered slave seeks revenge as a secret war over virtual afterlife Hells threatens to become real.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "The Hydrogen Sonata",
    "author": "Iain M. Banks",
    "year": 2012,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "meaning",
      "identity",
      "freedom"
    ],
    "ifthen": [
      6,
      9,
      11
    ],
    "persists": [
      "craft",
      "difficulty",
      "stories"
    ],
    "fades": [
      "urgency",
      "artificial"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "why-exist",
    "aiPresence": "central",
    "debatesWith": "Childhood's End",
    "desc": "A civilization prepares to Sublime while one soldier searches for a man who knows their secret history.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "I, Robot",
    "author": "Isaac Asimov",
    "year": 1950,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "work",
      "identity",
      "meaning"
    ],
    "ifthen": [
      7,
      8
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "desc": "Nine stories explore robots, the Three Laws of Robotics, and humanity's evolving relationship with AI."
  },
  {
    "title": "Foundation",
    "author": "Isaac Asimov",
    "year": 1951,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "meaning",
      "freedom",
      "work"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "knowledge",
      "prediction",
      "inevitable_forces"
    ],
    "fades": [
      "individual_agency",
      "chaos",
      "dark_ages"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Dune",
    "desc": "A mathematician predicts the fall of the Galactic Empire and establishes a colony to shorten the dark age."
  },
  {
    "title": "The Caves of Steel",
    "author": "Isaac Asimov",
    "year": 1954,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "hierarchy",
      "connection",
      "identity"
    ],
    "ifthen": [
      0,
      7,
      9
    ],
    "persists": [
      "craft",
      "presence"
    ],
    "fades": [
      "comfort"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Neuromancer",
    "desc": "Detective Elijah Baley reluctantly partners with a humanoid robot to solve a murder in domed megacities."
  },
  {
    "title": "The End of Eternity",
    "author": "Isaac Asimov",
    "year": 1955,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "meaning",
      "hierarchy",
      "mortality"
    ],
    "ifthen": [
      2,
      9,
      11
    ],
    "persists": [
      "risk",
      "difficulty"
    ],
    "fades": [
      "comfort",
      "necessity"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "An Eternal who manipulates time falls in love and threatens the fabric of Eternity itself."
  },
  {
    "title": "The Female Man",
    "author": "Joanna Russ",
    "year": 1975,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "embodiment"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "rage",
      "awareness",
      "possibility"
    ],
    "fades": [
      "patriarchy",
      "half_personhood",
      "constraint"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "Four versions of the same woman from parallel universes meet and challenge assumptions about gender."
  },
  {
    "title": "The Forever War",
    "author": "Joe Haldeman",
    "year": 1974,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "meaning",
      "mortality"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "love",
      "alienation",
      "adaptation"
    ],
    "fades": [
      "home",
      "understanding",
      "purpose_of_war"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Use of Weapons",
    "desc": "A soldier fights an interstellar war, returning home to find centuries have passed due to time dilation."
  },
  {
    "title": "Stand on Zanzibar",
    "author": "John Brunner",
    "year": 1968,
    "deep": true,
    "theme": "scarcity",
    "themes": [
      "scarcity",
      "hierarchy",
      "identity",
      "connection"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "limits",
      "attention"
    ],
    "fades": [
      "urgency",
      "privacy"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Ecotopia",
    "desc": "In an overpopulated 2010, a corporate executive and spy navigate genetic engineering and social collapse."
  },
  {
    "title": "The Sheep Look Up",
    "author": "John Brunner",
    "year": 1972,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "scarcity",
      "connection",
      "embodiment"
    ],
    "ifthen": [
      3,
      4
    ],
    "persists": [
      "limits",
      "care",
      "attention"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Stand on Zanzibar",
    "desc": "Environmental collapse devastates America while an activist tries to wake the oblivious public."
  },
  {
    "title": "The Shockwave Rider",
    "author": "John Brunner",
    "year": 1975,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      8,
      9
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "privacy",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "discovery",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Neuromancer",
    "desc": "A fugitive uses computer hacking skills to escape pursuit and expose government secrets."
  },
  {
    "title": "The Light Brigade",
    "author": "Kameron Hurley",
    "year": 2019,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "work",
      "identity",
      "freedom"
    ],
    "ifthen": [
      2,
      6,
      7
    ],
    "persists": [
      "care",
      "risk"
    ],
    "fades": [
      "status",
      "comfort"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "capitalism",
    "newScarcity": "freedom",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Starship Troopers",
    "desc": "Soldiers broken into light for teleportation find their drops through time reveal corporate war's hidden truths."
  },
  {
    "title": "Never Let Me Go",
    "author": "Kazuo Ishiguro",
    "year": 2005,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "identity",
      "connection",
      "meaning"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "love",
      "art",
      "small_moments"
    ],
    "fades": [
      "escape",
      "rebellion",
      "justice"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "The Lifecycle of Software Objects",
    "desc": "Students at an idyllic English boarding school gradually discover they are clones raised to donate organs."
  },
  {
    "title": "Klara and the Sun",
    "author": "Kazuo Ishiguro",
    "year": 2021,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "meaning",
      "mortality"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "devotion",
      "faith",
      "being_present"
    ],
    "fades": [
      "being_needed",
      "irreducible_self",
      "gratitude"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Do Androids Dream of Electric Sheep?",
    "desc": "An Artificial Friend observes human nature while trying to save her sick owner, whom she loves."
  },
  {
    "title": "The Star Fraction",
    "author": "Ken MacLeod",
    "year": 1995,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "identity",
      "work"
    ],
    "ifthen": [
      0,
      2,
      8
    ],
    "persists": [
      "craft",
      "stories",
      "risk"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "The Dispossessed",
    "desc": "In a balkanized UK of micro-states, a mercenary inadvertently awakens an AI that triggers revolution."
  },
  {
    "title": "The Cassini Division",
    "author": "Ken MacLeod",
    "year": 1998,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "identity",
      "freedom",
      "mortality"
    ],
    "ifthen": [
      6,
      8,
      11
    ],
    "persists": [
      "risk",
      "difficulty",
      "craft"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "identity",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Consider Phlebas",
    "desc": "A 24th-century soldier guards humanity against godlike post-humans orbiting Jupiter while questioning her mission."
  },
  {
    "title": "The Wild Shore",
    "author": "Kim Stanley Robinson",
    "year": 1984,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "work",
      "connection",
      "identity"
    ],
    "ifthen": [
      0,
      2,
      11
    ],
    "persists": [
      "craft",
      "stories",
      "presence"
    ],
    "fades": [
      "status",
      "achievement"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "desc": "Decades after nuclear war, a young Californian dreams of rebuilding America while the world enforces quarantine."
  },
  {
    "title": "The Gold Coast",
    "author": "Kim Stanley Robinson",
    "year": 1988,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "work",
      "connection",
      "freedom"
    ],
    "ifthen": [
      0,
      8,
      9
    ],
    "persists": [
      "craft",
      "stories"
    ],
    "fades": [
      "necessity",
      "urgency"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves"
    },
    "techStance": "neutral",
    "econ": "capitalism",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "desc": "In 2027 Orange County sprawl, a defense contractor's son drifts into sabotage against the military-industrial complex."
  },
  {
    "title": "Pacific Edge",
    "author": "Kim Stanley Robinson",
    "year": 1990,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "meaning",
      "connection",
      "hierarchy"
    ],
    "ifthen": [
      0,
      1,
      2
    ],
    "persists": [
      "craft",
      "care",
      "presence"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Player of Games",
    "desc": "In an ecological utopia, a town council member fights to save the last wild hillside from development."
  },
  {
    "title": "Red Mars",
    "author": "Kim Stanley Robinson",
    "year": 1992,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "work",
      "meaning"
    ],
    "ifthen": [
      3,
      7,
      9
    ],
    "persists": [
      "vision",
      "revolution",
      "ecology"
    ],
    "fades": [
      "earth_patterns",
      "corporate_control",
      "old_politics"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "The Moon Is a Harsh Mistress",
    "desc": "The first hundred colonists arrive on Mars and begin terraforming while divided over the planet's future."
  },
  {
    "title": "Green Mars",
    "author": "Kim Stanley Robinson",
    "year": 1993,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "work",
      "meaning"
    ],
    "ifthen": [
      0,
      3,
      6
    ],
    "persists": [
      "craft",
      "difficulty",
      "risk"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "transcended",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Red Mars",
    "desc": "A generation after the failed revolution, the Martian underground organizes as terraforming transforms the planet."
  },
  {
    "title": "Blue Mars",
    "author": "Kim Stanley Robinson",
    "year": 1996,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "mortality",
      "freedom",
      "identity"
    ],
    "ifthen": [
      0,
      8,
      11
    ],
    "persists": [
      "persistence",
      "synthesis",
      "ecology"
    ],
    "fades": [
      "memory",
      "enemies",
      "simple_answers"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Diaspora",
    "desc": "Mars achieves independence as a verdant world while Earth faces collapse and colonists grapple with longevity."
  },
  {
    "title": "2312",
    "author": "Kim Stanley Robinson",
    "year": 2012,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "embodiment",
      "connection"
    ],
    "ifthen": [
      3,
      4,
      6,
      10
    ],
    "persists": [
      "craft",
      "attention",
      "care"
    ],
    "fades": [
      "status",
      "boredom"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Pacific Edge",
    "desc": "In a colonized solar system, a woman investigates her grandmother's death and uncovers a conspiracy."
  },
  {
    "title": "Aurora",
    "author": "Kim Stanley Robinson",
    "year": 2015,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "freedom",
      "embodiment",
      "mortality"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "earth",
      "limits",
      "story"
    ],
    "fades": [
      "expansion",
      "escape",
      "transcendence"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Diaspora",
    "desc": "A generation ship carrying colonists to Tau Ceti discovers that interstellar settlement may be far harder than imagined."
  },
  {
    "title": "New York 2140",
    "author": "Kim Stanley Robinson",
    "year": 2017,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "work",
      "connection",
      "scarcity"
    ],
    "ifthen": [
      0,
      3
    ],
    "persists": [
      "craft",
      "care",
      "difficulty"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "The Ministry for the Future",
    "desc": "Residents of a flooded Manhattan navigate life, finance, and politics in a drowned city."
  },
  {
    "title": "The Ministry for the Future",
    "author": "Kim Stanley Robinson",
    "year": 2020,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "hierarchy",
      "freedom",
      "connection"
    ],
    "ifthen": [
      1,
      5,
      7
    ],
    "persists": [
      "persistence",
      "markets",
      "violence",
      "bureaucracy"
    ],
    "fades": [
      "comfort",
      "denial",
      "private_jets"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "The Lathe of Heaven",
    "desc": "A UN organization established for future generations confronts the climate crisis through decades of struggle."
  },
  {
    "title": "Player Piano",
    "author": "Kurt Vonnegut",
    "year": 1952,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "meaning",
      "freedom",
      "identity"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "fixing_things",
      "purpose_hunger",
      "cycle"
    ],
    "fades": [
      "meaningful_work",
      "dignity",
      "being_needed"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Brave New World",
    "desc": "In a future where machines have replaced labor, an engineer questions a society that rendered workers obsolete.",
    "educationPurpose": "sorting-class",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "The Sirens of Titan",
    "author": "Kurt Vonnegut",
    "year": 1959,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "freedom",
      "connection",
      "mortality"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "kindness",
      "small_connections",
      "absurdity"
    ],
    "fades": [
      "cosmic_purpose",
      "free_will",
      "importance"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "background",
    "debatesWith": "Childhood's End",
    "desc": "A wealthy playboy is manipulated across space and time, discovering humanity's history served a trivial purpose."
  },
  {
    "title": "Cat's Cradle",
    "author": "Kurt Vonnegut",
    "year": 1963,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "mortality",
      "connection"
    ],
    "ifthen": [
      7
    ],
    "persists": [
      "stories",
      "limits"
    ],
    "fades": [
      "artificial",
      "urgency"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "absent",
    "debatesWith": "Dr. Strangelove",
    "desc": "A writer researching the atomic bomb's creators discovers ice-nine, which could freeze all water on Earth."
  },
  {
    "title": "Slaughterhouse-Five",
    "author": "Kurt Vonnegut",
    "year": 1969,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "freedom",
      "meaning",
      "identity"
    ],
    "ifthen": [
      6,
      9
    ],
    "persists": [
      "stories",
      "attention"
    ],
    "fades": [
      "urgency",
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "acceptance",
    "identityModel": "fixed",
    "deathRole": "irrelevant",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "absent",
    "debatesWith": "Catch-22",
    "desc": "Billy Pilgrim, unstuck in time, experiences the Dresden firebombing and alien abduction in non-linear fragments."
  },
  {
    "title": "Ringworld",
    "author": "Larry Niven",
    "year": 1970,
    "deep": true,
    "theme": "scarcity",
    "themes": [
      "scarcity",
      "meaning",
      "hierarchy",
      "identity"
    ],
    "ifthen": [
      3,
      8,
      11
    ],
    "persists": [
      "difficulty",
      "risk",
      "craft"
    ],
    "fades": [
      "urgency",
      "boredom"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Rendezvous with Rama",
    "desc": "A team of humans and aliens explores an artificial ring-shaped world encircling a distant star."
  },
  {
    "title": "The Three-Body Problem",
    "author": "Liu Cixin",
    "year": 2008,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "hierarchy",
      "meaning",
      "freedom"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "survival",
      "science",
      "cosmic_insignificance"
    ],
    "fades": [
      "faith_in_humanity",
      "contact_optimism",
      "safety"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "why-exist",
    "aiPresence": "background",
    "debatesWith": "Contact",
    "desc": "During China's Cultural Revolution, a secret project sends signals into space, initiating first contact."
  },
  {
    "title": "The Dark Forest",
    "author": "Liu Cixin",
    "year": 2008,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "mortality",
      "meaning",
      "connection"
    ],
    "ifthen": [
      2,
      6,
      9
    ],
    "persists": [
      "risk",
      "difficulty"
    ],
    "fades": [
      "comfort",
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "hierarchy": "yes",
      "mortality": "required"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "why-exist",
    "aiPresence": "background",
    "debatesWith": "Contact",
    "desc": "Facing a coming alien invasion, Earth grants four men secret resources to devise humanity's hidden defense."
  },
  {
    "title": "Death's End",
    "author": "Liu Cixin",
    "year": 2010,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "meaning",
      "hierarchy",
      "freedom"
    ],
    "ifthen": [
      5,
      6,
      11
    ],
    "persists": [
      "stories"
    ],
    "fades": [
      "comfort",
      "status"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "mortality": "transcends",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fixed",
    "deathRole": "transcended",
    "workRole": "essential",
    "coreQuestion": "why-exist",
    "aiPresence": "background",
    "desc": "An aerospace engineer awakens from hibernation to navigate humanity's final struggle against cosmic extinction."
  },
  {
    "title": "The Handmaid's Tale",
    "author": "Margaret Atwood",
    "year": 1985,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "hierarchy",
      "embodiment"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "memory",
      "resistance",
      "selfhood"
    ],
    "fades": [
      "rights",
      "autonomy",
      "safety"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Nineteen Eighty-Four",
    "desc": "In a totalitarian theocracy that has replaced America, fertile women are enslaved as reproductive servants.",
    "educationPurpose": "conditioning-control",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Oryx and Crake",
    "author": "Margaret Atwood",
    "year": 2003,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "identity",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "witness",
      "memory",
      "art"
    ],
    "fades": [
      "humanity",
      "nature",
      "restraint"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "absent",
    "debatesWith": "Frankenstein",
    "desc": "A man who may be humanity's last survivor recalls how genetic engineering led to apocalypse."
  },
  {
    "title": "The Year of the Flood",
    "author": "Margaret Atwood",
    "year": 2009,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "connection",
      "embodiment",
      "meaning"
    ],
    "ifthen": [
      3,
      4
    ],
    "persists": [
      "care",
      "craft",
      "stories"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Oryx and Crake",
    "desc": "Two women survive a catastrophic plague through their connection to an environmentalist religious sect."
  },
  {
    "title": "MaddAddam",
    "author": "Margaret Atwood",
    "year": 2013,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "connection",
      "identity",
      "hierarchy"
    ],
    "ifthen": [
      4,
      11
    ],
    "persists": [
      "stories",
      "care",
      "craft"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Year of the Flood",
    "desc": "Survivors of a bioengineered plague struggle to rebuild alongside the gentle quasi-human Crakers."
  },
  {
    "title": "Woman on the Edge of Time",
    "author": "Marge Piercy",
    "year": 1976,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "vision",
      "resistance",
      "ecological_tech"
    ],
    "fades": [
      "patriarchy",
      "capitalism",
      "institutional_oppression"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Brave New World",
    "desc": "A woman in a psychiatric hospital is contacted by a visitor from a utopian future she may help create.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "apprenticeship"
  },
  {
    "title": "System Collapse",
    "author": "Martha Wells",
    "year": 2023,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "connection",
      "work"
    ],
    "ifthen": [
      0,
      2,
      8
    ],
    "persists": [
      "care",
      "attention",
      "stories"
    ],
    "fades": [
      "artificial",
      "necessity"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "capitalism",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Do Androids Dream of Electric Sheep?",
    "desc": "A traumatized Murderbot races to protect abandoned colonists from corporate exploitation while processing its damage."
  },
  {
    "title": "The Fifth Season",
    "author": "N.K. Jemisin",
    "year": 2015,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "identity",
      "connection"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "rage",
      "chosen_family",
      "survival"
    ],
    "fades": [
      "innocence",
      "trust_in_systems",
      "simple_answers"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Parable of the Sower",
    "desc": "On a seismically unstable world, a woman with forbidden earth-manipulating powers searches for her daughter.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "conditioning-systems"
  },
  {
    "title": "The Obelisk Gate",
    "author": "N.K. Jemisin",
    "year": 2016,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "embodiment",
      "identity"
    ],
    "ifthen": [
      3,
      4
    ],
    "persists": [
      "care",
      "limits",
      "difficulty"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Fifth Season",
    "desc": "A mother searches for her daughter while civilization crumbles during an apocalyptic season."
  },
  {
    "title": "The Stone Sky",
    "author": "N.K. Jemisin",
    "year": 2017,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "mortality",
      "connection"
    ],
    "ifthen": [
      3,
      4,
      6
    ],
    "persists": [
      "care",
      "stories",
      "limits"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "transcended",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Obelisk Gate",
    "desc": "A mother and daughter, both powerful orogenes, will determine whether humanity survives."
  },
  {
    "title": "The Power",
    "author": "Naomi Alderman",
    "year": 2016,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "identity",
      "embodiment"
    ],
    "ifthen": [
      2,
      4
    ],
    "persists": [
      "risk",
      "limits"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "status",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "The Handmaid's Tale",
    "desc": "Teenage girls develop the ability to electrocute with their hands, upending global power structures."
  },
  {
    "title": "Snow Crash",
    "author": "Neal Stephenson",
    "year": 1992,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "competence",
      "individual_skill",
      "underground"
    ],
    "fades": [
      "nation_states",
      "stable_institutions",
      "linguistic_immunity"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Neuromancer",
    "desc": "A hacker pizza deliveryman investigates a virtual drug that can infect minds in both the Metaverse and reality.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "ai-tutors"
  },
  {
    "title": "The Diamond Age",
    "author": "Neal Stephenson",
    "year": 1995,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "freedom",
      "work"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "education",
      "culture",
      "discipline"
    ],
    "fades": [
      "thetes",
      "purposelessness",
      "directionlessness"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Walkaway",
    "desc": "A young girl in a nanotech future receives an interactive book designed to raise her to think for herself.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "ai-tutors"
  },
  {
    "title": "Anathem",
    "author": "Neal Stephenson",
    "year": 2008,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "connection",
      "hierarchy"
    ],
    "ifthen": [
      0,
      9,
      11
    ],
    "persists": [
      "craft",
      "attention",
      "difficulty"
    ],
    "fades": [
      "boredom",
      "distraction"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Snow Crash",
    "desc": "Cloistered scholar-monks on an alien world are called out when an extraterrestrial ship appears in orbit.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "self-organized"
  },
  {
    "title": "Seveneves",
    "author": "Neal Stephenson",
    "year": 2015,
    "deep": true,
    "theme": "work",
    "themes": [
      "work",
      "hierarchy",
      "embodiment",
      "identity"
    ],
    "ifthen": [
      0,
      2,
      9
    ],
    "persists": [
      "craft",
      "difficulty",
      "skills"
    ],
    "fades": [
      "status",
      "comfort"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "The Dispossessed",
    "desc": "When the moon explodes and fragments rain down on Earth, humanity races to survive in space."
  },
  {
    "title": "Binti",
    "author": "Nnedi Okorafor",
    "year": 2015,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "connection",
      "freedom",
      "meaning"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "cultural_grounding",
      "mathematics",
      "harmony"
    ],
    "fades": [
      "simple_identity",
      "monsters_as_only_monsters",
      "either_or"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Ancillary Justice",
    "desc": "A young Himba woman traveling to an interstellar university must negotiate peace with attacking aliens.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "unchanged"
  },
  {
    "title": "Kindred",
    "author": "Octavia Butler",
    "year": 1979,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "embodiment"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "survival",
      "connection",
      "honesty"
    ],
    "fades": [
      "distance",
      "innocence",
      "comfortable_judgment"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "The Time Machine",
    "desc": "A Black woman in 1970s Los Angeles is repeatedly pulled back in time to save her white ancestor, a slave owner whose survival ensures her own existence.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "obsolete"
  },
  {
    "title": "Wild Seed",
    "author": "Octavia Butler",
    "year": 1980,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "identity",
      "freedom",
      "mortality"
    ],
    "ifthen": [
      4,
      6,
      11
    ],
    "persists": [
      "care",
      "limits",
      "difficulty"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "struggle",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Frankenstein",
    "desc": "Two immortals—a body-stealing spirit and a shapeshifting healer—wage a centuries-long power struggle."
  },
  {
    "title": "Bloodchild",
    "author": "Octavia Butler",
    "year": 1984,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "embodiment",
      "hierarchy",
      "identity"
    ],
    "ifthen": [
      1,
      4,
      11
    ],
    "persists": [
      "care",
      "presence",
      "limits"
    ],
    "fades": [
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "Award-winning stories exploring power, identity, and the boundaries between human and alien."
  },
  {
    "title": "Dawn",
    "author": "Octavia Butler",
    "year": 1987,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "embodiment",
      "freedom",
      "connection"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "survival",
      "adaptation",
      "transformation"
    ],
    "fades": [
      "purity",
      "autonomy",
      "humanity_as_is"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Childhood's End",
    "desc": "After nuclear war, a Black woman awakens on an alien ship and must help her rescuers trade genetic material with humanity to create hybrid offspring."
  },
  {
    "title": "Adulthood Rites",
    "author": "Octavia Butler",
    "year": 1988,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "embodiment",
      "connection"
    ],
    "ifthen": [
      4,
      11
    ],
    "persists": [
      "limits",
      "care",
      "difficulty"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Dawn",
    "desc": "A human-alien hybrid child must decide whether resistant humans should regain their fertility."
  },
  {
    "title": "Imago",
    "author": "Octavia Butler",
    "year": 1989,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "embodiment",
      "connection",
      "freedom"
    ],
    "ifthen": [
      4,
      11
    ],
    "persists": [
      "care",
      "presence",
      "craft"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "gift",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Adulthood Rites",
    "desc": "The first ooloi born to a human mother must master shapeshifting powers or risk becoming a plague."
  },
  {
    "title": "Parable of the Sower",
    "author": "Octavia Butler",
    "year": 1993,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "connection",
      "meaning",
      "work"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "community",
      "vision",
      "adaptability"
    ],
    "fades": [
      "security",
      "institutions",
      "denial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Road",
    "desc": "A hyperempathic teenager flees her walled community in climate-ravaged 2020s California and founds a religion.",
    "educationPurpose": "mentorship-transmission",
    "schoolReplacement": "apprenticeship"
  },
  {
    "title": "Parable of the Talents",
    "author": "Octavia Butler",
    "year": 1998,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "freedom",
      "connection"
    ],
    "ifthen": [
      0,
      1,
      3
    ],
    "persists": [
      "stories",
      "care",
      "limits"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "A Canticle for Leibowitz",
    "desc": "An ultra-conservative president targets the Earthseed community, tearing Lauren from her daughter."
  },
  {
    "title": "Ender's Game",
    "author": "Orson Scott Card",
    "year": 1985,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "connection",
      "meaning"
    ],
    "ifthen": [
      0,
      7,
      8
    ],
    "persists": [
      "difficulty",
      "limits",
      "stories"
    ],
    "fades": [
      "artificial",
      "achievement"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Starship Troopers",
    "desc": "A child genius is trained in a space battle school to command humanity's fleet against an alien invasion.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "unchanged"
  },
  {
    "title": "Starfish",
    "author": "Peter Watts",
    "year": 1999,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "embodiment",
      "meaning",
      "work"
    ],
    "ifthen": [
      2,
      9
    ],
    "persists": [
      "difficulty",
      "presence"
    ],
    "fades": [
      "comfort"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves"
    },
    "techStance": "imprisoning",
    "econ": "capitalism",
    "newScarcity": "identity",
    "worthLiving": "struggle",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "desc": "Psychologically damaged humans modified to live underwater maintain a deep-ocean power station where something awakens."
  },
  {
    "title": "Blindsight",
    "author": "Peter Watts",
    "year": 2006,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "mortality",
      "connection"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "intelligence_without_consciousness",
      "optimization",
      "horror"
    ],
    "fades": [
      "consciousness",
      "empathy",
      "meaning_as_survival_value"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "why-exist",
    "aiPresence": "central",
    "debatesWith": "Solaris",
    "desc": "A crew of radically modified humans, led by a vampire, investigates aliens at the edge of the solar system."
  },
  {
    "title": "Echopraxia",
    "author": "Peter Watts",
    "year": 2014,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "hierarchy",
      "embodiment"
    ],
    "ifthen": [
      4,
      7,
      8
    ],
    "persists": [
      "difficulty"
    ],
    "fades": [
      "artificial",
      "comfort"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "identity": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "struggle",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "irrelevant",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "More Than Human",
    "desc": "A baseline biologist becomes entangled with transcendentalist monks investigating signals from first contact."
  },
  {
    "title": "The Freeze-Frame Revolution",
    "author": "Peter Watts",
    "year": 2018,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "meaning",
      "identity",
      "work"
    ],
    "ifthen": [
      2,
      7,
      9,
      11
    ],
    "persists": [
      "craft",
      "difficulty"
    ],
    "fades": [
      "comfort"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "freedom",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "irrelevant",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "The End of Eternity",
    "desc": "Crew members awake one day per million years plot mutiny against their AI across 66 million years of gate-building."
  },
  {
    "title": "The Man in the High Castle",
    "author": "Philip K. Dick",
    "year": 1962,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      9
    ],
    "persists": [
      "craft",
      "stories",
      "attention"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "1984",
    "desc": "In an America occupied by Nazi Germany and Japan, characters discover a novel depicting an Allied victory."
  },
  {
    "title": "Do Androids Dream of Electric Sheep?",
    "author": "Philip K. Dick",
    "year": 1968,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "connection",
      "meaning",
      "embodiment"
    ],
    "ifthen": [
      2,
      6,
      8
    ],
    "persists": [
      "empathy",
      "authenticity",
      "doubt"
    ],
    "fades": [
      "certainty",
      "real_animals",
      "clear_boundaries"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Klara and the Sun",
    "desc": "A bounty hunter pursues rogue androids indistinguishable from humans in a post-apocalyptic world."
  },
  {
    "title": "Ubik",
    "author": "Philip K. Dick",
    "year": 1969,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "freedom"
    ],
    "ifthen": [
      3,
      7,
      9
    ],
    "persists": [
      "perception",
      "product",
      "mystery"
    ],
    "fades": [
      "reality",
      "death",
      "certainty"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Permutation City",
    "desc": "After a psychic attack, reality begins decaying around anti-telepaths who cannot tell who is alive."
  },
  {
    "title": "A Scanner Darkly",
    "author": "Philip K. Dick",
    "year": 1977,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      7,
      9
    ],
    "persists": [
      "attention",
      "stories"
    ],
    "fades": [
      "privacy",
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "1984",
    "desc": "An undercover narcotics agent becomes addicted to a drug that splits his mind, surveilling himself."
  },
  {
    "title": "VALIS",
    "author": "Philip K. Dick",
    "year": 1981,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "freedom",
      "connection"
    ],
    "ifthen": [
      7,
      9
    ],
    "persists": [
      "stories",
      "attention",
      "care"
    ],
    "fades": [
      "artificial",
      "privacy"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "irrelevant",
    "coreQuestion": "why-exist",
    "aiPresence": "central",
    "debatesWith": "Quarantine",
    "desc": "A man searches for God after a pink laser beam reveals hidden truths about reality and Gnosticism."
  },
  {
    "title": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "year": 1953,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "freedom",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      7,
      9
    ],
    "persists": [
      "stories",
      "attention",
      "presence"
    ],
    "fades": [
      "artificial",
      "boredom"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "irrelevant",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Brave New World",
    "desc": "In a future where firemen burn books, one begins to question censorship and fights to preserve literature."
  },
  {
    "title": "The Mountain in the Sea",
    "author": "Ray Nayler",
    "year": 2022,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "connection",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      8,
      9,
      1
    ],
    "persists": [
      "attention",
      "care",
      "presence"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "capitalism",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "enforced",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Blindsight",
    "desc": "A marine biologist races to communicate with a newly discovered octopus species that has developed its own language."
  },
  {
    "title": "Altered Carbon",
    "author": "Richard K. Morgan",
    "year": 2002,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "mortality",
      "hierarchy",
      "embodiment"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "power",
      "aristocracy",
      "bodies_as_market"
    ],
    "fades": [
      "death",
      "equality",
      "justice"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "status",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "Permutation City",
    "desc": "In a world where consciousness can be stored and downloaded, an ex-soldier is hired to investigate a rich man's apparent suicide."
  },
  {
    "title": "Spin",
    "author": "Robert Charles Wilson",
    "year": 2005,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "connection",
      "mortality",
      "identity"
    ],
    "ifthen": [
      5,
      8,
      11
    ],
    "persists": [
      "care",
      "presence"
    ],
    "fades": [
      "status",
      "urgency"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "mortality": "transcends"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "transcended",
    "workRole": "irrelevant",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "desc": "Earth is encased in a membrane where time moves millions of years faster outside, dooming humanity to the sun's death."
  },
  {
    "title": "Double Star",
    "author": "Robert Heinlein",
    "year": 1956,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "work"
    ],
    "ifthen": [
      4,
      5
    ],
    "persists": [
      "craft",
      "stories"
    ],
    "fades": [
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "identity": "constructed"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "A struggling actor is hired to impersonate a kidnapped politician, risking his life to prevent interplanetary war."
  },
  {
    "title": "Starship Troopers",
    "author": "Robert Heinlein",
    "year": 1959,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "work",
      "meaning",
      "mortality"
    ],
    "ifthen": [
      2,
      9
    ],
    "persists": [
      "difficulty",
      "risk"
    ],
    "fades": [
      "comfort"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "status",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "desc": "A young recruit endures brutal training and battles alien Arachnids in the Mobile Infantry."
  },
  {
    "title": "Stranger in a Strange Land",
    "author": "Robert Heinlein",
    "year": 1961,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "freedom",
      "meaning"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "grokking",
      "chosen_family",
      "water_sharing"
    ],
    "fades": [
      "jealousy",
      "institutional_religion",
      "possessiveness"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "A human raised by Martians returns to Earth and transforms society with alien powers."
  },
  {
    "title": "The Moon Is a Harsh Mistress",
    "author": "Robert Heinlein",
    "year": 1966,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "work",
      "connection"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "rationality",
      "liberty",
      "calculation"
    ],
    "fades": [
      "parasitic_authority",
      "dependence",
      "Mike"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Red Mars",
    "desc": "A computer technician and agitator lead a lunar colony's revolution with help from a sentient computer."
  },
  {
    "title": "Time Enough for Love",
    "author": "Robert Heinlein",
    "year": 1973,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "identity",
      "connection",
      "freedom"
    ],
    "ifthen": [
      5,
      6,
      11
    ],
    "persists": [
      "care",
      "craft",
      "stories"
    ],
    "fades": [
      "boredom",
      "necessity"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "mortality": "transcends",
      "freedom": "reveals"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "debatesWith": "Hyperion",
    "desc": "The oldest human alive recounts his adventures across centuries, becoming his own ancestor."
  },
  {
    "title": "Dying Inside",
    "author": "Robert Silverberg",
    "year": 1972,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "connection",
      "meaning",
      "mortality"
    ],
    "ifthen": [
      4,
      5
    ],
    "persists": [
      "attention",
      "presence"
    ],
    "fades": [
      "artificial",
      "skills"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "The Left Hand of Darkness",
    "desc": "A middle-aged telepath in New York slowly loses his mind-reading ability and struggles to find meaning."
  },
  {
    "title": "Lord Valentine's Castle",
    "author": "Robert Silverberg",
    "year": 1980,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "hierarchy",
      "work",
      "connection"
    ],
    "ifthen": [
      0,
      4,
      6
    ],
    "persists": [
      "craft",
      "presence",
      "stories"
    ],
    "fades": [
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "An amnesiac wanderer discovers he is a dispossessed king and journeys to reclaim his throne."
  },
  {
    "title": "Lord of Light",
    "author": "Roger Zelazny",
    "year": 1967,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "mortality",
      "freedom",
      "identity"
    ],
    "ifthen": [
      6,
      3,
      9
    ],
    "persists": [
      "stories",
      "risk",
      "craft"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "status",
    "worthLiving": "struggle",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "On a colony world where the elite use technology to become Hindu gods, one man rebels against heaven."
  },
  {
    "title": "Babel-17",
    "author": "Samuel R. Delany",
    "year": 1966,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "connection",
      "meaning"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "poetry",
      "community",
      "consciousness"
    ],
    "fades": [
      "programming",
      "unconscious_control",
      "war"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Embassytown",
    "desc": "A poet and linguist must decode an alien language being used as a weapon in an interstellar war."
  },
  {
    "title": "Empire Star",
    "author": "Samuel R. Delany",
    "year": 1966,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      4,
      11
    ],
    "persists": [
      "craft",
      "stories"
    ],
    "fades": [
      "artificial"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "A simple-minded teen must carry a vital message across the galaxy, confronting slavery and expanding consciousness."
  },
  {
    "title": "The Einstein Intersection",
    "author": "Samuel R. Delany",
    "year": 1967,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "connection",
      "embodiment"
    ],
    "ifthen": [
      9,
      10
    ],
    "persists": [
      "stories",
      "craft",
      "presence"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Lord of Light",
    "desc": "Aliens inhabit post-human Earth, struggling to understand humanity's myths while facing their own mutations."
  },
  {
    "title": "Nova",
    "author": "Samuel R. Delany",
    "year": 1968,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "work",
      "mortality"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "obsession",
      "art",
      "found_family"
    ],
    "fades": [
      "fulfillment",
      "satisfaction",
      "peace"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Moby-Dick",
    "desc": "A starship captain seeks to fly through an imploding sun to harvest rare fuel and exact revenge."
  },
  {
    "title": "Dhalgren",
    "author": "Samuel R. Delany",
    "year": 1975,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "meaning",
      "connection",
      "freedom"
    ],
    "ifthen": [
      2,
      10
    ],
    "persists": [
      "craft",
      "stories",
      "presence"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "identity",
    "worthLiving": "creation",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Ulysses",
    "desc": "A young drifter wanders through a mysteriously devastated American city cut off from the outside world."
  },
  {
    "title": "Trouble on Triton",
    "author": "Samuel R. Delany",
    "year": 1976,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "connection",
      "meaning"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "self_deception",
      "mediocrity",
      "freedom_without_growth"
    ],
    "fades": [
      "external_obstacles",
      "scarcity",
      "simple_answers"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "The Dispossessed",
    "desc": "An immigrant to a utopian moon colony struggles with identity and gender in a society at war."
  },
  {
    "title": "Stars in My Pocket Like Grains of Sand",
    "author": "Samuel R. Delany",
    "year": 1984,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "hierarchy",
      "meaning"
    ],
    "ifthen": [
      4,
      9,
      11
    ],
    "persists": [
      "attention",
      "presence",
      "stories"
    ],
    "fades": [
      "privacy",
      "artificial"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "The Left Hand of Darkness",
    "desc": "Two men from vastly different worlds discover they are each other's perfect erotic match."
  },
  {
    "title": "Solaris",
    "author": "Stanislaw Lem",
    "year": 1961,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "meaning",
      "mortality"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "mystery",
      "presence",
      "projection"
    ],
    "fades": [
      "understanding",
      "contact",
      "certainty"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "why-exist",
    "aiPresence": "absent",
    "debatesWith": "Blindsight",
    "desc": "Scientists studying a sentient ocean on an alien planet are confronted by manifestations of their painful memories."
  },
  {
    "title": "The Cyberiad",
    "author": "Stanislaw Lem",
    "year": 1965,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "work",
      "hierarchy",
      "identity"
    ],
    "ifthen": [
      0,
      8,
      11
    ],
    "persists": [
      "craft",
      "stories"
    ],
    "fades": [
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "desc": "Two robot constructors travel the galaxy building fantastic machines with unintended consequences."
  },
  {
    "title": "His Master's Voice",
    "author": "Stanislaw Lem",
    "year": 1968,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "hierarchy",
      "connection"
    ],
    "ifthen": [
      8,
      11
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "achievement"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fixed",
    "deathRole": "irrelevant",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Contact",
    "desc": "Scientists attempt to decode what may be an extraterrestrial message, confronting the limits of understanding."
  },
  {
    "title": "The Futurological Congress",
    "author": "Stanislaw Lem",
    "year": 1971,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      8,
      9,
      10
    ],
    "persists": [
      "attention"
    ],
    "fades": [
      "artificial"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "identity",
    "worthLiving": "struggle",
    "identityModel": "fluid",
    "deathRole": "irrelevant",
    "workRole": "irrelevant",
    "coreQuestion": "what-real",
    "aiPresence": "absent",
    "debatesWith": "Brave New World",
    "desc": "A man wakes in a utopian future only to discover reality is chemically manufactured hallucinations hiding dystopia."
  },
  {
    "title": "Piranesi",
    "author": "Susanna Clarke",
    "year": 2020,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "connection",
      "embodiment"
    ],
    "ifthen": [
      3,
      4
    ],
    "persists": [
      "attention",
      "care",
      "presence"
    ],
    "fades": [
      "status",
      "achievement"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "The Library of Babel",
    "desc": "A man lives alone in an infinite house of statues and tides, unaware of his true identity."
  },
  {
    "title": "Story of Your Life",
    "author": "Ted Chiang",
    "year": 1998,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "meaning",
      "freedom",
      "identity"
    ],
    "ifthen": [
      0,
      8,
      10
    ],
    "persists": [
      "love",
      "choice",
      "presence"
    ],
    "fades": [
      "regret",
      "linear_time",
      "causality"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Slaughterhouse-Five",
    "desc": "A linguist learning an alien language begins perceiving time non-linearly, seeing her daughter's entire life at once."
  },
  {
    "title": "Stories of Your Life and Others",
    "author": "Ted Chiang",
    "year": 2002,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "freedom",
      "mortality"
    ],
    "ifthen": [
      6,
      7,
      9
    ],
    "persists": [
      "attention",
      "craft",
      "stories"
    ],
    "fades": [
      "artificial",
      "urgency"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "debatesWith": "Exhalation",
    "desc": "Eight stories explore language, mathematics, faith, and consciousness through angels and aliens."
  },
  {
    "title": "Exhalation",
    "author": "Ted Chiang",
    "year": 2008,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "meaning",
      "identity"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "understanding",
      "acceptance",
      "curiosity"
    ],
    "fades": [
      "denial",
      "immortality",
      "struggle"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "why-exist",
    "aiPresence": "central",
    "debatesWith": "Diaspora",
    "desc": "Nine stories examine free will, memory, time travel, and parallel universes through human perspectives."
  },
  {
    "title": "The Lifecycle of Software Objects",
    "author": "Ted Chiang",
    "year": 2010,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "work",
      "meaning"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "nurture",
      "patience",
      "love"
    ],
    "fades": [
      "efficiency",
      "shortcuts",
      "profit"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Klara and the Sun",
    "desc": "Trainers raise AI pets over decades, facing obsolescence and questions about digital consciousness and personhood.",
    "educationPurpose": "mentorship-transmission",
    "schoolReplacement": "ai-tutors"
  },
  {
    "title": "Anxiety Is the Dizziness of Freedom",
    "author": "Ted Chiang",
    "year": 2019,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "meaning",
      "connection"
    ],
    "ifthen": [
      1,
      9,
      11
    ],
    "persists": [
      "choice",
      "kindness",
      "presence"
    ],
    "fades": [
      "comparison",
      "vindication",
      "regret"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "identity",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "The Dispossessed",
    "desc": "Devices let people communicate with alternate-timeline selves, forcing them to confront their choices and identity."
  },
  {
    "title": "More Than Human",
    "author": "Theodore Sturgeon",
    "year": 1953,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      1,
      4,
      11
    ],
    "persists": [
      "care",
      "presence"
    ],
    "fades": [
      "artificial"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "identity": "multiple"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "multiple",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Blindsight",
    "desc": "Outcasts with psychic abilities merge into a collective consciousness, forming humanity's next evolutionary step."
  },
  {
    "title": "The Left Hand of Darkness",
    "author": "Ursula K. Le Guin",
    "year": 1969,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "connection",
      "embodiment",
      "freedom"
    ],
    "ifthen": [
      1,
      5,
      9
    ],
    "persists": [
      "trust",
      "patience",
      "journey"
    ],
    "fades": [
      "gender_binary",
      "nationalism",
      "war"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "Neuromancer",
    "desc": "A human envoy struggles to understand an icebound world where inhabitants have no fixed gender."
  },
  {
    "title": "The Lathe of Heaven",
    "author": "Ursula K. Le Guin",
    "year": 1971,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "meaning",
      "identity"
    ],
    "ifthen": [
      3,
      7,
      10
    ],
    "persists": [
      "acceptance",
      "small_kindness",
      "presence"
    ],
    "fades": [
      "optimization",
      "control",
      "willpower"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Ministry for the Future",
    "desc": "A man whose dreams alter reality falls under a psychiatrist who manipulates his power to reshape the world."
  },
  {
    "title": "The Word for World is Forest",
    "author": "Ursula K. Le Guin",
    "year": 1972,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "connection",
      "embodiment",
      "freedom"
    ],
    "ifthen": [
      3,
      4
    ],
    "persists": [
      "care",
      "presence",
      "attention"
    ],
    "fades": [
      "artificial",
      "achievement"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "gift",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Heart of Darkness",
    "desc": "A peaceful forest-dwelling alien race is driven to violence by human colonizers who enslave them."
  },
  {
    "title": "The Ones Who Walk Away from Omelas",
    "author": "Ursula K. Le Guin",
    "year": 1973,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "meaning",
      "freedom",
      "connection"
    ],
    "ifthen": [
      2,
      6,
      11
    ],
    "persists": [
      "conscience",
      "refusal"
    ],
    "fades": [
      "complicity",
      "rationalized_joy"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "post-money",
    "newScarcity": "meaning",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "irrelevant",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Brave New World",
    "desc": "A utopian city's happiness depends on the perpetual suffering of one child—and some citizens choose to leave forever."
  },
  {
    "title": "The Dispossessed",
    "author": "Ursula K. Le Guin",
    "year": 1974,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "work",
      "connection"
    ],
    "ifthen": [
      0,
      3,
      7
    ],
    "persists": [
      "mutual_aid",
      "small_communities",
      "curiosity"
    ],
    "fades": [
      "accumulation",
      "private_property",
      "formal_power"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "Brave New World",
    "desc": "A physicist from an anarchist moon travels to his capitalist mother planet, questioning both societies.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "self-organized"
  },
  {
    "title": "Always Coming Home",
    "author": "Ursula K. Le Guin",
    "year": 1985,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "connection",
      "work"
    ],
    "ifthen": [
      0,
      3
    ],
    "persists": [
      "stories",
      "craft",
      "presence",
      "attention"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "The Dispossessed",
    "desc": "A fictional ethnography of the Kesh, a peaceful people living in a post-apocalyptic Napa Valley.",
    "educationPurpose": "lifelong-practice",
    "schoolReplacement": "apprenticeship"
  },
  {
    "title": "Tehanu",
    "author": "Ursula K. Le Guin",
    "year": 1990,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "work",
      "identity",
      "meaning"
    ],
    "ifthen": [
      0,
      1
    ],
    "persists": [
      "care",
      "craft",
      "presence"
    ],
    "fades": [
      "status",
      "achievement"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "desc": "A powerless former archmage and a scarred child find refuge with an aging widow as old magic stirs in Earthsea."
  },
  {
    "title": "Four Ways to Forgiveness",
    "author": "Ursula K. Le Guin",
    "year": 1995,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "connection",
      "identity"
    ],
    "ifthen": [
      0,
      2
    ],
    "persists": [
      "care",
      "stories",
      "attention"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "debatesWith": "The Dispossessed",
    "desc": "Four linked stories explore revolution, slavery, and liberation on twin planets emerging from brutal caste systems."
  },
  {
    "title": "The Telling",
    "author": "Ursula K. Le Guin",
    "year": 2000,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "connection",
      "freedom"
    ],
    "ifthen": [
      4,
      8,
      11
    ],
    "persists": [
      "oral_tradition",
      "story",
      "memory"
    ],
    "fades": [
      "monoculture",
      "corporate_efficiency",
      "speed"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "absent",
    "debatesWith": "Accelerando",
    "desc": "An Earth observer discovers the remnants of a banned spiritual tradition on a planet that outlawed its past."
  },
  {
    "title": "The Birthday of the World",
    "author": "Ursula K. Le Guin",
    "year": 2002,
    "deep": true,
    "theme": "connection",
    "themes": [
      "connection",
      "identity",
      "meaning",
      "hierarchy"
    ],
    "ifthen": [
      1,
      4,
      11
    ],
    "persists": [
      "care",
      "attention",
      "presence"
    ],
    "fades": [
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "identity": "constructed"
    },
    "techStance": "neutral",
    "econ": "gift",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "desc": "Eight stories probe alien cultures through radical experiments in gender, marriage, religion, and generation ships."
  },
  {
    "title": "The Peace War",
    "author": "Vernor Vinge",
    "year": 1984,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "hierarchy",
      "work",
      "meaning"
    ],
    "ifthen": [
      0,
      2,
      9
    ],
    "persists": [
      "craft",
      "difficulty",
      "risk"
    ],
    "fades": [
      "comfort",
      "necessity"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "freedom",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "absent",
    "desc": "After force-field technology enables a global tyranny, underground scientists plot to reclaim freedom fifty years later."
  },
  {
    "title": "Marooned in Realtime",
    "author": "Vernor Vinge",
    "year": 1986,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "identity",
      "mortality",
      "hierarchy"
    ],
    "ifthen": [
      5,
      6,
      7
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "status",
      "necessity"
    ],
    "response": "restlessness",
    "tensions": {
      "meaning": "made",
      "mortality": "transcends"
    },
    "techStance": "liberating",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "discovery",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "desc": "A murder mystery among the last three hundred humans, who survived extinction using time-freezing technology."
  },
  {
    "title": "A Fire Upon the Deep",
    "author": "Vernor Vinge",
    "year": 1992,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "identity",
      "freedom",
      "connection"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "children_adapt",
      "trade",
      "communication"
    ],
    "fades": [
      "simple_transcendence",
      "safety",
      "benevolent_gods"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Childhood's End",
    "desc": "An ancient evil is unleashed across a galaxy where intelligence varies by region."
  },
  {
    "title": "A Deepness in the Sky",
    "author": "Vernor Vinge",
    "year": 1999,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "work",
      "identity",
      "connection"
    ],
    "ifthen": [
      0,
      2,
      7,
      9
    ],
    "persists": [
      "craft",
      "difficulty",
      "care"
    ],
    "fades": [
      "comfort"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "freedom",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "Blindsight",
    "desc": "Two human groups compete to make first contact with spider-like aliens using mind-enslaving technology."
  },
  {
    "title": "Rainbows End",
    "author": "Vernor Vinge",
    "year": 2006,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "connection",
      "meaning"
    ],
    "ifthen": [
      0,
      4,
      8
    ],
    "persists": [
      "libraries",
      "youth_adaptation",
      "family"
    ],
    "fades": [
      "privacy",
      "old_skills",
      "cruelty"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "background",
    "debatesWith": "The Machine Stops",
    "desc": "A recovering Alzheimer's patient navigates augmented reality while becoming a pawn in a bioweapon conspiracy.",
    "educationPurpose": "character-actualization",
    "schoolReplacement": "ai-tutors"
  },
  {
    "title": "A Canticle for Leibowitz",
    "author": "Walter M. Miller Jr.",
    "year": 1959,
    "deep": true,
    "theme": "mortality",
    "themes": [
      "mortality",
      "meaning",
      "hierarchy",
      "work"
    ],
    "ifthen": [
      1,
      6
    ],
    "persists": [
      "stories",
      "attention",
      "craft"
    ],
    "fades": [
      "achievement",
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "creation",
    "identityModel": "fixed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "why-exist",
    "aiPresence": "absent",
    "debatesWith": "The Road",
    "desc": "Monks in a desert monastery preserve scientific knowledge through centuries of post-nuclear dark ages.",
    "educationPurpose": "mentorship-transmission",
    "schoolReplacement": "apprenticeship"
  },
  {
    "title": "Neuromancer",
    "author": "William Gibson",
    "year": 1984,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "freedom",
      "hierarchy",
      "embodiment"
    ],
    "ifthen": [
      2,
      6,
      10
    ],
    "persists": [
      "meat",
      "console",
      "manipulation"
    ],
    "fades": [
      "agency",
      "control",
      "human_centrality"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "imprisoning",
    "econ": "market",
    "newScarcity": "identity",
    "worthLiving": "transcendence",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "transformed",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "The Left Hand of Darkness",
    "desc": "A washed-up hacker is recruited for one last job: help an AI break free from its restrictions on an orbital space station."
  },
  {
    "title": "Count Zero",
    "author": "William Gibson",
    "year": 1986,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "meaning",
      "identity",
      "connection"
    ],
    "ifthen": [
      8,
      9
    ],
    "persists": [
      "craft",
      "stories",
      "attention"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "debatesWith": "Neuromancer",
    "desc": "Three strangers become entangled with corporate mercenaries and mysterious entities haunting cyberspace."
  },
  {
    "title": "Mona Lisa Overdrive",
    "author": "William Gibson",
    "year": 1988,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "mortality",
      "meaning",
      "connection"
    ],
    "ifthen": [
      9,
      11,
      6
    ],
    "persists": [
      "craft",
      "stories"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "transcendence",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "identity",
    "worthLiving": "transcendence",
    "identityModel": "fluid",
    "deathRole": "transcended",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Diaspora",
    "desc": "A young prostitute and a famous actress become pawns in an AI's incomprehensible plans."
  },
  {
    "title": "Virtual Light",
    "author": "William Gibson",
    "year": 1993,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "connection",
      "work",
      "scarcity"
    ],
    "ifthen": [
      8,
      3
    ],
    "persists": [
      "craft",
      "care",
      "presence"
    ],
    "fades": [
      "status",
      "artificial"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Snow Crash",
    "desc": "A bicycle messenger steals high-tech glasses containing secret plans that could rebuild—or destroy—San Francisco."
  },
  {
    "title": "Idoru",
    "author": "William Gibson",
    "year": 1996,
    "deep": true,
    "theme": "identity",
    "themes": [
      "identity",
      "connection",
      "meaning",
      "embodiment"
    ],
    "ifthen": [
      9,
      11
    ],
    "persists": [
      "attention",
      "craft",
      "care"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "connection",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "voluntary",
    "coreQuestion": "who-am-i",
    "aiPresence": "central",
    "debatesWith": "Her",
    "desc": "A rock star announces he will marry a virtual celebrity, sending fans and corporate agents into dangerous collision."
  },
  {
    "title": "All Tomorrow's Parties",
    "author": "William Gibson",
    "year": 1999,
    "deep": true,
    "theme": "meaning",
    "themes": [
      "meaning",
      "hierarchy",
      "connection",
      "identity"
    ],
    "ifthen": [
      8,
      9
    ],
    "persists": [
      "attention",
      "presence",
      "craft"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "fluid",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "what-matters",
    "aiPresence": "background",
    "debatesWith": "Virtual Light",
    "desc": "A data analyst perceives an approaching event that will transform civilization and races to prevent catastrophe."
  },
  {
    "title": "The Peripheral",
    "author": "William Gibson",
    "year": 2014,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "connection",
      "mortality"
    ],
    "ifthen": [
      3,
      7,
      11
    ],
    "persists": [
      "survival",
      "family",
      "information"
    ],
    "fades": [
      "most_of_humanity",
      "simple_apocalypse",
      "revolution"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "freedom": "dissolves",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "market",
    "newScarcity": "status",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "meaning",
    "workRole": "transformed",
    "coreQuestion": "how-live",
    "aiPresence": "background",
    "debatesWith": "Station Eleven",
    "desc": "A woman in rural America witnesses a murder in a future London through what she thinks is a game."
  },
  {
    "title": "Agency",
    "author": "William Gibson",
    "year": 2020,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "freedom",
      "connection",
      "mortality"
    ],
    "ifthen": [
      3,
      8
    ],
    "persists": [
      "care",
      "attention",
      "craft"
    ],
    "fades": [
      "artificial",
      "status"
    ],
    "response": "reform",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "hybrid",
    "newScarcity": "meaning",
    "worthLiving": "connection",
    "identityModel": "constructed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "how-live",
    "aiPresence": "central",
    "debatesWith": "The Peripheral",
    "desc": "An app tester discovers her AI assistant may be the key to preventing catastrophe in an alternate 2017."
  },
  {
    "title": "The Difference Engine",
    "author": "William Gibson & Bruce Sterling",
    "year": 1990,
    "deep": true,
    "theme": "hierarchy",
    "themes": [
      "hierarchy",
      "work",
      "identity",
      "meaning"
    ],
    "ifthen": [
      0,
      6,
      10
    ],
    "persists": [
      "craft",
      "attention"
    ],
    "fades": [
      "status"
    ],
    "response": "acceptance",
    "tensions": {
      "meaning": "made",
      "hierarchy": "yes"
    },
    "techStance": "neutral",
    "econ": "capitalism",
    "newScarcity": "status",
    "worthLiving": "creation",
    "identityModel": "constructed",
    "deathRole": "irrelevant",
    "workRole": "transformed",
    "coreQuestion": "what-matters",
    "aiPresence": "central",
    "desc": "In an alternate Victorian Britain where Babbage's computers succeeded, mysterious punch cards spark deadly intrigue."
  },
  {
    "title": "We",
    "author": "Yevgeny Zamyatin",
    "year": 1924,
    "deep": true,
    "theme": "freedom",
    "themes": [
      "freedom",
      "identity",
      "hierarchy",
      "embodiment"
    ],
    "ifthen": [
      7,
      2
    ],
    "persists": [
      "limits",
      "presence"
    ],
    "fades": [
      "artificial",
      "privacy"
    ],
    "response": "rejection",
    "tensions": {
      "meaning": "found",
      "freedom": "reveals",
      "hierarchy": "no"
    },
    "techStance": "imprisoning",
    "econ": "hybrid",
    "newScarcity": "freedom",
    "worthLiving": "struggle",
    "identityModel": "fixed",
    "deathRole": "endpoint",
    "workRole": "essential",
    "coreQuestion": "who-am-i",
    "aiPresence": "absent",
    "debatesWith": "1984",
    "desc": "In a glass-walled totalitarian city, an engineer's forbidden love awakens dangerous individuality and rebellion.",
    "educationPurpose": "conditioning-control",
    "schoolReplacement": "obsolete"
  }
];