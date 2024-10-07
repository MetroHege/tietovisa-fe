import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/hooks/contextHooks";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ModifyUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModifyUserModal = ({ isOpen, onClose }: ModifyUserModalProps) => {
  const { user, modifyUser } = useUserContext();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        setError("No token found");
        return;
      }
      const updates = { username, email, password };
      console.log("Updating user with payload:", updates); // Log the payload
      await modifyUser(user._id, token, updates);
      onClose();
    } catch (err) {
      console.error("Error updating user:", err); // Log the error
      setError("Käyttäjätietojen päivittäminen ei onnistunut");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
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
          <DialogTitle>Muokkaa käyttäjää</DialogTitle>
          <DialogDescription>Muokaa käyttäjätietojasi alla.</DialogDescription>
        </DialogHeader>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Käyttäjänimi
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sähköposti
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Salasana
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            Peruuta
          </Button>
          <Button onClick={handleSave}>Tallenna</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyUserModal;
