// Quiz Arena - Comprehensive Question Bank
// 8 Categories: General Knowledge, Science, Mathematics, History, Geography, Technology, Sports, English
// Difficulties: Easy, Medium, Hard

export const CATEGORIES = [
  {
    id: 'general',
    name: 'General Knowledge',
    icon: '💡',
    description: 'Test your awareness of worldly facts and trivia.',
    gradient: 'from-amber-500 via-orange-600 to-red-500',
    color: '#f59e0b',
    totalQuestions: 15
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Physics, chemistry, biology, and celestial marvels.',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    color: '#10b981',
    totalQuestions: 15
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    description: 'Mental arithmetic, logic, geometry, and equations.',
    gradient: 'from-blue-500 via-indigo-600 to-violet-700',
    color: '#3b82f6',
    totalQuestions: 15
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'Ancient empires, world wars, and iconic figures.',
    gradient: 'from-yellow-600 via-amber-700 to-stone-800',
    color: '#d97706',
    totalQuestions: 15
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Capitals, continents, oceans, and natural wonders.',
    gradient: 'from-teal-400 via-cyan-500 to-blue-600',
    color: '#06b6d4',
    totalQuestions: 15
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Computers, AI, algorithms, gadgets, and the internet.',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    color: '#8b5cf6',
    totalQuestions: 15
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    description: 'Athletes, champions, football, basketball, and Olympics.',
    gradient: 'from-rose-500 via-red-600 to-orange-500',
    color: '#f43f5e',
    totalQuestions: 15
  },
  {
    id: 'english',
    name: 'English',
    icon: '📚',
    description: 'Grammar, vocabulary, idioms, and literature.',
    gradient: 'from-purple-500 via-fuchsia-600 to-pink-500',
    color: '#d946ef',
    totalQuestions: 15
  }
];

export const QUESTIONS = {
  general: {
    easy: [
      {
        id: 'gen-e-1',
        question: 'Which planet in our solar system is known as the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctIndex: 1,
        explanation: 'Mars appears reddish because of widespread iron oxide (rust) on its surface.'
      },
      {
        id: 'gen-e-2',
        question: 'How many days are there in a standard leap year?',
        options: ['364', '365', '366', '367'],
        correctIndex: 2,
        explanation: 'A leap year has 366 days, adding February 29 to harmonize with the solar calendar.'
      },
      {
        id: 'gen-e-3',
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correctIndex: 2,
        explanation: 'The Pacific Ocean covers over 30% of the Earth\'s surface.'
      },
      {
        id: 'gen-e-4',
        question: 'What is the primary currency used in Japan?',
        options: ['Yen', 'Won', 'Yuan', 'Dollar'],
        correctIndex: 0,
        explanation: 'The Japanese Yen (JPY, ¥) is the official currency of Japan.'
      },
      {
        id: 'gen-e-5',
        question: 'Which instrument has 88 keys, typically 52 white and 36 black?',
        options: ['Accordion', 'Harpsichord', 'Piano', 'Organ'],
        correctIndex: 2,
        explanation: 'A standard modern piano features 88 keys covering seven octaves plus a minor third.'
      }
    ],
    medium: [
      {
        id: 'gen-m-1',
        question: 'Which country gifted the Statue of Liberty to the United States in 1886?',
        options: ['United Kingdom', 'France', 'Spain', 'Germany'],
        correctIndex: 1,
        explanation: 'France gifted the statue to celebrate the centennial of the US Declaration of Independence.'
      },
      {
        id: 'gen-m-2',
        question: 'What is the rarest natural blood type in the human ABO system?',
        options: ['O Negative', 'A Positive', 'AB Negative', 'B Negative'],
        correctIndex: 2,
        explanation: 'AB Negative is found in less than 1% of the global population.'
      },
      {
        id: 'gen-m-3',
        question: 'Which artist painted the famous masterpiece "The Starry Night"?',
        options: ['Claude Monet', 'Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí'],
        correctIndex: 2,
        explanation: 'Vincent van Gogh painted The Starry Night in June 1889 at Saint-Rémy-de-Provence.'
      },
      {
        id: 'gen-m-4',
        question: 'What is the national animal of Scotland?',
        options: ['Red Stag', 'Unicorn', 'Golden Eagle', 'Loch Ness Monster'],
        correctIndex: 1,
        explanation: 'The Unicorn is Scotland\'s official national animal, chosen for its strength and purity.'
      },
      {
        id: 'gen-m-5',
        question: 'Which chemical element has the symbol "W"?',
        options: ['Tungsten', 'Vanadium', 'Bismuth', 'Tin'],
        correctIndex: 0,
        explanation: 'Tungsten\'s symbol W comes from its German name "Wolfram".'
      }
    ],
    hard: [
      {
        id: 'gen-h-1',
        question: 'Which is the only country in the world that does not have a rectangular or square national flag?',
        options: ['Switzerland', 'Vatican City', 'Nepal', 'Bhutan'],
        correctIndex: 2,
        explanation: 'Nepal\'s flag is made of two stacked pennants, representing the Himalayas and major religions.'
      },
      {
        id: 'gen-h-2',
        question: 'Who was the first woman to win a Nobel Prize in two different scientific fields?',
        options: ['Rosalind Franklin', 'Marie Curie', 'Ada Lovelace', 'Dorothy Hodgkin'],
        correctIndex: 1,
        explanation: 'Marie Curie won the Nobel Prize in Physics (1903) and Chemistry (1911).'
      },
      {
        id: 'gen-h-3',
        question: 'What is the deepest known location in the world\'s oceans?',
        options: ['Puerto Rico Trench', 'Java Trench', 'Challenger Deep', 'Milwaukee Deep'],
        correctIndex: 2,
        explanation: 'Challenger Deep in the Mariana Trench reaches an approximate depth of nearly 11,000 meters.'
      },
      {
        id: 'gen-h-4',
        question: 'In international law, which treaty declared Antarctica a scientific preserve free from military activity?',
        options: ['Kyoto Protocol', 'Antarctic Treaty', 'Geneva Accord', 'Paris Climate Treaty'],
        correctIndex: 1,
        explanation: 'Signed in 1959 by 12 nations, the Antarctic Treaty entered into force in 1961.'
      },
      {
        id: 'gen-h-5',
        question: 'What is the world\'s oldest continuously operating university, founded in 859 AD?',
        options: ['University of Bologna', 'University of Oxford', 'University of al-Qarawiyyin', 'Sorbonne'],
        correctIndex: 2,
        explanation: 'The University of al-Qarawiyyin in Fez, Morocco was founded by Fatima al-Fihri in 859 AD.'
      }
    ]
  },
  science: {
    easy: [
      {
        id: 'sci-e-1',
        question: 'What gas do plants absorb from the atmosphere during photosynthesis?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'],
        correctIndex: 1,
        explanation: 'Plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.'
      },
      {
        id: 'sci-e-2',
        question: 'What is the chemical formula for pure water?',
        options: ['CO2', 'NaCl', 'H2O', 'CH4'],
        correctIndex: 2,
        explanation: 'Water consists of two hydrogen atoms bonded to one oxygen atom.'
      },
      {
        id: 'sci-e-3',
        question: 'What is the powerhouse organelle of the biological cell?',
        options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
        correctIndex: 2,
        explanation: 'Mitochondria generate most of the cell\'s chemical energy in the form of ATP.'
      },
      {
        id: 'sci-e-4',
        question: 'At what temperature does water boil under standard atmospheric pressure (Celsius)?',
        options: ['90°C', '100°C', '120°C', '212°C'],
        correctIndex: 1,
        explanation: 'Under 1 atmosphere of pressure, liquid water boils at 100°C (212°F).'
      },
      {
        id: 'sci-e-5',
        question: 'Which force pulls objects toward the center of the Earth?',
        options: ['Magnetism', 'Centrifugal force', 'Gravity', 'Friction'],
        correctIndex: 2,
        explanation: 'Gravity is the fundamental attractive force between masses.'
      }
    ],
    medium: [
      {
        id: 'sci-m-1',
        question: 'What is the speed of light in a vacuum (approximate km/s)?',
        options: ['150,000 km/s', '300,000 km/s', '450,000 km/s', '1,000,000 km/s'],
        correctIndex: 1,
        explanation: 'The speed of light in vacuum is exactly 299,792,458 meters per second (~300,000 km/s).'
      },
      {
        id: 'sci-m-2',
        question: 'Which elementary particle carries a negative electric charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        correctIndex: 2,
        explanation: 'Electrons carry an elementary charge of -1e.'
      },
      {
        id: 'sci-m-3',
        question: 'What is the most abundant element in the Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Argon', 'Nitrogen'],
        correctIndex: 3,
        explanation: 'Nitrogen makes up approximately 78% of dry atmospheric air.'
      },
      {
        id: 'sci-m-4',
        question: 'What type of eclipse occurs when the Moon passes directly between the Sun and Earth?',
        options: ['Lunar eclipse', 'Solar eclipse', 'Stellar eclipse', 'Planetary eclipse'],
        correctIndex: 1,
        explanation: 'A solar eclipse casts the Moon\'s shadow onto the Earth.'
      },
      {
        id: 'sci-m-5',
        question: 'Which scale measures the acidity or alkalinity of an aqueous solution?',
        options: ['Kelvin scale', 'Mohs scale', 'pH scale', 'Richter scale'],
        correctIndex: 2,
        explanation: 'The pH scale ranges typically from 0 (very acidic) to 14 (very alkaline), with 7 being neutral.'
      }
    ],
    hard: [
      {
        id: 'sci-h-1',
        question: 'What is the theoretical boundary around a black hole beyond which nothing can escape?',
        options: ['Accretion Disk', 'Event Horizon', 'Singularity', 'Ergosphere'],
        correctIndex: 1,
        explanation: 'The event horizon marks the point where gravitational escape velocity exceeds the speed of light.'
      },
      {
        id: 'sci-h-2',
        question: 'Which subatomic particle is known as the "God Particle" that gives other particles mass?',
        options: ['Tau Neutrino', 'Higgs Boson', 'Top Quark', 'Gluon'],
        correctIndex: 1,
        explanation: 'The Higgs Boson was confirmed by CERN\'s Large Hadron Collider in 2012.'
      },
      {
        id: 'sci-h-3',
        question: 'What phenomenon causes clocks to tick slower in stronger gravitational fields?',
        options: ['Gravitational Lensing', 'Gravitational Redshift', 'Gravitational Time Dilation', 'Spacetime Curvature'],
        correctIndex: 2,
        explanation: 'Einstein\'s General Relativity predicts that time moves slower closer to massive gravitational wells.'
      },
      {
        id: 'sci-h-4',
        question: 'What is the hardest known mineral on the Mohs hardness scale?',
        options: ['Corundum', 'Topaz', 'Quartz', 'Diamond'],
        correctIndex: 3,
        explanation: 'Diamond defines the maximum hardness value of 10 on the Mohs scale.'
      },
      {
        id: 'sci-h-5',
        question: 'Which process in stars combines hydrogen nuclei into helium, releasing massive energy?',
        options: ['Nuclear Fission', 'Nuclear Fusion', 'Alpha Decay', 'Beta Decay'],
        correctIndex: 1,
        explanation: 'Nuclear fusion powers the Sun and main-sequence stars.'
      }
    ]
  },
  mathematics: {
    easy: [
      {
        id: 'math-e-1',
        question: 'What is the value of 15 × 8?',
        options: ['110', '120', '125', '130'],
        correctIndex: 1,
        explanation: '15 × 8 = 120.'
      },
      {
        id: 'math-e-2',
        question: 'How many sides does a regular heptagon have?',
        options: ['6', '7', '8', '9'],
        correctIndex: 1,
        explanation: 'A heptagon has 7 sides and 7 angles.'
      },
      {
        id: 'math-e-3',
        question: 'What is the square root of 144?',
        options: ['11', '12', '13', '14'],
        correctIndex: 1,
        explanation: '12 × 12 = 144.'
      },
      {
        id: 'math-e-4',
        question: 'If a triangle has angles 50° and 60°, what is the third angle?',
        options: ['60°', '70°', '80°', '90°'],
        correctIndex: 1,
        explanation: 'The interior angles of any triangle sum to 180°: 180 - (50 + 60) = 70°.'
      },
      {
        id: 'math-e-5',
        question: 'What is 25% of 200?',
        options: ['25', '40', '50', '75'],
        correctIndex: 2,
        explanation: '25% of 200 is 0.25 × 200 = 50.'
      }
    ],
    medium: [
      {
        id: 'math-m-1',
        question: 'Solve for x: 3x - 7 = 20',
        options: ['7', '8', '9', '10'],
        correctIndex: 2,
        explanation: '3x = 27, therefore x = 9.'
      },
      {
        id: 'math-m-2',
        question: 'What is the value of Pi (π) to two decimal places?',
        options: ['3.12', '3.14', '3.16', '3.18'],
        correctIndex: 1,
        explanation: 'Pi is approximately 3.14159..., rounded to 3.14.'
      },
      {
        id: 'math-m-3',
        question: 'What is 2 to the 6th power (2⁶)?',
        options: ['32', '48', '64', '128'],
        correctIndex: 2,
        explanation: '2⁶ = 2 × 2 × 2 × 2 × 2 × 2 = 64.'
      },
      {
        id: 'math-m-4',
        question: 'In a right triangle with legs of length 3 and 4, what is the length of the hypotenuse?',
        options: ['5', '6', '7', '8'],
        correctIndex: 0,
        explanation: 'By the Pythagorean theorem: a² + b² = c² -> 9 + 16 = 25 -> c = 5.'
      },
      {
        id: 'math-m-5',
        question: 'What is the sum of integers from 1 to 10?',
        options: ['45', '50', '55', '60'],
        correctIndex: 2,
        explanation: 'Sum = n(n + 1)/2 = 10(11)/2 = 55.'
      }
    ],
    hard: [
      {
        id: 'math-h-1',
        question: 'What is the derivative of f(x) = 3x² + 5x - 4 with respect to x?',
        options: ['3x + 5', '6x + 5', '6x² + 5', '6x - 4'],
        correctIndex: 1,
        explanation: 'd/dx(3x² + 5x - 4) = 6x + 5.'
      },
      {
        id: 'math-h-2',
        question: 'What is the base-2 binary representation of decimal number 25?',
        options: ['11001', '10101', '11011', '10011'],
        correctIndex: 0,
        explanation: '25 = 16 + 8 + 1 = 11001 in binary.'
      },
      {
        id: 'math-h-3',
        question: 'What is the value of 5! (5 factorial)?',
        options: ['60', '100', '120', '720'],
        correctIndex: 2,
        explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.'
      },
      {
        id: 'math-h-4',
        question: 'If matrix A has dimension 2x3 and matrix B has dimension 3x4, what is the dimension of product AB?',
        options: ['3x3', '2x4', '4x2', 'Undefined'],
        correctIndex: 1,
        explanation: 'Multiplying (m×k) by (k×n) yields a matrix of dimension (m×n), which is 2×4.'
      },
      {
        id: 'math-h-5',
        question: 'What is the limit of (sin x) / x as x approaches 0?',
        options: ['0', '1', 'Infinity', 'Undefined'],
        correctIndex: 1,
        explanation: 'A fundamental calculus trigonometric limit: lim(x->0) sin(x)/x = 1.'
      }
    ]
  },
  history: {
    easy: [
      {
        id: 'his-e-1',
        question: 'In which year did the Titanic sink after striking an iceberg?',
        options: ['1905', '1912', '1920', '1925'],
        correctIndex: 1,
        explanation: 'The RMS Titanic struck an iceberg and sank on April 15, 1912.'
      },
      {
        id: 'his-e-2',
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'John Adams', 'Benjamin Franklin', 'George Washington'],
        correctIndex: 3,
        explanation: 'George Washington served as the first US President from 1789 to 1797.'
      },
      {
        id: 'his-e-3',
        question: 'Which ancient wonder of the world is located in Giza, Egypt?',
        options: ['Hanging Gardens', 'Colossus of Rhodes', 'Great Pyramid', 'Lighthouse of Alexandria'],
        correctIndex: 2,
        explanation: 'The Great Pyramid of Giza is the oldest and only largely intact ancient wonder.'
      },
      {
        id: 'his-e-4',
        question: 'Which empire was ruled by Julius Caesar and Augustus?',
        options: ['Ottoman Empire', 'Roman Empire', 'Byzantine Empire', 'Persian Empire'],
        correctIndex: 1,
        explanation: 'Rome transitioned from a Republic to an Empire under Julius and Augustus Caesar.'
      },
      {
        id: 'his-e-5',
        question: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1950'],
        correctIndex: 2,
        explanation: 'World War II formally ended in September 1945.'
      }
    ],
    medium: [
      {
        id: 'his-m-1',
        question: 'In which year did Christopher Columbus first reach the Americas?',
        options: ['1488', '1492', '1501', '1512'],
        correctIndex: 1,
        explanation: 'Columbus sailed across the Atlantic in 1492, landing in the Bahamas.'
      },
      {
        id: 'his-m-2',
        question: 'Who was the legendary British Prime Minister during most of World War II?',
        options: ['Neville Chamberlain', 'Winston Churchill', 'Clement Attlee', 'Anthony Eden'],
        correctIndex: 1,
        explanation: 'Winston Churchill led Great Britain from 1940 to 1945.'
      },
      {
        id: 'his-m-3',
        question: 'The French Revolution began with the storming of which fortress-prison in 1789?',
        options: ['Versailles', 'The Bastille', 'The Louvre', 'Conciergerie'],
        correctIndex: 1,
        explanation: 'The storming of the Bastille on July 14, 1789 marked a flashpoint of the French Revolution.'
      },
      {
        id: 'his-m-4',
        question: 'Which civilization constructed the ancient mountain city of Machu Picchu?',
        options: ['Aztecs', 'Mayans', 'Incas', 'Olmecs'],
        correctIndex: 2,
        explanation: 'Machu Picchu was built by the Inca Empire in modern-day Peru during the 15th century.'
      },
      {
        id: 'his-m-5',
        question: 'The Magna Carta was signed by King John of England in what year?',
        options: ['1066', '1215', '1348', '1492'],
        correctIndex: 1,
        explanation: 'The Great Charter was sealed at Runnymede in June 1215, laying foundations for constitutional law.'
      }
    ],
    hard: [
      {
        id: 'his-h-1',
        question: 'Which treaty officially ended the Thirty Years\' War in 1648?',
        options: ['Treaty of Utrecht', 'Peace of Westphalia', 'Treaty of Versailles', 'Treaty of Ghent'],
        correctIndex: 1,
        explanation: 'The Peace of Westphalia established principles of sovereign nation-states in European diplomacy.'
      },
      {
        id: 'his-h-2',
        question: 'Who founded the Maurya Empire in ancient India?',
        options: ['Ashoka', 'Chandragupta Maurya', 'Harsha', 'Samudragupta'],
        correctIndex: 1,
        explanation: 'Chandragupta Maurya founded the Maurya Empire in 322 BCE with guidance from Chanakya.'
      },
      {
        id: 'his-h-3',
        question: 'What was the capital of the Byzantine Empire until its fall in 1453?',
        options: ['Rome', 'Athens', 'Constantinople', 'Alexandria'],
        correctIndex: 2,
        explanation: 'Constantinople was captured by the Ottoman Turks under Sultan Mehmed II in 1453.'
      },
      {
        id: 'his-h-4',
        question: 'Which English monarch was executed by beheading following the English Civil War in 1649?',
        options: ['Charles I', 'Charles II', 'James I', 'Henry VIII'],
        correctIndex: 0,
        explanation: 'King Charles I was tried, convicted of high treason, and beheaded outside the Banqueting House.'
      },
      {
        id: 'his-h-5',
        question: 'The ancient code of laws carved onto a diorite stele is attributed to which Babylonian king?',
        options: ['Nebuchadnezzar II', 'Hammurabi', 'Sargon', 'Gilgamesh'],
        correctIndex: 1,
        explanation: 'The Code of Hammurabi dates back to approximately 1754 BCE with laws of retributive justice.'
      }
    ]
  },
  geography: {
    easy: [
      {
        id: 'geo-e-1',
        question: 'What is the capital city of France?',
        options: ['Marseille', 'Lyon', 'Paris', 'Nice'],
        correctIndex: 2,
        explanation: 'Paris is the capital and most populous city of France.'
      },
      {
        id: 'geo-e-2',
        question: 'Which is the largest continent on Earth by both land area and population?',
        options: ['Africa', 'North America', 'Asia', 'Europe'],
        correctIndex: 2,
        explanation: 'Asia spans about 30% of Earth\'s land area and holds ~60% of the world population.'
      },
      {
        id: 'geo-e-3',
        question: 'What is the longest river in the world according to traditional records?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctIndex: 1,
        explanation: 'The Nile River in Africa spans approximately 6,650 km.'
      },
      {
        id: 'geo-e-4',
        question: 'Mount Everest, the highest peak above sea level, is in which mountain range?',
        options: ['Andes', 'Alps', 'Rockies', 'Himalayas'],
        correctIndex: 3,
        explanation: 'Mount Everest sits on the border between Nepal and China in the Himalayas.'
      },
      {
        id: 'geo-e-5',
        question: 'Which country is both an entire continent and an island nation?',
        options: ['Greenland', 'Madagascar', 'Australia', 'New Zealand'],
        correctIndex: 2,
        explanation: 'Australia is the smallest continent and the world\'s sixth-largest country.'
      }
    ],
    medium: [
      {
        id: 'geo-m-1',
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctIndex: 2,
        explanation: 'Canberra was chosen as the compromise capital between rival cities Sydney and Melbourne in 1908.'
      },
      {
        id: 'geo-m-2',
        question: 'Which desert is the largest hot desert on Earth?',
        options: ['Gobi Desert', 'Kalahari Desert', 'Sahara Desert', 'Atacama Desert'],
        correctIndex: 2,
        explanation: 'The Sahara Desert covers over 9 million square kilometers across North Africa.'
      },
      {
        id: 'geo-m-3',
        question: 'Through which major European city does the River Thames flow?',
        options: ['Paris', 'London', 'Dublin', 'Amsterdam'],
        correctIndex: 1,
        explanation: 'The River Thames flows through southern England, directly through the heart of London.'
      },
      {
        id: 'geo-m-4',
        question: 'Which strait separates Spain from Morocco, linking the Atlantic to the Mediterranean?',
        options: ['Strait of Hormuz', 'Strait of Malacca', 'Strait of Gibraltar', 'Bosphorus'],
        correctIndex: 2,
        explanation: 'The Strait of Gibraltar is only about 14 km wide at its narrowest point.'
      },
      {
        id: 'geo-m-5',
        question: 'What is the smallest independent state in the world by both area and population?',
        options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'],
        correctIndex: 2,
        explanation: 'Vatican City covers an area of roughly 49 hectares (0.49 km²).'
      }
    ],
    hard: [
      {
        id: 'geo-h-1',
        question: 'Which is the world\'s largest landlocked country by land area?',
        options: ['Mongolia', 'Chad', 'Kazakhstan', 'Bolivia'],
        correctIndex: 2,
        explanation: 'Kazakhstan covers 2.72 million km² without direct connection to the world ocean.'
      },
      {
        id: 'geo-h-2',
        question: 'What is the deepest freshwater lake in the world, holding 20% of Earth\'s unfrozen surface water?',
        options: ['Lake Superior', 'Lake Victoria', 'Lake Baikal', 'Lake Tanganyika'],
        correctIndex: 2,
        explanation: 'Lake Baikal in Siberia plunges to a maximum depth of 1,642 meters.'
      },
      {
        id: 'geo-h-3',
        question: 'Which national capital is the highest elevated capital city above sea level?',
        options: ['Quito', 'Bogota', 'La Paz', 'Addis Ababa'],
        correctIndex: 2,
        explanation: 'La Paz (administrative seat of Bolivia) sits at roughly 3,640 meters above sea level.'
      },
      {
        id: 'geo-h-4',
        question: 'What is the name of the tectonic boundary where the Pacific Plate meets other plates, causing intense earthquakes and volcanoes?',
        options: ['Mid-Atlantic Ridge', 'Ring of Fire', 'San Andreas Fault', 'Great Rift Valley'],
        correctIndex: 1,
        explanation: 'The Pacific Ring of Fire hosts about 75% of the world\'s active volcanoes.'
      },
      {
        id: 'geo-h-5',
        question: 'Which archipelago nation comprises over 17,000 islands along the equator?',
        options: ['Philippines', 'Maldives', 'Indonesia', 'Fiji'],
        correctIndex: 2,
        explanation: 'Indonesia is the largest archipelagic state in the world, with over 17,500 islands.'
      }
    ]
  },
  technology: {
    easy: [
      {
        id: 'tech-e-1',
        question: 'What does "CPU" stand for in computer hardware?',
        options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Power Unit'],
        correctIndex: 1,
        explanation: 'The Central Processing Unit executes instructions that make up computer programs.'
      },
      {
        id: 'tech-e-2',
        question: 'Which company developed the Android mobile operating system before it was acquired by Google?',
        options: ['Apple', 'Android Inc.', 'BlackBerry', 'Microsoft'],
        correctIndex: 1,
        explanation: 'Android Inc. was founded in 2003 by Andy Rubin, Rich Miner, Nick Sears, and Chris White.'
      },
      {
        id: 'tech-e-3',
        question: 'What does "HTML" stand for in web development?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink Text Modular Language', 'Home Tool Markup Language'],
        correctIndex: 0,
        explanation: 'HTML is the standard markup language for creating web documents.'
      },
      {
        id: 'tech-e-4',
        question: 'What does "RAM" stand for in computers?',
        options: ['Rapid Access Memory', 'Random Access Memory', 'Read Access Module', 'Run Array Memory'],
        correctIndex: 1,
        explanation: 'RAM allows stored data to be accessed in any order at nearly uniform speeds.'
      },
      {
        id: 'tech-e-5',
        question: 'Who co-founded Microsoft alongside Paul Allen in 1975?',
        options: ['Steve Jobs', 'Bill Gates', 'Larry Page', 'Jeff Bezos'],
        correctIndex: 1,
        explanation: 'Bill Gates and Paul Allen founded Microsoft on April 4, 1975.'
      }
    ],
    medium: [
      {
        id: 'tech-m-1',
        question: 'In programming, what data structure operates on a Last-In, First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctIndex: 1,
        explanation: 'A Stack adds and removes elements from the same end, following LIFO.'
      },
      {
        id: 'tech-m-2',
        question: 'What protocol secures HTTP traffic through encryption (SSL/TLS)?',
        options: ['FTP', 'HTTPS', 'SSH', 'SMTP'],
        correctIndex: 1,
        explanation: 'HTTPS encrypts communications using TLS to ensure privacy and data integrity.'
      },
      {
        id: 'tech-m-3',
        question: 'Which open-source version control system was created by Linus Torvalds in 2005?',
        options: ['Subversion', 'Git', 'Mercurial', 'CVS'],
        correctIndex: 1,
        explanation: 'Linus Torvalds invented Git to manage development of the Linux kernel.'
      },
      {
        id: 'tech-m-4',
        question: 'What does "GPU" stand for in modern computing and machine learning?',
        options: ['General Processing Unit', 'Graphics Processing Unit', 'Graphical Program Utility', 'Grid Power Unit'],
        correctIndex: 1,
        explanation: 'Graphics Processing Units are highly parallel processors suited for graphics and deep learning.'
      },
      {
        id: 'tech-m-5',
        question: 'Which consensus algorithm was introduced with the original Bitcoin cryptocurrency in 2008?',
        options: ['Proof of Stake', 'Proof of Authority', 'Proof of Work', 'Proof of Space'],
        correctIndex: 2,
        explanation: 'Bitcoin uses Proof of Work (PoW) with the SHA-256 cryptographic hash function.'
      }
    ],
    hard: [
      {
        id: 'tech-h-1',
        question: 'What asymptotic time complexity does Binary Search achieve on a sorted array of n elements?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctIndex: 1,
        explanation: 'Binary search halves the search space each step, achieving logarithmic O(log n) time.'
      },
      {
        id: 'tech-h-2',
        question: 'In modern transformer architectures (such as GPT and BERT), what key mechanism allows tokens to weigh relationships with all other tokens?',
        options: ['Convolution', 'Backpropagation', 'Self-Attention', 'Recurrent Gating'],
        correctIndex: 2,
        explanation: 'The Self-Attention mechanism computes dot-product similarities across key, query, and value vectors.'
      },
      {
        id: 'tech-h-3',
        question: 'What is the default port number used by the DNS (Domain Name System) protocol?',
        options: ['22', '53', '80', '443'],
        correctIndex: 1,
        explanation: 'DNS servers communicate primarily over UDP and TCP port 53.'
      },
      {
        id: 'tech-h-4',
        question: 'Which famous computer scientist formulated the concept of a Universal Machine and broke the Enigma cipher?',
        options: ['John von Neumann', 'Claude Shannon', 'Alan Turing', 'Donald Knuth'],
        correctIndex: 2,
        explanation: 'Alan Turing is widely regarded as the father of modern theoretical computer science and artificial intelligence.'
      },
      {
        id: 'tech-h-5',
        question: 'What is the primary difference between a process and a thread in operating systems?',
        options: ['Processes cannot use CPU', 'Threads share the address space of their parent process', 'Processes share memory automatically', 'Threads cannot run concurrently'],
        correctIndex: 1,
        explanation: 'Threads within the same process share virtual memory, file descriptors, and heap.'
      }
    ]
  },
  sports: {
    easy: [
      {
        id: 'spo-e-1',
        question: 'How many players are on the pitch for one team in a standard football (soccer) match?',
        options: ['9', '10', '11', '12'],
        correctIndex: 2,
        explanation: 'Each soccer team fields 11 players including the goalkeeper.'
      },
      {
        id: 'spo-e-2',
        question: 'How many points is a shot from beyond the arc worth in basketball?',
        options: ['1 point', '2 points', '3 points', '4 points'],
        correctIndex: 2,
        explanation: 'Shots made beyond the three-point arc score 3 points.'
      },
      {
        id: 'spo-e-3',
        question: 'In tennis, what word is traditionally used for a score of zero?',
        options: ['Null', 'Love', 'Zero', 'Blank'],
        correctIndex: 1,
        explanation: 'In tennis scoring, "Love" indicates zero points (derived from the French "l\'oeuf" meaning egg).'
      },
      {
        id: 'spo-e-4',
        question: 'How often are the Summer Olympic Games held under normal scheduling?',
        options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'],
        correctIndex: 2,
        explanation: 'The Olympic Games are quadrennial, taking place every four years.'
      },
      {
        id: 'spo-e-5',
        question: 'Which legendary sprinter holds the world record for the 100m sprint at 9.58 seconds?',
        options: ['Carl Lewis', 'Tyson Gay', 'Usain Bolt', 'Yohan Blake'],
        correctIndex: 2,
        explanation: 'Usain Bolt of Jamaica set the 100m world record (9.58s) at the 2009 World Championships in Berlin.'
      }
    ],
    medium: [
      {
        id: 'spo-m-1',
        question: 'Which country won the FIFA World Cup in Qatar in December 2022?',
        options: ['France', 'Brazil', 'Argentina', 'Croatia'],
        correctIndex: 2,
        explanation: 'Argentina defeated France in an epic final on penalties after a 3-3 draw.'
      },
      {
        id: 'spo-m-2',
        question: 'What is the length of an official regulation marathon race?',
        options: ['40.195 km', '42.195 km', '45.000 km', '50.000 km'],
        correctIndex: 1,
        explanation: 'A standard marathon is 42.195 kilometers (26 miles and 385 yards).'
      },
      {
        id: 'spo-m-3',
        question: 'Which sport awards the Stanley Cup to its playoff champion?',
        options: ['Cricket', 'Ice Hockey (NHL)', 'Baseball (MLB)', 'Rugby'],
        correctIndex: 1,
        explanation: 'The Stanley Cup is the oldest trophy competed for by professional athletes in North America.'
      },
      {
        id: 'spo-m-4',
        question: 'How many holes are played in a standard professional round of golf?',
        options: ['9', '12', '18', '24'],
        correctIndex: 2,
        explanation: 'A standard regulation round of golf consists of 18 holes.'
      },
      {
        id: 'spo-m-5',
        question: 'Which driver has won a joint-record 7 Formula 1 World Drivers\' Championships alongside Michael Schumacher?',
        options: ['Max Verstappen', 'Sebastian Vettel', 'Lewis Hamilton', 'Fernando Alonso'],
        correctIndex: 2,
        explanation: 'Lewis Hamilton equaled Michael Schumacher\'s record of 7 World Championships in 2020.'
      }
    ],
    hard: [
      {
        id: 'spo-h-1',
        question: 'In cricket, what term is used when a bowler dismisses three batsmen on consecutive deliveries?',
        options: ['Turkey', 'Trifecta', 'Hat-trick', 'Triple Strike'],
        correctIndex: 2,
        explanation: 'A hat-trick occurs when three wickets fall on three consecutive balls.'
      },
      {
        id: 'spo-h-2',
        question: 'Which nation has won the most Men\'s Rugby World Cup titles (tied with New Zealand)?',
        options: ['England', 'Australia', 'South Africa', 'France'],
        correctIndex: 2,
        explanation: 'South Africa won its record 4th Rugby World Cup title in 2023, surpassing/topping with New Zealand.'
      },
      {
        id: 'spo-h-3',
        question: 'What is the diameter of a standard basketball hoop rim in inches?',
        options: ['16 inches', '18 inches', '20 inches', '22 inches'],
        correctIndex: 1,
        explanation: 'A regulation basketball rim has an inside diameter of 18 inches (45.7 cm).'
      },
      {
        id: 'spo-h-4',
        question: 'Who was the first gymnast in Olympic history to score a perfect 10.0 on the uneven bars?',
        options: ['Simone Biles', 'Nadia Comăneci', 'Olga Korbut', 'Mary Lou Retton'],
        correctIndex: 1,
        explanation: 'Nadia Comăneci of Romania achieved the first perfect 10 at the 1976 Montreal Olympics.'
      },
      {
        id: 'spo-h-5',
        question: 'In baseball, how many perfect games have been pitched in MLB regular season and postseason history (approximately)?',
        options: ['Under 30', 'Between 50 and 60', 'Over 100', 'Over 200'],
        correctIndex: 0,
        explanation: 'Only 24 official perfect games have ever been pitched in Major League Baseball history.'
      }
    ]
  },
  english: {
    easy: [
      {
        id: 'eng-e-1',
        question: 'What part of speech is the word "quickly" in: "She ran quickly"?',
        options: ['Noun', 'Adjective', 'Adverb', 'Preposition'],
        correctIndex: 2,
        explanation: 'Adverbs modify verbs, adjectives, or other adverbs, often ending in "-ly".'
      },
      {
        id: 'eng-e-2',
        question: 'What is a word that means the opposite of another word called?',
        options: ['Synonym', 'Antonym', 'Homophone', 'Acronym'],
        correctIndex: 1,
        explanation: 'An antonym is a word contrary in meaning to another (e.g., hot and cold).'
      },
      {
        id: 'eng-e-3',
        question: 'Which of the following is a punctuation mark used to indicate a question?',
        options: ['Exclamation mark (!)', 'Period (.)', 'Question mark (?)', 'Colon (:)'],
        correctIndex: 2,
        explanation: 'A question mark terminates an interrogative sentence.'
      },
      {
        id: 'eng-e-4',
        question: 'What is the plural form of the noun "child"?',
        options: ['Childs', 'Children', 'Childrens', 'Childes'],
        correctIndex: 1,
        explanation: 'The plural of "child" is an irregular plural: "children".'
      },
      {
        id: 'eng-e-5',
        question: 'Which word completes the idiom: "Actions speak louder than ______"?',
        options: ['Thoughts', 'Words', 'Promises', 'Voices'],
        correctIndex: 1,
        explanation: 'The well-known idiom is "Actions speak louder than words".'
      }
    ],
    medium: [
      {
        id: 'eng-m-1',
        question: 'Identify the figure of speech: "The wind whispered through the dark pine trees."',
        options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
        correctIndex: 2,
        explanation: 'Personification attributes human qualities (whispering) to non-human things (the wind).'
      },
      {
        id: 'eng-m-2',
        question: 'Choose the sentence with correct subject-verb agreement:',
        options: [
          'Neither the teacher nor the students was present.',
          'Neither the teacher nor the students were present.',
          'Neither the teachers nor the student were present.',
          'Neither of them are going.'
        ],
        correctIndex: 1,
        explanation: 'When subjects are connected by "nor", the verb agrees with the closer subject ("students were").'
      },
      {
        id: 'eng-m-3',
        question: 'What does the term "ephemeral" mean?',
        options: ['Lasting forever', 'Short-lived and transient', 'Extremely heavy', 'Completely transparent'],
        correctIndex: 1,
        explanation: 'Ephemeral describes something fleeting or existing for only a brief period.'
      },
      {
        id: 'eng-m-4',
        question: 'Which word is an oxymoron?',
        options: ['Deafening silence', 'Running fast', 'Bright sunlight', 'Cold ice'],
        correctIndex: 0,
        explanation: 'An oxymoron combines two contradictory terms, like "deafening" and "silence".'
      },
      {
        id: 'eng-m-5',
        question: 'Who wrote the play "Hamlet, Prince of Denmark"?',
        options: ['Christopher Marlowe', 'William Shakespeare', 'John Milton', 'Charles Dickens'],
        correctIndex: 1,
        explanation: 'William Shakespeare wrote the tragedy of Hamlet between 1599 and 1601.'
      }
    ],
    hard: [
      {
        id: 'eng-h-1',
        question: 'What rhetorical device repeats the initial consonant sound in a sequence of nearby words?',
        options: ['Assonance', 'Alliteration', 'Consonance', 'Anaphora'],
        correctIndex: 1,
        explanation: 'Alliteration is the repetition of initial consonant sounds (e.g., "Peter Piper picked").'
      },
      {
        id: 'eng-h-2',
        question: 'In linguistics, what is a "portmanteau"?',
        options: [
          'A word borrowed unchanged from Latin',
          'A blend of two or more words combining their sounds and meanings',
          'A word with opposite meanings depending on context',
          'A word whose pronunciation mimics its sound'
        ],
        correctIndex: 1,
        explanation: 'Examples of portmanteaus include "smog" (smoke + fog) and "brunch" (breakfast + lunch).'
      },
      {
        id: 'eng-h-3',
        question: 'What grammatical mood expresses wishes, hypothetical situations, or demands contrary to fact?',
        options: ['Indicative mood', 'Imperative mood', 'Subjunctive mood', 'Interrogative mood'],
        correctIndex: 2,
        explanation: 'The subjunctive mood is used in constructions like "If I were you..." or "I demand that he be present."'
      },
      {
        id: 'eng-h-4',
        question: 'Which author coined over 1,700 words in the English language, including "eyeball", "lonely", and "swagger"?',
        options: ['Geoffrey Chaucer', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correctIndex: 1,
        explanation: 'William Shakespeare introduced or popularized thousands of common English words and phrases.'
      },
      {
        id: 'eng-h-5',
        question: 'What does the Latin legal phrase "quid pro quo" literally translate to in English?',
        options: ['Something for something', 'Voice of the people', 'In good faith', 'Guilty mind'],
        correctIndex: 0,
        explanation: '"Quid pro quo" translates literally to "something for something" (a favor or exchange).'
      }
    ]
  }
};

// Daily Challenge Curated Questions (One for each day or special multi-category mix)
export const DAILY_CHALLENGE_QUESTIONS = [
  {
    id: 'daily-1',
    category: 'Science & Cosmos',
    question: 'What is the closest star system to our Solar System?',
    options: ['Alpha Centauri', 'Barnard\'s Star', 'Sirius', 'Betelgeuse'],
    correctIndex: 0,
    explanation: 'Alpha Centauri is a triple star system about 4.24 to 4.37 light-years away.'
  },
  {
    id: 'daily-2',
    category: 'Technology',
    question: 'In what year was the World Wide Web publicly released to the world by CERN?',
    options: ['1983', '1989', '1991', '1995'],
    correctIndex: 2,
    explanation: 'Tim Berners-Lee created the Web at CERN, and it was made publicly available in August 1991.'
  },
  {
    id: 'daily-3',
    category: 'Mathematics',
    question: 'What is the only even prime number?',
    options: ['0', '1', '2', '4'],
    correctIndex: 2,
    explanation: '2 is the smallest prime number and the only even prime number.'
  },
  {
    id: 'daily-4',
    category: 'History',
    question: 'Who was the first female pilot to fly solo across the Atlantic Ocean?',
    options: ['Harriet Quimby', 'Bessie Coleman', 'Amelia Earhart', 'Jacqueline Cochran'],
    correctIndex: 2,
    explanation: 'Amelia Earhart completed her solo transatlantic flight in 1932.'
  },
  {
    id: 'daily-5',
    category: 'Geography',
    question: 'Which country features the most natural lakes in the world, with over 2 million lakes?',
    options: ['Russia', 'Canada', 'Finland', 'Sweden'],
    correctIndex: 1,
    explanation: 'Canada contains more lakes than the rest of the world\'s countries combined!'
  }
];

