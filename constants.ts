import { type TopicCategory, UserLevel } from './types';
import { BrainIcon } from './components/icons/BrainIcon';
import { CursorIcon } from './components/icons/CursorIcon';
import { WebIcon } from './components/icons/WebIcon';
import { GitIcon } from './components/icons/GitIcon';
import { ApiIcon } from './components/icons/ApiIcon';
import { CloudIcon } from './components/icons/CloudIcon';
import { DollarSignIcon } from './components/icons/DollarSignIcon';
import { CubeIcon } from './components/icons/CubeIcon';
import { HeartbeatIcon } from './components/icons/HeartbeatIcon';
import { MoonIcon } from './components/icons/MoonIcon';
import { DatabaseIcon } from './components/icons/DatabaseIcon';
import { ChartIcon } from './components/icons/ChartIcon';
import { DnaIcon } from './components/icons/DnaIcon';
import { PyramidIcon } from './components/icons/PyramidIcon';
import { PythonIcon } from './components/icons/PythonIcon';
import { CodeIcon } from './components/icons/CodeIcon';
import { KotlinIcon } from './components/icons/KotlinIcon';

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    title: 'AI & Technology',
    topics: [
      {
        id: 'llm',
        title: 'What is an LLM?',
        description: 'Explore the magic behind Large Language Models like ChatGPT and Gemini.',
        Icon: BrainIcon,
      },
      {
        id: 'cursor',
        title: 'How does the Cursor AI editor work?',
        description: 'Discover how this AI-powered code editor understands and helps you write code.',
        Icon: CursorIcon,
      },
      {
        id: 'quantum',
        title: 'Quantum Computing Basics',
        description: 'Dive into the mind-bending world of qubits, superposition, and entanglement.',
        Icon: CubeIcon,
      },
    ],
  },
  {
    title: 'Coding',
    topics: [
      {
        id: 'python',
        title: 'Introduction to Python',
        description: 'Learn the basics of one of the most popular and versatile programming languages.',
        Icon: PythonIcon,
      },
      {
        id: 'javascript',
        title: 'JavaScript Fundamentals',
        description: 'Discover the language that powers interactive websites and modern web applications.',
        Icon: CodeIcon,
      },
       {
        id: 'kotlin',
        title: 'Getting Started with Kotlin',
        description: 'Explore the modern language for Android development and multi-platform applications.',
        Icon: KotlinIcon,
      },
      {
        id: 'html-css',
        title: 'HTML & CSS Basics',
        description: 'Learn the fundamental building blocks of every website and how to style them.',
        Icon: CodeIcon,
      },
      {
        id: 'sql',
        title: 'What is SQL?',
        description: 'Understand the standard language for managing and querying relational databases.',
        Icon: DatabaseIcon,
      },
    ],
  },
  {
    title: 'Software Development',
    topics: [
      {
        id: 'internet',
        title: 'How does the Internet work?',
        description: 'Learn how data travels across the globe in milliseconds to bring you websites.',
        Icon: WebIcon,
      },
      {
        id: 'git',
        title: 'What is Git?',
        description: 'Understand the essential tool for tracking changes and collaborating on code.',
        Icon: GitIcon,
      },
      {
        id: 'api',
        title: 'What is an API?',
        description: 'Discover how different applications talk to each other to share data and functionality.',
        Icon: ApiIcon,
      },
      {
        id: 'sql-nosql',
        title: 'SQL vs NoSQL Databases',
        description: 'Learn the key differences between relational and non-relational databases.',
        Icon: DatabaseIcon,
      },
      {
        id: 'cloud',
        title: 'What is "The Cloud"?',
        description: 'Demystify cloud computing and learn where your files really go when you upload them.',
        Icon: CloudIcon,
      },
    ],
  },
    {
    title: 'Finance & Crypto',
    topics: [
        {
            id: 'blockchain',
            title: 'What is Blockchain?',
            description: 'Understand the revolutionary technology that powers cryptocurrencies like Bitcoin.',
            Icon: CubeIcon,
        },
        {
            id: 'inflation',
            title: 'Understanding Inflation',
            description: 'Learn why the prices of goods and services rise over time and how it affects you.',
            Icon: DollarSignIcon,
        },
        {
            id: 'stocks',
            title: 'How Does the Stock Market Work?',
            description: 'A beginner\'s guide to stocks, exchanges, and investing in companies.',
            Icon: ChartIcon,
        },
    ]
  },
    {
    title: 'Health & Wellness',
    topics: [
        {
            id: 'metabolism',
            title: 'How does Metabolism work?',
            description: 'Discover the science behind how your body converts food into energy.',
            Icon: HeartbeatIcon,
        },
        {
            id: 'sleep',
            title: 'The Science of Sleep',
            description: 'Learn about the different stages of sleep and why it\'s crucial for your health.',
            Icon: MoonIcon,
        },
        {
            id: 'nutrition',
            title: 'The Basics of Nutrition',
            description: 'Explore the roles of proteins, carbs, and fats in a healthy, balanced diet.',
            Icon: HeartbeatIcon,
        },
    ]
  },
  {
    title: 'Science & Nature',
    topics: [
        {
            id: 'dna',
            title: 'The Basics of DNA',
            description: 'Uncover the secrets of the molecule that contains the genetic code for life.',
            Icon: DnaIcon,
        },
        {
            id: 'black-holes',
            title: 'How do Black Holes work?',
            description: 'Explore the most mysterious objects in the universe where gravity is all-powerful.',
            Icon: WebIcon,
        },
        {
            id: 'photosynthesis',
            title: 'What is Photosynthesis?',
            description: 'Learn how plants use sunlight to create their own food and produce oxygen.',
            Icon: CloudIcon,
        },
    ]
  },
  {
    title: 'History & Culture',
    topics: [
        {
            id: 'pyramids',
            title: 'Ancient Egyptian Pyramids',
            description: 'Discover the purpose and construction secrets of these monumental ancient wonders.',
            Icon: PyramidIcon,
        },
        {
            id: 'renaissance',
            title: 'The Italian Renaissance',
            description: 'Explore the explosion of art, science, and culture that changed the world.',
            Icon: BrainIcon,
        },
        {
            id: 'silk-road',
            title: 'The Silk Road',
            description: 'Learn about the ancient network of trade routes that connected the East and West.',
            Icon: GitIcon,
        },
    ]
  }
];

export const KNOWLEDGE_LEVELS = [
    { label: 'Absolute Beginner', value: UserLevel.Beginner },
    { label: 'Know Some Basics', value: UserLevel.Intermediate },
    { label: 'Ready for Expertise', value: UserLevel.Advanced },
];