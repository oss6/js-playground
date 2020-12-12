function POST(strings, ...replacements) {
  const str = strings.reduce((acc, s, i) => acc + s + (i < replacements.length ? JSON.stringify(replacements[i]) : ''), '');
  const lines = str.split('\n').map(s => s.trim());

  // Make request

  return 'tests';
}

const searchTerm = 'Accounting';
const filters = {
  university: 'University of Birmingham'
};

const response = POST`https://foo.org
Content-Type: application/json

{
  "searchTerm": ${searchTerm},
  "filters": ${filters}
}
`;
