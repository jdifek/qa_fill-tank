'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared ', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should calculate full tank If the amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 30);
    expect(customer.money).toBe(1800);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(
    'should calculate full tank If the amount is greater than the tank can use',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 20,
          fuelRemains: 5,
        },
      };

      fillTank(customer, 50, 20);

      expect(customer.money).toBe(2250);
      expect(customer.vehicle.fuelRemains).toBe(20);
    });

  it('should fill the fuel if the client can pay for it', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 20, 20);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(15);
  });

  it('should round the amount by discarding number to the tenth part.', () => {
    const customer = {
      money: 600,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 9, 10.239);
    expect(customer.vehicle.fuelRemains).toBe(15.2);
  });

  it('should not pour at all if the amount is less than 2 liters', () => {
    const customer = {
      money: 375,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 25, 1.5);

    expect(customer.money).toBe(375);
    expect(customer.vehicle.fuelRemains).toBe(5);
  });

  it('should round the price of fuel the to the nearest hundredth part', () => {
    const customer = {
      money: 928,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 36.4545, 23);
    expect(customer.money).toBe(89.54999999999995);
    expect(customer.vehicle.fuelRemains).toBe(28);
  });
});
