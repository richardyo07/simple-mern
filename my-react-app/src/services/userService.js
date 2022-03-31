/** @format */

import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function LogOut() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem('token', data.token);
}

export default {
  login,
  getCurrentUser,
  LogOut,
  getJwt,
};
