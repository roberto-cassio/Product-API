import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea
} from '../../components/ui';
import { formatPrice } from '../../utils/utils';

const EditProductDialog = ({
  product,
  open,
  onOpenChange,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceDisplay, setPriceDisplay] = useState('');
  const [priceRaw, setPriceRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const { editProduct } = useProducts();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      const priceInCents = Math.round(product.priceInReais * 100);
      setPriceRaw(priceInCents.toString());
      setPriceDisplay(formatPrice(priceInCents.toString()));
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    
    setLoading(true);
    
    const priceNumber = parseInt(priceRaw, 10);
    
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setLoading(false);
      return;
    }

    editProduct(product.id, {
      name,
      description,
      price: priceNumber,
    });

    setLoading(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setName('');
    setDescription('');
    setPriceDisplay('');
    setPriceRaw('');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Nome do produto *</Label>
            <Input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Notebook Gamer Dell"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="edit-description">Descrição *</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva as características e benefícios do produto..."
              className="min-h-[100px] resize-none"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="edit-price">Preço (R$) *</Label>
            <Input
              id="edit-price"
              type="text"
              value={priceDisplay}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '');
                const formatted = formatPrice(e.target.value);

                setPriceRaw(raw);
                setPriceDisplay(formatted);
              }}
              placeholder="0.00"
              required
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading || !name || !description || !priceRaw}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export  { EditProductDialog };