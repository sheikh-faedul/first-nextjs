import Slider from "@/components/slider";
import AboutPage from "./about/page";
import ServicesPage from "./services/page";


export default function Home() {
  return (
    <div>
      <Slider />
      <h1 className="m-5 text-3xl font-bold text-center">About Us</h1>
      <AboutPage/>
      <ServicesPage></ServicesPage>
    </div>
  );
}
