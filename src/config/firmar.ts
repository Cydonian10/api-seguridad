import { SignedXml } from 'xml-crypto';
import fs from 'node:fs';

const xml = "<library>" + "<book>" + "<name>Harry Potter</name>" + "</book>" + "</library>";

export class FirmarXml {

    constructor() {}

    public firmar( privateKey:string, publicCert:string) {
        const sig = new SignedXml({
            privateKey: privateKey,
            publicCert: publicCert
        })

        sig.addReference({
            xpath: "//*[local-name(.)='book']",
            digestAlgorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
            transforms: ["http://www.w3.org/2001/10/xml-exc-c14n#"],
        })

        sig.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
        sig.signatureAlgorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
        sig.computeSignature(xml);
        fs.writeFileSync("signed.xml", sig.getSignedXml());
    }

}


