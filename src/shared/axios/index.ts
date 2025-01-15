'use client'

import axios, { AxiosInstance } from 'axios'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
