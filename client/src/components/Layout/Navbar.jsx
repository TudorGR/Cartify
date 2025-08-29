const Navbar = () => {
  return (
    <div className="w-full absolute top-0">
      <div className="max-w-6xl mx-auto h-15 flex items-center justify-between px-6">
        <img alt="logo" />
        <nav>
          <ol className="flex gap-6">
            <li>Home</li>
            <li>Categories</li>
            <li>Contact Us</li>
          </ol>
        </nav>
        <div className="flex gap-4">
          <button>Profile</button>
          <button>Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
