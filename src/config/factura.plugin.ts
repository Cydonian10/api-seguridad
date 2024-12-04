import { create } from "xmlbuilder2";

export function generarFacturaXML(data: any) {

    const R = [{name: 'foo1', sku: 'bar1'}, {name:'foo2', sku: 'bar2'}];
let xml = create({ version: '1.0', encoding: "UTF-8"})
    .ele('ListingDataFeed')
    .ele('Listings');
for(let i = 0; i<R.length;i++){
 xml.ele("Listing")
    .ele("listingId: ", `${R[i].sku}`).up()
    .ele('Title').dat(`${R[i].name}`).up().up();
        //rest of your code
}

       return xml.end({ prettyPrint: true });
}
