import * as fs from 'fs';
import { Container, Page, Table, Text } from '../components/index.js';
import { PageSize, Offset, TextAlignment, FontWeight, Border, BorderSide, Alignment } from '../components/properties/index.js';
import { EasyDocs } from '../easy-docs.js';

export default {
  generate() {
    const template = new Page({
      size: PageSize.A4,
      margin: new Offset({
        left: 50,
        top: 50,
        right: 50,
        bottom: 50,
      }),
      header: new Container({
        height: 50,
        children: [
          new Text({
            text: 'Sample PDF document - Table',
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
            textAlignment: TextAlignment.right,
            text: 'Page {{pageNumber}} of {{pageCount}}',
          }),
        ],
      }),
      children: [
        new Table({
          binding: 'tableValues',
          border: new Border(new BorderSide({ thickness: 1 })),
          headerStyle: {
            backgroundColor: 'green',
            fontWeight: FontWeight.bold,
            border: new Border({
              left: new BorderSide({ thickness: 1 }),
              right: new BorderSide({ thickness: 1 }),
              bottom: new BorderSide({ thickness: 1 }),
            }),
          },
          cellStyle: {
            backgroundColor: 'purple',
            color: 'cyan',
          },
          alternativeCellStyle: {
            backgroundColor: 'cyan',
            color: 'purple',
          },
          columns: [
            {
              property: 'id',
              width: 50,
              text: '#',
              headerStyle: {
                textAlignment: TextAlignment.center,
                backgroundColor: 'orange',
                fontWeight: FontWeight.normal,
                fontSize: 20,
                border: new Border({
                  right: new BorderSide({
                    thickness: 1
                  }),
                  bottom: new BorderSide({
                    thickness: 1
                  }),
                }),
              },
              cellStyle: {
                textAlignment: TextAlignment.center,
                backgroundColor: 'red',
                color: 'yellow',
                border: new Border({
                  right: new BorderSide({
                    thickness: 1,
                  }),
                }),
              },
              alternativeCellStyle: {
                backgroundColor: 'pink',
                color: 'yellow',
                border: new Border({
                  right: new BorderSide({
                    thickness: 1,
                  }),
                }),
              }
            },
            {
              property: 'invoice_id',
              text: 'Invoice',
              fx: (index, record, value) => {
                return '#' + value.toString().padStart(6, '0');
              },
            },
            {
              property: 'date_created',
              width: 100,
              text: 'Date',
            },
            {
              property: 'amount',
              width: 70,
              headerStyle: {
                textAlignment: TextAlignment.right,
                border: new Border({
                  left: new BorderSide({
                    thickness: 1
                  }),
                  bottom: new BorderSide({
                    thickness: 1
                  }),
                }),
              },
              cellStyle: {
                textAlignment: TextAlignment.right,
              },
              text: 'Amount',
              fx: (index, record, value) => {
                return value.toFixed(2);
              }
            }
          ]
        }),
      ],
    });

    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(i);
    }

    const data = {
      sampleText: 'hi :-)',
      arrayValues: array,
      tableValues: [{ "id": 12, "invoice_id": 23, "user_id": 1, "date_created": "2021-04-09T05:54:03.000Z", "payment_method": "card", "amount": 60, "cancelled": true }, { "id": 13, "invoice_id": 28, "user_id": 1, "date_created": "2021-04-09T06:10:54.000Z", "payment_method": "cash", "amount": 50, "cancelled": false }, { "id": 14, "invoice_id": 36, "user_id": 1, "date_created": "2021-04-09T07:55:10.000Z", "payment_method": "cash", "amount": 610, "cancelled": false }, { "id": 15, "invoice_id": 20, "user_id": 2, "date_created": "2021-04-09T08:26:14.000Z", "payment_method": "card", "amount": 270, "cancelled": false }, { "id": 16, "invoice_id": 38, "user_id": 1, "date_created": "2021-04-09T08:26:26.000Z", "payment_method": "cash", "amount": 60, "cancelled": false }, { "id": 17, "invoice_id": 39, "user_id": 1, "date_created": "2021-04-09T08:37:57.000Z", "payment_method": "cash", "amount": 90, "cancelled": false }, { "id": 18, "invoice_id": 43, "user_id": 2, "date_created": "2021-04-09T09:33:35.000Z", "payment_method": "cash", "amount": 610, "cancelled": false }, { "id": 19, "invoice_id": 47, "user_id": 2, "date_created": "2021-04-09T09:38:51.000Z", "payment_method": "cash", "amount": 20, "cancelled": false }, { "id": 20, "invoice_id": 21, "user_id": 2, "date_created": "2021-04-09T09:47:41.000Z", "payment_method": "card", "amount": 410, "cancelled": false }, { "id": 21, "invoice_id": 39, "user_id": 2, "date_created": "2021-04-09T09:48:44.000Z", "payment_method": "cash", "amount": 90, "cancelled": false }, { "id": 22, "invoice_id": 45, "user_id": 1, "date_created": "2021-04-09T10:19:56.000Z", "payment_method": "card", "amount": 415, "cancelled": false }, { "id": 23, "invoice_id": 34, "user_id": 2, "date_created": "2021-04-09T11:47:21.000Z", "payment_method": "cash", "amount": 100, "cancelled": false }, { "id": 24, "invoice_id": 28, "user_id": 1, "date_created": "2021-04-09T11:50:36.000Z", "payment_method": "cash", "amount": 290, "cancelled": false }, { "id": 25, "invoice_id": 52, "user_id": 2, "date_created": "2021-04-09T12:06:58.000Z", "payment_method": "card", "amount": 395, "cancelled": false }, { "id": 26, "invoice_id": 29, "user_id": 1, "date_created": "2021-04-09T12:31:45.000Z", "payment_method": "card", "amount": 525, "cancelled": false }, { "id": 27, "invoice_id": 50, "user_id": 1, "date_created": "2021-04-09T12:34:24.000Z", "payment_method": "card", "amount": 280, "cancelled": false }, { "id": 28, "invoice_id": 50, "user_id": 1, "date_created": "2021-04-09T12:36:09.000Z", "payment_method": "card", "amount": 0, "cancelled": false }, { "id": 29, "invoice_id": 42, "user_id": 1, "date_created": "2021-04-09T12:57:30.000Z", "payment_method": "card", "amount": 270, "cancelled": false }, { "id": 31, "invoice_id": 51, "user_id": 1, "date_created": "2021-04-10T05:32:11.000Z", "payment_method": "card", "amount": 1300, "cancelled": false }, { "id": 32, "invoice_id": 64, "user_id": 2, "date_created": "2021-04-10T05:35:26.000Z", "payment_method": "card", "amount": 55, "cancelled": false }, { "id": 33, "invoice_id": 51, "user_id": 2, "date_created": "2021-04-10T05:42:52.000Z", "payment_method": "card", "amount": 550, "cancelled": false }, { "id": 34, "invoice_id": 70, "user_id": 1, "date_created": "2021-04-10T06:42:09.000Z", "payment_method": "card", "amount": 0, "cancelled": false }, { "id": 35, "invoice_id": 30, "user_id": 1, "date_created": "2021-04-10T07:01:03.000Z", "payment_method": "card", "amount": 750, "cancelled": false }, { "id": 36, "invoice_id": 60, "user_id": 3, "date_created": "2021-04-10T07:44:40.000Z", "payment_method": "card", "amount": 1310, "cancelled": false }, { "id": 37, "invoice_id": 71, "user_id": 1, "date_created": "2021-04-10T08:09:18.000Z", "payment_method": "card", "amount": 200, "cancelled": false }, { "id": 38, "invoice_id": 54, "user_id": 1, "date_created": "2021-04-10T08:11:21.000Z", "payment_method": "card", "amount": 305, "cancelled": false }, { "id": 39, "invoice_id": 65, "user_id": 1, "date_created": "2021-04-10T08:13:02.000Z", "payment_method": "card", "amount": 805, "cancelled": false }, { "id": 40, "invoice_id": 57, "user_id": 1, "date_created": "2021-04-10T08:16:22.000Z", "payment_method": "cash", "amount": 175, "cancelled": false }, { "id": 41, "invoice_id": 58, "user_id": 1, "date_created": "2021-04-10T08:17:56.000Z", "payment_method": "card", "amount": 400, "cancelled": false }, { "id": 42, "invoice_id": 32, "user_id": 1, "date_created": "2021-04-10T08:18:47.000Z", "payment_method": "card", "amount": 2125, "cancelled": false }, { "id": 43, "invoice_id": 55, "user_id": 1, "date_created": "2021-04-10T08:20:34.000Z", "payment_method": "card", "amount": 190, "cancelled": false }, { "id": 44, "invoice_id": 56, "user_id": 1, "date_created": "2021-04-10T08:21:55.000Z", "payment_method": "card", "amount": 155, "cancelled": false }, { "id": 45, "invoice_id": 68, "user_id": 1, "date_created": "2021-04-10T08:23:58.000Z", "payment_method": "card", "amount": 190, "cancelled": false }, { "id": 46, "invoice_id": 46, "user_id": 1, "date_created": "2021-04-10T08:25:35.000Z", "payment_method": "card", "amount": 855, "cancelled": false }, { "id": 47, "invoice_id": 31, "user_id": 1, "date_created": "2021-04-10T08:27:56.000Z", "payment_method": "card", "amount": 655, "cancelled": false }, { "id": 48, "invoice_id": 48, "user_id": 1, "date_created": "2021-04-10T08:28:23.000Z", "payment_method": "card", "amount": 200, "cancelled": false }, { "id": 49, "invoice_id": 61, "user_id": 1, "date_created": "2021-04-10T08:29:22.000Z", "payment_method": "card", "amount": 265, "cancelled": false }, { "id": 50, "invoice_id": 72, "user_id": 1, "date_created": "2021-04-10T08:31:23.000Z", "payment_method": "card", "amount": 100, "cancelled": false }, { "id": 51, "invoice_id": 73, "user_id": 1, "date_created": "2021-04-10T08:34:46.000Z", "payment_method": "card", "amount": 390, "cancelled": false }, { "id": 52, "invoice_id": 25, "user_id": 1, "date_created": "2021-04-10T08:41:11.000Z", "payment_method": "cash", "amount": 815, "cancelled": false }, { "id": 53, "invoice_id": 63, "user_id": 1, "date_created": "2021-04-10T08:42:19.000Z", "payment_method": "card", "amount": 540, "cancelled": false }, { "id": 54, "invoice_id": 66, "user_id": 1, "date_created": "2021-04-10T08:46:56.000Z", "payment_method": "card", "amount": 590, "cancelled": false }, { "id": 55, "invoice_id": 27, "user_id": 1, "date_created": "2021-04-10T08:50:26.000Z", "payment_method": "card", "amount": 440, "cancelled": false }, { "id": 56, "invoice_id": 67, "user_id": 1, "date_created": "2021-04-10T08:54:49.000Z", "payment_method": "cash", "amount": 20, "cancelled": false }, { "id": 57, "invoice_id": 41, "user_id": 1, "date_created": "2021-04-12T13:09:18.000Z", "payment_method": "card", "amount": 435, "cancelled": false }, { "id": 58, "invoice_id": 62, "user_id": 1, "date_created": "2021-04-12T13:10:44.000Z", "payment_method": "card", "amount": 350, "cancelled": false }, { "id": 59, "invoice_id": 59, "user_id": 1, "date_created": "2021-04-12T13:16:28.000Z", "payment_method": "cash", "amount": 210, "cancelled": false }, { "id": 30, "invoice_id": 59, "user_id": 1, "date_created": "2021-04-10T04:49:31.000Z", "payment_method": "cash", "amount": 210, "cancelled": true }, { "id": 60, "invoice_id": 76, "user_id": 4, "date_created": "2021-04-13T08:50:40.000Z", "payment_method": "card", "amount": 900, "cancelled": false }]
    };

    let doc = EasyDocs.generateDocument({
      data: data,
      template: template,
      debug: true,
    });

    doc.pipe(fs.createWriteStream('output-table-example.pdf'));
    doc.end();
  }
}
