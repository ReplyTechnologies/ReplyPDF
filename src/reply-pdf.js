const PDFDocument = require('pdfkit');
const components = require('./components/index.js');
const models = require('./components/models/index.js');
const enums = require('./components/enums/index.js');

module.exports = {
  components: components,
  models: models,
  enums: enums,
  generateDocument: (options) => {
    if (!options.template) {
      throw new Error('No template provided');
    }

    if (options.template.constructor.name != 'Page') {
      throw new Error('Invalid template provided. Template must be of type Page');
    }

    options.info = options.info || {};
    options.info.keywords = options.info.keywords || [];

    const doc = options.doc || new PDFDocument({
      bufferPages: true,
      size: options.template.size.toArray(),
      margin: 0,
      info: {
        Title: options.info.title || '',
        Author: options.info.author || '',
        Subject: options.info.subject || '',
        Keywords: options.info.keywords.join(','),
      },
    });

    if (options.fonts) {
      for (let fontName in options.fonts) {
        doc.registerFont(fontName, options.fonts[fontName]);
      }
    }

    doc.debug = options.debug;

    let documentPage = doc;

    if (options.doc) {
      // existing document, generate new page
      documentPage = doc.addPage({
        size: options.template.size.toArray(),
        margin: 0,
      });
    }

    documentPage.pageIndex = 0;

    let page = options.template;

    do {
      documentPage.renderNextPage = false;

      page = page.clone();
      page.initializeComponent(options.data);
      page.layoutComponent(documentPage);
      page.generateComponent(documentPage, options.data);
      page.afterGenerateComponent(documentPage);

      if (documentPage.renderNextPage) {
        documentPage = doc.addPage({
          size: options.template.size.toArray(),
          margin: 0,
        });
        documentPage.pageIndex++;
      }
    } while (documentPage.renderNextPage);

    // process header and footers
    let pages = doc.bufferedPageRange();
    for (let i = pages.start; i < pages.count; i++) {
      doc.switchToPage(i);
      documentPage.pageIndex = i;

      const page = options.template.clone();

      options.data = options.data || {};
      options.data.pageNumber = i + 1;
      options.data.pageCount = pages.count;

      page.generateHeaderComponent(documentPage, options.data);
      page.generateFooterComponent(documentPage, options.data);
    }

    return doc;
  }
};
