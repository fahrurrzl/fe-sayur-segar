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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" isBlurred>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center" href="/">
            <Image src="/images/logo.png" alt="logo" width={70} height={70} />
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
            <Badge content={3} className="bg-success text-white">
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
            <Cart isOpen={isOpen} onOpenChange={onOpenChange} />
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
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description="@tonyreichert"
                  name="Tony Reichert"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="success"
              className="text-white"
              onPress={() => router.push("/auth/login")}
            >
              Login
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
            <Badge content={3} className="bg-success text-white">
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
            <Cart isOpen={isOpen} onOpenChange={onOpenChange} />
          </NavbarItem>
        ) : null}

        <NavbarItem>
          {status === "authenticated" ? (
            <Dropdown placement="bottom-start" radius="sm">
              <DropdownTrigger>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              color="success"
              className="text-white"
              onPress={() => router.push("/auth/login")}
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
