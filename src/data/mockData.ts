
import { Quiz, QuizCategory, User, UserProgress } from "../types";

export const MOCK_CATEGORIES: QuizCategory[] = [
  {
    id: "cat1",
    name: "Technology",
    description: "Test your knowledge about computers, software, and tech trends",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cat2",
    name: "Science",
    description: "Questions about physics, chemistry, biology and scientific discoveries",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cat3",
    name: "History",
    description: "Explore the past with questions about historical events and figures",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cat4",
    name: "Geography",
    description: "Test your knowledge of places, countries, and landmarks",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cat5",
    name: "Entertainment",
    description: "Questions about movies, music, books, and pop culture",
    imageUrl: "/placeholder.svg"
  }
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: "quiz1",
    title: "Web Development Basics",
    description: "Test your knowledge of HTML, CSS and JavaScript fundamentals",
    categoryId: "cat1",
    imageUrl: "/placeholder.svg",
    questions: [
      {
        id: "q1",
        quizId: "quiz1",
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Multi Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0,
        explanation: "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages."
      },
      {
        id: "q2",
        quizId: "quiz1",
        question: "Which CSS property is used to change the text color?",
        options: [
          "text-color",
          "font-color",
          "color",
          "text-style"
        ],
        correctAnswer: 2,
        explanation: "The 'color' property is used to set the color of text in CSS."
      },
      {
        id: "q3",
        quizId: "quiz1",
        question: "Which of the following is NOT a JavaScript data type?",
        options: [
          "String",
          "Boolean",
          "Float",
          "Object"
        ],
        correctAnswer: 2,
        explanation: "JavaScript has number type for all numeric values. 'Float' is not a distinct type in JavaScript."
      },
      {
        id: "q4",
        quizId: "quiz1",
        question: "What symbol is used for single-line comments in JavaScript?",
        options: [
          "//",
          "/* */",
          "#",
          "--"
        ],
        correctAnswer: 0,
        explanation: "In JavaScript, '//' is used for single-line comments."
      },
      {
        id: "q5",
        quizId: "quiz1",
        question: "Which HTML element is used to create a dropdown list?",
        options: [
          "<dropdown>",
          "<list>",
          "<select>",
          "<option>"
        ],
        correctAnswer: 2,
        explanation: "The <select> element is used to create a dropdown list in HTML."
      }
    ],
    createdBy: "1",
    createdAt: "2023-01-15T12:30:00Z",
    difficulty: "easy"
  },
  {
    id: "quiz2",
    title: "Space Exploration",
    description: "Test your knowledge about space missions, planets, and astronomy",
    categoryId: "cat2",
    imageUrl: "/placeholder.svg",
    questions: [
      {
        id: "q6",
        quizId: "quiz2",
        question: "Which planet is known as the Red Planet?",
        options: [
          "Venus",
          "Mars",
          "Jupiter",
          "Mercury"
        ],
        correctAnswer: 1,
        explanation: "Mars is often called the Red Planet due to its reddish appearance."
      },
      {
        id: "q7",
        quizId: "quiz2",
        question: "What was the first spacecraft to land humans on the Moon?",
        options: [
          "Apollo 11",
          "Voyager 1",
          "Sputnik 1",
          "Gemini 3"
        ],
        correctAnswer: 0,
        explanation: "Apollo 11 was the first mission to land humans on the Moon in 1969."
      },
      {
        id: "q8",
        quizId: "quiz2",
        question: "How many planets are in our solar system?",
        options: [
          "7",
          "8",
          "9",
          "10"
        ],
        correctAnswer: 1,
        explanation: "There are 8 recognized planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
      },
      {
        id: "q9",
        quizId: "quiz2",
        question: "What is the largest planet in our solar system?",
        options: [
          "Earth",
          "Saturn",
          "Jupiter",
          "Neptune"
        ],
        correctAnswer: 2,
        explanation: "Jupiter is the largest planet in our solar system."
      },
      {
        id: "q10",
        quizId: "quiz2",
        question: "What causes the seasons on Earth?",
        options: [
          "The distance from the Sun",
          "The Earth's rotation",
          "The Earth's tilt on its axis",
          "The gravitational pull of the Moon"
        ],
        correctAnswer: 2,
        explanation: "The Earth's tilt on its axis causes the seasons as different parts of Earth receive different amounts of sunlight throughout the year."
      }
    ],
    createdBy: "1",
    createdAt: "2023-02-20T09:15:00Z",
    difficulty: "medium"
  },
  {
    id: "quiz3",
    title: "World War II",
    description: "Test your knowledge about the events, figures, and impacts of WWII",
    categoryId: "cat3",
    imageUrl: "/placeholder.svg",
    questions: [
      {
        id: "q11",
        quizId: "quiz3",
        question: "When did World War II begin?",
        options: [
          "1935",
          "1939",
          "1941",
          "1945"
        ],
        correctAnswer: 1,
        explanation: "World War II began on September 1, 1939, when Nazi Germany invaded Poland."
      },
      {
        id: "q12",
        quizId: "quiz3",
        question: "Who was the leader of Nazi Germany during World War II?",
        options: [
          "Joseph Stalin",
          "Benito Mussolini",
          "Winston Churchill",
          "Adolf Hitler"
        ],
        correctAnswer: 3,
        explanation: "Adolf Hitler was the leader of Nazi Germany during World War II."
      },
      {
        id: "q13",
        quizId: "quiz3",
        question: "What was the code name for the Allied invasion of Normandy in 1944?",
        options: [
          "Operation Market Garden",
          "Operation Barbarossa",
          "Operation Overlord",
          "Operation Torch"
        ],
        correctAnswer: 2,
        explanation: "Operation Overlord was the code name for the Battle of Normandy, which began on June 6, 1944 (D-Day)."
      },
      {
        id: "q14",
        quizId: "quiz3",
        question: "Which country was the first to develop and use atomic bombs in warfare?",
        options: [
          "Soviet Union",
          "Germany",
          "Japan",
          "United States"
        ],
        correctAnswer: 3,
        explanation: "The United States was the first country to develop and use atomic bombs, dropping them on the Japanese cities of Hiroshima and Nagasaki in 1945."
      },
      {
        id: "q15",
        quizId: "quiz3",
        question: "When did World War II end in Europe?",
        options: [
          "May 8, 1945",
          "August 15, 1945",
          "December 7, 1941",
          "September 2, 1945"
        ],
        correctAnswer: 0,
        explanation: "V-E Day (Victory in Europe Day) was on May 8, 1945, when the Allies formally accepted Nazi Germany's unconditional surrender."
      }
    ],
    createdBy: "1",
    createdAt: "2023-03-10T14:45:00Z",
    difficulty: "hard"
  }
];

export const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "Admin User",
    email: "admin@quizwhiz.com",
    isAdmin: true,
    createdAt: "2023-01-01T00:00:00Z"
  },
  {
    id: "2",
    username: "Regular User",
    email: "user@example.com",
    isAdmin: false,
    createdAt: "2023-01-02T00:00:00Z"
  }
];

export const MOCK_USER_PROGRESS: UserProgress[] = [
  {
    userId: "2",
    quizId: "quiz1",
    score: 80,
    completedAt: "2023-04-15T10:30:00Z"
  },
  {
    userId: "2",
    quizId: "quiz2",
    score: 60,
    completedAt: "2023-04-20T11:15:00Z"
  }
];
