import { FC, ReactNode } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props = {
  icon: ReactNode;
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  darkMode: boolean;
  hoverColor?: string;
  styles: string;
};

export const ActionButton: FC<Props> = ({
  icon,
  label =  "",
  onClick,
  disabled = false,
  darkMode,
  hoverColor,
  styles
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
              ${styles}
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
