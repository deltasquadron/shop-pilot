'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Select, Card, LoadingSpinner, ErrorMessage } from '@/components';
import { Save, X, Image as ImageIcon, Package, DollarSign, FileText, FolderOpen, CheckCircle, XCircle, Archive } from 'lucide-react';
import type { Product } from '@/types';

const CATEGORIES = ['Electronics', 'Office', 'Clothing', 'Home'];
const STATUS_OPTIONS = [
  { value: 'active', label: 'Active', icon: <CheckCircle className="w-4 h-4" /> },
  { value: 'inactive', label: 'Inactive', icon: <XCircle className="w-4 h-4" /> },
  { value: 'archived', label: 'Archived', icon: <Archive className="w-4 h-4" /> },
];

interface ProductFormProps {
  product?: Product;
  mode?: 'create' | 'edit';
}

interface FormErrors {
  name?: string;
  price?: string;
  category?: string;
  status?: string;
  description?: string;
  images?: string;
}

export function ProductForm({ product, mode = 'create' }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price?.toString() || '',
    description: product?.description || '',
    category: product?.category || '',
    status: product?.status || 'active',
    images: product?.images?.join(', ') || '',
  });
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        images: formData.images
          .split(',')
          .map((url) => url.trim())
          .filter((url) => url.length > 0),
      };
      
      const url = mode === 'edit' && product ? `/api/products/${product.id}` : '/api/products';
      const method = mode === 'edit' ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/products');
      } else {
        setError(data.error || `Failed to ${mode === 'create' ? 'create' : 'update'} product`);
      }
    } catch (err) {
      setError(`An error occurred while ${mode === 'create' ? 'creating' : 'updating'} the product`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
  
  const handleCancel = () => {
    router.back();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text)]">
            {mode === 'create' ? 'Create New Product' : 'Edit Product'}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {mode === 'create' ? 'Fill in the details to create a new product' : 'Update the product information'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleCancel} icon={<X className="w-4 h-4" />}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            loadingText="Saving..."
            icon={<Save className="w-4 h-4" />}
          >
            {mode === 'create' ? 'Create Product' : 'Save Changes'}
          </Button>
        </div>
      </div>
      
      {error && <ErrorMessage title="Error" message={error} />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <Input
                  label="Product Name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                  leftIcon={<Package className="w-4 h-4 text-[var(--text-secondary)]" />}
                />
              </div>
              
              <div>
                <Input
                  label="Description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  error={errors.description}
                  leftIcon={<FileText className="w-4 h-4 text-[var(--text-secondary)]" />}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    error={errors.price}
                    leftIcon={<DollarSign className="w-4 h-4 text-[var(--text-secondary)]" />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[var(--text)]">
                    Category
                  </label>
                  <Select
                    inputSize="md"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    error={errors.category}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Select>
                </div>
              </div>
              
              <div>
                <Input
                  label="Images (comma-separated URLs)"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  value={formData.images}
                  onChange={(e) => handleChange('images', e.target.value)}
                  leftIcon={<ImageIcon className="w-4 h-4 text-[var(--text-secondary)]" />}
                />
                {formData.images && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {formData.images
                      .split(',')
                      .map((url) => url.trim())
                      .filter((url) => url.length > 0)
                      .map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Product image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md border border-[var(--border)]"
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 space-y-6">
              <h3 className="font-medium text-[var(--text)] flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Product Status
              </h3>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--text)]">
                  Status
                </label>
                <Select
                  inputSize="md"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  error={errors.status}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </div>
              
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="text-sm text-[var(--text-secondary)]">
                  <p className="font-medium text-[var(--text)] mb-1">Status Guide:</p>
                  <ul className="space-y-1 mt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                      Active: Visible and purchasable
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-[var(--warning)]" />
                      Inactive: Hidden from store
                    </li>
                    <li className="flex items-center gap-2">
                      <Archive className="w-4 h-4 text-[var(--error)]" />
                      Archived: Removed from active catalog
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            {product && (
              <Card className="p-6">
                <h3 className="font-medium text-[var(--text)] mb-3">Product Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">ID:</span>
                    <span className="text-[var(--text)] font-mono">{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Created:</span>
                    <span className="text-[var(--text)]">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Updated:</span>
                    <span className="text-[var(--text)]">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
