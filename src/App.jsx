import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState('');

  const tillar = ['uzb', 'rus', 'eng'];

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setLanguages((prev) => 
      [...prev, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { 
      username,
      email,
      languages,
      description 
    };
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    resetForm();
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setLanguages([]);
    setDescription('');
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div style={{ padding:'20px', fontFamily:'sans-serif', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ textAlign: 'center' }}>Add User</h2>
      <form onSubmit={handleSubmit} style={{ marginLeft:'490px', width: '30%', marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(event) => setUsername(event.target.value)} 
          required 
          style={{ margin: '10px', padding: '10px', width: '40%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          required 
          style={{ margin: '10px 0', padding: '10px', width: '40%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <div style={{marginLeft:'8px'}}>
          {tillar.map((lang) => (
            <label key={lang}>
              <input 
                type="checkbox" 
                value={lang} 
                checked={languages.includes(lang)} 
                onChange={handleLanguageChange} 
              />
              {lang}
            </label>
          ))}
        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          style={{ margin:'10px', padding: '10px', width: '87%', height: '80px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
          Add User
        </button>
      </form>
      <div style={{display:'flex',justifyContent:'center',gap:'15px', flexWrap:'wrap'}}>
        {users.map((user, index) => (
          <div key={index} style={{ width:'20%', backgroundColor: '#fff', margin: '10px 0', padding: '15px', borderRadius: '8px', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)' }}>
            <h3>username: {user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Languages: {user.languages.join(',')}</p>
            <p>Description: {user.description}</p>
            <button onClick={() => handleDelete(index)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
