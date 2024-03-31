### Next.js Docker Example

This is a simple example of how to build a Next.js app with Docker, the full article can be found [here](https://vorillaz.com/nextjs-docker).

Copy the code with the following command:

```bash
npx ploff https://github.com/vorillaz/tutorials.git -o docker-nextjs-app
```

### Run the app

```bash
pnpm install

mv .env.local.sample .env.local

pnpm dev
```

### Build the Docker image

```bash
docker build --build-arg SETUP_ENVINROMENT=staging --tag my-app-docker-staging .
```

### Run the docker container

```bash
docker run -p 3000:3000 my-nextjs-docker
```
