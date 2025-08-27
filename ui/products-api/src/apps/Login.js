import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Input, Label, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Login as LoginIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await login(email, password);
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        navigate('/');
      } else {
        console.error('Login failed:', result.error);
        toast.error('Login falhou. Verifique suas credenciais e tente novamente.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <LoginIcon className="text-white" style={{ fontSize: 32 }} />
          </div>
          <CardTitle className="text-2xl font-bold">Fazer Login</CardTitle>
          <p className="text-muted-foreground">
            Entre com sua conta para acessar o sistema
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="input-modern"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="input-modern pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full btn-gradient"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Não tem uma conta?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-primary hover:underline font-medium"
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;