type PaymentFormProps = {
  setPayed: (value: boolean) => void;
};

const PaymentForm = ({ setPayed }: PaymentFormProps) => {
  function handlePay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPayed(true);
  }

  return (
    <form
      onSubmit={handlePay}
      className="flex-2 border border-neutral-300 h-fit rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="CardName">Name on Card*</label>
        <input
          required
          type="text"
          id="CardName"
          className="border-neutral-300 rounded-2xl px-6 py-3 border"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="CardNumber">Card Number*</label>
        <input
          required
          type="number"
          id="CardNumber"
          className="border-neutral-300 rounded-2xl px-6 py-3 border"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="ExpiryDate">Expiry Date*</label>
          <input
            required
            type="date"
            id="ExpiryDate"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Phone">Security Code*</label>
          <input
            required
            type="number"
            id="Phone"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-neutral-500 rounded-full px-6 py-3 w-fit text-white"
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
