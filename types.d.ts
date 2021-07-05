declare module 'country-flag-icons';
declare module 'country-flag-icons/react/3x2';
declare module 'storyblok-rich-text-react-renderer';

declare module '*.svg' {
  const value: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}

interface StoryblokTranslatedSlug {
  path: string;
  name: null | string;
  lang: string;
}

interface StoryblokContent {
  component: string;
  _uid: string;
}
interface StoryblokStory<T> {
  content: StoryblokContent & T;
  created_at: string;
  default_full_slug: string;
  first_published_at: string;
  full_slug: string;
  group_id: string;
  id: number;
  is_startpage: boolean;
  lang: string;
  name: string;
  parent_id: number;
  position: number;
  published_at: number;
  slug: string;
  translated_slugs: StoryblokTranslatedSlug[];
  uuid: string;
}

interface StoryblokLink {
  cached_url: string;
  fieldtype: 'multilink';
  id: string;
  linktype: 'url';
  url: string;
}

interface StoryblokAsset {
  alt: string;
  copyright: string;
  fieldtype: 'asset';
  filename: string;
  focus: null;
  id: number;
  name: string;
  title: string;
}
