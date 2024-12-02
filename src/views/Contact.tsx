import contactLight from "../assets/contact-light.png";
import contactDark from "../assets/contact-dark.png";

const Contact = () => {
  return (
    <div className="flex justify-center p-4">
      <img
        src={contactLight}
        alt="Ota yhteyttä sähköpostitse: kymppivisa)&[kymppivisa.fi"
        className="block dark:hidden w-1/2 h-auto"
      />
      <img
        src={contactDark}
        alt="Ota yhteyttä sähköpostitse: kymppivisa)&[kymppivisa.fi"
        className="hidden dark:block w-1/2 h-auto"
      />
    </div>
  );
};

export default Contact;
