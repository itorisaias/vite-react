export const getUser = (...args: any) => {
  console.log("arguments getUser => ", ...args);

  return fetch("/user").then((res) => res.json());
};

export const login = async (input: any, ...args: any) => {
  console.log("arguments login => ", ...args);

  const { status } = await fetch("/login", { method: "POST", body: JSON.stringify(input) });
  
  if (status !== 200) {
    throw new Error('Falied o fetch registry')
  }
};
