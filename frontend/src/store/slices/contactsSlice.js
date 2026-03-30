import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, { rejectWithValue }) => {
  try { const response = await api.get('/contacts'); return response.data }
  catch (error) { return rejectWithValue(error.response.data.message) }
})
export const createContact = createAsyncThunk('contacts/create', async (contactData, { rejectWithValue }) => {
  try { const response = await api.post('/contacts', contactData); return response.data }
  catch (error) { return rejectWithValue(error.response.data.message) }
})
export const updateContact = createAsyncThunk('contacts/update', async ({ id, contactData }, { rejectWithValue }) => {
  try { const response = await api.put(`/contacts/${id}`, contactData); return response.data }
  catch (error) { return rejectWithValue(error.response.data.message) }
})
export const deleteContact = createAsyncThunk('contacts/delete', async (id, { rejectWithValue }) => {
  try { await api.delete(`/contacts/${id}`); return id }
  catch (error) { return rejectWithValue(error.response.data.message) }
})

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], loading: false, error: null, currentContact: null },
  reducers: {
    setCurrentContact: (state, action) => { state.currentContact = action.payload },
    clearCurrentContact: (state) => { state.currentContact = null },
    clearError: (state) => { state.error = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchContacts.fulfilled, (state, action) => { state.loading = false; state.contacts = action.payload })
      .addCase(fetchContacts.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(createContact.fulfilled, (state, action) => { state.loading = false; state.contacts.push(action.payload) })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false
        const index = state.contacts.findIndex(c => c._id === action.payload._id)
        if (index !== -1) state.contacts[index] = action.payload
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false
        state.contacts = state.contacts.filter(c => c._id !== action.payload)
      })
  }
})

export const { setCurrentContact, clearCurrentContact, clearError } = contactsSlice.actions
export default contactsSlice.reducer
