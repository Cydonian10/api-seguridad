import { CertificateReader } from "@src/config/certificado.plugin"
import { generarFacturaXML } from "@src/config/factura.plugin"
import { Request, Response } from "express"
import { SignedXml } from "xml-crypto"

interface Inject {
    certificateReader:CertificateReader
}

export class FacturaController {

    private certificateReader: CertificateReader

    constructor({certificateReader}:Inject) {
        this.certificateReader = certificateReader
    }

    getFactuas = () => {}

    generarFacturas = (_req:Request, res:Response) => {

        const path =  "src/files/demo_certificado.pfx"
        const password = '12345678'   
        
        const { certificate,privateKey } = this.certificateReader.readCertificate(path, password)

        console.log("Certificado en formato PEM:\n", certificate);
        console.log("Clave Privada en formato PEM:\n", privateKey);

        const facturaData = {
            UBLVersionID: '2.1',
            CustomizationID: '2.0',
            ProfileID: {
              '@schemeName': 'SUNAT:Identificador de Tipo de Operación',
              '#text': '0101' // Ejemplo: Venta interna
            },
            ID: 'F001-12345678', // Serie y número de comprobante
            IssueDate: '2024-11-12', // Fecha de emisión
            IssueTime: '10:30:00', // Hora de emisión (opcional)
            DueDate: '2024-12-12', // Fecha de vencimiento (opcional)
            InvoiceTypeCode: {
              '@listAgencyName': 'PE:SUNAT',
              '@listName': 'SUNAT:Identificador de Tipo de Documento',
              '@listURI': 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01',
              '#text': '01' // 01 es código para factura
            },
            Note: {
              '@languageLocaleID': '1000',
              '#text': 'Gracias por su compra.' // Leyenda opcional
            },
            DocumentCurrencyCode: {
              '@listID': 'ISO 4217 Alpha',
              '@listName': 'Currency',
              '@listAgencyName': 'United Nations Economic Commission for Europe',
              '#text': 'PEN' // Código de moneda en soles
            },
            LineCountNumeric: 1, // Cantidad de ítems en la factura
            InvoicePeriod: {
              StartDate: '2024-11-01' // Fecha de inicio de ciclo de facturación
            }
          };
          

        // Generar el XML
        const facturaXML = generarFacturaXML(facturaData);

        const sig = new SignedXml();
        // sig.addReference(
        //     "//*[local-name(.)='Invoice']", // Nodo que se firma (e.g., <Invoice>)
        //     ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"], // Transformaciones
        //     "http://www.w3.org/2001/04/xmlenc#sha256" // Algoritmo de digestión
        //   );
        // sig.signingKey = privateKey;
        // sig.keyInfoProvider
        // sig.computeSignature(facturaXML);
        const signedXml = sig.getSignedXml();


        return res.json({
            message:"Generando la facturas"
        })
    }
}