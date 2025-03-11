import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const res = await axios.get('http://localhost:5000/');
      console.log('Fetched Data:', res.data);
      setData(res.data);
      console.log('Success');
    } catch (error) {
      console.log('Fail', error);
    }
  };

  const deleteMusic = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:5000/delete-music/${id}`);
        fetchMusic();
      } catch (error) {
        console.log('Error deleting Music: ' + error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-5 rounded">
        <h1 className="text-center mb-5 text-primary">Music </h1>

        <div className="text-center mb-4">
          <Link to="/create-Music" className="btn btn-success btn-lg shadow">
            <i className="fas fa-plus me-2"></i> <span className="text-white">Create New</span>
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Recommend</th>
                <th scope="col">ArtistName</th>
                <th scope="col">Musicgenre</th>
                <th scope="col">Country</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td className="text-info">{item.Recommend}</td>
                  <td className="text-success">{item.ArtistName}</td>
                  <td className="text-warning">{item.Musicgenre}</td>
                  <td className="text-danger">{item.Country}</td>
                  <td>
                    <Link
                      to={`edit-music/${item.id}`}
                      className="btn btn-warning btn-sm me-2 shadow"
                    >
                      <i className="fas fa-edit me-1"></i> <span className="text-dark">Edit</span>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm shadow"
                      onClick={() => deleteMusic(item.id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i> <span className="text-white">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;