export const Spinner = ({ color = "border-black" }) => {
  return (
    <div
      className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${color}`}
    />
  );
};
