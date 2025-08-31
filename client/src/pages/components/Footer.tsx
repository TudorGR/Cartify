const Footer = () => {
  return (
    <footer className="w-full bg-neutral-500 py-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <p>Twitter</p>
          <p>Linkedin</p>
          <p>Youtube</p>
        </div>
        <div className="flex gap-6 flex-1 justify-center">
          <a href="/terms" className="hover:underline">
            Terms
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
        <div className="text-white flex-1 text-end">
          &copy; {new Date().getFullYear()} Cartify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
