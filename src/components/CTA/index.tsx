import { rav4 } from "../../assets/images";
import SubscribeForm from "../SubscribeForm";

const CTA = () => {
  return (
    <section className="w-full h-[20rem] md:mt-32 bg-primary overflow-x-clip">
      <div className=" relative flex flex-row w-full h-full max-w-6xl mx-auto  ">
        <div className="flex md:items-start items-center w-full md:w-auto">
          <div className="mx-4 flex flex-col w-full h-full items-center justify-center gap-8 ">
            <p className="text-white text-center">NewsLetter</p>
            <h3 className="text-white font-bold text-3xl max-w-mdtext-center leading-tight">
              {" "}
              Subscribe To Our NewsLetter For Updates
            </h3>

            <SubscribeForm />
          </div>
        </div>
        <img
          className="hidden absolute h-[30rem] md:block -right-[22rem] -top-[10rem]"
          src={rav4}
          alt="jeep"
        ></img>
      </div>
    </section>
  );
};

export default CTA;
