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
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'cursor',
        title: 'How does the Cursor AI editor work?',
        description: 'Discover how this AI-powered code editor understands and helps you write code.',
        Icon: CursorIcon,
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'quantum',
        title: 'Quantum Computing Basics',
        description: 'Dive into the mind-bending world of qubits, superposition, and entanglement.',
        Icon: CubeIcon,
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center',
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
        imageUrl: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'javascript',
        title: 'JavaScript Fundamentals',
        description: 'Discover the language that powers interactive websites and modern web applications.',
        Icon: CodeIcon,
        imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=center',
      },
       {
        id: 'kotlin',
        title: 'Getting Started with Kotlin',
        description: 'Explore the modern language for Android development and multi-platform applications.',
        Icon: KotlinIcon,
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'html-css',
        title: 'HTML & CSS Basics',
        description: 'Learn the fundamental building blocks of every website and how to style them.',
        Icon: CodeIcon,
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'sql',
        title: 'What is SQL?',
        description: 'Understand the standard language for managing and querying relational databases.',
        Icon: DatabaseIcon,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
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
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'git',
        title: 'What is Git?',
        description: 'Understand the essential tool for tracking changes and collaborating on code.',
        Icon: GitIcon,
        imageUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'api',
        title: 'What is an API?',
        description: 'Discover how different applications talk to each other to share data and functionality.',
        Icon: ApiIcon,
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'sql-nosql',
        title: 'SQL vs NoSQL Databases',
        description: 'Learn the key differences between relational and non-relational databases.',
        Icon: DatabaseIcon,
        imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop&crop=center',
      },
      {
        id: 'cloud',
        title: 'What is "The Cloud"?',
        description: 'Demystify cloud computing and learn where your files really go when you upload them.',
        Icon: CloudIcon,
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop&crop=center',
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
            imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'inflation',
            title: 'Understanding Inflation',
            description: 'Learn why the prices of goods and services rise over time and how it affects you.',
            Icon: DollarSignIcon,
            imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'stocks',
            title: 'How Does the Stock Market Work?',
            description: 'A beginner\'s guide to stocks, exchanges, and investing in companies.',
            Icon: ChartIcon,
            imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center',
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
            imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'sleep',
            title: 'The Science of Sleep',
            description: 'Learn about the different stages of sleep and why it\'s crucial for your health.',
            Icon: MoonIcon,
            imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'nutrition',
            title: 'The Basics of Nutrition',
            description: 'Explore the roles of proteins, carbs, and fats in a healthy, balanced diet.',
            Icon: HeartbeatIcon,
            imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&crop=center',
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
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'black-holes',
            title: 'How do Black Holes work?',
            description: 'Explore the most mysterious objects in the universe where gravity is all-powerful.',
            Icon: WebIcon,
            imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'photosynthesis',
            title: 'What is Photosynthesis?',
            description: 'Learn how plants use sunlight to create their own food and produce oxygen.',
            Icon: CloudIcon,
            imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center',
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
            imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73d6e?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'renaissance',
            title: 'The Italian Renaissance',
            description: 'Explore the explosion of art, science, and culture that changed the world.',
            Icon: BrainIcon,
            imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
        },
        {
            id: 'silk-road',
            title: 'The Silk Road',
            description: 'Learn about the ancient network of trade routes that connected the East and West.',
            Icon: GitIcon,
            imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center',
        },
    ]
  }
];

export const KNOWLEDGE_LEVELS = [
    { label: 'Absolute Beginner', value: UserLevel.Beginner },
    { label: 'Know Some Basics', value: UserLevel.Intermediate },
    { label: 'Ready for Expertise', value: UserLevel.Advanced },
];