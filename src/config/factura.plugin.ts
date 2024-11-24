import { create } from "xmlbuilder2";

// Función para construir el XML
export function generarFacturaXML(data:any) {
    const doc = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('Invoice', { 
        xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
        'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
        'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
        'xmlns:ext': 'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2'
        })
        .ele('ext:UBLExtensions')
        .ele('ext:UBLExtension')
            .ele('ext:ExtensionContent')
            .ele('ds:Signature').up() // Firma digital (vacío en este ejemplo)
            .up().up().up()
        .up();

    // Información de la factura
    doc.ele('cbc:UBLVersionID').txt(data.UBLVersionID).up()
        .ele('cbc:CustomizationID').txt(data.CustomizationID).up()
        .ele('cbc:ProfileID', data.ProfileID['@schemeName']).txt(data.ProfileID['#text']).up()
        .ele('cbc:ID').txt(data.ID).up()
        .ele('cbc:IssueDate').txt(data.IssueDate).up()
        .ele('cbc:IssueTime').txt(data.IssueTime).up()
        .ele('cbc:DueDate').txt(data.DueDate).up()
        .ele('cbc:InvoiceTypeCode', {
        'listAgencyName': data.InvoiceTypeCode['@listAgencyName'],
        'listName': data.InvoiceTypeCode['@listName'],
        'listURI': data.InvoiceTypeCode['@listURI']
        }).txt(data.InvoiceTypeCode['#text']).up()
        .ele('cbc:Note', { 'languageLocaleID': data.Note['@languageLocaleID'] }).txt(data.Note['#text']).up()
        .ele('cbc:DocumentCurrencyCode', {
        'listID': data.DocumentCurrencyCode['@listID'],
        'listName': data.DocumentCurrencyCode['@listName'],
        'listAgencyName': data.DocumentCurrencyCode['@listAgencyName']
        }).txt(data.DocumentCurrencyCode['#text']).up()
        .ele('cbc:LineCountNumeric').txt(data.LineCountNumeric).up();

    // Agregar `cac:InvoicePeriod` con `cbc:StartDate`
    doc.ele('cac:InvoicePeriod')
        .ele('cbc:StartDate').txt(data.InvoicePeriod.StartDate).up()
        .up();

    // Convertir el XML a string y retornar
    return doc.end({ prettyPrint: true });
    }