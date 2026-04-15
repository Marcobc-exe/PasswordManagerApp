type OptionsProps = {
  value: string;
  label: string;
};

export const options: OptionsProps[] = [
  { value: "date_desc", label: "Newest" },
  { value: "date_asc", label: "Oldest" },
  { value: "favorites", label: "Favorites" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
];
