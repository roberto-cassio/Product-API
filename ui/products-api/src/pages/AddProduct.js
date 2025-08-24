import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Add, ArrowBack } from '@mui/icons-material';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const { addProduct } = useProducts();
  //const { isAuthenticated } = useAuth();
  //TODO: Voltar a usar o useAuth, só para teste
  const isAuthenticated  = true;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const priceNumber = parseFloat(price.replace(',', '.'));
    
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setLoading(false);
      return;
    }

    addProduct({
      name,
      description,
      price: priceNumber,
    });

    setName('');
    setDescription('');
    setPrice('');
    setLoading(false);
    
    setTimeout(() => {
      navigate('/products');
    }, 1500);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
          <ArrowBack fontSize="small" />
          <span>Voltar</span>
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-success to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Add className="text-white" style={{ fontSize: 32 }} />
            </div>
            <CardTitle className="text-2xl font-bold">Cadastrar Produto</CardTitle>
            <p className="text-muted-foreground">
              Adicione um novo produto ao catálogo
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Nome do produto *</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Monitor"
                  className="input-modern"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva as características e benefícios do produto..."
                  className="input-modern min-h-[100px] resize-none"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.,]/g, '');
                    setPrice(value);
                  }}
                  placeholder="0,00"
                  className="input-modern"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use vírgula ou ponto para decimais (ex: 1299,99)
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/products')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 btn-gradient"
                  disabled={loading || !name || !description || !price}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;