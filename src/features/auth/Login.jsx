import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login({ email: data.email, name: data.email.split('@')[0] });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div style={{ maxWidth: '360px', margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Daxil Ol</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div>
          <input
            type="text"
            placeholder="E-poçt ünvanı"
            {...register('email', {
              required: 'E-poçt daxil edilməlidir',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Düzgün e-poçt formatı daxil edin',
              },
            })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: errors.email ? '1px solid #e53e3e' : '1px solid #ccc',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          {errors.email && (
            <span style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Şifrə"
            {...register('password', {
              required: 'Şifrə daxil edilməlidir',
              minLength: {
                value: 6,
                message: 'Şifrə minimum 6 simvol olmalıdır',
              },
            })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: errors.password ? '1px solid #e53e3e' : '1px solid #ccc',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          {errors.password && (
            <span style={{ color: '#e53e3e', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '12px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '15px',
          }}
        >
          Daxil Ol
        </button>
      </form>
    </div>
  );
};

export default Login;