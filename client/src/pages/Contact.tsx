import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Contact = () => {
  return (
    <div className="relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen">
      <Navbar color="white" />
      <div className=" bg-neutral-500">
        <div className="w-full max-w-5xl  mx-auto h-full gap-6 flex">
          <div className="flex-1 gap-4 text-white flex flex-col justify-center">
            <h2 className="text-5xl">Contact Us</h2>
            <p className="max-w-60">
              Email, call, or complete the form to contact us regarding
              anything.
            </p>
            <p>info@cartify.io</p>
          </div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
