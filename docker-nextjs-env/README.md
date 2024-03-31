### Next.js Docker Environment Variables Example

This is a simple example of how to build a Next.js app with Docker and use environment variables available at runtime, the full article can be found [here](https://vorillaz.com/nextjs-docker-env).

Copy the code with the following command:

```bash
npx ploff https://github.com/vorillaz/tutorials.git -o docker-nextjs-env
```

### Run the app

```bash
pnpm install

mv .env.local.sample .env.local

pnpm dev
```

### Build the Docker image

```bash
docker build --tag my-app-docker-env .
```

### Run the Docker container with environment variables

```bash
docker run -p 3000:3000 --env-file .env.local my-app-docker-env
```
