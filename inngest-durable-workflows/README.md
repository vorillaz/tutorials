# Inngest Asynchronous Workflow Taxi Booking Demo

## Introduction

This is a demo of a taxi booking system using Inngest's durable workflows. The system consists of two types of users: `users` and `drivers`. Users can book a taxi and drivers can accept or reject the ride requests.

## Copy the Project Locally

```
npx ploff https://github.com/vorillaz/tutorials.git -o inngest-durable-workflows
```

## Run the Taxi Demo

First you need to install the required packages. You can do this by running the following command:

```bash
pnpm install
```

Then you need to create, migrate and seed the database. You can do this by running the following commands:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Start the application dev server by running the following command:

```
pnpm dev
```

Kick in the Inngest dev server by running the following command and you are ready to go:

```bash
npx inngest-cli@latest dev
```

## Test the Taxi Booking API

### Book a Taxi

You can book a taxi through your terminal. You can do this by running the following command as `user 1`:

```sh
curl -X POST http://localhost:3000/user/book -H "Content-Type: application/json" -d '{"user_id": 2}'
```

In the driver side you can respond to an active ride request either by accepting or rejecting the request. You can do this by running the following command as `driver 11`:

```sh
curl -X POST http://localhost:3000/driver/accept -H "Content-Type: application/json" -d '{"driver_id": 11, "ride_id": 11}'
```

This is a terminal action for the state machine as the driver is assigned to the ride. If the driver rejects the request they will be added to the responses history up until the ride is assigned to someone, cancelled by the user or the ride expires.

## Debugging with Inngest's Dashboard

The Inngest dashboard is available at `http://localhost:8288` when running the Inngest dev server. You can use the dashboard to monitor the state and sequence of the events dispatched by the state machine.
