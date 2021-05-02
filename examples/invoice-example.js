const fs = require('fs');
const { Container, Page, Table, StackHorizontal, StackVertical, Text } = require('../src/components/index.js');
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
            spacing: 5,
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
            spacing: 5,
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
            text: 'EasyShop',
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
                  width: 50,
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
                  width: 75,
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
                  width: 75,
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
                  width: 75,
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
              height: 30,
              border: new Border(),
              children: [
                // new Container({
                //   margin: 5,
                //   children: [
                //     new Text({
                //       verticalAlignment: Alignment.middle,
                //       horizontalAlignment: Alignment.start,
                //       fontWeight: FontWeight.bold,
                //       text: 'Total',
                //     }),
                //     new Text({
                //       verticalAlignment: Alignment.middle,
                //       horizontalAlignment: Alignment.end,
                //       fontWeight: FontWeight.bold,
                //       text: '{{invoice.total}}',
                //     }),
                //   ]
                // }),
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
            "invoiceId": 91,
            "productId": 59,
            "dateCreated": "2021-04-17T11:03:52.000Z",
            "quantity": 2,
            "purchasePrice": 14,
            "sellingPrice": 35,
            "productName": "Stencil,A5",
            "productCode": "00110000059"
          },
          {
            "id": 313,
            "invoiceId": 91,
            "productId": 70,
            "dateCreated": "2021-04-17T11:04:19.000Z",
            "quantity": 5,
            "purchasePrice": 0,
            "sellingPrice": 15,
            "productName": "Print,Rut,A6",
            "productCode": "00110000071"
          },
          {
            "id": 311,
            "invoiceId": 91,
            "productId": 72,
            "dateCreated": "2021-04-17T11:03:37.000Z",
            "quantity": 1,
            "purchasePrice": 0,
            "sellingPrice": 50,
            "productName": "Print,Rut,A4",
            "productCode": "00110000073"
          },
          {
            "id": 306,
            "invoiceId": 91,
            "productId": 74,
            "dateCreated": "2021-04-17T10:54:34.000Z",
            "quantity": 2,
            "purchasePrice": 0,
            "sellingPrice": 50,
            "productName": "Akfix",
            "productCode": "00110000074"
          },
          {
            "id": 304,
            "invoiceId": 91,
            "productId": 75,
            "dateCreated": "2021-04-17T10:54:17.000Z",
            "quantity": 2,
            "purchasePrice": 0,
            "sellingPrice": 50,
            "productName": "Modge Podge",
            "productCode": "00110000075"
          },
          {
            "id": 305,
            "invoiceId": 91,
            "productId": 76,
            "dateCreated": "2021-04-17T10:54:26.000Z",
            "quantity": 2,
            "purchasePrice": 0,
            "sellingPrice": 50,
            "productName": "3D Paste",
            "productCode": "00110000076"
          }
        ],
        "date": "2021/04/17",
        "total": "495.00"
      },
      "client": {
        "name": "John Doe",
        "contactNumber": "N/A",
        "emailAddress": "N/A"
      },
      "shop": {
        "name": "Cookie Co. - The Cookie People",
        "contactNumber": "N/A",
        "emailAddress": "N/A"
      }
    };

    let doc = ReplyPDF.generateDocument({
      data: data,
      template: template,
      debug: true,
    });

    doc.pipe(fs.createWriteStream('examples/outputs/output-invoice-example.pdf'));
    doc.end();
  }
}