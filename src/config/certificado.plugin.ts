import { asn1, pkcs12, pki } from "node-forge";
import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

export class CertificateReader {

  public readCertificate(filePath: string, password: string) {
    try {
      let privateKey: string | null = null;
      let certificate: string | null = null;

      // Leer el archivo PFX
      const pfx = fs.readFileSync(path.resolve(cwd(), filePath));

      // Parsear el archivo a formato ASN.1
      const p12Asn1 = asn1.fromDer(pfx.toString("binary"));

      // Parsear el PKCS#12
      const p12 = pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

      // Extraer certificado y clave privada
      p12.safeContents.forEach((safeContent) => {
        safeContent.safeBags.forEach((safeBag: any) => {
          if (safeBag.type === pki.oids.certBag) {
            certificate = pki.certificateToPem(safeBag.cert);
          }
          if (safeBag.type === pki.oids.pkcs8ShroudedKeyBag) {
            privateKey = pki.privateKeyToPem(safeBag.key);
          }
        });
      });

      // Validar si se encontraron datos
      if (!certificate || !privateKey) {
        throw new Error(
          "No se pudo encontrar el certificado o la clave privada en el archivo PFX."
        );
      }

      return { certificate, privateKey };
    } catch (error) {
      console.error("Error al leer el certificado:");
      throw error;
    }
  }
}




// import { asn1, pkcs12, pki } from "node-forge"
// import fs from "node:fs"
// import path from "node:path"
// import { cwd } from "node:process";


// export function readCertifate() {

//     let privateKey = null;
//     let certificate = null;

//     const pfx = fs.readFileSync(path.resolve(cwd(), "src/files/demo_certificado.pfx"))
//     const password = '12345678'
    
//     const p12Asn1 = asn1.fromDer(pfx.toString('binary'))

//     const p12 = pkcs12.pkcs12FromAsn1(p12Asn1,false,password)

//     p12.safeContents.forEach(safeContent => {
//         safeContent.safeBags.forEach((safeBag:any) => {
//           // Buscar el certificado
//           if (safeBag.type === pki.oids.certBag) {
//             certificate = pki.certificateToPem(safeBag.cert);
//           }
//           // Buscar la clave privada
//           if (safeBag.type === pki.oids.pkcs8ShroudedKeyBag) {
//             privateKey = pki.privateKeyToPem(safeBag.key);
//           }
//         });
//       });
      
//     console.log("Certificado en formato PEM:\n", certificate);
//     console.log("Clave Privada en formato PEM:\n", privateKey);
// }
