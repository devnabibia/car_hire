import { FaAngleDown, FaRegQuestionCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Button from "../Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { GrShareOption } from "react-icons/gr";
import { IoCopyOutline } from "react-icons/io5";
import { useParams } from "react-router";
import moment from "moment";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BookingDetailsProps {
  vihicle_id: string | undefined;
  location: string;
  return_date?: string;
  pickup_date?: string;
}

const BookingForm = ({ hire_price }: any) => {
  const { Id } = useParams();

  const [isPickUpDateOpen, setPickUpDate] = useState<boolean>(false);
  const [isReturnDateOpen, setReturnDate] = useState<boolean>(false);

  const [pickUpDate, setPickUpDateValue] = useState<string>();
  const [returnDate, setReturnDateValue] = useState<string>();
  const [isShare, setIsShare] = useState<boolean>(false);

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const toggleShare = () => {
    setIsShare((prev) => !prev);
  };

  //copies to clipboard
  const copyLink = () => {
    setIsCopied(true);
    setTimeout(() => {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(false);
    }, 1500);
  };

  const togglePickUpDate = () => {
    setPickUpDate((prev) => !prev);
    setReturnDate(false);
  };
  const toggleReturnDate = () => {
    setReturnDate((prev) => !prev);
    setPickUpDate(false);
  };

  const [bookingDetails, setBookingDetails] = useState<BookingDetailsProps>({
    vihicle_id: Id,
    location: "",
  });

  const handleOnChange = (e: any) => {
    setBookingDetails({
      ...bookingDetails,
      return_date: returnDate,
      pickup_date: pickUpDate,

      [e.target.name]: e.target.value,
    });
  };

  const handlePickUpDateOnchange = (value: any) => {
    setPickUpDateValue(value);
  };
  const handleReturnDateOnchange = (value: any) => {
    setReturnDateValue(value);
  };

  return (
    <div className="w-auto relative h-auto  ">
      <div className="mt-12  max-w-4xl mx-auto w-full h-[30rem]  ">
        <div className="  flex flex-col   items-center gap-6 pt-12  justify-center h-full  w-full  border rounded-md  px-4 ">
          <div className="absolute top-4 left-4 flex flex-row items-center justify-center gap-2">
            <p className="text-xs">From</p>
            <p className="text-gray-900 font-semibold text-xl">
              KES {hire_price} /day
            </p>
          </div>
          <div className="absolute group top-4 right-4 ">
            <FaRegQuestionCircle />
            <div className=" hidden  bg-black text-white p-4 pt-8 w-56 text-sm z-20 right-2 -top-[7.7rem] md:-top-[7.5rem] group-hover:flex gap-4 flex-col  absolute">
              <p>
                Pick-up Time: <span className="font-semibold ">9.00 AM</span>
              </p>
              <p>
                Return Time: <span className="font-semibold">12.00 NOON</span>
                (the following day)
              </p>
            </div>
          </div>
          <div className="  flex flex-row  items-center gap-2 justify-center  w-full ">
            <select
              id="location"
              name="location"
              onChange={handleOnChange}
              className="bg-gray-50 relative border border-gray-300 text-gray-900  rounded-md focus:ring-primary focus:border-primary block w-full p-2.5  "
            >
              <option selected>Choose Location</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Nakuru">Nakuru</option>
            </select>
          </div>
          <div
            onClick={togglePickUpDate}
            className="flex  cursor-pointer flex-row bg-gray-50 w-full  border border-gray-300  items-center gap-2 justify-between  md:px-2  max-w-96 rounded-md p-2.5"
          >
            <span className="text-primary">
              <SlCalender />
            </span>
            <p className="text-gray-900">
              {" "}
              <span className=" pr-2"> PickUp-Date</span>{" "}
              <span className="text-xs font-semibold">
                {Number(moment(pickUpDate).format("x")) >=
                Number(moment(new Date()).format("x")) - 1000 * 60 * 60 * 24 ? (
                  moment(pickUpDate).format("YYYY-MM-DD")
                ) : (
                  <span className="text-red-500">
                    Error!Date must be in the future{" "}
                  </span>
                )}
              </span>
            </p>
            <span
              className={`${
                isPickUpDateOpen
                  ? " rotate-180 transiton duration-500 ease-out"
                  : ""
              }`}
            >
              <FaAngleDown />
            </span>
          </div>
          <div className="absolute top-[13.9rem]  bg-white z-20">
            {isPickUpDateOpen && (
              <Calendar
                value={pickUpDate}
                onChange={handlePickUpDateOnchange}
              />
            )}
          </div>
          <div
            onClick={toggleReturnDate}
            className="flex cursor-pointer flex-row bg-gray-50  border border-gray-300  w-full items-center  gap-2 justify-between  md:px-2  max-w-96 rounded-md p-2.5"
          >
            <span className="text-primary">
              <SlCalender />
            </span>
            <p className="text-gray-900">
              <span className=" pr-2"> Return-Date</span>{" "}
              <span className="text-xs font-semibold">
                {Number(moment(returnDate).format("x")) >=
                Number(moment(new Date()).format("x")) ? (
                  moment(returnDate).format("YYYY-MM-DD")
                ) : (
                  <span className="text-red-500">
                    Error!Date must be in the future{" "}
                  </span>
                )}
              </span>
            </p>
            <span
              className={`${
                isReturnDateOpen
                  ? " rotate-180 transiton duration-500 ease-out"
                  : ""
              }`}
            >
              <FaAngleDown />
            </span>
          </div>
          <div className="absolute top-[18.3rem] md:top-[18.2rem] bg-white z-20">
            {isReturnDateOpen && (
              <Calendar
                value={returnDate}
                onChange={handleReturnDateOnchange}
              />
            )}
          </div>
          <div className=" w-full">
            <Button text="Book Your Ride" theme="filled"></Button>
          </div>
          <div
            onClick={toggleShare}
            className="text-sm text-center border rounded-lg px-4  py-2 cursor-pointer hover:bg-slate-100"
          >
            <span className="inline-block  pr-1.5 text-lg">
              <GrShareOption />
            </span>{" "}
            Share
          </div>
          {isShare && (
            <div
              onClick={copyLink}
              className=" bottom-1 absolute shadow-md border  bg-white rounded-md"
            >
              <div className=" group flex flex-row items-center gap-4 rounded-md px-6 py-3 cursor-pointer hover:bg-slate-100">
                <span className="text-sm">
                  {isCopied ? "Copied Link!" : "Copy Link"}
                </span>
                <span className="group-hover:scale-125">
                  <IoCopyOutline />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
