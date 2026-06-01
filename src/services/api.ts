import { environment } from '@/environments/environment'
import axios from 'axios'

const API_BASE_URL = environment.apiUrl
const API_PREFIX = '/api/v1'

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('No autorizado')
    }
    return Promise.reject(error)
  }
)

// Jugadores
export const jugadoresAPI = {
  getAll: () => apiClient.get('/jugadores'),
  getById: (id: number) => apiClient.get(`/jugadores/${id}`),
  create: (data: any) => apiClient.post('/jugadores', data),
  update: (id: number, data: any) => apiClient.patch(`/jugadores/${id}`, data),
  delete: (id: number) => apiClient.delete(`/jugadores/${id}`),
}

// Conceptos Cuota
export const conceptosAPI = {
  getAll: () => apiClient.get('/conceptos-cuota'),
  getById: (id: number) => apiClient.get(`/conceptos-cuota/${id}`),
  create: (data: any) => apiClient.post('/conceptos-cuota', data),
  update: (id: number, data: any) =>
    apiClient.patch(`/conceptos-cuota/${id}`, data),
  delete: (id: number) => apiClient.delete(`/conceptos-cuota/${id}`),
}

// Cuotas Conceptos
export const cuotasConceptosAPI = {
  getAll: () => apiClient.get('/cuotas-conceptos'),
  getById: (id: number) => apiClient.get(`/cuotas-conceptos/${id}`),
  create: (data: any) => apiClient.post('/cuotas-conceptos', data),
  update: (id: number, data: any) =>
    apiClient.patch(`/cuotas-conceptos/${id}`, data),
  delete: (id: number) => apiClient.delete(`/cuotas-conceptos/${id}`),
}

// Cuotas Mensuales
export const cuotasMensualesAPI = {
  getAll: () => apiClient.get('/cuotas-mensuales'),
  getById: (id: number) => apiClient.get(`/cuotas-mensuales/${id}`),
  create: (data: any) => apiClient.post('/cuotas-mensuales', data),
  update: (id: number, data: any) =>
    apiClient.patch(`/cuotas-mensuales/${id}`, data),
  delete: (id: number) => apiClient.delete(`/cuotas-mensuales/${id}`),
}

// Formas Pago
export const formasPagoAPI = {
  getAll: () => apiClient.get('/formas-pago'),
  getById: (id: number) => apiClient.get(`/formas-pago/${id}`),
  create: (data: any) => apiClient.post('/formas-pago', data),
  update: (id: number, data: any) =>
    apiClient.patch(`/formas-pago/${id}`, data),
  delete: (id: number) => apiClient.delete(`/formas-pago/${id}`),
}

// Ingresos
export const ingresosAPI = {
  getAll: () => apiClient.get('/ingresos'),
  getById: (id: number) => apiClient.get(`/ingresos/${id}`),
  create: (data: any) => apiClient.post('/ingresos', data),
  update: (id: number, data: any) => apiClient.patch(`/ingresos/${id}`, data),
  delete: (id: number) => apiClient.delete(`/ingresos/${id}`),
}

export default apiClient
