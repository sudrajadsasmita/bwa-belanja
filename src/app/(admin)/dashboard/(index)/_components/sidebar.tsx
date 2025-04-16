"use client";
import {
  Archive,
  Building,
  MapPin,
  Menu,
  Package,
  ShieldCheck,
  ShoppingCart,
  User2,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <nav
      className={`fixed inset-y-0 left-0 z-50 h-screen w-3/4 transform bg-white p-4 shadow-lg transition-transform md:w-1/2 lg:static lg:w-1/3 lg:rounded-xl xl:w-1/4 2xl:w-1/6 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex h-full w-full flex-col gap-8">
        <div className="flex items-center justify-center gap-4 py-4">
          <ShieldCheck size={40} color="blue" />
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8"
          >
            <Menu size={24} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/categories"
            className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8"
          >
            <Archive size={24} />
            Categories
          </Link>

          <Link
            href="/dashboard/locations"
            className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8"
          >
            <MapPin size={24} />
            Locations
          </Link>

          <Link
            href="/dashboard/brands"
            className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8"
          >
            <Building size={24} />
            Brands
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8"
          >
            <Package size={24} />
            Products
          </Link>

          <Link
            href="/dashboard/orders"
            className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8"
          >
            <ShoppingCart size={24} />
            Orders
          </Link>

          <Link
            href="/dashboard/customers"
            className="flex items-center gap-8 rounded-xl px-2 py-4 text-gray-700 hover:bg-gray-200 lg:px-8"
          >
            <User2 size={24} />
            Customers
          </Link>
          {/* 
          <div className="flex flex-col">
            <button
              onClick={() => setIsSuratOpen(!isSuratOpen)}
              className="flex w-full items-center gap-8 rounded-xl px-2 py-4 text-left text-gray-700 hover:bg-gray-200 lg:px-8"
            >
              <Mail size={24} />
              <span className="flex-1">Surat</span>
              <ChevronRight
                size={20}
                className={`transition-transform duration-300 ${
                  isSuratOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>

            <AnimatePresence>
              {isSuratOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="ml-14 flex flex-col gap-2 py-2 text-gray-600">
                    <Link
                      href="/dashboard/surat/masuk"
                      className="flex items-center gap-4 rounded-lg px-2 py-2 hover:bg-gray-100"
                    >
                      <Inbox size={20} />
                      Surat Masuk
                    </Link>
                    <Link
                      href="/dashboard/surat/keluar"
                      className="flex items-center gap-4 rounded-lg px-2 py-2 hover:bg-gray-100"
                    >
                      <Send size={20} />
                      Surat Keluar
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
           */}
        </div>
      </div>
    </nav>
  );
}
