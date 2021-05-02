const fs = require('fs');
const { Container, Page, Table, StackVertical, Text } = require('../src/components/index.js');
const { PageSize, Alignment, TextAlignment, FontWeight } = require('../src/components/enums/index.js');
const { Offset, Border } = require('../src/components/models/index.js');
const ReplyPDF = require('../src/reply-pdf.js');

module.exports = {
  generate: () => {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset({
        left: 50,
        top: 50,
        right: 50,
        bottom: 50,
      }),
      header: new Container({
        height: 90,
        children: [
          new StackVertical({
            verticalAlignment: Alignment.fill,
            horizontalAlignment: Alignment.fill,
            spacing: 2,
            children: [
              new Text({
                text: 'Invoice #{{invoice.number}}',
                textAlignment: TextAlignment.end,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              }),
              new Text({
                italic: true,
                text: 'Date: {{invoice.date}}',
              }),
              new Text({
                text: '{{client.name}}',
                fontWeight: FontWeight.bold
              }),
              new Text({
                text: 'Cell: {{client.contactNumber}}',
              }),
              new Text({
                text: 'Email: {{client.emailAddress}}',
              }),
            ]
          }),
          new StackVertical({
            spacing: 2,
            children: [
              new Text({
                horizontalAlignment: Alignment.end,
                text: '{{shop.name}}',
                fontSize: 15,
                fontWeight: FontWeight.bold,
              }),
              new Text({
                horizontalAlignment: Alignment.end,
                text: 'Cell: {{shop.contactNumber}}',
              }),
              new Text({
                horizontalAlignment: Alignment.end,
                text: 'Email: {{shop.emailAddress}}',
              }),
            ],
          }),
        ],
      }),
      footer: new Container({
        height: 50,
        children: [
          new Text({
            horizontalAlignment: Alignment.end,
            verticalAlignment: Alignment.end,
            fontSize: 10,
            text: 'Page {{pageNumber}} of {{pageCount}}',
          }),
          new Text({
            horizontalAlignment: Alignment.start,
            verticalAlignment: Alignment.end,
            fontSize: 10,
            color: '#777',
            text: 'Cookie CO',
          }),
        ],
      }),
      children: [
        new StackVertical({
          children: [
            new Table({
              binding: 'invoice.products',
              border: new Border(),
              headerStyle: {
                fontWeight: FontWeight.bold,
                border: new Border(),
              },
              alternativeCellStyle: {
                backgroundColor: '#ddd',
              },
              columns: [
                {
                  property: 'id',
                  text: '#',
                  width: 30,
                  fx: (index, record, value) => {
                    return index + 1;
                  }
                },
                {
                  property: 'productName',
                  text: 'Product',
                },
                {
                  property: 'sellingPrice',
                  text: 'Unit Price',
                  width: 70,
                  headerStyle: {
                    textAlignment: TextAlignment.right,
                  },
                  cellStyle: {
                    textAlignment: TextAlignment.right,
                  },
                  fx: (index, record, value) => {
                    return record.sellingPrice.toFixed(2);
                  }
                },
                {
                  property: 'quantity',
                  text: 'Quantity',
                  width: 70,
                  headerStyle: {
                    textAlignment: TextAlignment.right,
                  },
                  cellStyle: {
                    textAlignment: TextAlignment.right,
                  },
                  fx: (index, record, value) => value + ' EA',
                },
                {
                  text: 'Total',
                  width: 70,
                  headerStyle: {
                    textAlignment: TextAlignment.right,
                  },
                  cellStyle: {
                    textAlignment: TextAlignment.right,
                  },
                  fx: (index, record, value) => {
                    return (record.sellingPrice * record.quantity).toFixed(2);
                  }
                }
              ]
            }),
            new Container({
              height: 25,
              border: new Border(),
              children: [
                new Container({
                  margin: new Offset(2),
                  children: [
                    new Text({
                      verticalAlignment: Alignment.middle,
                      horizontalAlignment: Alignment.start,
                      fontWeight: FontWeight.bold,
                      text: 'Total',
                    }),
                    new Text({
                      verticalAlignment: Alignment.middle,
                      horizontalAlignment: Alignment.end,
                      fontWeight: FontWeight.bold,
                      text: '{{invoice.total}}',
                    }),
                  ]
                }),
              ]
            }),
          ],
        }),
      ],
    });

    const data = {
      "invoice": {
        "number": "0000090",
        "products": [
          {
            "id": 312,
            "quantity": 2,
            "sellingPrice": 35,
            "productName": "Stencil,A5",
          },
          {
            "id": 313,
            "quantity": 5,
            "sellingPrice": 15,
            "productName": "Print,Rut,A6",
          },
          {
            "id": 311,
            "quantity": 1,
            "sellingPrice": 50,
            "productName": "Print,Rut,A4",
          },
          {
            "id": 306,
            "quantity": 2,
            "sellingPrice": 50,
            "productName": "Akfix",
          },
          {
            "id": 304,
            "quantity": 2,
            "sellingPrice": 50,
            "productName": "Modge Podge",
          },
          {
            "id": 305,
            "quantity": 2,
            "sellingPrice": 50,
            "productName": "3D Paste",
          }
        ],
        "date": "2021/04/17",
        "total": "495.00"
      },
      "client": {
        "name": "John Doe",
        "contactNumber": "000 555 5555 555",
        "emailAddress": "john@doe.com"
      },
      "shop": {
        "name": "Cookie CO - The Cookie People",
        "contactNumber": "000 555 5555 555",
        "emailAddress": "info@cookie-co.fake"
      }
    };

    let doc = ReplyPDF.generateDocument({
      data: data,
      template: template,
      debug: false,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-invoice-example.pdf'));
    doc.end();
  }
}