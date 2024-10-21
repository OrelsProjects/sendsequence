import CustomLink from "./customLink";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="bg-card text-card-foreground">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <CustomLink href="/">
          <span className="text-2xl font-bold">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </CustomLink>
        <div>
          <CustomLink href="/signup">
            <Button size="sm">Get Started</Button>
          </CustomLink>
        </div>
      </nav>
    </header>
  );
};
