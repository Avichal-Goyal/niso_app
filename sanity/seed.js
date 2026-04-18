import { client } from './lib/client.js';

// Sample data
const categories = [
  {
    _type: 'category',
    title: 'Fiction',
    slug: { _type: 'slug', current: 'fiction' },
  },
  {
    _type: 'category',
    title: 'Non-Fiction',
    slug: { _type: 'slug', current: 'non-fiction' },
  },
  {
    _type: 'category',
    title: 'Science',
    slug: { _type: 'slug', current: 'science' },
  },
];

const customers = [
  {
    _type: 'customer',
    email: 'john@example.com',
    name: 'John Doe',
    clerkUserId: 'clerk123',
    razorpayCustomerId: 'cust_razor123',
    createdAt: new Date().toISOString(),
  },
  {
    _type: 'customer',
    email: 'jane@example.com',
    name: 'Jane Smith',
    clerkUserId: 'clerk456',
    razorpayCustomerId: 'cust_razor456',
    createdAt: new Date().toISOString(),
  },
];

async function createSampleData() {
  try {
    console.log('Creating categories...');
    const createdCategories = await Promise.all(
      categories.map(cat => client.create(cat))
    );
    console.log('Categories created:', createdCategories.map(c => c._id));

    console.log('Creating customers...');
    const createdCustomers = await Promise.all(
      customers.map(cust => client.create(cust))
    );
    console.log('Customers created:', createdCustomers.map(c => c._id));

    // Books - need to reference categories
    const books = [
      {
        _type: 'book',
        name: 'The Great Gatsby',
        slug: { _type: 'slug', current: 'the-great-gatsby' },
        description: 'A classic American novel set in the Jazz Age.',
        price: 500,
        category: { _type: 'reference', _ref: createdCategories[0]._id },
        stock: 10,
        featured: true,
        // Note: images omitted - add manually in Studio
      },
      {
        _type: 'book',
        name: 'To Kill a Mockingbird',
        slug: { _type: 'slug', current: 'to-kill-a-mockingbird' },
        description: 'A gripping tale of racial injustice and childhood innocence.',
        price: 450,
        category: { _type: 'reference', _ref: createdCategories[0]._id },
        stock: 5,
        featured: false,
      },
      {
        _type: 'book',
        name: 'Sapiens',
        slug: { _type: 'slug', current: 'sapiens' },
        description: 'A brief history of humankind.',
        price: 800,
        category: { _type: 'reference', _ref: createdCategories[1]._id },
        stock: 15,
        featured: true,
      },
      {
        _type: 'book',
        name: 'The Physics of the Impossible',
        slug: { _type: 'slug', current: 'the-physics-of-the-impossible' },
        description: 'Exploring the science of science fiction.',
        price: 600,
        category: { _type: 'reference', _ref: createdCategories[2]._id },
        stock: 8,
        featured: false,
      },
    ];

    console.log('Creating books...');
    const createdBooks = await Promise.all(
      books.map(book => client.create(book))
    );
    console.log('Books created:', createdBooks.map(b => b._id));

    // Orders
    const orders = [
      {
        _type: 'order',
        orderNumber: 'ORD001',
        items: [
          {
            _type: 'object',
            book: { _type: 'reference', _ref: createdBooks[0]._id },
            quantity: 1,
            priceAtPurchase: 500,
          },
          {
            _type: 'object',
            book: { _type: 'reference', _ref: createdBooks[2]._id },
            quantity: 2,
            priceAtPurchase: 800,
          },
        ],
        total: 2100,
        status: 'paid',
        customer: { _type: 'reference', _ref: createdCustomers[0]._id },
        clerkUserId: 'clerk123',
        email: 'john@example.com',
        address: {
          _type: 'object',
          name: 'John Doe',
          line1: '123 Main St',
          line2: '',
          city: 'New York',
          postcode: '10001',
          country: 'USA',
        },
        razorpayPaymentId: 'pay_razor123',
        createdAt: new Date().toISOString(),
      },
      {
        _type: 'order',
        orderNumber: 'ORD002',
        items: [
          {
            _type: 'object',
            book: { _type: 'reference', _ref: createdBooks[3]._id },
            quantity: 1,
            priceAtPurchase: 600,
          },
          {
            _type: 'object',
            book: { _type: 'reference', _ref: createdBooks[1]._id },
            quantity: 1,
            priceAtPurchase: 450,
          },
        ],
        total: 1050,
        status: 'shipped',
        customer: { _type: 'reference', _ref: createdCustomers[1]._id },
        clerkUserId: 'clerk456',
        email: 'jane@example.com',
        address: {
          _type: 'object',
          name: 'Jane Smith',
          line1: '456 Oak Ave',
          line2: 'Apt 2B',
          city: 'Los Angeles',
          postcode: '90210',
          country: 'USA',
        },
        razorpayPaymentId: 'pay_razor456',
        createdAt: new Date().toISOString(),
      },
    ];

    console.log('Creating orders...');
    const createdOrders = await Promise.all(
      orders.map(order => client.create(order))
    );
    console.log('Orders created:', createdOrders.map(o => o._id));

    console.log('Sample data created successfully!');
    console.log('Note: Book images need to be added manually in Sanity Studio due to validation requirements.');

  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}

createSampleData();