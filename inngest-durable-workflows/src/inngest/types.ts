import { EventSchemas } from 'inngest';

type BookTaxiEvents = {
  'app/ride.timeout': {
    data: { ride_id: number };
  };
  'app/ride.driver.accept': {
    data: { ride_id: number; driver_id: number };
  };
  'app/ride.driver.reject': {
    data: { ride_id: number; driver_id: number };
  };
  'app/ride.user.cancel': {
    data: { ride_id: number; user_id: number };
  };
  'app/ride.user.request': {
    data: { user_id: number; ride_id: number };
  };
};

export const schemas = new EventSchemas().fromRecord<BookTaxiEvents>();
