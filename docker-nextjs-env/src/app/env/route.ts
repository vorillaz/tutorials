import { str, envsafe } from "envsafe";
export async function GET(request: Request) {
  const env = envsafe({
    DOCKER_MY_ENV: str(),
    DOCKER_ANOTHER_ENV: str(),
  });

  return Response.json(env);
}
