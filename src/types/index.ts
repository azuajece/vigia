// Jugadores
export interface Jugador {
  id_jugador: number
  cedula: string
  nombre_apellido: string
  categoria: string
  status: 'NUEVO_INGRESO' | 'ACTIVO' | 'INACTIVO'
  mes_ingreso?: string
  fecha_egreso?: string
  torneo: string
  anio_ingreso?: number
  deuda_2025: number
  fecha_registro: string
  fecha_actualizacion: string
}

// Conceptos de Cuota
export interface ConceptoCuota {
  id_concepto: number
  nombre_concepto: string
  descripcion?: string
  tipo: 'INSCRIPCION' | 'MENSUAL' | 'UNIFORME' | 'TORNEO' | 'OTRO'
  activo: boolean
  fecha_creacion: string
}

// Cuotas por Concepto
export interface CuotaConcepto {
  id_cuota_concepto: number
  id_jugador: number
  nombre_jugador?: string
  cedula_jugador?: string
  id_concepto: number
  nombre_concepto?: string
  anio: number
  monto: number
  pagado: boolean
  fecha_pago?: string
  fecha_registro: string
}

// Cuotas Mensuales Detallado
export interface CuotaMensualDetalle {
  id_cuota_mes: number
  id_jugador: number
  id_concepto: number
  mes: number
  anio: number
  monto: number
  pagado: boolean
  fecha_pago?: string
  fecha_registro: string
}

// Formas de Pago
export interface FormaPago {
  id_forma_pago: number
  nombre_forma: string
  descripcion?: string
  activa: boolean
  fecha_creacion: string
}

// Ingresos
export interface Ingreso {
  id_ingreso: number
  id_jugador: number
  concepto: string
  mes_deuda: number
  fecha_pago: string
  id_forma_pago: number
  divisas?: number
  tasa_cambio?: number
  monto_bsf?: number
  monto_usd?: number
  referencia?: string
  notas?: string
  fecha_registro: string
}

// Respuestas generales
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
