// ─────────────────────────────────────────────────────────────
// ASSESSMENT QUESTIONS — EDIT THIS FILE ONLY to change questions.
// Keep the same shape: { id, text, options: [{ value, label }] }
// `value` is what gets saved; `label` is what the student sees.
// (Later we can add types like "slider" or "rank" — ask me.)
// ─────────────────────────────────────────────────────────────

const assessmentQuestions = [
  {
    id: "q1",
    text: "When you have free time, what do you enjoy most?",
    options: [
      { value: "build", label: "Building or fixing things" },
      { value: "create", label: "Drawing, designing, or writing" },
      { value: "organize", label: "Planning and organising" },
      { value: "help", label: "Helping or teaching others" },
    ],
  },
  {
    id: "q2",
    text: "Which school subject feels easiest to you?",
    options: [
      { value: "math", label: "Maths & Science" },
      { value: "arts", label: "Art & Languages" },
      { value: "social", label: "Social Studies & Business" },
      { value: "bio", label: "Biology & Life Sciences" },
    ],
  },
  {
    id: "q3",
    text: "How do you prefer to solve a problem?",
    options: [
      { value: "logic", label: "Step-by-step with logic" },
      { value: "creative", label: "With a creative, fresh idea" },
      { value: "discuss", label: "By discussing with others" },
      { value: "research", label: "By researching deeply first" },
    ],
  },
  {
    id: "q4",
    text: "What kind of task makes you lose track of time?",
    options: [
      { value: "tech", label: "Working with computers or gadgets" },
      { value: "design", label: "Making something look beautiful" },
      { value: "lead", label: "Leading a group or event" },
      { value: "care", label: "Looking after people or animals" },
    ],
  },
  {
    id: "q5",
    text: "In a group project, which role do you naturally take?",
    options: [
      { value: "doer", label: "The one who builds the actual thing" },
      { value: "ideas", label: "The idea and design person" },
      { value: "leader", label: "The leader who organises everyone" },
      { value: "support", label: "The one who keeps everyone together" },
    ],
  },
  {
    id: "q6",
    text: "What matters most to you in a future career?",
    options: [
      { value: "money", label: "High salary & stability" },
      { value: "passion", label: "Doing what I love" },
      { value: "impact", label: "Making a difference" },
      { value: "growth", label: "Learning & growing fast" },
    ],
  },
  {
    id: "q7",
    text: "Which of these would you enjoy reading about?",
    options: [
      { value: "tech", label: "New technology & inventions" },
      { value: "art", label: "Art, films & culture" },
      { value: "business", label: "Startups & business" },
      { value: "people", label: "Psychology & health" },
    ],
  },
  {
    id: "q8",
    text: "How do you feel about taking risks?",
    options: [
      { value: "love", label: "I love trying bold new things" },
      { value: "calculated", label: "Only after careful thinking" },
      { value: "avoid", label: "I prefer safe, sure paths" },
      { value: "depends", label: "It depends on the situation" },
    ],
  },
  {
    id: "q9",
    text: "What would your friends say you're best at?",
    options: [
      { value: "fixing", label: "Figuring out how things work" },
      { value: "creating", label: "Being creative & artistic" },
      { value: "organizing", label: "Organising & motivating" },
      { value: "listening", label: "Listening & giving advice" },
    ],
  },
  {
    id: "q10",
    text: "Which work environment sounds best?",
    options: [
      { value: "lab", label: "A lab or tech workspace" },
      { value: "studio", label: "A creative studio" },
      { value: "office", label: "A busy business office" },
      { value: "field", label: "Out in the field with people" },
    ],
  },
  {
    id: "q11",
    text: "When learning something new, you prefer to…",
    options: [
      { value: "hands", label: "Try it hands-on" },
      { value: "visual", label: "Watch and visualise it" },
      { value: "read", label: "Read and take notes" },
      { value: "teach", label: "Learn by explaining to others" },
    ],
  },
  {
    id: "q12",
    text: "Which achievement would make you proudest?",
    options: [
      { value: "invent", label: "Inventing something useful" },
      { value: "masterpiece", label: "Creating a masterpiece" },
      { value: "company", label: "Building a successful company" },
      { value: "lives", label: "Improving people's lives" },
    ],
  },
  {
    id: "q13",
    text: "How do you handle a tight deadline?",
    options: [
      { value: "plan", label: "Make a clear plan & execute" },
      { value: "burst", label: "Work in creative bursts" },
      { value: "delegate", label: "Organise & delegate tasks" },
      { value: "calm", label: "Stay calm & support the team" },
    ],
  },
  {
    id: "q14",
    text: "What kind of problems excite you most?",
    options: [
      { value: "technical", label: "Technical & scientific puzzles" },
      { value: "design", label: "Design & creative challenges" },
      { value: "strategy", label: "Business & strategy problems" },
      { value: "human", label: "Human & social problems" },
    ],
  },
  {
    id: "q15",
    text: "Pick a weekend activity you'd love:",
    options: [
      { value: "code", label: "Building an app or robot" },
      { value: "paint", label: "Painting, music, or photography" },
      { value: "sell", label: "Running a small stall or sale" },
      { value: "volunteer", label: "Volunteering for a cause" },
    ],
  },
  {
    id: "q16",
    text: "Which compliment means the most to you?",
    options: [
      { value: "smart", label: "\"You're so clever!\"" },
      { value: "creative", label: "\"You're so creative!\"" },
      { value: "leader", label: "\"You're a natural leader!\"" },
      { value: "kind", label: "\"You're so caring!\"" },
    ],
  },
  {
    id: "q17",
    text: "What do you want a job to give you every day?",
    options: [
      { value: "challenge", label: "New challenges to solve" },
      { value: "expression", label: "A way to express myself" },
      { value: "influence", label: "Influence & responsibility" },
      { value: "meaning", label: "A sense of meaning" },
    ],
  },
  {
    id: "q18",
    text: "How do you make big decisions?",
    options: [
      { value: "data", label: "With facts & data" },
      { value: "gut", label: "With my gut & imagination" },
      { value: "pros", label: "Weighing pros & cons" },
      { value: "advice", label: "By asking people I trust" },
    ],
  },
  {
    id: "q19",
    text: "Which future headline would you love to be about you?",
    options: [
      { value: "tech", label: "\"Young innovator changes tech\"" },
      { value: "art", label: "\"Rising artist wins big award\"" },
      { value: "biz", label: "\"Student founder builds startup\"" },
      { value: "social", label: "\"Changemaker helps thousands\"" },
    ],
  },
  {
    id: "q20",
    text: "Finally — which word describes your dream career?",
    options: [
      { value: "innovative", label: "Innovative" },
      { value: "creative", label: "Creative" },
      { value: "ambitious", label: "Ambitious" },
      { value: "meaningful", label: "Meaningful" },
    ],
  },
];

export default assessmentQuestions;