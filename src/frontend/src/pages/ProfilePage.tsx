import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>My Profile</h1>

            <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#333',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        marginRight: '20px'
                    }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{user.name}</h2>
                        <p style={{ margin: '5px 0 0', color: '#666' }}>{user.email}</p>
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Account Details</h3>
                    <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Status:</strong> Active</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="btn"
                    style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>


        </div>
    );
}
