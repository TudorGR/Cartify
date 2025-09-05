import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IoPersonSharp } from "react-icons/io5";
import NewsLetter from "./components/NewsLetter";

interface Order {
  _id: string;
  productsIds: string[];
  status: string;
  orderDate: string;
  totalPrice: number;
  email: string;
}

const Profile = () => {
  const [option, setOption] = useState("info");
  const [orders, setOrders] = useState<Order[]>([]);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: 0,
    street: "",
    city: "",
    country: "",
    zip: 0,
  });

  const {
    user,
    setUser,
    lightMode,
    setCart,
    favourites,
    removeFromFavourites,
    setFavourites,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const wrapperClasses = lightMode
    ? "bg-white text-neutral-700"
    : "bg-neutral-900 text-neutral-300";
  const headingClasses = lightMode ? "text-neutral-900" : "text-neutral-100";
  const dividerBorder = lightMode ? "border-neutral-200" : "border-neutral-800";
  const cardClasses = lightMode
    ? "bg-neutral-50 border border-neutral-200"
    : "bg-neutral-800 border border-neutral-700";
  const inputBase = lightMode
    ? "border-neutral-200 bg-white text-black "
    : "border-neutral-600 bg-neutral-800 text-white ";
  const disabledInput = lightMode
    ? "border-neutral-200 bg-neutral-100 text-neutral-500"
    : "border-neutral-700 bg-neutral-700 text-neutral-400";
  const buttonPrimary = lightMode
    ? "bg-neutral-900 hover:bg-neutral-800 text-white"
    : "bg-neutral-600 hover:bg-neutral-500 text-white";
  const tabBase = "px-3 py-2 rounded-md  transition-colors focus:outline-none ";
  const tabActive = lightMode
    ? "bg-neutral-900 text-white "
    : "bg-neutral-600 text-white ";
  const tabInactive = lightMode
    ? "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 "
    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 focus:ring-neutral-700";

  async function handleSignOut() {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
      setCart(new Map());
      setFavourites(new Map());
    } catch (error) {
      toast.error("An error occurred during sign out");
    }
  }
  // { name, phone, street, city, country, zip }
  async function handleSave() {
    const promise = axios
      .put("http://localhost:3000/profile", data)
      .then((response) => {
        if (response.data.error) {
          throw new Error("Error saving profile");
        }
        setUser(response.data);

        return "Saved Profile";
      });

    toast.promise(promise, {
      loading: "",
      success: (data) => data,
      error: (err) => err.message,
    });
  }

  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || 0,
        street: user.street || "",
        city: user.city || "",
        country: user.country || "",
        zip: user.zip || 0,
      });
    }
  }, [user, setUser]);

  async function handleGetOrder() {
    try {
      let response = null;
      if (user && user.email.length > 0) {
        response = await axios.get(
          `http://localhost:3000/orders/${user.email}`
        );
      } else {
        throw new Error("Not logged in");
      }

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetOrder();
  }, [user]);

  return (
    <div
      className={`transition-all relative min-h-screen flex flex-col justify-between ${wrapperClasses}`}
    >
      <Navbar color="black" />
      <div className="w-full max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <aside className="flex flex-col gap-8">
          <div className={`p-6 rounded-xl ${cardClasses}`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-500/40 flex items-center justify-center">
                <IoPersonSharp className="w-8 h-8" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${headingClasses}`}>
                  {user?.name || "Guest"}
                </h2>
                <p className=" opacity-80">{user?.email || "Not signed in"}</p>
              </div>
            </div>
          </div>

          <nav
            className={`p-4 rounded-xl ${cardClasses}`}
            aria-label="Profile Navigation"
          >
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  className={`${tabBase} ${
                    option === "info" ? tabActive : tabInactive
                  } w-full text-left cursor-pointer`}
                  onClick={() => setOption("info")}
                >
                  Personal Information
                </button>
              </li>
              <li>
                <button
                  className={`${tabBase} ${
                    option === "address" ? tabActive : tabInactive
                  } w-full text-left cursor-pointer`}
                  onClick={() => setOption("address")}
                >
                  Billing Address
                </button>
              </li>
              <li>
                <button
                  className={`${tabBase} ${
                    option === "orders" ? tabActive : tabInactive
                  } w-full text-left cursor-pointer`}
                  onClick={() => {
                    setOrders([]);
                    setOption("orders");
                    handleGetOrder();
                  }}
                >
                  Order History
                </button>
              </li>
              <li>
                <button
                  className={`${tabBase} ${
                    option === "favourites" ? tabActive : tabInactive
                  } w-full text-left cursor-pointer`}
                  onClick={() => setOption("favourites")}
                >
                  Favourites
                </button>
              </li>
              <li>
                <button
                  className="px-3 py-2 cursor-pointer rounded-md  text-red-500 hover:text-red-600 hover:bg-red-50/10 focus:outline-none"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="md:col-span-2">
          {option == "info" ? (
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2
                    className={`text-2xl md:text-3xl font-semibold ${headingClasses}`}
                  >
                    Personal Information
                  </h2>
                  <p className="mt-1  opacity-80">
                    Manage your personal details and keep your account
                    information up to date.
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className={`${buttonPrimary} cursor-pointer h-fit w-fit px-6 py-3 rounded-lg transition-colors`}
                >
                  Save
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="profile-name" className="font-medium">
                      Full Name
                    </label>
                    <p className="text-neutral-400 italic ">editable</p>
                  </div>
                  <input
                    id="profile-name"
                    type="text"
                    value={data.name}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={`rounded-lg px-4 border py-2 w-full focus:outline-none focus:ring-2 ${inputBase}`}
                  />
                </div>

                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <label
                    htmlFor="profile-email"
                    className="font-medium block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    value={data.email}
                    onChange={() => {}}
                    className={`rounded-lg px-4 border py-2 w-full ${disabledInput}`}
                    disabled
                  />
                </div>

                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="profile-phone" className="font-medium">
                      Phone
                    </label>
                    <p className="text-neutral-400 italic ">editable</p>
                  </div>
                  <input
                    id="profile-phone"
                    type="number"
                    value={data.phone != 0 ? data.phone : ""}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        phone: Number(e.target.value),
                      }))
                    }
                    className={`rounded-lg px-4 border py-2 w-full focus:outline-none focus:ring-2 ${inputBase}`}
                  />
                </div>

                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <label
                    htmlFor="profile-password"
                    className="font-medium block mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="profile-password"
                    type="text"
                    value={"*********"}
                    onChange={() => {}}
                    className={`rounded-lg px-4 border py-2 w-full ${disabledInput}`}
                    disabled
                  />
                </div>
              </div>
            </section>
          ) : option == "address" ? (
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2
                    className={`text-2xl md:text-3xl font-semibold ${headingClasses}`}
                  >
                    Billing Address
                  </h2>
                  <p className="mt-1  opacity-80">
                    Update your billing address for accurate shipping and
                    payment processing.
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className={`${buttonPrimary} cursor-pointer h-fit w-fit px-6 py-3 rounded-lg transition-colors`}
                >
                  Save
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="address-street" className="font-medium">
                      Street
                    </label>
                    <p className="text-neutral-400 italic ">editable</p>
                  </div>
                  <input
                    id="address-street"
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, street: e.target.value }))
                    }
                    type="text"
                    value={data.street}
                    className={`rounded-lg px-4 border py-2 w-full focus:outline-none focus:ring-2 ${inputBase}`}
                  />
                </div>
                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="address-city" className="font-medium">
                      Town / City
                    </label>
                    <p className="text-neutral-400 italic ">editable</p>
                  </div>
                  <input
                    id="address-city"
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    type="text"
                    value={data.city}
                    className={`rounded-lg px-4 border py-2 w-full focus:outline-none focus:ring-2 ${inputBase}`}
                  />
                </div>
                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="address-country" className="font-medium">
                      Country
                    </label>
                    <p className="text-neutral-400 italic ">editable</p>
                  </div>
                  <input
                    id="address-country"
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, country: e.target.value }))
                    }
                    type="text"
                    value={data.country}
                    className={`rounded-lg px-4 border py-2 w-full focus:outline-none focus:ring-2 ${inputBase}`}
                  />
                </div>
                <div className={`rounded-xl w-full p-6 ${cardClasses}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="address-zip" className="font-medium">
                      Zip Code
                    </label>
                    <p className="text-neutral-400 italic ">editable</p>
                  </div>
                  <input
                    id="address-zip"
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        zip: Number(e.target.value),
                      }))
                    }
                    type="number"
                    value={data.zip != 0 ? data.zip : ""}
                    className={`rounded-lg px-4 border py-2 w-full focus:outline-none focus:ring-2 ${inputBase}`}
                  />
                </div>
              </div>
            </section>
          ) : option == "orders" ? (
            <section className="flex flex-col gap-4">
              <h2
                className={`text-2xl md:text-3xl font-semibold ${headingClasses}`}
              >
                Order History
              </h2>
              <div className={`rounded-xl overflow-hidden ${cardClasses}`}>
                <div
                  className={`grid grid-cols-5 gap-2 px-4 py-3  font-medium ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <p className="col-span-2">ID</p>
                  <p className="text-end">Nr. of products</p>
                  <p className="text-end">Status</p>
                  <p className="text-end">Price</p>
                </div>
                <div className="divide-y" />
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-2 px-4 py-3 "
                  >
                    <div className="col-span-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {order._id}
                    </div>
                    <p className="text-end">{order.productsIds.length}</p>
                    <p
                      className={`text-end ${
                        lightMode ? "text-green-600" : "text-green-400"
                      }`}
                    >
                      {order.status}
                    </p>
                    <p className="text-end">${order.totalPrice}</p>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="px-4 py-8 text-center  opacity-70">
                    No Orders
                  </div>
                )}
              </div>
            </section>
          ) : option == "favourites" ? (
            <section className="flex flex-col gap-4">
              <h2
                className={`text-2xl md:text-3xl font-semibold ${headingClasses}`}
              >
                Favourites
              </h2>
              <p className="opacity-80">
                Your favourite products that you've saved for later.
              </p>
              {favourites.size > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from(favourites.values()).map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-xl p-4 flex gap-4 ${cardClasses}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-neutral-200"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-medium overflow-hidden"
                        >
                          {item.name}
                        </Link>
                        {item.discountedPrice ? (
                          <div className="flex gap-2 items-baseline">
                            <p className="font-semibold">
                              ${item.discountedPrice}
                            </p>
                            <p className="text-neutral-400 line-through">
                              ${item.price}
                            </p>
                          </div>
                        ) : (
                          <p className="font-semibold">${item.price}</p>
                        )}
                        <button
                          onClick={() => removeFromFavourites(item.id)}
                          className="cursor-pointer text-red-500  hover:text-red-600 mt-2 self-start"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center h-40 rounded-xl ${cardClasses}`}
                >
                  <p className="opacity-70">No favourite items yet</p>
                </div>
              )}
            </section>
          ) : null}
        </main>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Profile;
