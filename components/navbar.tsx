"use client";

import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import { SearchIcon } from "./icons";
import { MdOutlineShoppingCart } from "react-icons/md";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  Input,
  Button,
  useDisclosure,
  Badge,
  Avatar,
} from "@heroui/react";
import Cart from "./cart";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import useCart from "@/hooks/useCart";

export const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { dataCarts } = useCart();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <HeroUINavbar maxWidth="xl" isBlurred shouldHideOnScroll position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              src="/images/logo-sayur.png"
              alt="logo"
              width={40}
              height={40}
            />
            <div>
              <p className="font-bold text-inherit">SayurSegar</p>
              <p className="text-xs text-default-500">
                Sayur Segar dari Petani
              </p>
            </div>
          </NextLink>
        </NavbarBrand>
        {/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <Input
            placeholder="Cari sayur segar..."
            startContent={
              <SearchIcon className="text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </NavbarItem>

        {/* <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem> */}

        {status === "authenticated" ? (
          <NavbarItem>
            <Badge
              content={dataCarts?.data?._count.items}
              className="bg-success text-white"
            >
              <Button
                isIconOnly
                variant="light"
                className="flex items-center p-2 justify-center cursor-pointer text-slate-600"
                onPress={onOpen}
              >
                <MdOutlineShoppingCart size={22} />
              </Button>
            </Badge>
            {/* Cart */}
            <Cart
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              items={dataCarts?.data?.items}
            />
          </NavbarItem>
        ) : null}

        <NavbarItem className="hidden md:flex">
          {status === "authenticated" ? (
            <Dropdown placement="bottom-start" radius="sm">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: `https://ui-avatars.com/api/?name=${session?.user.name}&background=random`,
                  }}
                  className="transition-transform"
                  description={session?.user.email}
                  name={session?.user.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  textValue="Profil"
                  onPress={() => router.push("/profile")}
                >
                  <span className="flex items-center gap-2 w-full">
                    <FiUser />
                    Profil
                  </span>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  textValue="Keluar"
                  color="danger"
                  onClick={() => signOut()}
                >
                  <span className="flex items-center gap-2 w-full">
                    <FiLogOut />
                    Keluar
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="success"
              className="text-white"
              onPress={() => router.push("/auth/login")}
            >
              <FiLogIn />
              Masuk
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <NavbarItem>
          <ThemeSwitch />
        </NavbarItem> */}
        {status === "authenticated" ? (
          <NavbarItem>
            <Badge
              content={dataCarts?.data?._count.items}
              className="bg-success text-white"
            >
              <Button
                isIconOnly
                variant="light"
                className="flex items-center p-2 justify-center cursor-pointer text-slate-600"
                onPress={onOpen}
              >
                <MdOutlineShoppingCart size={22} />
              </Button>
            </Badge>
            {/* Cart */}
            <Cart
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              items={dataCarts?.data?.items || []}
            />
          </NavbarItem>
        ) : null}

        <NavbarItem>
          {status === "authenticated" ? (
            <Dropdown placement="bottom-start" radius="sm">
              <DropdownTrigger>
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${session?.user.name}&background=random`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  textValue="Profil"
                  onPress={() => router.push("/profile")}
                >
                  <span className="flex items-center gap-2 w-full">
                    <FiUser />
                    Profil
                  </span>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  textValue="Keluar"
                  color="danger"
                  onClick={() => signOut()}
                >
                  <span className="flex items-center gap-2 w-full">
                    <FiLogOut />
                    Keluar
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="success"
              className="text-white"
              onPress={() => router.push("/auth/login")}
            >
              <FiLogIn />
              Masuk
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
