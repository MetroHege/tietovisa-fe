import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LoginForm } from "./LoginForm"; // Import the LoginForm
import { RegisterForm } from "./RegisterForm"; // Import the RegisterForm

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginRegisterModal({
  isOpen,
  onClose,
}: LoginRegisterModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Kirjaudu / Rekisteröidy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center">
          <svg
            className="w-16 h-16 mb-4 text-primary"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M8.5 17h3" />
            <path d="M8.5 13h7" />
            <path d="M8.5 9h2" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">Tietovisasaitti</h2>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Kirjaudu</TabsTrigger>
            <TabsTrigger value="register">Rekisteröidy</TabsTrigger>
          </TabsList>

          {/* Pass onClose to LoginForm */}
          <TabsContent value="login">
            <LoginForm onClose={onClose} /> {/* Pass onClose prop */}
          </TabsContent>

          {/* Pass onClose to RegisterForm */}
          <TabsContent value="register">
            <RegisterForm onClose={onClose} /> {/* Pass onClose prop */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
