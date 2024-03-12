import { android, ios, arch } from "../../assets/images";

const Announcement = () => {
  return (
    <>
      <section className=" py-32 flex flex-col items-center justify-center mx-auto  bg-gray-100 ">
        <div className="flex flex-col items-center space-y-12 justify-center mx-auto  ">
          <h2 className="text-3xl text-gray-950 font-bold md:text-5xl">
            Coming Soon
          </h2>
          <div className="flex flex-row justify-between max-w-96 mx-auto gap-4">
            <div>
              <img
                src={android}
                alt="android"
                className="w-44 rounded-md h-full object-cover"
              />
            </div>
            <div>
              {" "}
              <img src={ios} alt="ios" className="object-cover w-44 h-full" />
            </div>
          </div>
        </div>
      </section>
      <div className=" w-full  -mt-32">
        <img src={arch} className="object-contain w-full" />
      </div>
    </>
  );
};

export default Announcement;
