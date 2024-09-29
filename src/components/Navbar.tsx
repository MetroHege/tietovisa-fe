import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { useUserContext } from "@/hooks/contextHooks";
import { LoginRegisterModal } from "./LoginRegisterModal";
import ModifyUserModal from "./ModifyUserModal"; // Import the ModifyUserModal component
import { useSwipeable } from "react-swipeable";

const swipeOpenMenuStyles: React.CSSProperties = {
  position: "fixed",
  right: 0,
  width: "33%",
  height: "100%",
  zIndex: 10,
};

const swipeCloseMenuStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, handleLogout } = useUserContext();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isModifyUserModalOpen, setIsModifyUserModalOpen] = useState(false); // State for Modify User modal

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleModifyUserClick = () => {
    setIsModifyUserModalOpen(true);
  };

  const openHandlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => setIsMenuOpen(true),
  });

  const closeHandlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: () => setIsMenuOpen(false),
  });

  return (
    <nav className="relative flex justify-between items-center p-8 bg-white dark:bg-gray-900 min-h-[80px]">
      <div {...openHandlers} style={swipeOpenMenuStyles} />
      <div className="absolute inset-0 w-full h-full z-0">
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 600"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,600 L 0,112 C 63.58570937822054,135.06973548608727 127.17141875644108,158.1394709721745 201,156 C 274.8285812435589,153.8605290278255 358.90003435245615,126.51185159738921 432,120 C 505.09996564754385,113.48814840261079 567.2284438337342,127.81312263826862 620,135 C 672.7715561662658,142.18687736173138 716.1861903126072,142.23565784953624 788,136 C 859.8138096873928,129.76434215046376 960.0267949158365,117.2442459635864 1047,103 C 1133.9732050841635,88.7557540364136 1207.7066300240467,72.78735829611817 1271,74 C 1334.2933699759533,75.21264170388183 1387.1466849879766,93.60632085194092 1440,112 L 1440,600 L 0,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="#005afe"
            fillOpacity="0.4"
            className="transition-all duration-300 ease-in-out delay-150 path-0"
            transform="rotate(-180 720 300)"
          ></path>
          <path
            d="M 0,600 L 0,262 C 54.70972174510479,270.65475781518376 109.41944349020957,279.30951563036757 190,272 C 270.5805565097904,264.69048436963243 377.03194778426655,241.41669529371353 444,238 C 510.96805221573345,234.58330470628647 538.4527653727242,251.02370319477842 589,255 C 639.5472346272758,258.9762968052216 713.1569907248369,250.48849192717282 803,244 C 892.8430092751631,237.51150807282718 998.9192717279286,233.0223290965304 1062,235 C 1125.0807282720714,236.9776709034696 1145.165922363449,245.42219168670562 1201,251 C 1256.834077636551,256.5778083132944 1348.4170388182756,259.28890415664716 1440,262 L 1440,600 L 0,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="#005afe"
            fillOpacity="0.53"
            className="transition-all duration-300 ease-in-out delay-150 path-1"
            transform="rotate(-180 720 300)"
          ></path>
          <path
            d="M 0,600 L 0,412 C 88.7337684644452,400.2088629336997 177.4675369288904,388.4177258673995 242,390 C 306.5324630711096,391.5822741326005 346.86362074888353,406.5379594641017 411,401 C 475.13637925111647,395.4620405358983 563.0779800755754,369.43043627619375 641,373 C 718.9220199244246,376.56956372380625 786.824458948815,409.7402954311233 843,431 C 899.175541051185,452.2597045688767 943.6241841291651,461.60838199931294 1016,462 C 1088.375815870835,462.39161800068706 1188.6788045345243,453.82617657162484 1264,444 C 1339.3211954654757,434.17382342837516 1389.6605977327379,423.0869117141876 1440,412 L 1440,600 L 0,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="#005afe"
            fillOpacity="1"
            className="transition-all duration-300 ease-in-out delay-150 path-2"
            transform="rotate(-180 720 300)"
          ></path>
        </svg>
      </div>
      <Link to={"/"} className="relative z-10">
      <div className="text-2xl font-bold text-black dark:text-white transition duration-300 hover:text-blue-500 hover:scale-105 dark:hover:text-gray-200">
  Tietovisasaitti
</div>

      </Link>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative z-10">
            <Menu className="h-8 w-8 text-black dark:text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className={`w-[250px] sm:w-[300px] ${
            theme === "dark" ? "dark:bg-gray-900" : "bg-white"
          }`}
        >
          <div {...closeHandlers} style={swipeCloseMenuStyles}>
            <div className="flex flex-col space-y-4 mt-4">
              <Button variant="ghost" size="lg" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="mr-2 h-5 w-5" />
                ) : (
                  <Moon className="mr-2 h-5 w-5" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
              {user ? (
                <>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="text-black dark:text-white">
                      <p className="text-lg font-semibold">
                        Käyttäjänimi: {user.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sähköposti: {user.email}
                      </p>
                    </div>
                  </div>
                  {user.role === "admin" && (
                    <Link className="w-full" to="/dashboard">
                      <Button size="lg" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button size="lg" onClick={handleModifyUserClick}>
                    Muokkaa käyttäjää
                  </Button>
                  <Button size="lg" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="lg" onClick={handleLoginClick}>
                  <User className="mr-2 h-4 w-4" /> Kirjaudu
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <>
        {isLoginModalOpen && (
          <LoginRegisterModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
        {isModifyUserModalOpen && (
          <ModifyUserModal
            isOpen={isModifyUserModalOpen}
            onClose={() => setIsModifyUserModalOpen(false)}
          />
        )}
      </>
    </nav>
  );
};

export default Navbar;
