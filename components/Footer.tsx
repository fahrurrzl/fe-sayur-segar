import { FaFacebook, FaInstagram, FaMapPin, FaPhone } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Logo, TwitterIcon } from "./icons";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo width={60} height={60} />
              <span className="text-xl font-bold text-foreground">
                SayurSegar
              </span>
            </div>
            <p className="text-foreground-500 text-sm leading-relaxed">
              Marketplace sayuran segar yang menghubungkan petani lokal dengan
              konsumen. Dapatkan sayuran berkualitas tinggi langsung dari
              sumbernya.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="w-5 h-5 text-blue-500 hover:text-blue-600 cursor-pointer transition-colors" />
              <FaInstagram className="w-5 h-5 text-rose-500 hover:text-rose-600 cursor-pointer transition-colors" />
              <TwitterIcon className="w-5 h-5 text-sky-500 hover:text-sky-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Menu Utama</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Produk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Kategori
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Untuk Pedagang</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Daftar Jual
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Panduan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  Bantuan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground-500 hover:text-success transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Kontak Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <FiMail className="w-4 h-4 text-success" />
                <span className="text-foreground-500">info@sayursegar.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="w-4 h-4 text-success" />
                <span className="text-foreground-500">0812-3456-7890</span>
              </div>
              <div className="flex items-start space-x-2">
                <FaMapPin className="w-4 h-4 text-success mt-0.5" />
                <span className="text-foreground-500">
                  Jl. Tani Makmur No. 123
                  <br />
                  Jakarta Selatan 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-foreground">
              © 2024 SayurSegar. Semua hak cipta dilindungi.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-foreground hover:text-fresh transition-colors"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="#"
                className="text-foreground hover:text-fresh transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-foreground hover:text-fresh transition-colors"
              >
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
