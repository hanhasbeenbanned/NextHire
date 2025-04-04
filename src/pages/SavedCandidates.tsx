import { useState, useEffect } from 'react';  
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]') as Candidate[];
    setSavedCandidates(saved);
  }, []);

  const removeCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (!savedCandidates.length) {
    return <p>No candidates have been accepted yet.</p>;
  }

  return (
    <section id="savedCandidatesSection">
      <h1>Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate, index) => (
            <tr key={candidate.username}>
              <td><img src={candidate.avatar_url} alt={candidate.username} /></td>
              <td>{candidate.name}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td>
                <button onClick={() => removeCandidate(index)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SavedCandidates;
