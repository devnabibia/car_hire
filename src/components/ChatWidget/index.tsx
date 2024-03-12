import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const ChatWidget = () => {
  const [isWidget, setIsWidget] = useState<Boolean>(false);
  const [msg, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `https://wa.me/254706338454?text=${msg}`;
    window.open(url, "_blank");
    setIsWidget(false);
  };

  const toggleWidget = () => {
    setIsWidget((prev) => !prev);
  };

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  return (
    <div className="fixed z-40 bottom-24 right-4">
      {isWidget && (
        <div className="relative  right-2 rounded-md -top-4 w-72 h-[14rem] bg-white shadow-lg">
          <span
            onClick={toggleWidget}
            className="absolute text-white text-xl p-0.5 hover:text-gray-500 rounded-lg hover:bg-gray-200 right-2  top-2"
          >
            <MdOutlineClose />
          </span>

          <div className="h-[75%] bg-black rounded-t-md p-2">
            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
              <span className="text-white text-5xl">
                <FaWhatsapp />
              </span>
              <p className="font-semibold text-md text-white">
                {" "}
                Got Questions? We've got answers!
              </p>
              <p className="text-white font-light">Let's chat on WhatsApp!</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className=" w-full h-[25%] rounded-b-md"
          >
            <input
              value={msg}
              onChange={handleOnchange}
              placeholder="Ask anything!"
              className=" relative w-full h-full outline-none rounded-b-md pl-2 block"
            ></input>
            <button
              type="submit"
              className="absolute text-gray-500 right-0 bottom-4 p-2 bg-white cursor-pointer"
            >
              {" "}
              <FiSend />
            </button>
          </form>
        </div>
      )}

      <div
        onClick={toggleWidget}
        className=" cursor-pointer rounded-full right-4 absolute -bottom-8 w-12 p-3 bg-black"
      >
        <div className="text-white  text-2xl">
          {" "}
          <IoChatboxEllipsesOutline />
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
