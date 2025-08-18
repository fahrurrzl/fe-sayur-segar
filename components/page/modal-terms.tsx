"use client";

import { Button } from "@heroui/button";
import {
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const ModalTerms = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="outside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
            <div className="mx-auto max-w-4xl">
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-center">
                  Syarat dan Ketentuan
                </h1>
                <p className="text-center text-foreground-500 text-sm">
                  Terakhir diperbarui:{" "}
                  {new Date().toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </ModalHeader>
              <ModalBody className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    1. Penerimaan Ketentuan
                  </h2>
                  <p className="text-foreground-500 leading-relaxed">
                    Dengan menggunakan layanan kami, Anda menyetujui untuk
                    terikat oleh syarat dan ketentuan ini. Jika Anda tidak
                    setuju dengan ketentuan ini, mohon untuk tidak menggunakan
                    layanan kami.
                  </p>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    2. Layanan Kami
                  </h2>
                  <p className="text-foreground-500 leading-relaxed mb-3">
                    Kami menyediakan platform e-commerce untuk pembelian sayuran
                    segar berkualitas tinggi. Layanan kami meliputi:
                  </p>
                  <ul className="list-disc list-inside text-foreground-500 space-y-1 ml-4">
                    <li>Penjualan sayuran segar dan organik</li>
                    <li>Sistem pembayaran online yang aman</li>
                    <li>Layanan pengiriman ke alamat tujuan</li>
                    <li>Dukungan pelanggan</li>
                  </ul>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    3. Akun Pengguna
                  </h2>
                  <p className="text-foreground-500 leading-relaxed mb-3">
                    Untuk menggunakan layanan kami, Anda perlu membuat akun
                    dengan informasi yang akurat dan lengkap:
                  </p>
                  <ul className="list-disc list-inside text-foreground-500 space-y-1 ml-4">
                    <li>
                      Anda bertanggung jawab menjaga keamanan akun dan password
                    </li>
                    <li>Informasi yang diberikan harus benar dan terkini</li>
                    <li>Satu akun hanya untuk satu orang</li>
                    <li>Dilarang berbagi akun dengan orang lain</li>
                  </ul>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    4. Pemesanan dan Pembayaran
                  </h2>
                  <p className="text-foreground-500 leading-relaxed mb-3">
                    Ketentuan pemesanan dan pembayaran:
                  </p>
                  <ul className="list-disc list-inside text-foreground-500 space-y-1 ml-4">
                    <li>
                      Harga dapat berubah sewaktu-waktu tanpa pemberitahuan
                    </li>
                    <li>Pembayaran harus dilakukan sebelum pengiriman</li>
                    <li>
                      Pesanan akan diproses setelah pembayaran dikonfirmasi
                    </li>
                    <li>
                      Kami berhak membatalkan pesanan jika stok tidak tersedia
                    </li>
                  </ul>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">5. Pengiriman</h2>
                  <p className="text-foreground-500 leading-relaxed mb-3">
                    Ketentuan pengiriman:
                  </p>
                  <ul className="list-disc list-inside text-foreground-500 space-y-1 ml-4">
                    <li>
                      Pengiriman dilakukan sesuai dengan area layanan kami
                    </li>
                    <li>Waktu pengiriman dapat bervariasi tergantung lokasi</li>
                    <li>
                      Risiko kerusakan selama pengiriman ditanggung bersama
                    </li>
                    <li>Pastikan alamat pengiriman lengkap dan benar</li>
                  </ul>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    6. Kebijakan Pengembalian
                  </h2>
                  <p className="text-foreground-500 leading-relaxed mb-3">
                    Untuk produk sayuran segar:
                  </p>
                  <ul className="list-disc list-inside text-foreground-500 space-y-1 ml-4">
                    <li>
                      Klaim harus dilaporkan maksimal 2 jam setelah barang
                      diterima
                    </li>
                    <li>Foto bukti diperlukan untuk klaim produk rusak</li>
                    <li>
                      Pengembalian dana akan diproses dalam 3-7 hari kerja
                    </li>
                    <li>
                      Produk segar tidak dapat dikembalikan kecuali ada
                      kerusakan
                    </li>
                  </ul>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    7. Privasi dan Data
                  </h2>
                  <p className="text-foreground-500 leading-relaxed">
                    Kami menghormati privasi Anda dan berkomitmen untuk
                    melindungi data pribadi. Data yang dikumpulkan hanya
                    digunakan untuk memproses pesanan dan meningkatkan layanan.
                    Kami tidak akan membagikan data Anda kepada pihak ketiga
                    tanpa persetujuan.
                  </p>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    8. Pembatasan Tanggung Jawab
                  </h2>
                  <p className="text-foreground-500 leading-relaxed">
                    Kami berusaha memberikan layanan terbaik, namun tidak
                    bertanggung jawab atas kerugian tidak langsung yang mungkin
                    timbul dari penggunaan layanan kami. Tanggung jawab kami
                    terbatas pada nilai produk yang dibeli.
                  </p>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    9. Perubahan Ketentuan
                  </h2>
                  <p className="text-foreground-500 leading-relaxed">
                    Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
                    Perubahan akan diberitahukan melalui website atau email.
                    Penggunaan layanan setelah perubahan berarti Anda menyetujui
                    ketentuan yang baru.
                  </p>
                </section>

                <Divider />

                <section>
                  <h2 className="text-xl font-semibold mb-3">10. Kontak</h2>
                  <p className="text-foreground-500 leading-relaxed">
                    Jika Anda memiliki pertanyaan tentang syarat dan ketentuan
                    ini, silakan hubungi kami:
                  </p>
                  <div className="mt-3 space-y-1 text-foreground-500 ml-4">
                    <p>Email: support@sayuranberkah.com</p>
                    <p>Telepon: +62 812-3456-7890</p>
                    <p>Alamat: Jl. Sayuran Segar No. 123, Jakarta</p>
                  </div>
                </section>

                <div className="mt-8 pt-6 border-t text-center">
                  <p className="text-sm text-foreground-500">
                    Dengan mendaftar, Anda menyetujui syarat dan ketentuan di
                    atas.
                  </p>
                  <div className="mt-4 space-x-4">
                    <Button
                      color="success"
                      className="text-white"
                      onPress={onClose}
                    >
                      Saya Setuju & Daftar
                    </Button>
                    <Button
                      as={Link}
                      href="/"
                      color="success"
                      className="text-white"
                    >
                      Kembali ke Beranda
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalTerms;
