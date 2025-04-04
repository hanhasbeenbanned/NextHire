import { useState, useEffect, FormEvent } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await searchGithub();
        interface GithubUser {
          name: string | null;
          login: string;
          location: string | null;
          avatar_url: string;
          email: string | null;
          html_url: string;
          company: string | null;
        }

        const mappedCandidates: Candidate[] = data.map((user: GithubUser) => ({
          name: user.name,
          username: user.login,
          location: user.location,
          avatar: user.avatar_url,
          email: user.email,
          html_url: user.html_url,
          company: user.company,
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
    setCurrentIndex((prev) => (prev < candidates.length - 1 ? prev + 1 : 0));
  };

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    if (!searchInput.trim()) return;
    try {
      const data = await searchGithubUser(searchInput);
      const searchedCandidate: Candidate = {
        name: data.login,
        username: data.login,
        location: data.location,
        avatar_url: data.avatar_url,
        email: data.email,
        html_url: data.html_url,
        company: data.company,
        bio: data.bio,
      };
      setCandidates([searchedCandidate]);
      setCurrentIndex(0);
      setSearchInput('');
    } catch (error) {
      console.error('Error searching user:', error);
      setErrorMessage('Failed to fetch user. Please try again.');
    }
  };

  if (!candidates.length) {
    return <p>No candidates available to review.</p>;
  }

  return (
    <section id= "searchPage">
    <h1>Candidate Search</h1>
    <section id="searchSection">
      
      {errorMessage && <p className="error">{errorMessage}</p>}
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      <section id="candidateSearchSection">
        
        {currentCandidate ? (
          <>
            <CandidateCard currentCandidate={currentCandidate} />
            <div>
              <button className='save' onClick={saveCandidate}>+</button>
              <button className='no' onClick={goToNext}>-</button>
            </div>
          </>
        ) : (
          <p>No more candidates available to review.</p>
        )}
      </section>
    </section>
    </section>
  );
};

export default CandidateSearch;
