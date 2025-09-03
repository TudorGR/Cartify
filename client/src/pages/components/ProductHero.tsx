interface ProductProps {
  data: {
    id: string;
    name: string;
    shortDescription: string;
    category: string;
    image: string;
    price: number;
  };
}

const ProductHero = ({ data }: ProductProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col">
      <p className="my-2">
        Home {">"} All {">"} {data.category} {">"} {data.name}
      </p>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col items-start">
          <div className="grid grid-cols-[1fr_3fr] h-full w-full gap-6">
            <div className="flex flex-col justify-between gap-6">
              <div className="bg-neutral-500 rounded-2xl flex-1"></div>
              <div className="bg-neutral-500 rounded-2xl flex-1"></div>
              <div className="bg-neutral-500 rounded-2xl flex-1"></div>
            </div>
            <div className="bg-neutral-500 rounded-2xl">hover to zoom</div>
          </div>
        </div>
        <div className="flex flex-col gap-6 min-h-100">
          <h2 className="text-4xl">{data.name}</h2>
          <div className="flex gap-4">
            <p>${data.price}</p>
            <p className="text-neutral-500 line-through">${data.price * 2}</p>
            <p>x x x x x (20 reviews)</p>
          </div>
          <div className="w-full border-b border-neutral-200"></div>
          <p>{data.shortDescription}</p>
          <div className="flex gap-4">
            <div className="flex gap-6 border border-neutral-200 px-4 py-2 rounded-full">
              <button>{"-"}</button>
              <p>1</p>
              <button>{"+"}</button>
            </div>
            <button className="text-white w-full bg-neutral-500 rounded-full">
              Add to Cart (animation go to cart icon)
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-neutral-400">
              Free Worldwide shipping on all orders over $100
            </p>
            <p className="text-neutral-400">Delivers in: 3-7 working days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
