import Head from "next/head";
import { CertificadoPage } from "@/components/pages/servicos";
import { getServiceBySlug } from "@/lib";

export default function Page() {
  const service = getServiceBySlug("certificado-digital")!;
  return (
    <>
      <Head>
        <title>Certificado Digital e-CPF e e-CNPJ a partir de R$ 149 | NUWII</title>
        <meta name="description" content={service.shortDescription} />
      </Head>
      <CertificadoPage />
    </>
  );
}
