import { useThemeContext } from "@/contexts/ThemeProvider";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function useSendMessage({
  delay,
  message,
  icon,
  duration = 4000,
}: {
  delay: number;
  message: string;
  icon: string;
  duration?: number;
}) {
  const { isDarkMode } = useThemeContext();
  useEffect(function () {
    const timeout = setTimeout(() => {
      toast(message, {
        icon,
        duration,
        style: {
          background: isDarkMode ? "darkblue" : "white",
          color: isDarkMode ? "white" : "darkblue",
        },
      });
    }, delay);
    () => clearTimeout(timeout);
  }, []);
}
