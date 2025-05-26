const Footer = () => {
  return (
    <footer className="relative mt-16 py-8 md:mt-20">
      <div className="flex justify-between gap-2 max-sm:flex-col max-sm:text-center">
        <p className="opacity-40 text-sm">
          &copy; {new Date().getFullYear()} Adfire
        </p>
      </div>
    </footer>
  );
};

export default Footer;
