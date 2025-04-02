import type Candidate from '../utils/interfaces/Candidate.interface';

interface CandidateCardProps {
  currentCandidate: Candidate;
}

const CandidateCard = ({ currentCandidate }: CandidateCardProps) => (
  <div>
    <h2>{currentCandidate.name}</h2>
    <p>Username: {currentCandidate.username}</p>
    <p>Location: {currentCandidate.location}</p>
    <img src={currentCandidate.avatar_url} alt="Avatar" width="100" />
    <p>Email: {currentCandidate.email}</p>
    <p>
      Profile:{' '}
      <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
        {currentCandidate.html_url}
      </a>
    </p>
    <p>Company: {currentCandidate.company}</p>
  </div>
);

export default CandidateCard;