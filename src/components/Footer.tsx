const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Portfolio. All rights reserved.
          </div>
          
          <div className="text-sm text-muted-foreground">
            Built with <span className="gradient-text font-semibold">passion</span> and modern technology
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;