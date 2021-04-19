import { default as PDFDocument } from 'pdfkit';

const easyDocs = {
  generateDocument(options) {
    if (!options.template) {
      throw new Error('No template provided');
    }

    if (options.template.constructor.name != 'Page') {
      throw new Error('Invalid template provided. Template must be of type Page');
    }

    const doc = options.doc || new PDFDocument({
      bufferPages: true,
      size: options.template.size.toArray(),
      margin: 0
    });

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

    do {
      documentPage.renderNextPage = false;
      options.template.generateComponent(documentPage, options.data);

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

      options.pageNumber = i + 1;
      options.pageCount = pages.count;

      options.template.generateHeaderComponent(documentPage, options);
      options.template.generateFooterComponent(documentPage, options);
    }

    return doc;
  }
};

export { easyDocs as EasyDocs };