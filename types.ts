import { type ReactNode } from 'react';

// Make TypeScript aware of the 'marked' library loaded from the CDN
declare global {
  var marked: {
    parse: (markdown: string) => string;
  };
}

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  Icon: React.FC<{ className?: string }>;
  imageUrl: string;
}

export interface TopicCategory {
  title: string;
  topics: LearningTopic[];
}

export enum UserLevel {
  Beginner = 'An absolute beginner with no prior knowledge.',
  Intermediate = 'Someone with some basic concepts but not much depth.',
  Advanced = 'A person who knows the basics and wants to gain expertise.',
}

export interface FunFact {
  topicTitle: string;
  fact: string;
}

export interface TopicContentData {
  title:string;
  explanation: string;
  followUpSuggestions: string[];
  funFactForNextTopic: FunFact;
}

export type SessionState = 
  | 'selecting_level'
  | 'generating_topic'
  | 'learning'
  | 'error';