import { useState, useEffect } from 'react';  
import CandidateCard from '../components/CandidateCard';
import type Candidate from '../utils/interfaces/Candidate.interface';

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
      {savedCandidates.map((candidate, index) => (
        <div key={candidate.username}>
          <CandidateCard currentCandidate={candidate} />
          <button onClick={() => removeCandidate(index)}>-</button>
        </div>
      ))}
    </section>
  );
};

export default SavedCandidates;
