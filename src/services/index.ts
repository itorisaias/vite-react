export const getUser = (...args: any) => {
  console.log('arguments getUser => ', ...args);
  
  return fetch("/user").then((res) => res.json());
};

export const login = (input: any, ...args: any) => {
  console.log('arguments login => ', ...args);

  return fetch("/login", { method: "POST", body: JSON.stringify(input) }).then(
    (res) => res.json()
  );
};
