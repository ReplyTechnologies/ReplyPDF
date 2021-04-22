## EasyDocs

![BADGE_NPM_DOWNLOADS](https://img.shields.io/npm/dw/reply-pdf) ![BADGE_NPM_VERSION](https://img.shields.io/npm/v/reply-pdf) ![BADGE_NPM_LICENCE](https://img.shields.io/npm/l/reply-pdf) [![BADGE_PAYPAL](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=BVBKNU8NHN2UN)


![BADGE_NPM_DOWNLOADS](https://img.shields.io/npm/dt/jszpl?color=purple) ![BADGE_NPM_DOWNLOADS](https://img.shields.io/npm/dw/jszpl) ![BADGE_NPM_VERSION](https://img.shields.io/npm/v/jszpl) ![BADGE_NPM_LICENCE](https://img.shields.io/npm/l/jszpl) [![BADGE_PAYPAL](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=BVBKNU8NHN2UN)

<img src="./resources/process_infographic.svg" alt="Process Infographic"  />

### About

If you ever had to create a PDF document you would be familiar with the struggles to get headers, footers, and tables to layout correctly. This library aims to remove the complexity of creating PDF documents.

### Under the Hood

[PDFKit](https://pdfkit.org): renders native elements to the PDF document.

[SVG-To-PDFKit](https://www.npmjs.com/package/svg-to-pdfkit): renders SVG images to the PDF document.

### Components

![component_hierarchy](./resources/component_hierarchy.svg)

#### BaseComponent

[BaseComponent](./src/components/base-component.js) registers properties and functions shared by all components

Hierarchy: `BaseComponent`

| Property  | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| `binding` | string | Property of the provided data object to use as data source for bindings |
| `debug`   | bool   | Indicates whether the component should render rectangles for outline and margin |

#### BaseLayoutComponent

[BaseLayoutComponent](./) registers properties and functions shared by all components that have a physical layout on the document.

Hierarchy: `BaseComponent / BaseLayoutComponent`

| Property            | Type            | Description                                  |
| ------------------- | --------------- | -------------------------------------------- |
| `width`             | number          | Width available to render content            |
| `height`              | number          | Height available to render content           |
| `x`                   | number          | Horizontal content offset                    |
| `y`                   | number          | Vertical content offset                      |
| `margin`              | [Offset](./)    | Content inset from provided width and height |
| `border`              | [Border](./)    | Border to draw around component              |
| `verticalAlignment`   | [Alignment](./) | Vertical alignment within parent component   |
| `horizontalAlignment` | [Alignment](./) | Horizontal alignment within parent component |
| `backgroundColor`     | string          | Color of background fill           |
| `link`                | string          | Link to navigate to on click                 |

#### BaseContainerComponent

[BaseContainerComponent](./) registers properties and functions shared by all components that contain explicit child elements.

Hierarchy: `BaseComponent / BaseLayoutComponent / BaseContainerComponent`

| Property | Type        | Description                            |
| -------- | ----------- | -------------------------------------- |
| `children` | [[BaseComponent](./)] | Array of children to render as content |

#### BaseTextComponent

[BaseTextComponent]() registers properties and functions shared by all text oriented components.

Hierarchy: `BaseComponent / BaseLayoutComponent / BaseTextComponent`

| Property      | Type              | Description                                                  |
| ------------- | ----------------- | ------------------------------------------------------------ |
| `text`          | string            | Text to render as content                                    |
| `textAlignment` | [TextAlignment]() | Text alignment of content                                    |
| `fontSize`      | number            | Font size of rendered text                                   |
| `fontFamily`    | string            | Font family of rendered text                                 |
| `fontWeight`    | [FontWeight]()    | Font weight of rendered text                                 |
| `lineBreak`     | bool              | Indicates whether text is allowed to span <br />multiple lines |
| `ellipsis`      | string            | Indicates the character(s) to append to the end of a string when `lineBreak` is set to false and the text tries to wrap into the next line |

#### Container

[Container]() provides functionality to render child components according to the values of their respective `verticalAlignment` and `horizontalAlignment` values. 

Hierarchy: `BaseComponent / BaseLayoutComponent / BaseContainerComponent / Component`

**Example**

[Go to usage example]()

```javascript
// example of code
```

// example of rendering result

#### Page

[Page]() should always be the base component of a template. Page functions similar to a Container, whereas multiple child are supported, and components are positioned according their respective `verticalAlignment` and `horizontalAlignment` property values.

Hierarchy: `BaseComponent / BaseLayoutComponent / BaseContainerComponent / Page`

| Property          | Type              | Description                                           |
| ----------------- | ----------------- | ----------------------------------------------------- |
| `header`          | [BaseComponent]() | Component template to render as header                |
| `footer`          | [BaseComponent]() | Component template to render as footer                |
| `firstPageHeader` | [BaseComponent]() | Component template to render as header for first page |
| `size`            | [Size]()          | Defines the page size                                 |

**Example**

[Go to usage example]()

```js
// example of code
```

// example of rendering result

#### StackHorizontal

[StackHorizontal]() provides functionality to layout its children horizontally. StackHorizontal is sized automatically according to the size of its children.

Hierarchy: `BaseComponent / BaseLayoutComponent / BaseContainerComponent / StackHorizontal`

**Example**

[Go to usage example]()

```js
// example of code
```

// example of rendering result

#### StackVertical

[StackVertical]() provides functionality to layout its children vertically. StackVertival is sized automatically according to the size of its children.

Hierarchy: `BaseComponent / BaseLayoutComponent / BaseContainerComponent / StackVertical`

**Example**

[Go to usage example]()

```js
// example of code
```

// example of rendering result

#### Text

[Text]() provides functionality to render text to the document.

Hierarchy: `BaseComponent / BaseLayoutComponent / BaseTextComponent / Text`

| Property        | Type          | Description                                                  |
| --------------- | ------------- | ------------------------------------------------------------ |
| `linkStyle`     | object        | Style to apply to text if value of `link` is present         |
| `color`         | string        | Text color                                                   |
| `underline`     | bool          | Indicates whether the text should be underlined              |
| `strikethrough` | bool          | Indicates whether the text should be striked                 |
| `italic`        | bool / number | Indicates whether text should be rendered at an angle, uses a specific angle if `italic` is set to a number |

**Example**

[Go to usage example]()

```js
// example of code
```

// example of rendering result

#### Image

[Image]() provides functionality to render an image from a file, string (SVG), buffer, or URL.

Hierarchy: `BaseComponent / BaseLayoutComponent / Image`

| Property  | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| `source`  | string \| Buffer | Image source to render                                       |
| `stretch` | bool             | Indicates whether the image should be stretched to the provided `width` and `height` |

**Example**

[Go to usage example]()

```js
// example of code
```

// example of rendering result

#### RepeatVertical

[RepeatVertical]() provides functionality to repeat a template for each value of a provided binding array. RepeatVertical requests new pages when its component generation functionality reaches the end of a page.

Hierarchy: `BaseComponent / BaseLayoutComponent / RepeatVertical`

| Property   | Type              | Description        |
| ---------- | ----------------- | ------------------ |
| `template` | [BaseComponent]() | Template to render |

**Example**

[Go to usage example]()

```js
// example of code
```

// example of rendering result

#### Table

[Table]() provides functionality to render a table to the document. Table requests new pages when its component generation functionality reaches the end of a page.

Hierarchy: `BaseComponent / BaseLayoutComponent / Table`

| Property               | Type         | Description                                           |
| ---------------------- | ------------ | ----------------------------------------------------- |
| `headerStyle`          | object       | Style to apply to header cells                        |
| `cellStyle`            | object       | Style to apply to content cells                       |
| `alternativeCellStyle` | object       | Style override to apply to content cells of even rows |
| `columns`              | [[Column]()] | Defines table columns and data bindings               |

**Example**

[Go to usage example]()

```js
// example of code
```

// example of rendering result

### Properties

sda

### Component Lifecycle

asdf

### Custom Fonts

asdf

### Header

asdf

### Footer

aasdf

### Charts

Charts can be included into the PDF document by including the chart as an image. Chart images can be generated by using some of the chart-to-image services listed below:

- Image Charts (https://www.image-charts.com/)
- Quick Chart (https://quickchart.io/)
- Chart Works (https://www.chartworks.io/charts/image)

An example of including a chart into a PDF can be found [here](link/to/chart-example.js).

### Pitfalls

Components that do not request new pages when content tries to overflow will continue to render content on the same page. The content of these components should ideally be assigned fixed sizes to prevent rendering content off of the page or flow into the footer section.

### Roadmap

#### General Enhancements

Functionality to keep track of rendered templates in order to prevent rendering duplicate content when a document with multiple pages is created.

Add functionality to render content of StackVertical onto a new page when it overflows.

#### New Components

*StackGridHorizontal*: Layout children horizontally to fill available space, then move down and restart layout

*StackGridVertical*: Layout children vertically to fill available space, then move right and restart layout

*Barcode*: Render a barcode to the document

*PageBreak*: Continue content rendering on a new page

#### Component Enhancements

| Component | Enhancements                                                 |
| --------- | ------------------------------------------------------------ |
| [Table]() | - Render column content based on a template, currently renders all cells as text<br />- Configuration to prevent reprinting of header on new pages |

