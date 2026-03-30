import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchContacts, deleteContact, setCurrentContact } from '../store/slices/contactsSlice'
import { logout } from '../store/slices/authSlice'
import ContactForm from '../components/ContactForm'

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { contacts, loading, error } = useSelector((state) => state.contacts)
  const { user } = useSelector((state) => state.auth)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { dispatch(fetchContacts()) }, [dispatch])

  const handleLogout = () => { dispatch(logout()); navigate('/') }
  const handleDelete = (id) => { if (window.confirm('Delete this contact?')) dispatch(deleteContact(id)) }
  const handleEdit = (contact) => { dispatch(setCurrentContact(contact)); setShowForm(true) }
  const handleAddNew = () => { dispatch(setCurrentContact(null)); setShowForm(true) }

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f0f2f5' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', backgroundColor:'#4f46e5', padding:'1rem 2rem', color:'#fff' }}>
        <h2 style={{ margin:0 }}>Contacts App</h2>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <span>{user?.name || 'User'}</span>
          <button onClick={handleLogout} style={{ padding:'0.4rem 1rem', backgroundColor:'#fff', color:'#4f46e5', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'600' }}>Logout</button>
        </div>
      </div>
      <div style={{ padding:'2rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
          <h3>My Contacts ({contacts.length})</h3>
          <button onClick={handleAddNew} style={{ padding:'0.5rem 1.2rem', backgroundColor:'#4f46e5', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer' }}>+ Add Contact</button>
        </div>
        {error && <p style={{ color:'red' }}>{error}</p>}
        {showForm && <ContactForm onClose={() => setShowForm(false)} />}
        {loading && <p style={{ textAlign:'center' }}>Loading...</p>}
        {!loading && contacts.length === 0 && <p style={{ textAlign:'center', color:'#999', marginTop:'3rem' }}>No contacts yet. Add your first one.</p>}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:'1rem' }}>
          {contacts.map((contact) => (
            <div key={contact._id} style={{ backgroundColor:'#fff', padding:'1.2rem', borderRadius:'8px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
              <h4 style={{ margin:'0 0 0.5rem', color:'#333' }}>{contact.name}</h4>
              <p style={{ margin:'0.2rem 0', color:'#666', fontSize:'0.9rem' }}>{contact.email}</p>
              <p style={{ margin:'0.2rem 0', color:'#666', fontSize:'0.9rem' }}>{contact.phone}</p>
              <div style={{ display:'flex', gap:'0.5rem', marginTop:'1rem' }}>
                <button onClick={() => handleEdit(contact)} style={{ flex:1, padding:'0.4rem', backgroundColor:'#f0f2f5', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'600' }}>Edit</button>
                <button onClick={() => handleDelete(contact._id)} style={{ flex:1, padding:'0.4rem', backgroundColor:'#ffe0e0', color:'#c00', border:'none', borderRadius:'4px', cursor:'pointer', fontWeight:'600' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
