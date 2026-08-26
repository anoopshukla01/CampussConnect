import { Capacitor } from '@capacitor/core';
import { SecureStorage } from '@aparajita/capacitor-secure-storage';

const isNative = Capacitor.isNativePlatform();

export const storage = {
  async set(key, value) {
    const strVal = typeof value === 'string' ? value : JSON.stringify(value);
    if (isNative) {
      try {
        await SecureStorage.set(key, strVal);
      } catch (err) {
        console.warn('[storage] SecureStorage.set failed, using localStorage fallback:', err);
      }
    }
    try {
      localStorage.setItem(key, strVal);
    } catch (_) {}
  },

  async get(key) {
    if (isNative) {
      try {
        const val = await SecureStorage.get(key);
        if (val !== null && val !== undefined) {
          return typeof val === 'string' ? val : JSON.stringify(val);
        }
      } catch (err) {
        console.warn('[storage] SecureStorage.get failed, using localStorage fallback:', err);
      }
    }
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  },

  async remove(key) {
    if (isNative) {
      try {
        await SecureStorage.remove(key);
      } catch (err) {
        console.warn('[storage] SecureStorage.remove failed:', err);
      }
    }
    try {
      localStorage.removeItem(key);
    } catch (_) {}
  },

  async clear() {
    if (isNative) {
      try {
        await SecureStorage.clear();
      } catch (err) {
        console.warn('[storage] SecureStorage.clear failed:', err);
      }
    }
    try {
      localStorage.clear();
    } catch (_) {}
  }
};

