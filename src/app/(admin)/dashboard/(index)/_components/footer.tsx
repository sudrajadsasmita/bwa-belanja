export default function Footer() {
  return (
    <footer className="mt-auto w-full rounded-xl bg-white p-4 text-center text-sm text-gray-500 shadow-inner">
      © {new Date().getFullYear()} Admin Panel. All rights reserved.
    </footer>
  );
}
