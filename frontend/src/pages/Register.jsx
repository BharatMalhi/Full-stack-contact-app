import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser, clearError } from '../store/slices/authSlice'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, token } = useSelector((state) => state.auth)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  useEffect(() => { if (token) navigate('/dashboard') }, [token, navigate])
  useEffect(() => { return () => dispatch(clearError()) }, [dispatch])

  const onSubmit = (data) => { dispatch(registerUser({ name: data.name, email: data.email, password: data.password })) }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', backgroundColor:'#f0f2f5' }}>
      <div style={{ backgroundColor:'#fff', padding:'2rem', borderRadius:'8px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', width:'100%', maxWidth:'400px' }}>
        <h2 style={{ textAlign:'center', marginBottom:'1.5rem', color:'#333' }}>Create Account</h2>
        {error && <p style={{ color:'red', backgroundColor:'#ffe0e0', padding:'0.5rem', borderRadius:'4px', marginBottom:'1rem', textAlign:'center' }}>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', marginBottom:'0.4rem', fontWeight:'600' }}>Full Name</label>
            <input style={{ width:'100%', padding:'0.6rem', borderRadius:'4px', border:'1px solid #ccc', fontSize:'1rem', boxSizing:'border-box' }} type="text" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p style={{ color:'red', fontSize:'0.8rem' }}>{errors.name.message}</p>}
          </div>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', marginBottom:'0.4rem', fontWeight:'600' }}>Email</label>
            <input style={{ width:'100%', padding:'0.6rem', borderRadius:'4px', border:'1px solid #ccc', fontSize:'1rem', boxSizing:'border-box' }} type="email" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p style={{ color:'red', fontSize:'0.8rem' }}>{errors.email.message}</p>}
          </div>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', marginBottom:'0.4rem', fontWeight:'600' }}>Password</label>
            <input style={{ width:'100%', padding:'0.6rem', borderRadius:'4px', border:'1px solid #ccc', fontSize:'1rem', boxSizing:'border-box' }} type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} />
            {errors.password && <p style={{ color:'red', fontSize:'0.8rem' }}>{errors.password.message}</p>}
          </div>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', marginBottom:'0.4rem', fontWeight:'600' }}>Confirm Password</label>
            <input style={{ width:'100%', padding:'0.6rem', borderRadius:'4px', border:'1px solid #ccc', fontSize:'1rem', boxSizing:'border-box' }} type="password" {...register('confirmPassword', { required: 'Please confirm password', validate: (value) => value === watch('password') || 'Passwords do not match' })} />
            {errors.confirmPassword && <p style={{ color:'red', fontSize:'0.8rem' }}>{errors.confirmPassword.message}</p>}
          </div>
          <button style={{ width:'100%', padding:'0.75rem', backgroundColor:'#4f46e5', color:'#fff', border:'none', borderRadius:'4px', fontSize:'1rem', cursor:'pointer' }} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:'1rem' }}>Already have an account? <Link to="/" style={{ backgroundColor:'#4f46e5', color:'#fff', borderRadius:'5px', padding:'0.5rem', margintop:'9rem', paddingBottom:'0.8rem'}}>Login</Link></p>
      </div>
    </div>
  )
}
export default Register
