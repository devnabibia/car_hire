interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "outlined" | "filled" | "text";
  text: string;
  onClick?: () => void;
}

const Button = ({ theme, text, onClick, ...props }: ButtonProps) => {
  switch (theme) {
    case "filled":
      return (
        <button
          {...props}
          onClick={onClick}
          className=" bg-primary px-6 py-2 rounded-md border-2 border-solid
   text-white border-transparent transition-all duration-300 w-full
     ease-in-out hover:bg-black "
        >
          {text}
        </button>
      );
    case "outlined":
      return (
        <button
          {...props}
          onClick={onClick}
          className=" bg-transparent px-6 py-2 rounded-md border-2 border-solid w-full 
border-primary text-primary transition-all duration-300
ease-in-out hover:bg-primary  hover:text-white"
        >
          {text}
        </button>
      );

    case "text":
      return (
        <button
          {...props}
          onClick={onClick}
          className="  px-3 py-2 text-primary  font-bold border-solid w-full 
 transition-all duration-300 hover:text-black
ease-in-out "
        >
          {text}
        </button>
      );
  }
};

export default Button;
