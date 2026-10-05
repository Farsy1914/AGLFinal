export const farmerDashboardData = {
  profile: {
    name: 'Rahim Uddin',
    initials: 'RU',
    location: 'Bogra, Bangladesh',
    totalEarnings: 45200,
  },
  stats: [
    { id: 'st-1', titleKey: 'totalSales', value: '৳45,200' },
    { id: 'st-2', titleKey: 'activeListings', value: '8 Crops' },
    { id: 'st-3', titleKey: 'pendingOrders', value: '12 Delivery' },
    { id: 'st-4', titleKey: 'crowdfundFunds', value: '৳85,000' },
  ],
  recentOrders: [
    { id: 'ord-1', orderNumber: '#ORD-1024', cropName: 'Organic Wheat', buyerName: 'Karim Store', quantity: '150 kg', price: '৳18,000', status: 'In Transit' },
    { id: 'ord-2', orderNumber: '#ORD-1025', cropName: 'Fresh Tomatoes', buyerName: 'Dhaka Fresh LLC', quantity: '50 kg', price: '৳3,000', status: 'Completed' },
    { id: 'ord-3', orderNumber: '#ORD-1026', cropName: 'Aman Paddy', buyerName: 'Green Grain Corp', quantity: '500 kg', price: '৳24,200', status: 'Pending' },
  ],
};
export interface CropListing {
  id: string;
  name: string;
  category: string;
  quantity: string;
  pricePerUnit: string;
  totalValuation: string;
  status: 'Available' | 'Sold Out' | 'Pending Approval';
  harvestDate: string;
  imageIcon: string;
}

export const myCropsData: CropListing[] = [
  {
    id: 'crop-101',
    name: 'Organic Miniket Rice',
    category: 'Grains',
    quantity: '1,200 kg',
    pricePerUnit: '৳70 / kg',
    totalValuation: '৳84,000',
    status: 'Available',
    harvestDate: '12 Oct 2026',
    imageIcon: '🌾',
  },
  {
    id: 'crop-102',
    name: 'Fresh Red Tomatoes',
    category: 'Vegetables',
    quantity: '300 kg',
    pricePerUnit: '৳45 / kg',
    totalValuation: '৳13,500',
    status: 'Available',
    harvestDate: '25 Sep 2026',
    imageIcon: '🍅',
  },
  {
    id: 'crop-103',
    name: 'Sweet Potatoes (Bari-4)',
    category: 'Root Crops',
    quantity: '500 kg',
    pricePerUnit: '৳35 / kg',
    totalValuation: '৳17,500',
    status: 'Sold Out',
    harvestDate: '10 Aug 2026',
    imageIcon: '🍠',
  },
  {
    id: 'crop-104',
    name: 'Green Chili (Hybrid)',
    category: 'Spices',
    quantity: '150 kg',
    pricePerUnit: '৳110 / kg',
    totalValuation: '৳16,500',
    status: 'Pending Approval',
    harvestDate: '02 Oct 2026',
    imageIcon: '🌶️',
  },
];
export interface CrowdfundingProject {
  id: string;
  title: string;
  targetAmount: string;
  raisedAmount: string;
  progress: number;
  investorsCount: number;
  status: 'Active' | 'Completed' | 'Pending';
  daysLeft: number;
}

export const crowdfundingData: CrowdfundingProject[] = [
  {
    id: 'cf-1',
    title: 'Boro Rice Cultivation (Winter)',
    targetAmount: '৳1,50,000',
    raisedAmount: '৳85,000',
    progress: 56,
    investorsCount: 12,
    status: 'Active',
    daysLeft: 15,
  },
  {
    id: 'cf-2',
    title: 'Organic Tomato Greenhouse',
    targetAmount: '৳50,000',
    raisedAmount: '৳50,000',
    progress: 100,
    investorsCount: 8,
    status: 'Completed',
    daysLeft: 0,
  },
  {
    id: 'cf-3',
    title: 'Fish Farming Expansion',
    targetAmount: '৳2,00,000',
    raisedAmount: '৳0',
    progress: 0,
    investorsCount: 0,
    status: 'Pending',
    daysLeft: 30,
  }
];
export interface SalesOrder {
  id: string;
  orderNumber: string;
  cropName: string;
  buyerName: string;
  quantity: string;
  totalAmount: string;
  paymentStatus: 'Paid' | 'Pending' | 'Due';
  deliveryStatus: 'Delivered' | 'In Transit' | 'Processing';
  date: string;
}

export const ordersSalesData: SalesOrder[] = [
  {
    id: 'ord-201',
    orderNumber: '#ORD-1024',
    cropName: 'Organic Miniket Rice',
    buyerName: 'Karim Super Store',
    quantity: '150 kg',
    totalAmount: '৳10,500',
    paymentStatus: 'Paid',
    deliveryStatus: 'In Transit',
    date: '28 Sep 2026',
  },
  {
    id: 'ord-202',
    orderNumber: '#ORD-1025',
    cropName: 'Fresh Red Tomatoes',
    buyerName: 'Dhaka Fresh LLC',
    quantity: '50 kg',
    totalAmount: '৳2,250',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    date: '25 Sep 2026',
  },
  {
    id: 'ord-203',
    orderNumber: '#ORD-1026',
    cropName: 'Aman Paddy',
    buyerName: 'Green Grain Corp',
    quantity: '500 kg',
    totalAmount: '৳24,200',
    paymentStatus: 'Pending',
    deliveryStatus: 'Processing',
    date: '29 Sep 2026',
  },
  {
    id: 'ord-204',
    orderNumber: '#ORD-1027',
    cropName: 'Green Chili (Hybrid)',
    buyerName: 'Deshi Agro Mart',
    quantity: '30 kg',
    totalAmount: '৳3,300',
    paymentStatus: 'Due',
    deliveryStatus: 'Processing',
    date: '29 Sep 2026',
  },
];

export interface WeatherForecast {
  day: string;
  temp: string;
  condition: string;
  humidity: string;
  icon: string;
}

export interface AIAdvisoryAlert {
  id: string;
  type: 'Warning' | 'Recommendation' | 'Info';
  title: string;
  description: string;
  date: string;
}

export const weatherData: WeatherForecast[] = [
  { day: 'Today', temp: '29°C', condition: 'Thunderstorm', humidity: '82%', icon: '⛈️' },
  { day: 'Tomorrow', temp: '31°C', condition: 'Partly Cloudy', humidity: '75%', icon: '⛅' },
  { day: 'Thu', temp: '32°C', condition: 'Sunny', humidity: '68%', icon: '☀️' },
  { day: 'Fri', temp: '30°C', condition: 'Light Rain', humidity: '79%', icon: '🌧️' },
];

export const advisoryData: AIAdvisoryAlert[] = [
  {
    id: 'adv-1',
    type: 'Warning',
    title: 'Heavy Rainfall Alert',
    description: 'Ensure proper drainage in Boro Rice fields due to expected heavy rain within the next 24 hours.',
    date: '29 Sep 2026',
  },
  {
    id: 'adv-2',
    type: 'Recommendation',
    title: 'Pest Control (Tomatoes)',
    description: 'Early signs of leaf blight detected in regional soil samples. Apply recommended organic fungicide.',
    date: '28 Sep 2026',
  },
  {
    id: 'adv-3',
    type: 'Info',
    title: 'Optimal Planting Window',
    description: 'Soil moisture levels are ideal for sowing upcoming winter vegetable seeds over the next 3 days.',
    date: '27 Sep 2026',
  },
];

export interface ActiveCrop {
  name: string;
  category: string;
  price: string;
  stock: string;
}

export interface FarmerProfileFull {
  name: string;
  phone: string;
  location: string;
  landSize: string;
  experience: string;
  rating: string;
  totalHarvestSold: string;
  successfulProjects: string;
  memberSince: string;
  isVerified: boolean;
  specialties: string;
  payoutMethod: 'bkash' | 'nagad' | 'bank';
  payoutAccount: string;
  activeCrops: ActiveCrop[];
}

export const farmerFullProfileData: FarmerProfileFull = {
  name: 'Rahim Uddin',
  phone: '+880 1712-345678',
  location: 'Sadar, Bogura, Rajshahi Division',
  landSize: '3.5 Acres',
  experience: '12+ years',
  rating: '⭐ 4.8 / 5.0',
  totalHarvestSold: '12.5 Tons',
  successfulProjects: '4 Campaigns',
  memberSince: 'Jan 2024',
  isVerified: true,
  specialties: 'Organic Wheat, Paddy Rice, and Fresh Vegetables',
  payoutMethod: 'bkash',
  payoutAccount: '01712345678',
  activeCrops: [
    { name: 'Organic Wheat', category: 'Grains', price: '৳120 / kg', stock: '500 kg' },
    { name: 'Fresh Red Tomatoes', category: 'Vegetables', price: '৳60 / kg', stock: '45 kg' },
  ],
};
// Buyer Marketplace Mock Data
export const buyerMarketplaceData = [
  {
    id: '1',
    name: 'Organic Miniket Rice (অর্গানিক মিনিকেট চাল)',
    farmer: 'Rahim Uddin',
    location: 'Bogra, Rajshahi',
    category: 'Grains',
    price: '৳৬৫ / kg',
    availableStock: '১,৫০০ kg',
    rating: '4.9 ⭐',
    isOrganic: true,
    isVerified: true,
    image: '🌾',
  },
  {
    id: '2',
    name: 'Fresh Green Chillies (কাঁচা মরিচ)',
    farmer: 'Karim Miah',
    location: 'Jashore',
    category: 'Vegetables',
    price: '৳৮০ / kg',
    availableStock: '৪০০ kg',
    rating: '4.7 ⭐',
    isOrganic: false,
    isVerified: true,
    image: '🌶️',
  },
  {
    id: '3',
    name: 'Red Potatoes (লাল আলু - ডায়মন্ড)',
    farmer: 'Kamal Hossain',
    location: 'Rangpur',
    category: 'Vegetables',
    price: '৳২৮ / kg',
    availableStock: '৫,০০০ kg',
    rating: '4.8 ⭐',
    isOrganic: true,
    isVerified: true,
    image: '🥔',
  },
  {
    id: '4',
    name: 'Fresh Deshi Onions (দেশি পেঁয়াজ)',
    farmer: 'Anwar Ali',
    location: 'Pabna',
    category: 'Spices',
    price: '৳৫৫ / kg',
    availableStock: '২,০০০ kg',
    rating: '4.6 ⭐',
    isOrganic: false,
    isVerified: true,
    image: '🧅',
  },
];

// Buyer Orders Mock Data
export const buyerOrdersData = [
  {
    id: '1',
    orderNumber: '#ORD-8821',
    cropName: 'Organic Miniket Rice',
    farmerName: 'Rahim Uddin',
    quantity: '200 kg',
    totalPrice: '৳১৩,০০০',
    paymentStatus: 'Paid',
    deliveryStatus: 'In Transit',
    orderDate: '2026-03-28',
  },
  {
    id: '2',
    orderNumber: '#ORD-8740',
    cropName: 'Fresh Green Chillies',
    farmerName: 'Karim Miah',
    quantity: '50 kg',
    totalPrice: '৳৪,০০০',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    orderDate: '2026-03-20',
  },
  {
    id: '3',
    orderNumber: '#ORD-8612',
    cropName: 'Sweet Haribhanga Mangoes',
    farmerName: 'Rafiqul Islam',
    quantity: '100 kg',
    totalPrice: '৳১১,০০০',
    paymentStatus: 'Pending',
    deliveryStatus: 'Processing',
    orderDate: '2026-03-15',
  },
];
// Investor Projects & Portfolio Mock Data
export const investorData = {
  portfolio: {
    totalInvested: '৳২,৫০,০০০',
    expectedReturns: '৳২,৯৫,০০০',
    activeProjectsCount: 4,
    avgRoi: '১৮%',
  },
  projects: [
    {
      id: 'inv-1',
      title: 'Bogra Organic Rice Cultivation Phase 2',
      farmer: 'Rahim Uddin',
      location: 'Bogra',
      targetAmount: '৳৫,০০,০০০',
      raisedAmount: '৳৩,৭৫,০০০',
      minInvestment: '৳১০,০০০',
      duration: '৬ মাস',
      expectedRoi: '২০%',
      progress: 75,
      category: 'Grains',
      image: '🌾',
    },
    {
      id: 'inv-2',
      title: 'Commercial Cattle Raising & Dairy Farm',
      farmer: 'Shamsul Alam',
      location: 'Sirajganj',
      targetAmount: '৳৮,০০,০০০',
      raisedAmount: '৳৬,৪০,০০০',
      minInvestment: '৳২৫,০০০',
      duration: '১২ মাস',
      expectedRoi: '২২%',
      progress: 80,
      category: 'Livestock',
      image: '🐄',
    },
    {
      id: 'inv-3',
      title: 'High-Yield Potato Storage & Export',
      farmer: 'Kamal Hossain',
      location: 'Rangpur',
      targetAmount: '৳৩,০০,০০০',
      raisedAmount: '৳১,৫০,০০০',
      minInvestment: '৳৫,০০০',
      duration: '৪ মাস',
      expectedRoi: '১৫%',
      progress: 50,
      category: 'Vegetables',
      image: '🥔',
    },
  ],
  investments: [
    {
      id: 'my-inv-1',
      projectTitle: 'Bogra Organic Rice Cultivation Phase 2',
      amountInvested: '৳১,০০,০০০',
      projectedReturn: '৳১,২০,০০০',
      startDate: '2026-01-10',
      maturityDate: '2026-07-10',
      status: 'Active',
    },
    {
      id: 'my-inv-2',
      projectTitle: 'High-Yield Potato Storage & Export',
      amountInvested: '৳৫০,০০০',
      projectedReturn: '৳৫৭,৫০৯',
      startDate: '2026-02-01',
      maturityDate: '2026-06-01',
      status: 'Active',
    },
  ],
};

// Buyer Bulk Cart Initial Mock Items
export const initialCartItems = [
  {
    id: 'cart-1',
    name: 'Organic Miniket Rice',
    farmer: 'Rahim Uddin',
    unitPrice: 65,
    quantity: 200, // kg
    unit: 'kg',
    image: '🌾',
  },
  {
    id: 'cart-2',
    name: 'Fresh Green Chillies',
    farmer: 'Karim Miah',
    unitPrice: 80,
    quantity: 50, // kg
    unit: 'kg',
    image: '🌶️',
  },
];
// Admin Portal Data
export const adminDashboardData = {
  stats: {
    totalUsers: '১,২৪০',
    pendingVerifications: '১২',
    totalEscrowBalance: '৳৪৫,৫০,০০০',
    activeListings: '৩২০',
  },
  users: [
    {
      id: 'usr-101',
      name: 'Rahim Uddin',
      role: 'Farmer',
      email: 'rahim.farmer@agrilink.bd',
      phone: '+880 1712-345678',
      nidStatus: 'Verified',
      joinDate: '2026-01-15',
    },
    {
      id: 'usr-102',
      name: 'Green Agro Wholesale Ltd.',
      role: 'Buyer',
      email: 'anwar@greenagro.bd',
      phone: '+880 1711-223344',
      nidStatus: 'Pending',
      joinDate: '2026-02-01',
    },
    {
      id: 'usr-103',
      name: 'Tariqul Islam',
      role: 'Investor',
      email: 'tariqul.investor@agrilink.bd',
      phone: '+880 1819-998877',
      nidStatus: 'Verified',
      joinDate: '2026-02-10',
    },
    {
      id: 'usr-104',
      name: 'Karim Miah',
      role: 'Farmer',
      email: 'karim.farmer@agrilink.bd',
      phone: '+880 1912-998811',
      nidStatus: 'Pending',
      joinDate: '2026-03-01',
    },
  ],
};

// Analyst Portal Data
export const analystDashboardData = {
  stats: {
    monthlyVolume: '৳১.২ কোটি',
    yieldPredictionAccuracy: '৯৪.৫%',
    priceIndexChange: '+৪.২%',
    topDemandedCrop: 'Miniket Rice / চাল',
  },
  cropTrends: [
    {
      id: 'crop-trend-1',
      cropName: 'Miniket Rice (চাল)',
      avgPrice: '৳৬৫ / kg',
      trend: '+৩.৫%',
      demandLevel: 'High',
      estimatedHarvest: '৫০,০০০ Ton',
    },
    {
      id: 'crop-trend-2',
      cropName: 'Green Chillies (কাঁচা মরিচ)',
      avgPrice: '৳৮০ / kg',
      trend: '-২.১%',
      demandLevel: 'Medium',
      estimatedHarvest: '৮,০০০ Ton',
    },
    {
      id: 'crop-trend-3',
      cropName: 'Deshi Onions (পেঁয়াজ)',
      avgPrice: '৳৫৫ / kg',
      trend: '+৮.০%',
      demandLevel: 'Very High',
      estimatedHarvest: '২৫,০০০ Ton',
    },
  ],
};