import type Candidate from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  currentCandidate: Candidate;
}

const CandidateCard = ({ currentCandidate }: CandidateCardProps) => {
  if (!currentCandidate) {
    return <p>No candidate data available.</p>;
  }

  return (
    <div className="candidateCard">
      <img src={currentCandidate.avatar_url} alt={currentCandidate.username} />
      <div className="profileInfo">
        {currentCandidate.name ? (
          <h2>
            {currentCandidate.name} <i>({currentCandidate.username})</i>
          </h2>
        ) : (
          <h2>{currentCandidate.username}</h2>
        )}
        {currentCandidate.location && <p>Location: {currentCandidate.location}</p>}
        {currentCandidate.email && <p>Email: {currentCandidate.email}</p>}
        {currentCandidate.company && <p>Company: {currentCandidate.company}</p>}
        {currentCandidate.bio && <p>Bio: {currentCandidate.bio}</p>}
      </div>
    </div>
  );
};

export default CandidateCard;
