import HeroSlider from "@/components/home/hero-slider";
import ServicesSection from "@/components/home/services-section";
import NewsSection from "@/components/home/news-section";
import PublicationsSection from "@/components/home/publications-section";
import QuickLinksSection from "@/components/home/quick-links-section";
import ContactSection from "@/components/home/contact-section";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <ServicesSection />
      <NewsSection />
      <PublicationsSection />
      <QuickLinksSection />
      <ContactSection />
    </div>
  );
};

export default Home;
