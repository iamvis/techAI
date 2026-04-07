const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold text-white">SHOP.CO</h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Shop.Co brings premium clothing and timeless style to your wardrobe with ease.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Company</h4>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Help</h4>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Resources</h4>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SHOP.CO. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
