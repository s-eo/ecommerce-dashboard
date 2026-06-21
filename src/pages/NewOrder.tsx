import { type SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Trash2, Package, User, MapPin, CheckSquare } from 'lucide-react';
import type { Order, OrderStatus, PaymentMethod, OrderItem, Product } from '../types';

type OrderFormData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNumber: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  shippingAddress: string;
  shippingCity: string;
  shippingRegion: string;
  shippingZip: string;
  shippingCountry: string;
  notes: string;
  giftWrap: boolean;
  expeditedShipping: boolean;
};

// Mock products for selection
const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81fPKd-2h7L._AC_SL1500_.jpg',
    status: 'In Stock',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 199.99,
    description: 'Feature-rich smart watch',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71pW4hdQVnL._AC_UL640_QL65_ML3_.jpg',
    status: 'In Stock',
  },
  {
    id: 3,
    title: 'Laptop Stand',
    price: 49.99,
    description: 'Ergonomic laptop stand',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71YXzoO-uL._AC_UL640_QL65_ML3_.jpg',
    status: 'In Stock',
  },
  {
    id: 4,
    title: 'Mechanical Keyboard',
    price: 149.99,
    description: 'RGB mechanical keyboard',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61U7T1lutQ._AC_SY879_.jpg',
    status: 'In Stock',
  },
  {
    id: 5,
    title: 'Wireless Mouse',
    price: 39.99,
    description: 'Ergonomic wireless mouse',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SL1500_.jpg',
    status: 'In Stock',
  },
];

const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 300);
  });
};

const combineOrder = (data: OrderFormData): Order => {
  return ({
    id: Date.now().toString(),
    orderNumber: data.orderNumber,
    customer: {
      id: '1',
      name: data.customerName,
      email: data.customerEmail,
      avatar: data.customerName.split(' ').map(n => n[0]).join('').toUpperCase(),
      group: 'New',
      totalOrders: 1,
      totalSpent: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      location: data.shippingCity,
      country: data.shippingCountry,
      status: 'Active',
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    },
    items: data.items,
    total: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    paymentMethod: data.paymentMethod,
    status: data.status,
    date: data.orderDate,
  });
};

export default function NewOrder() {
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<OrderFormData>({
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      orderNumber: `#ORD-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      paymentMethod: 'Credit Card',
      items: [],
      shippingAddress: '',
      shippingCity: '',
      shippingRegion: '',
      shippingZip: '',
      shippingCountry: 'US',
      notes: '',
      giftWrap: false,
      expeditedShipping: false,
    },
  });

  const { append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');
  const giftWrap = watch('giftWrap');
  const expeditedShipping = watch('expeditedShipping');

  const mutation = useMutation({
    mutationFn: async (data: OrderFormData) => {
      setTimeout(() => {
        const order = combineOrder(data);
        return JSON.stringify({"status": "success", "data": order});
      }, 500);
    },
  });

  const onSubmit: SubmitHandler<OrderFormData> = (data) => {
    mutation.mutate(data);
  };

  const addProduct = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId);
    if (product) {
      append({
        id: product.id.toString(),
        name: product.title,
        image: product.image,
        quantity: 1,
        price: product.price,
      });
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shippingCost = expeditedShipping ? 19.99 : 9.99;
  const giftWrapCost = giftWrap ? items.length * 2.99 : 0;
  const total = subtotal + tax + shippingCost + giftWrapCost;

  const inputClasses = "px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block";
  const sectionClasses = "bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6";

  return (
    <div className="p-6 pt-20">
      <div className="mb-6">
        <p className="text-sm text-left text-gray-500 dark:text-gray-400">Fill in the details below to create a new order</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className={sectionClasses}>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 text-left">
                <div>
                  <label htmlFor="customerName" className={labelClasses}>Full Name</label>
                  <input
                    id="customerName"
                    {...register('customerName', { required: 'Name is required' })}
                    className={inputClasses}
                    placeholder="John Doe"
                  />
                  {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>}
                </div>
                <div>
                  <label htmlFor="customerEmail" className={labelClasses}>Email</label>
                  <input
                    id="customerEmail"
                    type="email"
                    {...register('customerEmail', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={inputClasses}
                    placeholder="john@example.com"
                  />
                  {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>}
                </div>
                <div>
                  <label htmlFor="customerPhone" className={labelClasses}>Phone</label>
                  <input
                    id="customerPhone"
                    {...register('customerPhone', { required: 'Phone is required' })}
                    className={inputClasses}
                    placeholder="+1 234 567 8900"
                  />
                  {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className={sectionClasses}>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="md:grid-cols-2">
                  <label htmlFor="orderNumber" className={labelClasses}>Order Number</label>
                  <input
                    id="orderNumber"
                    {...register('orderNumber', { required: 'Order number is required' })}
                    className={inputClasses}
                  />
                  {errors.orderNumber && <p className="text-red-500 text-sm mt-1">{errors.orderNumber.message}</p>}
                </div>
                <div>
                  <label htmlFor="orderDate" className={labelClasses}>Order Date</label>
                  <input
                    id="orderDate"
                    type="date"
                    {...register('orderDate', { required: 'Order date is required' })}
                    className={inputClasses}
                  />
                  {errors.orderDate && <p className="text-red-500 text-sm mt-1">{errors.orderDate.message}</p>}
                </div>
                <div>
                  <label htmlFor="status" className={labelClasses}>Status</label>
                  <select
                    id="status"
                    {...register('status', { required: 'Status is required' })}
                    className={inputClasses}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                </div>
                <div className="md:grid-cols-2">
                  <label htmlFor="paymentMethod" className={labelClasses}>Payment Method</label>
                  <select
                    id="paymentMethod"
                    {...register('paymentMethod', { required: 'Payment method is required' })}
                    className={inputClasses}
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                  {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className={sectionClasses}>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Product Selection</h2>
              </div>
              <div className="flex gap-4 mb-4 text-left">
                <div className="flex-1">
                  <label htmlFor="productSelect" className={labelClasses}>Select Product</label>
                  <select
                    id="productSelect"
                    disabled={productsLoading}
                    className={inputClasses}
                    onChange={(e) => {
                      if (e.target.value) {
                        addProduct(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Choose a product...</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id.toString()}>
                        {product.title} - ${product.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items Table */}
              {items.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Product</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Price</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Quantity</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Total</th>
                        <th className="py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-sm text-gray-900 dark:text-white">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">${item.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              min="1"
                              {...register(`items.${index}.quantity`, { 
                                required: true,
                                valueAsNumber: true,
                                min: 1
                              })}
                              className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div className={sectionClasses}>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="md:col-span-2">
                  <label htmlFor="shippingAddress" className={labelClasses}>Street Address</label>
                  <input
                    id="shippingAddress"
                    {...register('shippingAddress', { required: 'Address is required' })}
                    className={inputClasses}
                    placeholder="123 Main Street"
                  />
                  {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.message}</p>}
                </div>
                <div>
                  <label htmlFor="shippingCity" className={labelClasses}>City</label>
                  <input
                    id="shippingCity"
                    {...register('shippingCity', { required: 'City is required' })}
                    className={inputClasses}
                    placeholder="New York"
                  />
                  {errors.shippingCity && <p className="text-red-500 text-sm mt-1">{errors.shippingCity.message}</p>}
                </div>
                <div>
                  <label htmlFor="shippingRegion" className={labelClasses}>Region</label>
                  <input
                    id="shippingRegion"
                    {...register('shippingRegion', { required: 'State is required' })}
                    className={inputClasses}
                    placeholder="NY"
                  />
                  {errors.shippingRegion && <p className="text-red-500 text-sm mt-1">{errors.shippingRegion.message}</p>}
                </div>
                <div>
                  <label htmlFor="shippingZip" className={labelClasses}>ZIP Code</label>
                  <input
                    id="shippingZip"
                    {...register('shippingZip', { required: 'ZIP is required' })}
                    className={inputClasses}
                    placeholder="10001"
                  />
                  {errors.shippingZip && <p className="text-red-500 text-sm mt-1">{errors.shippingZip.message}</p>}
                </div>
                <div>
                  <label htmlFor="shippingCountry" className={labelClasses}>Country</label>
                  <input
                    id="shippingCountry"
                    {...register('shippingCountry', { required: 'Country is required' })}
                    className={inputClasses}
                    placeholder="US"
                  />
                  {errors.shippingCountry && <p className="text-red-500 text-sm mt-1">{errors.shippingCountry.message}</p>}
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className={sectionClasses}>
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Additional Options</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="giftWrap"
                    {...register('giftWrap')}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="giftWrap" className="text-sm text-gray-700 dark:text-gray-300">
                    Gift Wrap (+${giftWrapCost.toFixed(2)})
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="expeditedShipping"
                    {...register('expeditedShipping')}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="expeditedShipping" className="text-sm text-gray-700 dark:text-gray-300">
                    Expedited Shipping (+${(expeditedShipping ? 19.99 : 9.99).toFixed(2)})
                  </label>
                </div>
                <div className="text-right">
                  <label htmlFor="notes" className={labelClasses}>Order Notes</label>
                  <textarea
                    id="notes"
                    {...register('notes')}
                    className={inputClasses}
                    rows={3}
                    placeholder="Add any special instructions..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className={sectionClasses} style={{ marginBottom: 0 }}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                  <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-white">${shippingCost.toFixed(2)}</span>
                </div>
                {giftWrapCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Gift Wrap</span>
                    <span className="text-gray-900 dark:text-white">${giftWrapCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-base font-bold text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={mutation.isPending || items.length === 0}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {mutation.isPending ? 'Creating Order...' : 'Create Order'}
              </button>

              {mutation.isSuccess && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-sm">
                  Order created successfully!
                </div>
              )}

              {mutation.isError && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg text-sm">
                  Error creating order. Please try again.
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
