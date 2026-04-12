import { FC, ReactNode } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled: boolean;
  darkMode: boolean;
  hoverColor?: string;
};

export const ActionButton: FC<Props> = ({
  icon,
  label,
  onClick,
  disabled,
  darkMode,
  hoverColor,
}) => {
  const baseBg = darkMode ? "bg-[#21414f]" : "bg-[#ffd391]";
  const defaultHover = darkMode ? "hover:bg-[#0d1b21]" : "hover:bg-[#f9c16c]";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            disabled={disabled}
            className={`
              p-2 rounded-lg transition cursor-pointer mx-0.5
              ${baseBg}
              ${hoverColor ? hoverColor : defaultHover}
            `}
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
