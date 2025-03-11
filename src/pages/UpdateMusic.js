import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateMusic = () => {
  const [Recommend, setRecommend] = useState('');
  const [ArtistName, setArtistName] = useState('');
  const [Musicgenre, setMusicgenre] = useState('');
  const [Country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/music/${id}`);
        setRecommend(res.data.Recommend);
        setArtistName(res.data.ArtistName);
        setMusicgenre(res.data.Musicgenre);
        setCountry(res.data.Country);
      } catch (error) {
        setMessage('Error Fetching Music');
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-music/${id}`, {
        Recommend,
        ArtistName,
        Musicgenre,
        Country,
      });
      navigate('/');
    } catch (error) {
      setMessage('Error Updating Music. Please Try Again');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-5 rounded">
        <h2 className="text-center mb-4 text-primary">Update Music</h2>
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
              <i className="fas fa-save me-2"></i> Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMusic;