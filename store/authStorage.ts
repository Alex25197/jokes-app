// utils/authStorage.ts
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

type User = {
  name: string;
  email: string;
  password: string;
};

export const authStorage = {
  saveUser: (user: User) => {
    const users = authStorage.getUsers();
    users.push(user);
    storage.set('users', JSON.stringify(users));
  },

  getUsers: (): User[] => {
    const users = storage.getString('users');
    return users ? JSON.parse(users) : [];
  },

  login: (email: string, password: string): User | null => {
    const users = authStorage.getUsers();
    return users.find(user => user.email === email && user.password === password) || null;
  },

  setCurrentUser: (user: User) => {
    storage.set('currentUser', JSON.stringify(user));
  },

  getCurrentUser: (): User | null => {
    const user = storage.getString('currentUser');
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    storage.delete('currentUser');
  },
};