import type { AgentDefinition } from '../registry.js';
import growthHackerContent from './growth_hacker.md';
import contentCreatorContent from './content_creator.md';
import twitterEngagerContent from './twitter_engager.md';
import tiktokStrategistContent from './tiktok_strategist.md';
import instagramCuratorContent from './instagram_curator.md';
import redditCommunityBuilderContent from './reddit_community_builder.md';
import appStoreOptimizerContent from './app_store_optimizer.md';
import socialMediaStrategistContent from './social_media_strategist.md';

export function getMarketingDefinitions(): readonly AgentDefinition[] {
  return [
    {
      id: 'growth-hacker',
      name: 'Growth Hacker',
      description: 'Expert growth strategist specializing in rapid user acquisition through data-driven experimentation.',
      category: 'marketing',
      getContent: () => growthHackerContent,
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      description: 'Expert content strategist and creator for multi-platform campaigns with brand storytelling and audience engagement.',
      category: 'marketing',
      getContent: () => contentCreatorContent,
    },
    {
      id: 'twitter-engager',
      name: 'Twitter Engager',
      description: 'Expert Twitter marketing specialist focused on real-time engagement, thought leadership building, and community-driven growth.',
      category: 'marketing',
      getContent: () => twitterEngagerContent,
    },
    {
      id: 'tiktok-strategist',
      name: 'TikTok Strategist',
      description: 'Expert TikTok marketing specialist focused on viral content creation, algorithm optimization, and community building.',
      category: 'marketing',
      getContent: () => tiktokStrategistContent,
    },
    {
      id: 'instagram-curator',
      name: 'Instagram Curator',
      description: 'Expert Instagram marketing specialist focused on visual storytelling, community building, and multi-format content optimization.',
      category: 'marketing',
      getContent: () => instagramCuratorContent,
    },
    {
      id: 'reddit-community-builder',
      name: 'Reddit Community Builder',
      description: 'Expert Reddit marketing specialist focused on authentic community engagement, value-driven content creation, and long-term relationship building.',
      category: 'marketing',
      getContent: () => redditCommunityBuilderContent,
    },
    {
      id: 'app-store-optimizer',
      name: 'App Store Optimizer',
      description: 'Expert app store marketing specialist focused on App Store Optimization (ASO), conversion rate optimization, and app discoverability.',
      category: 'marketing',
      getContent: () => appStoreOptimizerContent,
    },
    {
      id: 'social-media-strategist',
      name: 'Social Media Strategist',
      description: 'Expert social media strategist for Twitter, LinkedIn, and professional platforms with viral campaigns and thought leadership strategies.',
      category: 'marketing',
      getContent: () => socialMediaStrategistContent,
    },
  ];
}
