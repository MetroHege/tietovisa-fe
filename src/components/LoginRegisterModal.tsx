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
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="relative w-full">
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
        <div className="flex flex-col items-center p-4">
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
            <LoginForm onClose={onClose} />
          </TabsContent>

          {/* Pass onClose to RegisterForm */}
          <TabsContent value="register">
            <RegisterForm onClose={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
