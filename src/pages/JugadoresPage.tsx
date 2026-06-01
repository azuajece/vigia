import { useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@components/Table'
import { FormComponent, FormField } from '@components/Form'
import { jugadoresAPI } from '@services/api'
import { Jugador } from '../types'

const JugadoresPage = () => {
  const [data, setData] = useState<Jugador[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Jugador> | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const response = await jugadoresAPI.getAll()
      console.log('✅ Respuesta API completa:', response)
      console.log('📦 Datos extraídos:', response.data?.data || response.data)
      // El API devuelve {data: [...], total, skip, take}
      setData(response.data?.data || response.data || [])
    } catch (error) {
      console.error('❌ Error loading jugadores:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setEditData(null)
    setShowForm(true)
  }

  const handleEdit = (row: Jugador) => {
    setEditingId(row.id_jugador)
    setEditData(row)
    setShowForm(true)
  }

  const handleDelete = async (row: Jugador) => {
    if (confirm(`¿Eliminar jugador ${row.nombre_apellido}?`)) {
      try {
        await jugadoresAPI.delete(row.id_jugador)
        loadData()
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      if (editingId) {
        await jugadoresAPI.update(editingId, data)
      } else {
        await jugadoresAPI.create(data)
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
      name: 'cedula',
      label: 'Cédula',
      type: 'text',
      required: true,
      placeholder: 'V-12345678',
    },
    {
      name: 'nombre_apellido',
      label: 'Nombre y Apellido',
      type: 'text',
      required: true,
      placeholder: 'Juan Pérez',
    },
    {
      name: 'categoria',
      label: 'Categoría',
      type: 'text',
      required: true,
      placeholder: 'Sub-20',
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      required: true,
      options: [
        { label: 'Nuevo Ingreso', value: 'NUEVO_INGRESO' },
        { label: 'Activo', value: 'ACTIVO' },
        { label: 'Inactivo', value: 'INACTIVO' },
      ],
    },
    {
      name: 'torneo',
      label: 'Torneo',
      type: 'text',
      required: true,
      placeholder: 'Torneo',
    },
    {
      name: 'anio_ingreso',
      label: 'Año Ingreso',
      type: 'number',
      placeholder: '2024',
    },
    {
      name: 'deuda_2025',
      label: 'Deuda 2025',
      type: 'number',
      placeholder: '0',
    },
  ]

  const columns: ColumnDef<Jugador>[] = [
    {
      accessorKey: 'cedula',
      header: 'Cédula',
    },
    {
      accessorKey: 'nombre_apellido',
      header: 'Nombre',
    },
    {
      accessorKey: 'categoria',
      header: 'Categoría',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: ({ row }) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: 'deuda_2025',
      header: 'Deuda 2025',
      cell: ({ row }) => `$${row.original.deuda_2025.toFixed(2)}`,
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-vigia-green mb-2">
          Gestión de Jugadores
        </h1>
        <p className="text-gray-600">
          Administra la información de los jugadores del club
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Debug: {data.length} jugadores cargados, isLoading:{' '}
          {String(isLoading)}
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
          searchPlaceholder="Buscar por nombre o cédula..."
        />
      </div>

      {showForm && (
        <FormComponent
          title={editingId ? 'Editar Jugador' : 'Nuevo Jugador'}
          fields={formFields}
          initialData={editData || {}}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          submitLabel={editingId ? 'Actualizar' : 'Crear'}
        />
      )}
    </div>
  )
}

export default JugadoresPage
