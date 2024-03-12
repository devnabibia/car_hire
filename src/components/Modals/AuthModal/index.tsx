import { Transition } from "@headlessui/react";
import { useContext } from "react";
import { AuthModalContext } from "../../../Context/AuthModalToggleContext";
import SignUp from "../../AuthComponents/SignUp";
import SignIn from "../../AuthComponents/SignIn";
import ModalButton from "./ModalButton";
import { useState } from "react";

const AuthModal = () => {
  const { isOpen, toggleAuthModal }: any = useContext(AuthModalContext);
  const [isSignIn, setIsSignIn] = useState<Boolean>(false);
  const [isSignUp, setIsSignUp] = useState<Boolean>(true);

  const toggleSignIn = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };

  const toggleSignUp = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };

  return (
    <div
      className={`${
        isOpen
          ? "fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/70  w-full p-4   h-screen"
          : "hidden"
      }`}
    >
      <Transition
        show={isOpen}
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-1"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-1"
        leaveTo="opacity-0"
      >
        <div
          className={`${
            isSignIn ? "max-h-[50vh]" : "max-h-[95vh]  overflow-y-scroll "
          } absolute   flex flex-col bg-white max-w-xl my-auto md:mx-auto inset-0 mx-2 px-2 md:px-6   rounded-md `}
        >
          <div className="py-4  w-full  flex flex-row gap-8 items-center justify-center">
            <button
              className={
                isSignUp
                  ? "font-semibold border border-b-4 bg-primary/5 px-4 py-1 rounded-full transition duration-700 ease-in-out"
                  : "font-semibold  "
              }
              onClick={toggleSignUp}
            >
              SignUp
            </button>

            <button
              className={
                isSignIn
                  ? "font-semibold border border-b-4 bg-primary/5 px-4 py-1 rounded-full   transition duration-700 ease-in-out"
                  : "font-semibold  "
              }
              onClick={toggleSignIn}
            >
              {" "}
              SignIn
            </button>
          </div>

          <ModalButton toggleModal={toggleAuthModal} />

          {isSignUp && <SignUp />}
          {isSignIn && <SignIn />}
        </div>
      </Transition>
    </div>
  );
};

export default AuthModal;
