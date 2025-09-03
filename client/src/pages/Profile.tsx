import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [option, setOption] = useState("info");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: 0,
    street: "",
    city: "",
    country: "",
    zip: 0,
  });

  const { user, setUser } = useContext(UserContext);
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

  return (
    <div className="relative flex flex-col gap-20 overflow-hidden justify-between min-h-screen">
      <Navbar color="black" />
      <div className="mt-20 w-full max-w-5xl mx-auto flex gap-10 h-full">
        <div className="flex flex-col gap-10 flex-1">
          <div className="flex flex-col gap-1">
            <img alt="img" className="w-20 h-20 rounded-full bg-neutral-500" />
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
              onClick={() => setOption("orders")}
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
        <div className="flex-2">
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
                  className="cursor-pointer h-fit w-fit bg-neutral-500  px-6 rounded-2xl  border-neutral-200 border py-3  text-white"
                >
                  Save
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl w-full p-6 bg-gray-100 ">
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
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
                  />
                </div>

                <div className="rounded-2xl w-full p-6 bg-gray-100">
                  <h2>Email</h2>
                  <input
                    type="email"
                    value={data.email}
                    onChange={() => {}}
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
                  />
                </div>
                <div className="rounded-2xl w-full p-6 bg-gray-100 ">
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
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
                  />
                </div>
                <div className="rounded-2xl w-full p-6 bg-gray-100 ">
                  <h2>Password</h2>
                  <input
                    type="text"
                    value={"*********"}
                    onChange={() => {}}
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
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
                  className="cursor-pointer h-fit w-fit bg-neutral-500  px-6 rounded-2xl  border-neutral-200 border py-3  text-white"
                >
                  Save
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl w-full p-6 bg-gray-100 ">
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
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
                  />
                </div>
                <div className="rounded-2xl w-full p-6 bg-gray-100 ">
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
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
                  />
                </div>
                <div className="rounded-2xl w-full p-6 bg-gray-100 ">
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
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
                  />
                </div>
                <div className="rounded-2xl w-full p-6 bg-gray-100 ">
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
                    className="rounded-2xl px-4 border-neutral-200 border py-2   w-full text-neutral-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center text-white bg-neutral-500 p-4 rounded-2xl">
                <p className="flex-1">Product</p>
                <p className="flex-1 text-end">Product Name</p>
                <p className="flex-1 text-end">Status</p>
                <p className="flex-1 text-end">Order Date</p>
                <p className="flex-1 text-end">Price</p>
              </div>
              <div className="flex items-center p-4 rounded-2xl">
                <div className="flex-1">
                  <img
                    alt="img"
                    className="shrink-0 w-10 h-16 bg-black rounded-2xl"
                  />
                </div>
                <p className="flex-1 text-end">Product Name</p>
                <p className="flex-1 text-end text-green-800">Delivered</p>
                <p className="flex-1 text-end">12 Aug 2024</p>
                <p className="flex-1 text-end">$104.99</p>
              </div>
              <div className="flex items-center p-4 rounded-2xl">
                <div className="flex-1">
                  <img
                    alt="img"
                    className="shrink-0 w-10 h-16 bg-black rounded-2xl"
                  />
                </div>
                <p className="flex-1 text-end">Product Name</p>
                <p className="flex-1 text-end text-red-800">Cancelled</p>
                <p className="flex-1 text-end">12 Aug 2024</p>
                <p className="flex-1 text-end">$104.99</p>
              </div>
              <div className="flex items-center p-4 rounded-2xl">
                <div className="flex-1">
                  <img
                    alt="img"
                    className="shrink-0 w-10 h-16 bg-black rounded-2xl"
                  />
                </div>
                <p className="flex-1 text-end">Product Name</p>
                <p className="flex-1 text-end text-blue-800">In Progress</p>
                <p className="flex-1 text-end">12 Aug 2024</p>
                <p className="flex-1 text-end">$104.99</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
