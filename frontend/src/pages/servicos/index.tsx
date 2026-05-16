import Head from "next/head";
import { ServicesPage } from "@/components/pages/servicos";

export default function Page() {
  return (
    <>
      <Head>
        <title>Serviços | NUWII</title>
        <meta
          name="description"
          content="Conheça os serviços da NUWII: consultoria contábil, escritório virtual, regularização e mais. Soluções sob medida pra cada momento da sua empresa."
        />
      </Head>
      <ServicesPage />
    </>
  );
}
