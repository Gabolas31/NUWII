import { Layout } from "@/components/shared/layout";
import { Hero } from "./hero";
import { Features } from "./features";
import { Stats } from "./stats";
import { Plans } from "./plans";
import { Partners } from "./partners";
import { Reviews } from "./reviews";
import { Referral } from "./referral";

export function HomePage() {
  return (
    <Layout>
      <Hero />
      <Partners />
      <Features />
      <Stats />
      <section id="plans">
        <Plans />
      </section>
      <section id="reviews">
        <Reviews />
      </section>
      <Referral />
    </Layout>
  );
}
