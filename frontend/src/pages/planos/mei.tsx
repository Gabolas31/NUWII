import Head from "next/head";
import { MeiPage } from "@/components/pages/planos";

export default function Page() {
  return (
    <>
      <Head>
        <title>Plano MEI | NUWII</title>
        <meta
          name="description"
          content="Cuidamos do seu MEI do DAS ao IRPF. Pra MEI que quer ficar 100% regular sem dor de cabeça. A partir de R$ 59/mês, sem fidelidade, com atendimento por WhatsApp."
        />
      </Head>
      <MeiPage />
    </>
  );
}
