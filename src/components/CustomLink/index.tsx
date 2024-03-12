import { Link } from "react-router-dom";

interface LinkProps {
  text: string;
  to: string;
  variant: "unfilled" | "filled" | "outlined";
  isBlank?: boolean;
  Icon?: React.ReactNode;
}

const CustomLink: React.FC<LinkProps> = ({
  to,
  text,
  variant,
  isBlank,
  Icon,
}) => {
  switch (variant) {
    case "filled":
      return (
        <Link
          className=" bg-primary px-6 py-2 rounded-md border-2 border-solid
  text-white  transition-all duration-300 w-full
    ease-in-out hover:bg-black"
          to={to}
          target={`${isBlank ? "_blank" : ""}`}
        >
          <a>
            <span className="inline-block pr-2">{Icon}</span>
            {text}
          </a>
        </Link>
      );

    case "unfilled":
      return (
        <Link
          target={`${isBlank ? "_blank" : ""}`}
          className="  
 transition-all duration-300 
ease-in-out font-semibold hover:text-primary"
          to={to}
        >
          <a>{text}</a>
        </Link>
      );

    case "outlined":
      return (
        <Link
          target={`${isBlank ? "_blank" : ""}`}
          className="group bg-transparent px-6 py-2 rounded-md border-2 border-solid w-full 
        border-primary text-primary transition-all duration-300
        ease-in-out hover:bg-primary  hover:text-white"
          to={to}
        >
          <a>
            {" "}
            <span className="inline-block pr-2 text-primary group-hover:text-white">
              {Icon}
            </span>
            {text}
          </a>
        </Link>
      );
  }
};

export default CustomLink;
