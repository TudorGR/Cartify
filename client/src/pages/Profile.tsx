import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IoPersonSharp } from "react-icons/io5";

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

  const { user, setUser, lightMode, setCart } = useContext(UserContext);
  const navigate = useNavigate();

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
      className={`transition-all relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen ${
        lightMode ? "bg-white text-black" : "bg-neutral-950 text-white"
      }`}
    >
      <Navbar color="black" />
      <div className="mt-20 w-full max-w-5xl mx-auto flex gap-10 h-full">
        <div className="flex flex-col gap-10 flex-1">
          <div className="flex flex-col gap-1">
            <div className="w-20 h-20 bg-neutral-500 rounded-full flex items-center justify-center">
              <IoPersonSharp className="w-10 h-10" />
            </div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
          <div className="flex flex-col gap-4 items-start">
            <button
              className={`${
                option == "info" ? "font-bold" : "text-neutral-400"
              } cursor-pointer`}
              onClick={() => setOption("info")}
            >
              Personal Information
            </button>
            <button
              className={`${
                option == "address" ? "font-bold" : "text-neutral-400"
              } cursor-pointer`}
              onClick={() => setOption("address")}
            >
              Billing Address
            </button>
            <button
              className={`${
                option == "orders" ? "font-bold" : "text-neutral-400"
              } cursor-pointer`}
              onClick={() => {
                setOrders([]);
                setOption("orders");
                handleGetOrder();
              }}
            >
              Order History
            </button>
            <button
              className="cursor-pointer text-red-500"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex-3">
          {option == "info" ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl">Personal Information</h2>
              <div className="flex justify-between">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                  ratione, ab eos maxime voluptatum similique obcaecati
                  molestiae voluptatibus.
                </p>
                <button
                  onClick={handleSave}
                  className={`cursor-pointer h-fit w-fit ${
                    lightMode
                      ? "bg-neutral-800 hover:bg-neutral-700"
                      : "bg-neutral-500 hover:bg-neutral-400"
                  } px-6 rounded-2xl py-3 text-white transition-colors`}
                >
                  Save
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <div className="flex justify-between">
                    <h2>Full Name</h2>
                    <p className="text-neutral-400 italic">editable</p>
                  </div>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-white text-black"
                        : "border-neutral-600 bg-neutral-800 text-white"
                    }`}
                  />
                </div>

                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <h2>Email</h2>
                  <input
                    type="email"
                    value={data.email}
                    onChange={() => {}}
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-neutral-100 text-neutral-500"
                        : "border-neutral-600 bg-neutral-700 text-neutral-400"
                    }`}
                    disabled
                  />
                </div>
                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <div className="flex justify-between">
                    <h2>Phone</h2>
                    <p className="text-neutral-400 italic">editable</p>
                  </div>
                  <input
                    type="number"
                    value={data.phone != 0 ? data.phone : ""}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        phone: Number(e.target.value),
                      }))
                    }
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-white text-black"
                        : "border-neutral-600 bg-neutral-800 text-white"
                    }`}
                  />
                </div>
                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <h2>Password</h2>
                  <input
                    type="text"
                    value={"*********"}
                    onChange={() => {}}
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-neutral-100 text-neutral-500"
                        : "border-neutral-600 bg-neutral-700 text-neutral-400"
                    }`}
                    disabled
                  />
                </div>
              </div>
            </div>
          ) : option == "address" ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl">Billing Adress</h2>
              <div className="flex justify-between">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
                  ratione, ab eos maxime voluptatum similique obcaecati
                  molestiae voluptatibus.
                </p>
                <button
                  onClick={handleSave}
                  className={`cursor-pointer h-fit w-fit ${
                    lightMode
                      ? "bg-neutral-800 hover:bg-neutral-700"
                      : "bg-neutral-500 hover:bg-neutral-400"
                  } px-6 rounded-2xl py-3 text-white transition-colors`}
                >
                  Save
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <div className="flex justify-between">
                    <h2>Street</h2>
                    <p className="text-neutral-400 italic">editable</p>
                  </div>
                  <input
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        street: e.target.value,
                      }))
                    }
                    type="text"
                    value={data.street}
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-white text-black"
                        : "border-neutral-600 bg-neutral-800 text-white"
                    }`}
                  />
                </div>
                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <div className="flex justify-between">
                    <h2>Town / City</h2>
                    <p className="text-neutral-400 italic">editable</p>
                  </div>
                  <input
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    type="text"
                    value={data.city}
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-white text-black"
                        : "border-neutral-600 bg-neutral-800 text-white"
                    }`}
                  />
                </div>
                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <div className="flex justify-between">
                    <h2>Country</h2>
                    <p className="text-neutral-400 italic">editable</p>
                  </div>
                  <input
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, country: e.target.value }))
                    }
                    type="text"
                    value={data.country}
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-white text-black"
                        : "border-neutral-600 bg-neutral-800 text-white"
                    }`}
                  />
                </div>
                <div
                  className={`rounded-2xl w-full p-6 ${
                    lightMode ? "bg-neutral-100" : "bg-neutral-900"
                  }`}
                >
                  <div className="flex justify-between">
                    <h2>Zip Code</h2>
                    <p className="text-neutral-400 italic">editable</p>
                  </div>
                  <input
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        zip: Number(e.target.value),
                      }))
                    }
                    type="number"
                    value={data.zip != 0 ? data.zip : ""}
                    className={`rounded-2xl px-4 border py-2 w-full ${
                      lightMode
                        ? "border-neutral-300 bg-white text-black"
                        : "border-neutral-600 bg-neutral-800 text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div
                className={`flex items-center text-white p-4 rounded-2xl ${
                  lightMode ? "bg-neutral-800" : "bg-neutral-600"
                }`}
              >
                <p className="flex-2">ID</p>
                <p className="flex-1 text-end">Nr. of products</p>
                <p className="flex-1 text-end">Status</p>
                <p className="flex-1 text-end">Order Date</p>
                <p className="flex-1 text-end">Price</p>
              </div>
              {orders.map((order, index) => (
                <div key={index} className="flex items-center p-4 rounded-2xl">
                  <div className="flex-2">{order._id}</div>
                  <p className="flex-1 text-end">{order.productsIds.length}</p>
                  <p
                    className={`flex-1 text-end ${
                      lightMode ? "text-green-600" : "text-green-400"
                    }`}
                  >
                    {order.status}
                  </p>
                  <p className="flex-1 text-end">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="flex-1 text-end">{order.totalPrice}</p>
                </div>
              ))}
              {orders.length == 0 && (
                <div className="flex items-center justify-center h-70">
                  No Orders
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
