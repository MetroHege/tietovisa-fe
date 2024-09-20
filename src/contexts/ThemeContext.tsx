import { createContext, useState, useContext, useEffect } from "react";

type Theme = "light" | "dark";
type ThemeContextProps = {
    theme: Theme;
    toggleTheme: () => void;
};

// This context is used to manage the theme of the application.
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// This provider is used to wrap the application and provide the theme context.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = window.localStorage.getItem("theme");
        return (storedTheme as Theme) || "dark";
    });

    // This function is used to toggle the theme.
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
        const newTheme = theme === "light" ? "dark" : "light";
        window.localStorage.setItem("theme", newTheme);
        return newTheme;
    };

    useEffect(() => {
        const root = document.getElementById("root");
        if (root) {
            if (theme === "light") {
                root.classList.add("light");
                root.classList.remove("dark");
            } else {
                root.classList.add("dark");
                root.classList.remove("light");
            }
        }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// This hook is used to access the theme context.
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default ThemeContext;
