import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { shopifyAssets } from 'sanity-plugin-shopify-assets';
import { colorInput } from '@sanity/color-input';
import { deskStructure } from './deskStructure';
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array';

export default defineConfig({
  name: 'default',
  title: 'Normform',

  projectId: 'fhl3l9nr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    shopifyAssets({
      shopifyDomain: 'norm-form.myshopify.com'
    }),
    visionTool(),
    colorInput(),
    imageHotspotArrayPlugin(),
  ],

	scheduledPublishing: {
		enabled: false, 
		inputDateTimeFormat: 'MM/dd/yyyy h:mm a',
	},

  document: {
    newDocumentOptions: (prev, { currentUser, creationContext }) => {
      const { type, schemaType } = creationContext;
      if (type === 'structure' && schemaType == 'product') {
        return [];
      }
      return prev;
    },
    actions: (prev, props) => {
      const { schemaType } = props;
      if (schemaType == 'product' || schemaType == 'collection') {
        return prev.map((originalAction) => originalAction.action === 'duplicate' || originalAction.action === 'discardChanges' || originalAction.action === 'delete' || originalAction.action === 'unpublish' || originalAction.action === 'action-Schedule' ? () => null : originalAction);
      } else {
        return prev;
      }
    },
  },

  schema: {
    types: schemaTypes,
  },
})

const projectId = 'fhl3l9nr';
const dataset = 'production';
const apiVersion = '2021-03-25';

export { projectId, dataset, apiVersion };