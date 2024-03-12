interface BadgeProps {
  variant: "Sale" | "Hire" | undefined;
}

const Badge = ({ variant }: BadgeProps) => {
  return variant === "Sale" ? (
    <div className=" w-8  h-4 text-center bg-black text-white text-sm">
      {variant}
    </div>
  ) : (
    <div className=" w-8  h-4 text-center bg-primary text-xs text-white">
      {variant}
    </div>
  );
};

export default Badge;
