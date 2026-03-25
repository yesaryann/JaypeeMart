const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campus-marketplace';

const PRODUCTS_DATA = {
  'Books': [
    { title: 'Advanced Engineering Mathematics', keyword: 'textbook', price: 450 },
    { title: 'Data Structures and Algorithms in C++', keyword: 'algorithm', price: 350 },
    { title: 'Let Us C by Yashavant Kanetkar', keyword: 'programming', price: 200 },
    { title: 'Digital Design by M. Morris Mano', keyword: 'engineering', price: 300 },
    { title: 'University Physics with Modern Physics', keyword: 'physics', price: 600 },
    { title: 'Microelectronic Circuits by Sedra/Smith', keyword: 'circuits', price: 550 },
    { title: 'Intro to Electrodynamics by Griffiths', keyword: 'electromagnetism', price: 400 },
    { title: 'Operating System Concepts (Dinosaur Book)', keyword: 'computer', price: 500 },
    { title: 'Computer Networking: A Top-Down Approach', keyword: 'network', price: 450 },
    { title: 'Database System Concepts', keyword: 'database', price: 480 },
    { title: 'Fundamentals of Logic Design', keyword: 'logic', price: 350 },
    { title: 'Thermodynamics: An Engineering Approach', keyword: 'thermodynamics', price: 420 },
  ],
  'Vehicles': [
    { title: 'Hero Sprint Pro Bicycle', keyword: 'bicycle', price: 3500 },
    { title: 'Firefox Target 21 Speed MTB', keyword: 'mountainbike', price: 5500 },
    { title: 'Hercules Roadeo Cycle', keyword: 'bike', price: 2800 },
    { title: 'Mach City iBike (Single Speed)', keyword: 'cycle', price: 3000 },
    { title: 'TVS Jupiter Scooter (2018 Model)', keyword: 'scooter', price: 25000 },
    { title: 'Honda Activa 5G (Second Hand)', keyword: 'moped', price: 30000 },
    { title: 'Avon Bicycles - Single Speed', keyword: 'bicycle', price: 1500 },
    { title: 'Used Electric Scooter', keyword: 'electricscooter', price: 18000 },
    { title: 'Skateboard - Decathlon beginner', keyword: 'skateboard', price: 800 },
    { title: 'Roller Skates - Nivia Inline', keyword: 'rollerskates', price: 1200 },
    { title: 'Atlas Metal Bicycle', keyword: 'oldbike', price: 1000 },
    { title: 'Btwin Rockrider MTB Cycle', keyword: 'btwin', price: 4500 },
  ],
  'Furniture': [
    { title: 'Hostel Single Bed Mattress (Cotton)', keyword: 'mattress', price: 600 },
    { title: 'Wooden Study Table with Drawer', keyword: 'studytable', price: 1200 },
    { title: 'Ergonomic Office Chair', keyword: 'officechair', price: 2500 },
    { title: 'Plastic Chair - Nilkamal', keyword: 'plasticchair', price: 300 },
    { title: 'Foldable Laptop Table for Bed', keyword: 'laptoptable', price: 450 },
    { title: 'Bean Bag (XXL) with Beans', keyword: 'beanbag', price: 900 },
    { title: 'Bookshelf (3-tier Engineered Wood)', keyword: 'bookshelf', price: 800 },
    { title: 'Clothes Wardrobe (Collapsible Fabric)', keyword: 'wardrobe', price: 500 },
    { title: 'Shoe Rack (4-tier Plastic)', keyword: 'shoerack', price: 250 },
    { title: 'Bedside Table / Nightstand', keyword: 'bedsidetable', price: 400 },
    { title: 'Whiteboard (2x3 ft)', keyword: 'whiteboard', price: 350 },
    { title: 'Cork Notice Board with Pins', keyword: 'noticeboard', price: 150 },
  ],
  'Electronics': [
    { title: 'Casio fx-991EX Scientific Calculator', keyword: 'calculator', price: 850 },
    { title: 'Logitech B170 Wireless Mouse', keyword: 'mouse', price: 400 },
    { title: 'JBL Go 2 Bluetooth Speaker', keyword: 'speaker', price: 1200 },
    { title: 'Dell Laptop Charger 65W Original', keyword: 'charger', price: 900 },
    { title: 'Boat Bassheads 100 Wired Earphones', keyword: 'earphones', price: 200 },
    { title: 'OnePlus Nord Silicone Mobile Cover', keyword: 'phonecase', price: 150 },
    { title: 'Keychron Mechanical Keyboard', keyword: 'keyboard', price: 4500 },
    { title: 'Sandisk 64GB USB Pendrive', keyword: 'pendrive', price: 350 },
    { title: 'Amazon Kindle Paperwhite (10th Gen)', keyword: 'kindle', price: 6500 },
    { title: 'Extension Board (4 Sockets, 2m wire)', keyword: 'extensioncord', price: 250 },
    { title: 'USB-C to HDMI Adapter', keyword: 'adapter', price: 300 },
    { title: 'LED Table Lamp (Rechargeable)', keyword: 'tablelamp', price: 450 },
  ],
  'Other': [
    { title: 'Set of 10 Blue Pens - Reynolds', keyword: 'pen', price: 50 },
    { title: 'A4 Size Spiral Notebooks (Pack of 5)', keyword: 'notebook', price: 250 },
    { title: 'Drafting Kit / Engineering Drawing Set', keyword: 'drafting', price: 400 },
    { title: 'Lab Coat (White, Medium Size)', keyword: 'labcoat', price: 300 },
    { title: 'Badminton Racket - Yonex Muscle Power', keyword: 'badminton', price: 1500 },
    { title: 'Cricket Bat - MRF English Willow', keyword: 'cricketbat', price: 2200 },
    { title: 'Dumbbells 5kg (Set of 2) PVC', keyword: 'dumbbells', price: 600 },
    { title: 'Yoga Mat (Anti-slip, 6mm)', keyword: 'yogamat', price: 350 },
    { title: 'Electric Kettle (Pigeon 1.5L)', keyword: 'electrickettle', price: 500 },
    { title: 'Iron Box (Philips Dry Iron)', keyword: 'iron', price: 450 },
    { title: 'Umbrella (Large, Black)', keyword: 'umbrella', price: 200 },
    { title: 'Campus Backpack / Laptop Bag', keyword: 'backpack', price: 800 },
  ]
};

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding realistic data...');
    
    // Create a seeder user if not exists
    let user = await User.findOne({ rollNumber: 'seeder' });
    if (!user) {
      user = new User({
        name: 'System Admin',
        rollNumber: 'seeder',
        batchYear: 2024,
        hostelNumber: 'Admin Block',
        password: 'password123'
      });
      await user.save();
    }

    // Clear old products
    await Product.deleteMany({});
    
    let allProducts = [];
    
    Object.keys(PRODUCTS_DATA).forEach(category => {
      PRODUCTS_DATA[category].forEach((item, index) => {
        allProducts.push({
          title: item.title,
          description: `Second-hand ${item.title.toLowerCase()} suitable for college use. Condition is generally good. Exact details can be discussed upon contact.`,
          price: item.price,
          image: `https://loremflickr.com/600/400/${item.keyword}?lock=${index}`,
          category: category,
          sellerId: user._id,
          sellerName: user.name
        });
      });
    });

    await Product.insertMany(allProducts);
    console.log(`Successfully seeded ${allProducts.length} realistic college products!`);
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
