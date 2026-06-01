import { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@components/Table'
import { FormComponent, FormField } from '@components/Form'
import { cuotasMensualesAPI } from '@services/api'
import { CuotaMensualDetalle } from '../types'

const months = [
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 },
  { label: 'Noviembre', value: 11 },
  { label: 'Diciembre', value: 12 },
]

const CuotasMensualesPage = () => {
  const [data, setData] = useState<CuotaMensualDetalle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<CuotaMensualDetalle> | null>(
    null
  )

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const response = await cuotasMensualesAPI.getAll()
      setData(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Error loading cuotas mensuales:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (row: CuotaMensualDetalle) => {
    setEditingId(row.id_cuota_mes)
    setEditData(row)
    setShowForm(true)
  }

  const handleDelete = async (row: CuotaMensualDetalle) => {
    if (confirm(`¿Eliminar cuota mensual?`)) {
      try {
        await cuotasMensualesAPI.delete(row.id_cuota_mes)
        loadData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      if (editingId) {
        await cuotasMensualesAPI.update(editingId, formData)
      } else {
        await cuotasMensualesAPI.create(formData)
      }
      setShowForm(false)
      loadData()
    } catch (error) {
      console.error('Error saving:', error)
      throw error
    }
  }

  const formFields: FormField[] = [
    {
      name: 'id_jugador',
      label: 'ID Jugador',
      type: 'number',
      required: true,
    },
    {
      name: 'id_concepto',
      label: 'ID Concepto',
      type: 'number',
      required: true,
    },
    {
      name: 'mes',
      label: 'Mes',
      type: 'select',
      required: true,
      options: months,
    },
    {
      name: 'anio',
      label: 'Año',
      type: 'number',
      required: true,
      placeholder: '2025',
    },
    {
      name: 'monto',
      label: 'Monto',
      type: 'number',
      required: true,
      placeholder: '0.00',
    },
    {
      name: 'pagado',
      label: 'Pagado',
      type: 'checkbox',
    },
    {
      name: 'fecha_pago',
      label: 'Fecha de Pago',
      type: 'date',
    },
  ]

  const columns: ColumnDef<CuotaMensualDetalle>[] = [
    {
      accessorKey: 'id_jugador',
      header: 'ID Jugador',
    },
    {
      accessorKey: 'mes',
      header: 'Mes',
      cell: ({ row }) =>
        months.find((m) => m.value === row.original.mes)?.label ||
        row.original.mes,
    },
    {
      accessorKey: 'anio',
      header: 'Año',
    },
    {
      accessorKey: 'monto',
      header: 'Monto',
      cell: ({ row }) => `$${row.original.monto.toFixed(2)}`,
    },
    {
      accessorKey: 'pagado',
      header: 'Estado',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.original.pagado
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {row.original.pagado ? 'Pagado' : 'Pendiente'}
        </span>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-vigia-green mb-2">
          Cuotas Mensuales
        </h1>
        <p className="text-gray-600">
          Administra las cuotas mensuales detalladas
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <DataTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          isLoading={isLoading}
          searchPlaceholder="Buscar cuota mensual..."
        />
      </div>

      {showForm && (
        <FormComponent
          title={editingId ? 'Editar Cuota Mensual' : 'Nueva Cuota Mensual'}
          fields={formFields}
          initialData={
            editData || { pagado: false, anio: new Date().getFullYear() }
          }
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          submitLabel={editingId ? 'Actualizar' : 'Crear'}
        />
      )}
    </div>
  )
}

export default CuotasMensualesPage
