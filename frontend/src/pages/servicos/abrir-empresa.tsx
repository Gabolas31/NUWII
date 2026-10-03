import Head from "next/head";
import { AberturaPage } from "@/components/pages/servicos";
import { getServiceBySlug } from "@/lib";

export default function Page() {
  const service = getServiceBySlug("abrir-empresa")!;
  return (
    <>
      <Head>
        <title>Abrir Empresa em Salvador · CNPJ a partir de R$ 350 | NUWII</title>
        <meta content={service.shortDescription} name="description" />
      </Head>
      <AberturaPage />
    </>
  );
}
