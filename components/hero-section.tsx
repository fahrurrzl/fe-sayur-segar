"use client";

import { Button } from "@heroui/button";
import { FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import heroVegetables from "@/public/images/hero-vegetables.jpg";
import Image from "next/image";
import Link from "next/link";
import useProfile from "@/hooks/useProfile";
import ModalConfirmBeseller from "./modal-confirm-beseller";
import { useDisclosure } from "@heroui/react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";

const HeroSection = () => {
  const { dataUser } = useProfile();
  const { isOpen, onOpenChange } = useDisclosure();
  const isVerifiedSeller = dataUser?.Seller[0]?.verified;

  return (
    <section className="relative bg-gradient py-16 overflow-hidden">
      <ModalConfirmBeseller isOpen={isOpen} onOpenChange={onOpenChange} />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Text effect start */}
            <TextEffect
              className="text-4xl lg:text-5xl font-bold text-foreground leading-tight"
              per="char"
              delay={0.5}
              preset="fade"
            >
              Sayuran Segar
            </TextEffect>
            <TextEffect
              className="text-4xl lg:text-5xl font-bold block bg-gradient-to-r from-green-500 to-green-300 bg-clip-text text-transparent py-2 -mt-8"
              per="char"
              preset="fade"
              delay={0.5}
            >
              Langsung dari Petani
            </TextEffect>
            <TextEffect
              per="char"
              delay={1}
              segmentTransition={{
                duration: 0.3,
                type: "spring",
                bounce: 0.3,
              }}
              className="text-lg text-foreground-500 max-w-md"
            >
              Dapatkan sayuran segar berkualitas tinggi langsung dari petani
              lokal. Dikirim hari ini, sampai besok pagi.
            </TextEffect>
            {/* Text effect end */}

            <AnimatedGroup
              className="flex flex-col lg:flex-row gap-4"
              preset="slide"
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                },
                item: {
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1.2,
                      type: "spring",
                      bounce: 0.3,
                    },
                  },
                },
              }}
            >
              <Button
                variant="shadow"
                size="lg"
                color="success"
                className="text-white w-full"
                as={Link}
                href="#products"
              >
                <FaShoppingCart className="w-5 h-5 mr-2" />
                Mulai Belanja
              </Button>
              {!isVerifiedSeller && dataUser?.role !== "superadmin" ? (
                <Button
                  variant="bordered"
                  size="lg"
                  className="w-full"
                  onPress={() => {
                    onOpenChange();
                  }}
                >
                  Jadi Pedagang
                </Button>
              ) : null}
            </AnimatedGroup>

            {/* Features */}

            <AnimatedGroup
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
              preset="slide"
            >
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
            </AnimatedGroup>
          </div>

          {/* Right Image */}
          <div className="relative">
            <AnimatedGroup
              className="relative z-10"
              preset="slide"
              variants={{
                item: {
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,

                    transition: {
                      duration: 1.2,
                      type: "spring",
                      bounce: 0.3,
                    },
                  },
                },
              }}
            >
              <div className=" bg-gradient-to-br from-success/20 to-success-200/10 dark:from-emerald-500/10 dark:to-emerald-500/20 rounded-3xl p-4">
                <Image
                  src={heroVegetables}
                  alt="Sayuran Segar"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </AnimatedGroup>

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
