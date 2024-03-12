import Announcement from "../Announcement";
import CTA from "../CTA";
import Hero from "../Hero";
import HowWorks from "../HowWorks";
import Main from "../Layouts/Main";
import Portfolio from "../Portfolio";

const Home = () => {
  return (
    <Main>
      <>
        <Hero />
        <HowWorks />
        <Portfolio />
        <Announcement />
        <CTA />
      </>
    </Main>
  );
};

export default Home;
