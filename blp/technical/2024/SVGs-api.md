# SVGs APIs specification
by Dr Giuseppe Maggiore

## Introduction
The new editor renders images all together and in a streaming fashion. This means that we need positioning information ahead of time in order to be able to jump to the right position on the screen even before all images are loaded, as well as loading the images and thumbnails one by one.

We also want the fastest possible loading experience for our end users, meaning that we need client-controlled pagination for all endpoints.

Finally, we want to use SVG images for native rendering quality without compression artifacts.


## Data structure
The underlying (virtual) data structure will have the following entities:


```ts
type Document = {
  id:Guid
  name:string,
  numPages:number,
}

type Page = {
  id:Guid
  position:number,
  width:string,
  height:string,
  SVGBase64:string,
  thumbnailBase64:string
}
```

with only one `1-N` relation:

```ts
type DocumentPages = {
  document:Document,
  pages:Array<Page>
}
```

## Dataflow
The recommended dataflow is as follows:

```
process(p:PDF, docId:GUID) =>
  pages = PDF2SVG(p)
  docId = save-doc({
    name:p.name,
    numPages:pages.length
  }) // add document to database
  for (p,i) in pages
    OCR(page)
    pageId = save-page({
      position:i,
      width:p.width,
      height:p.height,
      SVGBase64:p.toBase64,
      thumbnailBase64:p.resize(300x300).toBase64
    }) // add page to database
    link-doc-page(docId, pageId) // link document to page entities in database
```

## API
The frontend will perform the following calls for optimal user experience:

```ts
await getPageSizes() // prepare the size of the canvas, create placeholders for thumbnails
await getFirstPage() // show the first page asap for optimal user perception
await parallel(streamThumbnails(), streamPages()) // get all thumbnails and pages in streaming with pagination
```

The recommended API is just one endpoint in OData-style. All required functionality would already be available, including all that is needed for streaming and pagination.

> This means that with an OData query generator, _no work needs to be done at all_ as long as the data is neatly saved in the database.

### Filter
Use the `filter` operator to lookup a specific document 

```
serviceRoot/Documents?$filter=id eq '...'
```

### Select on document
Use the `select` operator to pick the necessary fields. The number of pages in particular is needed right away:

```
serviceRoot/Documents?
  $filter=id eq '...'
  & $select=numPages 
```

### Expand on pages
Use the `expand` operator to get all pages for the document:

```
serviceRoot/Documents?
  $filter=id eq '...'
  & $select=numPages 
  & $expand=Pages
```

### Select page sizes and order by page sequence
The first query we need contains all page sizes, and neatly orders the pages by sequence

```
serviceRoot/Documents?
  $filter=id eq '...'
  & $select=numPages 
  & $expand=Pages(
    $select=position, width, height
    & $orderby=position
  )
```

This OData query will give us all pages, ordered by `position`, with `width` and `height`. The big base64 columns are not included, meaning that this query will be quite light to run.

> **Note: this is the first actual endpoint that will be invoked by the frontend.**

### Optional: pagination
We could also add `top` and `skip` if we want to enable pagination for very large documents.

```
serviceRoot/Documents?
  $filter=id eq '...'
  & $select=numPages 
  & $expand=Pages(
    $select=position, width, height
    & $orderby=position
    & $skip=...
    & $top=...
  )
```

### Get paginated thumbnails
We can easily define the query that will give us the paginated thumbnails:

```
serviceRoot/Documents?
  $filter=id eq '...'
  & $select=numPages 
  & $expand=Pages(
    $select=position, width, height, thumbnailBase64
    & $orderby=position
    & $skip=...
    & $top=...
  )
```

> **Note: this is the second actual endpoint that will be invoked by the frontend.**

### Get individual pages
We can now define the query that will give us the individual pages:

```
serviceRoot/Documents?
  $filter=id eq '...'
  & $select=numPages 
  & $expand=Pages(
    $select=position, SVGBase64
    & $filter=position eq '...'
  )
```

> **Note: this is the third actual endpoint that will be invoked by the frontend when loading the first page.**

### Get paginated pages
We can finally define the query that will give us the pages, paginated:

```
serviceRoot/Documents?
  $filter=id eq '...'
  & $select=numPages 
  & $expand=Pages(
    $select=position, SVGBase64
    & $orderby=position
    & $skip=...
    & $top=...
  )
```

> **Note: this is the final actual endpoint that will be invoked by the frontend.**

## Compression
For serving SVG files, data compression in the backend is strongly recommended. SVGs are text and as such compress very well with gzip or similar, saving lots of bandwidth and requiring little computational power.

**Do not serve raw uncompressed SVGs from the endpoints**.

## Pragmatic considerations about OData
We do not need to build an OData generator directly, but it is good to have a good and proven model as the basis for a solid architecture.

As an alternative to OData, we can:
- hardcode support for the OData syntax of endpoints in order to stop the proliferation of custom standards
- hardcode the semantic structure for the endpoints along the lines of OData in order to use a proven semantic model

Building the OData endpoint is, of course, also possible, and remains the recommended path.

## Conclusion
In order to implement the optimal user experience, we need for the OCR process to adopt and expose SVGs, and we need for the API to be expanded for optimal high performance, streaming consumption.

This can be done with one single OData (-like) endpoint with customization through the query parameters.
