import {
  useContext,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { UserContext } from "../../../context/userContext";

interface CheckoutProps {
  setCorp: Dispatch<SetStateAction<string>>;
  data: {
    name: string;
    email: string;
    phone: number;
    street: string;
    city: string;
    country: string;
    zip: number;
  };
  setData: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
      phone: number;
      street: string;
      city: string;
      country: string;
      zip: number;
    }>
  >;
}

const CheckoutForm = ({ setCorp, data, setData }: CheckoutProps) => {
  const { user, lightMode } = useContext(UserContext);

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
      className={`flex-2 ${
        lightMode
          ? "border-neutral-300 bg-white text-black"
          : "border-neutral-700 bg-neutral-900 text-white"
      } border h-fit rounded-2xl p-6 flex flex-col gap-4`}
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
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
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
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
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
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
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
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
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
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
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
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
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
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setCorp("p")}
          className={`cursor-pointer ${
            lightMode
              ? "bg-neutral-800 hover:bg-neutral-700"
              : "bg-neutral-600 hover:bg-neutral-500"
          } rounded-full px-6 py-3 w-fit text-white transition-colors`}
        >
          Proceed to Next Step
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
