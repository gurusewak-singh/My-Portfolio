export default function Footer() {
  return (
    <footer id="footer" className="bg-dark-100 text-center text-gray-400 py-6 font-mono text-sm">
      {/* A_Made the year dynamic. A small but professional touch. */}
      © {new Date().getFullYear()} Gurusewak Singh. All rights reserved.
    </footer>
  );
}