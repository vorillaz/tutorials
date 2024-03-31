"use server";
import { envsafe, str } from "envsafe";
export const getEnv = async () =>
  envsafe({
    DOCKER_MY_ENV: str(),
    DOCKER_ANOTHER_ENV: str(),
    DOCKER_MY_INT: str(),
    DOCKER_MY_URL: str(),
  });
