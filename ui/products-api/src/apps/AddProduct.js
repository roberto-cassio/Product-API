import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useProducts } from '@/contexts';
import { Button, Card, Input, Label, Textarea, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Add, ArrowBack } from '@mui/icons-material';
import { toast } from 'react-toastify'
import { formatPrice } from '@/lib/utils';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceDisplay, setPriceDisplay] = useState('');
  const [priceRaw, setPriceRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const { addProduct } = useProducts();
  const { isAuthenticated } = useAuth();


  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const priceNumber = parseInt(priceRaw,10);
    
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setLoading(false);
      return;
    }
    try{
    await addProduct({
      name,
      description,
      price: priceNumber,
    });

    setName('');
    setDescription('');
    setPriceDisplay('');
    setPriceRaw('');
    
    toast.success('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Ocorreu um erro ao cadastrar o produto. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
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
                  value={priceDisplay}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    const formatted = formatPrice(e.target.value);

                    setPriceRaw(raw);
                    setPriceDisplay(formatted);
                  }}
                  placeholder="0.00"
                  className="input-modern"
                  required
                />

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
                  disabled={loading || !name || !description || !priceRaw}
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