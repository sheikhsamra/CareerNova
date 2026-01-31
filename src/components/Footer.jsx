const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center py-4 mt-10">
      &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
    </footer>
  );
};

export default Footer;
