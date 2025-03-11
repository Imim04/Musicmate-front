import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateMusic() {
  const [Recommend, setRecommend] = useState('');
  const [ArtistName, setArtistName] = useState('');
  const [Musicgenre, setMusicgenre] = useState('');
  const [Country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/create-music', {
        Recommend,
        ArtistName,
        Musicgenre,
        Country,
      });
      navigate('/');
    } catch (error) {
      setMessage('Error creating music, please try again');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-5 rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <h2 className="text-center mb-4 text-primary">
          Create Music Recommendation
        </h2>
        {message && <p className="text-danger text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-info">Recommend:</label>
            <input
              type="text"
              className="form-control"
              value={Recommend}
              onChange={(e) => setRecommend(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-success">ArtistName:</label>
            <input
              type="text"
              className="form-control"
              value={ArtistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-warning">Musicgenre:</label>
            <input
              type="text"
              className="form-control"
              value={Musicgenre}
              onChange={(e) => setMusicgenre(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-danger">Country:</label>
            <input
              type="text"
              className="form-control"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg shadow">
              <i className="fas fa-plus me-2"></i> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMusic;