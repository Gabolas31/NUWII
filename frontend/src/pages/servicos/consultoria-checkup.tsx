import Head from "next/head";
import { ServiceDetailPage } from "@/components/pages/servicos";
import { getServiceBySlug } from "@/lib";

export default function Page() {
  const service = getServiceBySlug("consultoria-checkup")!;
  return (
    <>
      <Head>
        <title>{service.title} | Serviços NUWII</title>
        <meta name="description" content={service.shortDescription} />
      </Head>
      <ServiceDetailPage service={service} />
    </>
  );
}
