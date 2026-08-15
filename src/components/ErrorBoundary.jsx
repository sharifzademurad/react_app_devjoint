import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary tərəfindən tutulan xəta:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          maxWidth: '500px',
          margin: '80px auto',
          padding: '24px',
          border: '1px solid #feb2b2',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }}>
          <h2 style={{ color: '#c53030', marginTop: 0 }}>Xəta Baş Verdi!</h2>
          <p style={{ color: '#4a5568' }}>
            Gözlənilməz bir xəta yarandı. Bütün tətbiq çökmədi, sadəcə bu bölmədə xəta baş verdi.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '10px 18px',
              backgroundColor: '#e53e3e',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '12px'
            }}
          >
            Yenidən Sınayın
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;