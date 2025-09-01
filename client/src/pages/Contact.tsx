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
            <a
              href="mailto:info@cartify.io"
              className="text-blue-600 underline"
            >
              info@cartify.io
            </a>
            <div className="mt-6 space-y-2">
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                <a href="tel:+1234567890" className="text-blue-600 underline">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <span className="font-semibold">Office:</span> 123 Cartify Lane,
                Suite 100, San Francisco, CA
              </div>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://twitter.com/cartify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com/company/cartify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <section className="w-full max-w-5xl mx-auto py-12 px-4">
        <h3 className="text-4xl mb-6">Our Location</h3>
        <div className="rounded-2xl border-neutral-300 border overflow-hidden">
          <iframe
            title="Cartify Office Location"
            src="https://www.google.com/maps?q=548+Market+St,+San+Francisco,+CA+94104&output=embed"
            width="100%"
            height="300"
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
