import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const CheckoutForm = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: 0,
    street: "",
    city: "",
    country: "",
    zip: 0,
  });
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/payment");
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
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-2 border border-neutral-300 h-fit rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Name">Name*</label>
          <input
            required
            value={data.name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            type="text"
            id="Name"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Phone">Phone Number*</label>
          <input
            required
            value={data.phone}
            onChange={(e) =>
              setData((prev) => ({ ...prev, phone: Number(e.target.value) }))
            }
            type="tel"
            id="Phone"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
      </div>
      <div className="flex gap-4 ">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Email">Email Address*</label>
          <input
            required
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            type="email"
            id="Email"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Street">Street Address*</label>
          <input
            required
            type="text"
            value={data.street}
            onChange={(e) =>
              setData((prev) => ({ ...prev, street: e.target.value }))
            }
            id="Street"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="City">Town / City*</label>
          <input
            required
            value={data.city}
            onChange={(e) =>
              setData((prev) => ({ ...prev, city: e.target.value }))
            }
            type="text"
            id="City"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Country">Country*</label>
          <input
            required
            value={data.country}
            onChange={(e) =>
              setData((prev) => ({ ...prev, country: e.target.value }))
            }
            type="text"
            id="Country"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Zip">Postcode / Zip*</label>
          <input
            required
            value={data.zip}
            onChange={(e) =>
              setData((prev) => ({ ...prev, zip: Number(e.target.value) }))
            }
            type="text"
            id="Zip"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer bg-neutral-500 rounded-full px-6 py-3 w-fit text-white"
      >
        Proceed to Next Step
      </button>
    </form>
  );
};

export default CheckoutForm;
