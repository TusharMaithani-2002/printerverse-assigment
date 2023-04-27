const teams = [
  {Team: 'IND', Pts: 8, NRR: 1.319},
  {Team: 'PAK', Pts: 6, NRR: 1.028},
  {Team: 'SA', Pts: 5, NRR: 0.874},
  {Team: 'BAN', Pts: 4, NRR: -1.176},
  {Team: 'NED', Pts: 4, NRR: -0.849},
  {Team: 'ZIM', Pts: 3, NRR: -1.138},
];


teams.sort((a, b) => sortTeams(b,a));


function sortTeams(a,b) {
  // in case points are different
  if (a.Pts !== b.Pts) {
      return a.Pts - b.Pts
  }


  // it's given NRR are different
  return a.NRR - b.NRR
}
