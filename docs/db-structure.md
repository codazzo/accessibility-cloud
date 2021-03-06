# Collections and Schemas

This document summarizes the most relevant collections and their formats for discussion. This document might have diverged from the implementation. If in doubt the SimpleSchemas defined in `/both/api/*` collections win.

## sources
```
source = {
  organizationId : "12346abc",
  licenseId   : "12346abc",
  languageId  : "12346abc",

  name: {
      de: "FourSquare Daten Weltweite",
      en: "FourSquare Data Collection",
  }
  description: {
      'de-AT': "",
      'en': "This is a data set that has some properties etc.",
  }
  originWebsite:  "http://.../Foursquare_WheelMap_Venues_5.26.16.csv",

  primaryRegion : "New York, USA",

  sampleData: "", //

  streamChain: [
    {
      "type": "httpDownload",
      "parameters" : {
        sourceUrl: "http://.../Foursquare_WheelMap_Venues_5.26.16.csv"
      },
    },
    {
      "type" : "convertCharacterSet",
      "parameters" : {
        from: 'iso-8895-1'
        to: 'utf-8'
      },
    },
    {
      "type" : "parseCSV",
      "parameters" : {

        "separator": "\t",
        "columns"     : true
        "mappings"    : {
            "Id"          : "row['FID']",
            "Name"        : "'Vienna public WC'",
            "Address"     : "row['STRASSE'] + ', Bezirk ' + row['BEZIRK'] + ', Vienna, Austria'",
            //"Latitude"    : "row['SHAPE'] && Number(row['SHAPE'].match(/^POINT \\(([\\d.]+) ([\\d.]+)\\)$/)[2])",
            //"Longitude"   : "row['SHAPE'] && Number(row['SHAPE'].match(/^POINT \\(([\\d.]+) ([\\d.]+)\\)$/)[1])",
            "Latitude"    : "48",
            "Longitude"   : "15",
            //"Accessible"  : "row['KATEGORIE'].includes('Behindertenkabine')"
            "Accessible"  : "true"
        },
      },
    },
  ]
}
## sourceImports

```
sourceImport: {
  // getStatus(),
  _id: "_hotels_import_1"
  sourceId: "_sourceId"
  requestTimestamp: 234234234324,
  requestHeaders: {},
  responseHeaders: {},

  sampleData: "",
  streamHead: "",
  streamTail: "",

  numberOfPlacesAdded= 23423,
  numberOfPlacesModified= 23423,
  numberOfPlacesRemoved= 23423,
  numberOfPlacesUnchanged= 23423,
}
```

## placeInfos

```
placeInfo: {
  _id:"_hotel_adlon",
  sourceId: "_hotelPlaces",
  lastStartedImportId: "_hotel_adlon_import_1",
  data: {
    providedId: "234234", // jaccede-id
    name: "Hotel Adlon",
    accessible: 0.2,
  },
}

## placeImports
```
placeImport: {
  _id: "_hotel_adlon_import_1",
  timestamp: 234234234,
  placeInfoId: "_hotel_adlin",
  sourceImportId: "_hotels_import_1",
}
```

## licenses

```
license: {
  _id: "_ODbLv1.0",
  name: "234234e",
  shortName: "ODbL",
  version: "1.0",
  linkURL: "http://opendatacommons.org/licenses/odbl/",
  fullTextURL: "http://opendatacommons.org/licenses/odbl/1.0/",
  summaryURL: "http://opendatacommons.org/licenses/odbl/summary/",
  summaryText: "",
  consideredAsCC0: false,
  consideredAsCCA: false,
  consideredAsCCSA: true,
}
```