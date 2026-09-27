import AtlasApp from '../components/AtlasApp';
import collectionsJson from '../generated/collections.json';
import type { CollectionManifest } from '../lib/types';

const collections = collectionsJson as Record<string, CollectionManifest>;

export default function HomePage() {
  return <AtlasApp collections={collections} />;
}
