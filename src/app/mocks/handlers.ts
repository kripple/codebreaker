import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/game/:id`, ({ params }) => {
    return HttpResponse.json({
      id: params.id,
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
  }),
];
