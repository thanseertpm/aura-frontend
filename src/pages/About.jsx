
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Wide Product Collection",
      description:
        "Explore stylish clothing, watches, footwear, accessories, gadgets, and everyday essentials.",
    },
    {
      icon: Sparkles,
      title: "Fashion & Lifestyle",
      description:
        "Discover the latest trends and find products that complement your personal style.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Shopping",
      description:
        "Enjoy a convenient shopping experience with detailed product information and a user-friendly platform.",
    },
    {
      icon: Package,
      title: "Easy Order Management",
      description:
        "Browse products, manage your cart, track orders, and enjoy a smooth online shopping journey.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gray-950 px-5 py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-gray-800 opacity-90" />

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
            Welcome to Aura Fashions
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Style That Defines
            <span className="block text-gray-400">Your Identity.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Your destination for fashion, lifestyle products, and everyday
            essentials. Discover your style and shop with confidence.
          </p>

          <Link
            to="/collections"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Explore Collection
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            About Us
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            More Than Fashion.
            <span className="block text-gray-400">It's Your Lifestyle.</span>
          </h2>

          <p className="mt-6 text-sm leading-8 text-gray-600">
            <strong className="text-gray-900">Aura Fashions</strong> is an
            online shopping destination specializing in men's fashion,
            lifestyle products, and everyday essentials. We bring together a
            diverse collection of products to make discovering your style
            simple and convenient.
          </p>

          <p className="mt-4 text-sm leading-8 text-gray-600">
            From stylish shirts and trendy clothing to watches, footwear,
            fashion accessories, and gadgets, our collection is designed to
            offer something for every style and everyday need.
          </p>

          <p className="mt-4 text-sm leading-8 text-gray-600">
            Our goal is to create a convenient online shopping experience where
            customers can explore the latest trends, discover products, view
            detailed information, and shop with ease.
          </p>
        </div>

        <div className="relative">
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl bg-gray-100 p-8 sm:min-h-[430px]">
            <div className="text-center">
              <p className="text-5xl font-black tracking-[0.15em] sm:text-6xl">
                AURA
              </p>
              <div className="mx-auto my-4 h-px w-24 bg-gray-400" />
              <p className="text-sm font-semibold tracking-[0.45em] text-gray-500">
                FASHIONS
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-gray-400">
                Complete Fashion Store
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 rounded-xl bg-black px-6 py-4 text-white shadow-xl sm:-left-5">
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Discover
            </p>
            <p className="mt-1 text-lg font-bold">Your Style</p>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="bg-gray-50 px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
              What We Offer
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need, In One Place.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              A carefully presented collection of fashion, lifestyle, and
              everyday products to make shopping easier.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <Icon size={23} className="text-gray-800" />
                  </div>

                  <h3 className="font-bold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-950 p-8 text-white sm:p-12">
            <Heart size={34} className="mb-6 text-gray-300" />

            <h2 className="text-3xl font-bold leading-tight">
              Your Style.
              <span className="block text-gray-400">Your Choice.</span>
              Your Aura.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-300">
              We believe shopping should be simple, enjoyable, and convenient.
              Aura Fashions brings fashion and everyday essentials together in
              one place.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
              Our Commitment
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              A Better Way to Shop Online.
            </h2>

            <div className="mt-8 space-y-5">
              {[
                "A diverse collection of fashion and lifestyle products.",
                "Detailed product information to help customers choose.",
                "Convenient browsing and easy online ordering.",
                "A smooth experience from product discovery to order tracking.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-gray-800"
                  />
                  <p className="text-sm leading-6 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gray-100 px-5 py-16 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Find Your Style with Aura.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
          Explore our collection and discover products that match your style
          and everyday needs.
        </p>

        <Link
          to="/catalog"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Start Shopping
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
};

export default About;
