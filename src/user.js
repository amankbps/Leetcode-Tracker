import React, { useState, useEffect } from 'react';

const UserProfile = ({ username }) => {
  const [userRanking, setUserRanking] = useState(null);
  const [problemCounts, setProblemCounts] = useState({ Easy: 0, Medium: 0, Hard: 0 });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const encodedUsername = encodeURIComponent(username);
        const url =
        "https://leetcode.com/graphql?query=query%20%7B%0A%20%20userContestRanking(username%3A%20%22" +
        encodedUsername +
        "%22)%20%7B%0A%20%20%20%20attendedContestsCount%0A%20%20%20%20rating%0A%20%20%20%20globalRanking%0A%20%20%20%20totalParticipants%0A%20%20%20%20topPercentage%0A%20%20%7D%0A%20%20matchedUser(username%3A%20%22" +
        encodedUsername +
        "%22)%20%7B%0A%20%20%20%20username%0A%20%20%20%20submitStats%3A%20submitStatsGlobal%20%7B%0A%20%20%20%20%20%20acSubmissionNum%20%7B%0A%20%20%20%20%20%20%20%20difficulty%0A%20%20%20%20%20%20%20%20count%0A%20%20%20%20%20%20%20%20submissions%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D";
  

        const response = await fetch(url);
        const data = await response.json();

        setUserRanking(data.data.userContestRanking);

        const acSubmissionNum = data.data.matchedUser.submitStats.acSubmissionNum;
        const counts = acSubmissionNum.reduce((acc, submission) => {
          if (submission.difficulty === "Easy") {
            acc.Easy = submission.count;
          } else if (submission.difficulty === "Medium") {
            acc.Medium = submission.count;
          } else if (submission.difficulty === "Hard") {
            acc.Hard = submission.count;
          }
          return acc;
        }, {});
        setProblemCounts(counts);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userRanking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Contest Ranking for {username}</h2>
      <p>Attended Contests Count: {userRanking.attendedContestsCount}</p>
      <p>Rating: {userRanking.rating}</p>
      <p>Global Ranking: {userRanking.globalRanking}</p>
      <p>Total Participants: {userRanking.totalParticipants}</p>
      <p>Top Percentage: {userRanking.topPercentage}</p>
      <h3>Problem Counts:</h3>
      <ul>
        <li>Easy: {problemCounts.Easy}</li>
        <li>Medium: {problemCounts.Medium}</li>
        <li>Hard: {problemCounts.Hard}</li>
      </ul>
    </div>
  );
};

export default UserProfile;
