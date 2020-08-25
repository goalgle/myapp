export const GET_RANDOM_NUMBER = 'GET_RANDOM_NUMBER';
export const GET_RANDOM_NUMBER_URL = (
  min = '1',
  max = '99',
  format = 'plain'
) =>
  `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=${format}&rnd=new`;

export const POST_NEW_NUMBER_URL = () =>
  `https://www.onstorebooks.co.kr/insertNewNumber`;
