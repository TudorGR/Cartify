import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/payment");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-2 border border-neutral-300 h-fit rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex gap-4 ">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Name">First Name*</label>
          <input
            required
            type="text"
            id="Name"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="LastName">Last Name*</label>
          <input
            required
            type="text"
            id="LastName"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Email">Email Address*</label>
          <input
            required
            type="email"
            id="Email"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="Phone">Phone Number*</label>
          <input
            required
            type="tel"
            id="Phone"
            className="border-neutral-300 rounded-2xl px-6 py-3 border"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Street">Street Address*</label>
        <input
          required
          type="text"
          id="Street"
          className="border-neutral-300 rounded-2xl px-6 py-3 border"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="City">Town / City*</label>
        <input
          required
          type="text"
          id="City"
          className="border-neutral-300 rounded-2xl px-6 py-3 border"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Country">Country*</label>
        <input
          required
          type="text"
          id="Country"
          className="border-neutral-300 rounded-2xl px-6 py-3 border"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="Zip">Postcode / Zip*</label>
        <input
          required
          type="text"
          id="Zip"
          className="border-neutral-300 rounded-2xl px-6 py-3 border"
        />
      </div>
      <button
        type="submit"
        className="bg-neutral-500 rounded-full px-6 py-3 w-fit text-white"
      >
        Proceed to Next Step
      </button>
    </form>
  );
};

export default CheckoutForm;
