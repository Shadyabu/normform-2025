// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

export const deskStructure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .icon(() => '🏡')
        .title('Home')
        .child(
          S.editor()
            .id('home')
            .schemaType('home')
            .documentId('home')
      ),
      S.listItem()
        .icon(() => '🛒')
        .title('Shop')
        .child(
          S.list()
            .title('Shop')
            .items([
              S.listItem()
                .title('Shop Page')
                .icon(() => '📄')
                .child(
                S.editor()
                  .id('shop')
                  .schemaType('shop')
                    .documentId('shop')
                ),
              S.listItem()
                .title('Shop Sidebar')
                .icon(() => '〰️')
                .child(
                S.editor()
                  .id('shopSidebar')
                  .schemaType('shopSidebar')
                    .documentId('shopSidebar')
                ),
              S.listItem()
                .title('Shop Responsibility')
                .icon(() => '🌍')
                .child(
                S.editor()
                  .id('shopResponsibility')
                  .schemaType('shopResponsibility')
                    .documentId('shopResponsibility')
              ),
              S.listItem()
                .title('Sizing Chart')
                .icon(() => '📏')
                  .child(
                    S.editor()
                      .id('sizing')
                      .schemaType('sizing')
                      .documentId('sizing')
                  ),
              S.listItem()
                .title('Product Sizes')
                .icon(() => '📐')
                .child(
                  S.documentTypeList('productSize')
              ),
            ]),
      ),
      S.listItem()
        .title('Products')
        .icon(() => '👒')
        .child(
          S.documentTypeList('product')
						.filter('_type == "product" && store.isDeleted != true')
      ),
      S.listItem()
        .icon(() => '📝')
        .title('About')
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('about')
      ),
      S.divider(),
      S.listItem()
        .icon(() => '⚙️')
        .title('Settings')
        .child(
          S.editor()
            .id('settings')
            .schemaType('settings')
            .documentId('settings')
      ),
      S.listItem()
        .icon(() => '📧')
        .title('Signup Form')
        .child(
          S.editor()
            .id('signupForm')
            .schemaType('signupForm')
            .documentId('signupForm')
      ),
      S.listItem()
        .icon(() => '🔒')
        .title('Privacy')
        .child(
          S.editor()
            .id('privacy')
            .schemaType('privacy')
            .documentId('privacy')
      ),
      S.listItem()
        .icon(() => '📃')
        .title('Terms')
        .child(
          S.editor()
            .id('terms')
            .schemaType('terms')
            .documentId('terms')
      ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.documentTypeList('page')
      ),
    ]);