import { Button } from "@heroui/button";
import { FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import heroVegetables from "@/public/images/hero-vegetables.jpg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Sayuran Segar
                <span className="block bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent">
                  Langsung dari Petani
                </span>
              </h1>
              <p className="text-lg text-foreground-500 max-w-md">
                Dapatkan sayuran segar berkualitas tinggi langsung dari petani
                lokal. Dikirim hari ini, sampai besok pagi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="shadow"
                size="lg"
                color="success"
                className="text-white"
              >
                <FaShoppingCart className="w-5 h-5 mr-2" />
                Mulai Belanja
              </Button>
              <Button variant="bordered" size="lg">
                Jadi Pedagang
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <FiTruck className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    Gratis Ongkir
                  </p>
                  <p className="text-xs text-muted-foreground">Min. Rp 50rb</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <FaShieldAlt className="w-5 h-5 text-green-800" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    Jaminan Segar
                  </p>
                  <p className="text-xs text-muted-foreground">100% Fresh</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-orange-500/10 p-2 rounded-lg">
                  <LuLeaf className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    Produk Organik
                  </p>
                  <p className="text-xs text-muted-foreground">Tersedia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-success/20 to-success-200/20 rounded-3xl p-8 backdrop-blur-sm">
                <Image
                  src={heroVegetables}
                  alt="Sayuran Segar"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-fresh/30 to-organic/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-tr from-vegetable/20 to-fresh/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
