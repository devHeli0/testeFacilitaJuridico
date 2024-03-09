import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type AppThunk from '../../interfaces/AppThunk'
import type Cliente from '../../interfaces/Cliente'

import ClienteService from './ClienteService'

interface ClienteState {
  clientes: Cliente[]
}

const initialState: ClienteState = {
  clientes: [],
}

const clienteSlice = createSlice({
  name: 'cliente',
  initialState,
  reducers: {
    setClientes(state, action: PayloadAction<Cliente[]>) {
      state.clientes = action.payload
    },
    addCliente(state, action: PayloadAction<Cliente>) {
      state.clientes.push(action.payload)
    },
    deleteCliente(state, action: PayloadAction<number>) {
      state.clientes = state.clientes.filter(
        (cliente) => cliente.id !== action.payload,
      )
    },
  },
})

export const { setClientes, addCliente, deleteCliente } = clienteSlice.actions

export const fetchClientes = (): AppThunk => async (dispatch) => {
  const clientes = await ClienteService.getClientes()
  dispatch(setClientes(clientes))
}

export const createCliente =
  (cliente: Cliente): AppThunk =>
  async (dispatch) => {
    const newCliente = await ClienteService.addCliente(cliente)
    dispatch(addCliente(newCliente))
  }

const clienteReducer = clienteSlice.reducer

export default clienteReducer
