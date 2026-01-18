export default function Footer() {
  return (
    <footer className="footer p-10 bg-black text-neutral-content">
      <aside>
        <h3 className="text-3xl font-black text-primary tracking-tighter">TechGear</h3>
        <p className="max-w-xs text-gray-400 mt-2">
          The world's premier destination for high-performance hardware and gaming peripherals.
          <br />
          <br />
          © 2026 TechGear Industries
        </p>
      </aside> 
      <nav>
        <h6 className="footer-title text-white">Shop</h6> 
        <a className="link link-hover text-gray-400">Processors</a>
        <a className="link link-hover text-gray-400">Graphics Cards</a>
        <a className="link link-hover text-gray-400">Peripherals</a>
        <a className="link link-hover text-gray-400">Accessories</a>
      </nav> 
      <nav>
        <h6 className="footer-title text-white">Support</h6> 
        <a className="link link-hover text-gray-400">Contact Us</a>
        <a className="link link-hover text-gray-400">FAQs</a>
        <a className="link link-hover text-gray-400">Shipping Policy</a>
        <a className="link link-hover text-gray-400">Returns</a>
      </nav> 
      <nav>
        <h6 className="footer-title text-white">Social</h6> 
        <a className="link link-hover text-gray-400">Twitter</a>
        <a className="link link-hover text-gray-400">Instagram</a>
        <a className="link link-hover text-gray-400">YouTube</a>
      </nav>
    </footer>
  );
}