const NewsLetter = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submited");
  }

  return (
    <div className="h-75">
      <div className="w-full max-w-5xl mx-auto h-full flex flex-col gap-6 items-center">
        <h2 className="text-4xl">Get 10% off your first order!</h2>
        <p>
          Subscribe to our newsletter to get a 10% off your first order and to
          never miss any discounts.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            required
            type="email"
            placeholder="example@email.com"
            className="border-neutral-500 rounded-full px-6 py-3 border"
          />
          <button
            type="submit"
            className="cursor-pointer text-white bg-neutral-500 rounded-full px-6 py-3 "
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
