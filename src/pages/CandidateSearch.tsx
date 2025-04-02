import { useState, useEffect, FormEvent } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../utils/interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';
import { GitHubUser } from '../utils/interfaces/GitHubUser.interface';


const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        const mappedCandidates: Candidate[] = data.map((user: GitHubUser) => ({
          name: user.name || 'Unknown',
          username: user.login,
          location: user.location || 'Not specified',
          avatar: user.avatar_url,
          email: user.email || 'Not available',
          html_url: user.html_url,
          company: user.company || 'Not specified',
        }));
        setCandidates(mappedCandidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setCandidates([]);
      }
    };
    fetchCandidates();
  }, []);

  const currentCandidate = candidates[currentIndex];

  const saveCandidate = () => {
    if (!currentCandidate) return;
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]') as Candidate[];
    saved.push(currentCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(saved));
    goToNext();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : candidates.length));
  };

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    if (!searchInput.trim()) return;
    try {
      const data = await searchGithubUser(searchInput);
      const searchedCandidate: Candidate = {
        name: data.name || 'Unknown',
        username: data.login,
        location: data.location || 'Not specified',
        avatar_url: data.avatar_url,
        email: data.email || 'Not available',
        html_url: data.html_url,
        company: data.company || 'Not specified',
      };
      // Replace current candidates with just this one
      setCandidates([searchedCandidate]);
      setCurrentIndex(0);
      setSearchInput(''); // Clear input after search
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  if (!candidates.length) {
    return <p>No candidates available to review.</p>;
  }

  return (
    <section id="searchSection">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      {currentCandidate ? (
        <>
          <CandidateCard currentCandidate={currentCandidate} />
          <div>
            <button onClick={saveCandidate}>+</button>
            <button onClick={goToNext}>-</button>
          </div>
        </>
      ) : (
        <p>No more candidates available to review.</p>
      )}
    </section>
  );
};

export default CandidateSearch;
