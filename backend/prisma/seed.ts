import { PrismaClient } from '@prisma/client';
import { randomInt } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  console.log('🗑️  Cleared existing data');

  // Create Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 79.99,
        stock: 150,
        category: 'Electronics',
      },
      {
        name: 'Smart Watch Series 5',
        description: 'Fitness tracker with heart rate monitor, GPS, and water resistance.',
        price: 299.99,
        stock: 75,
        category: 'Electronics',
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Adjustable height, lumbar support, and breathable mesh back.',
        price: 199.99,
        stock: 40,
        category: 'Furniture',
      },
      {
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB backlit, Cherry MX switches, and programmable keys.',
        price: 129.99,
        stock: 100,
        category: 'Electronics',
      },
      {
        name: 'USB-C Hub Adapter',
        description: '7-in-1 hub with HDMI, USB 3.0, SD card reader, and power delivery.',
        price: 49.99,
        stock: 200,
        category: 'Accessories',
      },
      {
        name: 'Standing Desk Converter',
        description: 'Adjustable height desk converter for ergonomic working.',
        price: 249.99,
        stock: 30,
        category: 'Furniture',
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic design with adjustable DPI and silent clicks.',
        price: 39.99,
        stock: 180,
        category: 'Electronics',
      },
      {
        name: '4K Monitor 27-inch',
        description: 'IPS display with HDR support and 60Hz refresh rate.',
        price: 399.99,
        stock: 50,
        category: 'Electronics',
      },
      {
        name: 'Laptop Stand Aluminum',
        description: 'Adjustable and foldable laptop stand for better ergonomics.',
        price: 59.99,
        stock: 120,
        category: 'Accessories',
      },
      {
        name: 'Webcam 1080p HD',
        description: 'Auto-focus, built-in microphone, and low-light correction.',
        price: 69.99,
        stock: 90,
        category: 'Electronics',
      },
      {
        name: 'Desk Lamp LED',
        description: 'Adjustable brightness and color temperature with USB charging port.',
        price: 44.99,
        stock: 85,
        category: 'Lighting',
      },
      {
        name: 'Cable Management Kit',
        description: 'Includes cable ties, clips, and organizer box.',
        price: 19.99,
        stock: 250,
        category: 'Accessories',
      },
    ],
  });
  console.log(`✅ Created ${products.count} products`);

  // Fetch all products to use in orders
  const allProducts = await prisma.product.findMany();

  // Create Customers
  const customers = await prisma.customer.createMany({
    data: [
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1-555-0101',
        address: '123 Main St, New York, NY 10001',
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1-555-0102',
        address: '456 Oak Ave, Los Angeles, CA 90001',
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+1-555-0103',
        address: '789 Pine Rd, Chicago, IL 60601',
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone: '+1-555-0104',
        address: '321 Elm St, Houston, TX 77001',
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        phone: '+1-555-0105',
        address: '654 Maple Dr, Phoenix, AZ 85001',
      },
      {
        name: 'Jessica Martinez',
        email: 'jessica.martinez@example.com',
        phone: '+1-555-0106',
        address: '987 Cedar Ln, Philadelphia, PA 19101',
      },
      {
        name: 'Christopher Lee',
        email: 'christopher.lee@example.com',
        phone: '+1-555-0107',
        address: '147 Birch Blvd, San Antonio, TX 78201',
      },
      {
        name: 'Amanda Taylor',
        email: 'amanda.taylor@example.com',
        phone: '+1-555-0108',
        address: '258 Spruce Way, San Diego, CA 92101',
      },
    ],
  });
  console.log(`✅ Created ${customers.count} customers`);

  // Fetch all customers
  const allCustomers = await prisma.customer.findMany();

  // Create Orders with OrderItems
  const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  for (const customer of allCustomers) {
    // Create 1-3 orders per customer
    const numOrders = randomInt(1, 4);
    
    for (let i = 0; i < numOrders; i++) {
      // Select 1-4 random products for this order
      const numItems = randomInt(1, 5);
      const shuffledProducts = [...allProducts].sort(() => Math.random() - 0.5);
      const selectedProducts = shuffledProducts.slice(0, numItems);
      
      // Calculate order total
      let total = 0;
      const orderItems = selectedProducts.map(product => {
        const quantity = randomInt(1, 4);
        const itemTotal = product.price * quantity;
        total += itemTotal;
        return {
          productId: product.id,
          quantity,
          price: product.price,
        };
      });
      
      // Create order with items
      const order = await prisma.order.create({
        data: {
          customerId: customer.id,
          total,
          status: orderStatuses[randomInt(0, orderStatuses.length)],
          items: {
            create: orderItems,
          },
        },
      });
      
      console.log(`✅ Created order ${order.id} for ${customer.name} (${orderItems.length} items, $${total.toFixed(2)})`);
    }
  }

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
