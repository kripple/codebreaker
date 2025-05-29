export const getGameById = (id: string ) => ({
  id,
  attempts: [
    {
      value: '1111',
      feedback: '----',
    },
    {
      value: '2222',
      feedback: '----',
    },
    {
      value: '3333',
      feedback: 'XX--',
    },
    {
      value: '3434',
      feedback: 'XO--',
    },
    {
      value: '3355',
      feedback: 'XX--',
    },
    {
      value: '3366',
      feedback: 'XX--',
    },
    // {
    //   value: '3377',
    //   feedback: 'XXXX',
    // },
  ],
});
