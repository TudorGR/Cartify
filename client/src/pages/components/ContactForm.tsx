const ContactForm = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="my-30 h-full flex-1 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-6 flex flex-col gap-4 bg-white"
      >
        <h2 className="text-4xl">Get in Touch</h2>
        <p>You can reach us anytime</p>
        <div className="flex gap-4">
          <input
            required
            className="border border-neutral-300 px-4 py-2 rounded-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            className="border border-neutral-300 px-4 py-2 rounded-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          className="border border-neutral-300 px-4 py-2 rounded-full"
          type="text"
          placeholder="example@email.com"
        />
        <input
          required
          className="border border-neutral-300 px-4 py-2 rounded-full"
          type="rel"
          placeholder="+1 (XXX) XXX - XXXX"
        />
        <textarea
          rows={4}
          required
          placeholder="How can we help?"
          className="resize-none border border-neutral-300 px-4 py-2 rounded-2xl"
        ></textarea>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-neutral-500 rounded-full px-6 py-3 w-fit text-white"
          >
            Submit
          </button>
          <p>
            By contacting us, you agree to our{" "}
            <span className="font-bold cursor-pointer">Terms of service</span>{" "}
            and <span className="font-bold cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
