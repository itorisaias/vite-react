export const getAssessments = (filters = {}) => {
  const params = new URLSearchParams(filters);
  let url = "/assessments";

  if (params.toString().length > 0) {
    url += `?${params.toString()}`;
  }

  return fetch(url).then((res) => res.json());
};

export const login = async (payload = {}) => {
  const { status } = await fetch("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (status !== 200) {
    throw new Error("Falied o fetch registry");
  }
};

export const signup = async (payload: any) => {
  return fetch("/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
