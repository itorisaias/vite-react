export const getUser = () => {
  return fetch('/user').then((res) => res.json());
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (input: any) => {
  const { status } = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });

  if (status !== 200) {
    throw new Error('Falied o fetch registry');
  }
};
