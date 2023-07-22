import {defineCliConfig} from 'sanity/cli'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset =process.env.NEXT_PUBLIC_SANITY_DATASET!;
export default defineCliConfig({
  api: {
   
    projectId,
    dataset,
  }
})
