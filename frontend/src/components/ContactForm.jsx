import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createContact, updateContact, clearCurrentContact } from '../store/slices/contactsSlice'

function ContactForm({ onClose }) {
  const dispatch = useDispatch()
  const { loading, error, currentContact } = useSelector((state) => state.contacts)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  // If editing — pre-fill form with existing contact data
  useEffect(() => {
    if (currentContact) {
      // setValue('name', currentContact.name)
      setValue('email', currentContact.email)
      setValue('phone', currentContact.phone)
    }
  }, [currentContact, setValue])

  const onSubmit = async (data) => {
    if (currentContact) {
      // Edit mode
      await dispatch(updateContact({ id: currentContact._id, contactData: data }))
    } else {
      // Create mode
      await dispatch(createContact(data))
    }
    dispatch(clearCurrentContact())
    onClose()
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={styles.title}>
          {currentContact ? 'Edit Contact' : 'Add New Contact'}
        </h3>

        {error && (
          <p style={styles.serverError}>{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter full name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p style={styles.error}>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter email address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && (
              <p style={styles.error}>{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div style={styles.field}>
            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter phone number"
              {...register('phone', { required: 'Phone number is required' })}
            />
            {errors.phone && (
              <p style={styles.error}>{errors.phone.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div style={styles.buttons}>
            <button
              type="button"
              onClick={() => { dispatch(clearCurrentContact()); onClose() }}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={styles.submitBtn}
            >
              {loading ? 'Saving...' : currentContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    margin: '0 0 1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  field: { marginBottom: '1rem' },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  buttons: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.5rem',
  },
  cancelBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#f0f2f5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  submitBtn: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  error: { color: 'red', fontSize: '0.8rem', marginTop: '0.3rem' },
  serverError: {
    color: 'red',
    backgroundColor: '#ffe0e0',
    padding: '0.5rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
}

export default ContactForm