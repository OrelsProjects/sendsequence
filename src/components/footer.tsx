import CustomLink from "./customLink";

export const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}.
        </p>
        <CustomLink href="/privacy">
          <span className="mr-6 text-lg cursor-pointer">Privacy</span>
        </CustomLink>
      </div>
    </footer>
  );
};
