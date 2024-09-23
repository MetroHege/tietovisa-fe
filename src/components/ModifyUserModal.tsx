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
