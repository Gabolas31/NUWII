import Head from "next/head";
import { ContabilidadePage } from "@/components/pages/contabilidade";

export default function Page() {
  return (
    <>
      <Head>
        <title>Contabilidade Completa para Empresas | NUWII</title>
        <meta
          content="Escrituração, impostos, obrigações, folha e nota fiscal com contador responsável e mensalidade fixa. Sem taxa de adesão, sem fidelidade e migração gratuita."
          name="description"
        />
      </Head>
      <ContabilidadePage />
    </>
  );
}
