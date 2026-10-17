export interface Product {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  category: 'medicines' | 'vitamins' | 'skincare' | 'devices' | 'baby';
  categoryLabel: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  image: string;
  inStock: boolean;
  requiresPrescription: boolean;
  dosageForm: string; // أقراص، شراب، كريم، جهاز، إلخ
  strength?: string;  // 500mg, 1000mg, 400ml
  rating: number;
  reviewCount: number;
  activeIngredients?: string;
  usageDirections?: string;
  warnings?: string;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PrescriptionSubmission {
  id: string;
  ticketNumber: string;
  patientName: string;
  phoneNumber: string;
  address: string;
  notes?: string;
  fileName: string;
  fileSize: string;
  previewUrl?: string;
  submittedAt: string;
  status: 'pending' | 'reviewing' | 'preparing' | 'ready';
}

export interface UserAccount {
  name: string;
  phone: string;
  email: string;
  address: string;
  savedAddresses: string[];
  orderCount: number;
}

export type PaymentMethod = 'cash' | 'card' | 'wallet';

export interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  customerName: string;
  phoneNumber: string;
  shippingAddress: string;
}
