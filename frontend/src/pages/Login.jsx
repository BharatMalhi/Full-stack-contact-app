import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
// import{logo} from '../../pic/new.png'
import { loginUser, clearError } from '../store/slices/authSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, token } = useSelector((state) => state.auth)
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => { if (token) navigate('/dashboard') }, [token, navigate])
  useEffect(() => { return () => dispatch(clearError()) }, [dispatch])

  const onSubmit = (data) => { dispatch(loginUser(data)) }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor:'#f0f2f5' }}>
      <div style={{ backgroundColor:'#fff', padding:'2rem', borderRadius:'8px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', width:'100%', maxWidth:'400px' }}>
        <div style={{ textAlign:'center', marginBottom:'1.5rem' }}>
          {/* <img src={logo} alt="Logo" style={{ width:'80px', marginBottom:'0.5rem' }} /> */}
        <p style={{ textAlign:'center', marginBottom:'1.5rem', color:'#333' }}>Login</p>
        </div>
        {error && <p style={{ color:'red', backgroundColor:'#ffe0e0', padding:'0.5rem', borderRadius:'4px', marginBottom:'1rem', textAlign:'center' }}>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', marginBottom:'0.4rem', fontWeight:'600' }}>Email</label>
            <input style={{ width:'100%', padding:'0.6rem', borderRadius:'4px', border:'1px solid #ccc', fontSize:'1rem', boxSizing:'border-box' }} type="email" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p style={{ color:'red', fontSize:'0.8rem' }}>{errors.email.message}</p>}
          </div>
          <div style={{ marginBottom:'1rem' }}>
            <label style={{ display:'block', marginBottom:'0.4rem', fontWeight:'600' }}>Password</label>
            <input style={{ width:'100%', padding:'0.6rem', borderRadius:'4px', border:'1px solid #ccc', fontSize:'1rem', boxSizing:'border-box' }} type="password" {...register('password', { required: 'Password is required' })} />
            {errors.password && <p style={{ color:'red', fontSize:'0.8rem' }}>{errors.password.message}</p>}
          </div>
          <button style={{ width:'100%', padding:'0.75rem', backgroundColor:'#4f46e5', color:'#fff', border:'none', borderRadius:'4px', fontSize:'1rem', cursor:'pointer' }} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:'1rem' }}>Don't have an account? <Link to="/register" style={{ backgroundColor:'#4f46e5', color:'#fff', borderRadius:'5px', padding:'0.5rem', marginBottom:'1rem' }}>Register</Link></p>
      </div>
    </div>
  )
}
export default Login
