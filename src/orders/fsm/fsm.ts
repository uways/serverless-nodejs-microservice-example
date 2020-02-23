import { Machine } from 'xstate';


export const OrderMachine = Machine({
    id: 'order',
    initial: 'created',
    states: {
      created: {
        on: {
          confirm: 'confirmed',
          decline: 'cancelled',
        },
      },
      confirmed: {
        on: {
          cancel: 'cancelled',
          deliver: 'delivered',
        },
      },
      cancelled: {},
      delivered: {},
    },
  });