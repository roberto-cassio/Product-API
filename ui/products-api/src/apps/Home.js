import { Link } from 'react-router-dom';
import { ShoppingBag, Person, Add, ArrowForward } from '@mui/icons-material';
import { useAuth } from '../hooks';

const Home = () => {
  const  { isAuthenticated }  = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Bem-vindo à
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Loja do Bebeto
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bem Vindo! <br />
            Cadastre-se para gerenciar produtos e muito mais.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link to="/products" className="block">
            <div className="card-product text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="text-white" style={{ fontSize: 32 }} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Ver Produtos</h3>
              <p className="text-muted-foreground mb-4">
                Explore nossa coleção de produtos
              </p>
              <div className="flex items-center justify-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                Explorar <ArrowForward fontSize="small" />
              </div>
            </div>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block">
                <div className="card-product text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Person className="text-white" style={{ fontSize: 32 }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Fazer Login</h3>
                  <p className="text-muted-foreground mb-4">
                    Acesse sua conta para gerenciar produtos e perfil
                  </p>
                  <div className="flex items-center justify-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                    Entrar <ArrowForward fontSize="small" />
                  </div>
                </div>
              </Link>

              <Link to="/signup" className="block">
                <div className="card-product text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Add className="text-white" style={{ fontSize: 32 }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Criar Conta</h3>
                  <p className="text-muted-foreground mb-4">
                    Registre-se para ter acesso a recursos exclusivos
                  </p>
                  <div className="flex items-center justify-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                    Cadastrar <ArrowForward fontSize="small" />
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <Link to="/products/create" className="block md:col-span-2">
              <div className="card-product text-center group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-success to-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Add className="text-white" style={{ fontSize: 32 }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Cadastrar Produto</h3>
                <p className="text-muted-foreground mb-4">
                  Adicione novos produtos ao catálogo da loja
                </p>
                <div className="flex items-center justify-center text-primary font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                  Adicionar <ArrowForward fontSize="small" />
                </div>
              </div>
            </Link>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Por que escolher nossa loja?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="text-primary text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Rápido e Moderno</h3>
              <p className="text-muted-foreground text-sm">Interface intuitiva e responsiva</p>
            </div>
            <div className="p-4">
              <div className="text-primary text-3xl mb-2">🛡️</div>
              <h3 className="font-semibold mb-1">Seguro</h3>
              <p className="text-muted-foreground text-sm">Seus dados protegidos</p>
            </div>
            <div className="p-4">
              <div className="text-primary text-3xl mb-2">💎</div>
              <h3 className="font-semibold mb-1">Qualidade</h3>
              <p className="text-muted-foreground text-sm">Produtos cuidadosamente selecionados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;