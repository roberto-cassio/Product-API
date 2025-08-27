import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui";
import { Home } from "@mui/icons-material";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4 text-foreground">Página não encontrada</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          Oops! A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button className="btn-gradient flex items-center space-x-2">
              <Home fontSize="small" />
              <span>Ir para Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
