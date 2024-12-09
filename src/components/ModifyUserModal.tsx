import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/hooks/contextHooks";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ModifyUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModifyUserModal = ({ isOpen, onClose }: ModifyUserModalProps) => {
  const { user, handleModifyUser } = useUserContext();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < minLength) {
      return "Salasanan on oltava vähintään 8 merkkiä pitkä.";
    }
    if (!hasUpperCase) {
      return "Salasanassa on oltava vähintään yksi iso kirjain.";
    }
    if (!hasNumber) {
      return "Salasanassa on oltava vähintään yksi numero.";
    }
    return "";
  };

  const handleSave = async () => {
    if (!user) return;

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const updates = { username, email, password, role: user.role };
      console.log("Updating user with payload:", updates);
      await handleModifyUser(user._id, updates);
      onClose();
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Käyttäjätietojen päivittäminen ei onnistunut");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-labelledby="modify-user-title"
        aria-describedby="modify-user-description"
      >
        <DialogHeader>
          <DialogTitle id="modify-user-title">Muokkaa käyttäjää</DialogTitle>
          <DialogDescription id="modify-user-description">
            Muokkaa käyttäjätietojasi alla.
          </DialogDescription>
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
              type={showPassword ? "text" : "password"}
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
