import React, { useState, useMemo } from 'react';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { Product, CartItem, PrescriptionSubmission, OrderConfirmation } from './types';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { PrescriptionUploadModule } from './components/PrescriptionUploadModule';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PharmacistConsultationModal } from './components/PharmacistConsultationModal';
import { UserAccountModal } from './components/UserAccountModal';
import { RequestMedicineModal } from './components/RequestMedicineModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    // Pre-populate with 1 essential item for immediate demonstration of the cart
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
  ]);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isRequestMedicineOpen, setIsRequestMedicineOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // User History
  const [recentPrescriptions, setRecentPrescriptions] = useState<PrescriptionSubmission[]>([]);
  const [recentOrders, setRecentOrders] = useState<OrderConfirmation[]>([]);

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartItemsMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of cart) {
      map[item.product.id] = item.quantity;
    }
    return map;
  }, [cart]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyPromoCode = (code: string): boolean => {
    if (code.trim().toUpperCase() === 'MOAMEN10') {
      setDiscountPercent(10);
      return true;
    }
    return false;
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: OrderConfirmation) => {
    setRecentOrders((prev) => [order, ...prev]);
    setCart([]); // Clear cart after order confirmation
  };

  const handlePrescriptionSubmitted = (submission: PrescriptionSubmission) => {
    setRecentPrescriptions((prev) => [submission, ...prev]);
  };

  const handleOpenConsultationWithTopic = (topic: string) => {
    setConsultationTopic(topic);
    setIsConsultationOpen(true);
  };

  // Scroll helpers
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrescription = () => {
    const el = document.getElementById('prescription-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800" dir="rtl">
      {/* 1. Top Utility Contact Bar */}
      <TopUtilityBar onOpenConsultation={() => handleOpenConsultationWithTopic('استشارة عامة')} />

      {/* 2. Main Navigation Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPrescription={scrollToPrescription}
        onOpenAccount={() => setIsAccountOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Visual Showcase */}
        <HeroSection
          onScrollToCatalog={scrollToCatalog}
          onScrollToPrescription={scrollToPrescription}
        />

        {/* 4. Specialized Health Categories Showcase */}
        <CategoryShowcase
          selectedCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToCatalog();
          }}
        />

        {/* 5. Structured Product Catalog & Services Grid */}
        <ProductCatalog
          products={products}
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onViewDetails={(p) => setSelectedProduct(p)}
          cartItemsMap={cartItemsMap}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onRequestMedicine={() => setIsRequestMedicineOpen(true)}
        />

        {/* 6. Prescription Upload Module (قسم رفع الروشتة) */}
        <PrescriptionUploadModule
          onPrescriptionSubmitted={handlePrescriptionSubmitted}
        />
      </main>

      {/* 7. Comprehensive Pharmacy Footer */}
      <Footer
        onScrollToTop={scrollToTop}
        onOpenConsultation={() => handleOpenConsultationWithTopic('استشارة عامة')}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
      />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onBrowseCatalog={scrollToCatalog}
        appliedDiscount={discountPercent}
        onApplyPromoCode={handleApplyPromoCode}
      />

      {/* Checkout Modal with Multiple Payment Methods */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartTotal}
        deliveryFee={cartTotal >= 300 || cartTotal === 0 ? 0 : 25}
        discount={Math.round((cartTotal * discountPercent) / 100)}
        total={Math.max(
          0,
          cartTotal -
            Math.round((cartTotal * discountPercent) / 100) +
            (cartTotal >= 300 || cartTotal === 0 ? 0 : 25)
        )}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenConsultation={handleOpenConsultationWithTopic}
      />

      {/* Clinical Pharmacist Consultation Modal */}
      <PharmacistConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialTopic={consultationTopic}
      />

      {/* User Account & History Modal */}
      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        recentPrescriptions={recentPrescriptions}
        recentOrders={recentOrders}
      />

      {/* Special Request for Unavailable Medicine Modal */}
      <RequestMedicineModal
        isOpen={isRequestMedicineOpen}
        onClose={() => setIsRequestMedicineOpen(false)}
      />

      {/* Floating 24/7 WhatsApp & Hotline Contact Button */}
      <FloatingWhatsApp />
    </div>
  );
}
