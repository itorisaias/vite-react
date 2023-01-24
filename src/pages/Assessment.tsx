import {
  FetchQueryOptions,
  QueryClient,
  useIsFetching,
  useQuery,
} from "react-query";
import { LoaderFunction, useLoaderData, useParams } from "react-router-dom";
import { getAssessments } from "~/services";

const assessmentQuery = (q: string | null): FetchQueryOptions => ({
  queryKey: ["assessments", "list", q ?? null],
  queryFn: () => getAssessments({ q }),
});

export const loader: LoaderFunction = async ({
  request,
}): Promise<{ q: string | null }> => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  return getAssessments({ q });
};

const AssessmentPage = () => {
  const { data } = useLoaderData() as any;
  console.log('loading....');

  return (
    <>
      <h1>Assessment Page</h1>
      <pre>{JSON.stringify(data)}</pre>
    </>
  );
};

export default AssessmentPage;
