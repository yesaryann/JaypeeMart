const API_URL = 'http://localhost:5000/api';
const CURRENT_USER_KEY = 'cm_current_user';

export const initializeStorage = () => {};

// --- USER SERVICES ---
export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  const user = await res.json();
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const login = async (rollNumber, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNumber, password })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  const user = await res.json();
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

// --- PRODUCT SERVICES ---
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const addProduct = async (productData) => {
  const user = getCurrentUser();
  if (!user) throw new Error('Must be logged in to add a product');

  const newProduct = {
    ...productData,
    sellerId: user._id,
    sellerName: user.name
  };

  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  });
  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
};

export const getUserProducts = async (userId) => {
  const res = await fetch(`${API_URL}/products/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user products');
  return res.json();
};

export const deleteProduct = async (productId) => {
  const user = getCurrentUser();
  if (!user) throw new Error('Must be logged in to delete a product');

  const res = await fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return true;
};
