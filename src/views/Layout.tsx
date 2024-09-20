import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet } from "react-router-dom";
import navigationBackground from "../assets/navigation.svg";
import { LoginRegisterModal } from "@/components/LoginRegisterModal";
import { useUserContext } from "@/hooks/contextHooks";

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, handleLogout, handleAutoLogin } = useUserContext();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    handleAutoLogin();
  }, []); // Ensure this effect runs only once on mount

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex flex-col min-h-screen w-full">
        <nav
          className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800"
          style={{
            backgroundImage: `url(${navigationBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "auto",
          }}
        >
          <Link to={'/'}>
          <div className="text-2xl font-bold text-white">Tietovisasaitti</div>
          </Link>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-4">
                <Button variant="ghost" size="lg" onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <Sun className="mr-2 h-5 w-5" />
                  ) : (
                    <Moon className="mr-2 h-5 w-5" />
                  )}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
                {user ? (
                  <>
                    <div className="text-black">
                      <p>Username: {user.username}</p>
                      <p>Email: {user.email}</p>
                    </div>
                    <Button variant="ghost" size="lg" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoginClick}
                  >
                    <User className="mr-2 h-4 w-4" /> Kirjaudu
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
        <div className="flex-grow flex flex-col lg:flex-row">
          <aside className="w-full lg:w-1/6 p-4">
            <div className="h-full border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Ad Space
              </p>
            </div>
          </aside>
          <main className="flex-grow">
            <Outlet />
          </main>
          <aside className="w-full lg:w-1/6 p-4">
            <div className="h-full border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Ad Space
              </p>
            </div>
          </aside>
        </div>
        <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2024 Tietovisasaitti. All rights reserved.
          </p>
        </footer>
      </div>
      {isModalOpen && (
        <LoginRegisterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
