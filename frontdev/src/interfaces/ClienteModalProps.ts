import type Cliente from './Cliente'

export default interface ClienteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: Cliente) => void
  clientes: Cliente[]
}
