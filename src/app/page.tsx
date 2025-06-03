import PageContainer from "@/components/layout/page-container";
import HomeCTA from "./(home)/cta";
import HomeHero from "./(home)/hero";
import HomeFeatured from "./(home)/featured";
import HomeMostRecent from "./(home)/most-recent";

export default function Home() {
  return (
    <PageContainer>
      <HomeHero />
      <HomeFeatured />
      <HomeMostRecent />
      <HomeCTA />
    </PageContainer>
  );
}
