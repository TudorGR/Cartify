import { useContext, type Dispatch, type SetStateAction } from "react";
import { UserContext } from "../../../context/userContext";

type PaymentFormProps = {
  card: {
    name: string;
    number: string;
    date: string;
    code: string;
  };
  setCard: Dispatch<
    SetStateAction<{
      name: string;
      number: string;
      date: string;
      code: string;
    }>
  >;
  pay: () => void;
  setPayed: (value: boolean) => void;
  setCorp: Dispatch<SetStateAction<string>>;
};

const PaymentForm = ({
  setPayed,
  setCorp,
  card,
  setCard,
  pay,
}: PaymentFormProps) => {
  const { lightMode } = useContext(UserContext);

  function handlePay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    pay();
  }

  return (
    <form
      onSubmit={handlePay}
      className={`flex-2 ${
        lightMode
          ? "border-neutral-300 bg-white text-black"
          : "border-neutral-700 bg-neutral-900 text-white"
      } border h-fit rounded-2xl p-6 flex flex-col gap-4`}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="CardName">Name on Card*</label>
        <input
          required
          value={card.name}
          onChange={(e) =>
            setCard((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          id="CardName"
          className={`${
            lightMode
              ? "border-neutral-300 bg-white text-black"
              : "border-neutral-600 bg-neutral-800 text-white"
          } rounded-2xl px-6 py-3 border`}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="CardNumber">Card Number*</label>
        <input
          required
          value={card.number}
          onChange={(e) =>
            setCard((prev) => ({ ...prev, number: e.target.value }))
          }
          type="number"
          id="CardNumber"
          className={`${
            lightMode
              ? "border-neutral-300 bg-white text-black"
              : "border-neutral-600 bg-neutral-800 text-white"
          } rounded-2xl px-6 py-3 border`}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="ExpiryDate">Expiry Date*</label>
          <input
            required
            value={card.date}
            onChange={(e) =>
              setCard((prev) => ({ ...prev, date: e.target.value }))
            }
            type="date"
            id="ExpiryDate"
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Phone">Security Code*</label>
          <input
            required
            value={card.code}
            onChange={(e) =>
              setCard((prev) => ({ ...prev, code: e.target.value }))
            }
            type="number"
            id="Phone"
            className={`${
              lightMode
                ? "border-neutral-300 bg-white text-black"
                : "border-neutral-600 bg-neutral-800 text-white"
            } rounded-2xl px-6 py-3 border`}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setCorp("c")}
          className={`cursor-pointer ${
            lightMode
              ? "text-black border-neutral-800 hover:border-neutral-500"
              : "text-white border-neutral-600 hover:border-neutral-300"
          } rounded-full border px-6 py-3 w-fit  transition-colors`}
        >
          Previous Step
        </button>
        <button
          type="submit"
          className={`cursor-pointer ${
            lightMode
              ? "bg-neutral-800 hover:bg-neutral-700"
              : "bg-neutral-600 hover:bg-neutral-500"
          } rounded-full px-6 py-3 w-fit text-white transition-colors`}
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
