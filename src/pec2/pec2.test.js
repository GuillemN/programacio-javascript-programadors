import { 
  calculateChange, // ex1
  DisplayDigit, // ex2
  DigitalClock, // ex3
  Construction, Building, Bridge, Road, // ex4
  SuspensionBridge, ArchBridge, Highway, Street, // ex5
  ConstructionFunction // ex6
} from "./pec2";

// --------------------------------------------------------------------------------
// EXERCISE 1
// --------------------------------------------------------------------------------
describe("ex1", () => {
  test("should throw an error for invalid amounts", () => {
    const invalidAmounts = [-1, 'abc', null, undefined];
    invalidAmounts.forEach(amount => {
      expect(() => calculateChange(amount)).toThrow("Amount must be a non-negative number");
    });
  });

  test("should return the correct change for a given amount", () => {
    expect(calculateChange(0)).toEqual({});
    expect(calculateChange(0.40)).toEqual({'0.2': 2});
    expect(calculateChange(0.98)).toEqual({
      '0.5': 1,
      '0.2': 2,
      '0.05': 1,
      '0.02': 1,
      '0.01': 1,
    });
    expect(calculateChange(1)).toEqual({'1': 1});
    expect(calculateChange(7.89)).toEqual({
      '5': 1,
      '2': 1,
      '0.5': 1,
      '0.2': 1,
      '0.1': 1,
      '0.05': 1,
      '0.02': 2
    });
    expect(calculateChange(123.45)).toEqual({
      '100': 1,
      '20': 1,
      '2': 1,
      '1': 1,
      '0.2': 2,
      '0.05': 1
    });
  });

  test("should handle amounts with large values correctly", () => {
    expect(calculateChange(1000)).toEqual({'500': 2});
    expect(calculateChange(10000)).toEqual({'500': 20});
    expect(calculateChange(200000)).toEqual({'500': 400});
    expect(calculateChange(2608964.68)).toEqual({
      '500': 5217,
      '200': 2,
      '50': 1,
      '10': 1,
      '2': 2,
      '0.5': 1,
      '0.1': 1,
      '0.05': 1,
      '0.02': 1,
      '0.01': 1,
    });
  });
});

// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------


describe("ex2", () => {
  test("Should throw an error if the digit is not a number between 0 and 9", () => {
    const invalidInputs = [-1, 10, 1500, 'a', 'JavaScript', undefined, null, Symbol(), new Error(), []];
    const display = new DisplayDigit(); // Crear instancia de la clase
    
    invalidInputs.forEach((input) => {
      expect(() => display.displayDigit(input)).toThrow("The digit must be a number between 0 and 9");
    });
  });

  const expectedResults = {
    0: [
      "███",
      "█ █",
      "█ █",
      "█ █",
      "███"
    ],
    1: [
      "  █",
      "  █",
      "  █",
      "  █",
      "  █"
    ],
    2: [
      "███",
      "  █",
      "███",
      "█  ",
      "███"
    ],
    3: [
      "███",
      "  █",
      "███",
      "  █",
      "███"
    ],
    4: [
      "█ █",
      "█ █",
      "███",
      "  █",
      "  █"
    ],
    5: [
      "███",
      "█  ",
      "███",
      "  █",
      "███"
    ],
    6: [
      "███",
      "█  ",
      "███",
      "█ █",
      "███"
    ],
    7: [
      "███",
      "  █",
      "  █",
      "  █",
      "  █"
    ],
    8: [
      "███",
      "█ █",
      "███",
      "█ █",
      "███"
    ],
    9: [
      "███",
      "█ █",
      "███",
      "  █",
      "███"
    ]
  };

  test("Should return the expected result for each number from 0 to 9", () => {
    const display = new DisplayDigit(); // Crear instancia de la clase

    Object.keys(expectedResults).forEach((num) => {
      const result = display.displayDigit(Number(num));
      expect(result).toEqual(expectedResults[num]);
    });
  });  
});

// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
describe('ex3', () => {
  test('Should throw an error if the parameter is not a Date object', () => {
    const invalidInputs = [null, undefined, 123, '2024-09-26', {}, []];

    invalidInputs.forEach(input => {
      expect(() => new DigitalClock(input)).toThrow('The parameter must be a Date object');
    });
  });

  test('Should correctly extract hours, minutes, and seconds from a Date object', () => {
    const date = new Date('2024-09-26T12:34:56');
    const clock = new DigitalClock(date);

    expect(clock.hours).toBe(12);
    expect(clock.minutes).toBe(34);
    expect(clock.seconds).toBe(56);
  });

  test('Should correctly display time in seven-segment format (1/2)', () => {
    const date = new Date('2024-09-26T23:17:38');
    const clock = new DigitalClock(date);

    const expectedOutput = [
      '███ ███       █ ███     ███ ███',
      '  █   █  █    █   █  █    █ █ █',
      '███ ███       █   █     ███ ███',
      '█     █  █    █   █  █    █ █ █',
      '███ ███       █   █     ███ ███'
    ].join('\n');

    expect(clock.displayTime()).toBe(expectedOutput);
  });

  test('Should correctly display time in seven-segment format (2/2)', () => {
    const date = new Date('2024-09-26T03:46:59');
    const clock = new DigitalClock(date);

    const expectedOutput = [
      '███ ███     █ █ ███     ███ ███',
      '█ █   █  █  █ █ █    █  █   █ █',
      '█ █ ███     ███ ███     ███ ███',
      '█ █   █  █    █ █ █  █    █   █',
      '███ ███       █ ███     ███ ███'
    ].join('\n');

    expect(clock.displayTime()).toBe(expectedOutput);
  });
});

// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
describe("ex4", () => {
  describe('Construction Class', () => {
    test('Should increment the instance counter every time the class is instantiated', () => {
      expect(Construction.getTotalInstances()).toBe(0);
      const construction1 = new Construction('Building A', 'City A');
      expect(Construction.getTotalInstances()).toBe(1);
      const construction2 = new Construction('Building B', 'City B');
      expect(Construction.getTotalInstances()).toBe(2);
    });  
    
    test('should set and get name using setters and getters', () => {
      const construction = new Construction('Building B', 'City B');
      construction.name = 'Building C';
      expect(construction.name).toBe('Building C');
    });

    test('should set and get location using setters and getters', () => {
      const construction = new Construction('Building B', 'City B');
      construction.location = 'City C';
      expect(construction.location).toBe('City C');
    });

    test('should return correct description for Construction', () => {
      const construction = new Construction('Building C', 'City C');
      expect(construction.getDescription()).toBe('Building C located in City C');
    });

    test('At this point, there should be 5 constructions instances', () => {
      expect(Construction.getTotalInstances()).toBe(5);
    });
  });

  describe('Building Class', () => {
      test('should create a new Building and set material and floors correctly', () => {
          const building = new Building('Building A', 'City A', 10, 'wood');
          expect(building.floors).toBe(10);
          expect(building.material).toBe('WOOD');
      });

      test('should throw an error if floors are not between 1 and 50', () => {
          expect(() => new Building('Building A', 'City A', 100, 'WOOD')).toThrow("The number of floors must be between 1 and 50");
      });

      test('should throw an error if material is invalid', () => {
          expect(() => new Building('Building A', 'City A', 10, 'PLASTIC')).toThrow("Material must be one of the following: WOOD, STONE, GLASS");
      });

      test('should return correct description for Construction', () => {
        const building = new Building('Building A', 'City A', 10, 'wood');
        expect(building.getDescription()).toBe('Building A located in City A with 10 floors built with WOOD');
      });

      test('At this point, there should be 9 constructions instances', () => {
        expect(Building.getTotalInstances()).toBe(9);
      });
  });

  describe('Bridge Class', () => {
    test('should create a Bridge and set length and maxLoad correctly', () => {
      const bridge = new Bridge('Bridge A', 'City A', 300, 100);
      expect(bridge.length).toBe(300);
      expect(bridge.maxLoad).toBe(100);
    });

    test('should allow updating length and maxLoad using setters', () => {
        const bridge = new Bridge('Bridge B', 'City B', 400, 150);
        bridge.length = 450;
        bridge.maxLoad = 200;
        expect(bridge.length).toBe(450);
        expect(bridge.maxLoad).toBe(200);
    });

    test('should return correct description for Bridge', () => {
        const bridge = new Bridge('Bridge C', 'City C', 500, 300);
        expect(bridge.getDescription()).toBe('Bridge C located in City C spanning 500 meters, max load 300 tons');
    });

    test('At this point, there should be 12 constructions instances', () => {
      expect(Building.getTotalInstances()).toBe(12);
    });
  });


  describe('Road Class', () => {
    test('should set the surfaceMaterial correctly', () => {
      const road = new Road('Main Road', 'City A', 2, 'asphalt');
      expect(road.surfaceMaterial).toBe('asphalt');
    });

    test('should update the surfaceMaterial using the setter', () => {
        const road = new Road('Dirt Road', 'Village A', 1, 'dirt');
        road.surfaceMaterial = 'concrete';
        expect(road.surfaceMaterial).toBe('concrete');
    });

    test('should return the correct surfaceMaterial using the getter', () => {
        const road = new Road('Paved Road', 'City B', 3, 'pavement');
        expect(road.surfaceMaterial).toBe('pavement');
    });

    test('should throw an error if lanes is not positive', () => {
        expect(() => new Road('Road B', 'City B', 0, 'concrete')).toThrow("Lanes must be a positive number greater than 0");
        expect(() => new Road('Road B', 'City B', -1, 'concrete')).toThrow("Lanes must be a positive number greater than 0");
        expect(() => new Road('Road B', 'City B', null, 'concrete')).toThrow("Lanes must be a positive number greater than 0");
    });

    test('should limit lanes to 5', () => {
      const road = new Road('Road A', 'City A', 10, 'asphalt');
      expect(road.lanes).toBe(5); // Límite de carriles es 5
    });

    test('should return correct description for Road', () => {
      const road = new Road('Road A', 'City A', 10, 'asphalt');
      expect(road.getDescription()).toBe('Road A located in City A with 5 lanes, surfaced with asphalt');
    });

    test('At this point, there should be 20 constructions instances', () => {
      expect(Building.getTotalInstances()).toBe(20);
    });
  });
});

// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
describe("ex5", () => {
  describe('SuspensionBridge Class', () => {
    test('should create a SuspensionBridge', () => {
        const suspensionBridge = new SuspensionBridge('Bridge A', 'City A', 500, 200, 'steel');
        expect(suspensionBridge.cableType).toBe('steel');
    });

    test('should describe SuspensionBridges correctly', () => {
        const suspensionBridge = new SuspensionBridge('Bridge A', 'City A', 500, 200, 'steel');
        expect(suspensionBridge.getDescription()).toBe('Suspension Bridge: Bridge A located in City A spanning 500 meters, max load 200 tons, using steel cables');
    });

    test('At this point, there should be 22 constructions instances', () => {
      expect(Building.getTotalInstances()).toBe(22);
    });
  });

  describe('ArchBridge Class', () => {
    test('should create a ArchBridge', () => {
        const archBridge = new ArchBridge('Bridge B', 'City B', 300, 100, 'concrete');
        expect(archBridge.archMaterial).toBe('concrete');
    });

    test('should describe ArchBrionBridges correctly', () => {
      const archBridge = new ArchBridge('Bridge B', 'City B', 300, 100, 'concrete');
        expect(archBridge.getDescription()).toBe('Arch Bridge: Bridge B located in City B spanning 300 meters, max load 100 tons, with arches made of concrete');
    });

    test('At this point, there should be 24 constructions instances', () => {
      expect(Building.getTotalInstances()).toBe(24);
    });
  });

  describe('Highway Class', () => {
    test('should accept a boolean value for tollRoad', () => {
      const highway = new Highway('Highway A', 'City A', 4, 'asphalt', true);

      highway.tollRoad = false;
      expect(highway.tollRoad).toBe(false);

      highway.tollRoad = true;
      expect(highway.tollRoad).toBe(true);
    });

    test('should throw an error if tollRoad is not a boolean', () => {
      const highway = new Highway('Highway A', 'City A', 4, 'asphalt', true);

        expect(() => {
            highway.tollRoad = 'yes';
        }).toThrow("tollRoad must be a boolean value");

        expect(() => {
            highway.tollRoad = 1;
        }).toThrow("tollRoad must be a boolean value");

        expect(() => {
            highway.tollRoad = null;
        }).toThrow("tollRoad must be a boolean value");
    });

    test('should add and remove bridges', () => {
        const highway = new Highway('Highway A', 'City A', 4, 'asphalt', true);
        const suspensionBridge = new SuspensionBridge('Suspension Bridge A', 'City A', 300, 100, 'steel');
        const archBridge = new ArchBridge('Arch Bridge B', 'City B', 200, 50, 'concrete');
        
        highway.addSuspensionBridge(suspensionBridge);
        highway.addArchBridge(archBridge);

        expect(highway.getTotalBridges()).toBe(2);

        highway.removeSuspensionBridge(suspensionBridge);
        expect(highway.getTotalBridges()).toBe(1);
    });

    let highway;

    beforeEach(() => {
        highway = new Highway('Main Highway', 'City A', 4, 'Asphalt', true);
    });

    test('should return description without bridges', () => {
        const description = highway.getDescription();
        expect(description).toBe('Highway: Main Highway located in City A with 4 lanes, surfaced with Asphalt, toll road, no bridges');
    });

    test('should return description with suspension bridges', () => {
        const bridge1 = new SuspensionBridge('Golden Gate', 'City A', 2000, 1000, 'steel');
        const bridge2 = new SuspensionBridge('Brooklyn Bridge', 'City B', 1800, 900, 'steel');

        highway.addSuspensionBridge(bridge1);
        highway.addSuspensionBridge(bridge2);

        const description = highway.getDescription();
        expect(description).toBe(
            "Highway: Main Highway located in City A with 4 lanes, surfaced with Asphalt, toll road, with 2 bridges: " +
            "suspension bridges: Suspension Bridge: Golden Gate located in City A spanning 2000 meters, max load 1000 tons, using steel cables; " +
            "Suspension Bridge: Brooklyn Bridge located in City B spanning 1800 meters, max load 900 tons, using steel cables"
        );
    });

    test('should return description with arch bridges', () => {
        const bridge1 = new ArchBridge('Stone Arch', 'City C', 300, 500, 'stone');

        highway.addArchBridge(bridge1);

        const description = highway.getDescription();
        expect(description).toBe(
            "Highway: Main Highway located in City A with 4 lanes, surfaced with Asphalt, toll road, with 1 bridges: " + 
            "arch bridges: Arch Bridge: Stone Arch located in City C spanning 300 meters, max load 500 tons, with arches made of stone"
        );
    });

    test('should return description with both suspension and arch bridges', () => {
      const highway = new Highway("Main Highway", "City A", 4, "Asphalt", true);

      const suspensionBridge1 = new SuspensionBridge("Golden Gate", "San Francisco", 2737, 4000, "steel");
      const suspensionBridge2 = new SuspensionBridge("Brooklyn Bridge", "New York", 1834, 2500, "iron");
      const suspensionBridge3 = new SuspensionBridge("Akashi Kaikyō", "Japan", 3911, 5000, "steel");
  
      const archBridge1 = new ArchBridge("Stone Arch", "City C", 300, 500, "stone");
      const archBridge2 = new ArchBridge("Iron Arch", "City D", 400, 600, "iron");
  
      highway.addSuspensionBridge(suspensionBridge1);
      highway.addSuspensionBridge(suspensionBridge2);
      highway.addSuspensionBridge(suspensionBridge3);
      highway.addArchBridge(archBridge1);
      highway.addArchBridge(archBridge2);
  
      const expectedDescription = 
          "Highway: Main Highway located in City A with 4 lanes, surfaced with Asphalt, toll road, with 5 bridges: " +
          "suspension bridges: Suspension Bridge: Golden Gate located in San Francisco spanning 2737 meters, max load 4000 tons, using steel cables; " +
          "Suspension Bridge: Brooklyn Bridge located in New York spanning 1834 meters, max load 2500 tons, using iron cables; " +
          "Suspension Bridge: Akashi Kaikyō located in Japan spanning 3911 meters, max load 5000 tons, using steel cables, " +
          "arch bridges: Arch Bridge: Stone Arch located in City C spanning 300 meters, max load 500 tons, with arches made of stone; " +
          "Arch Bridge: Iron Arch located in City D spanning 400 meters, max load 600 tons, with arches made of iron";
  
      expect(highway.getDescription()).toBe(expectedDescription);
    });

    test('At this point, there should be 46 constructions instances', () => {
      expect(Building.getTotalInstances()).toBe(46);
    });
  });

  describe('Street Class', () => {
      test('should create a Street with boolean hasSidewalks', () => {
          const street = new Street('Street A', 'City A', 2, 'asphalt', true);
          expect(street.hasSidewalks).toBe('Yes');

          const streetWithoutSidewalks = new Street("Second Street", "City B", 2, "Concrete", false);
          expect(streetWithoutSidewalks.hasSidewalks).toBe("No");
      });

      test('should throw error if hasSidewalks is not boolean', () => {
          expect(() => new Street('Street B', 'City B', 2, 'concrete', 'yes')).toThrow("hasSidewalks must be a boolean value");
      });

      test('should describe Streets correctly', () => {
        const street = new Street('Street A', 'City A', 2, 'asphalt', true);
        expect(street.getDescription()).toBe('Street: Street A located in City A with 2 lanes, surfaced with asphalt with sidewalks');
        street.hasSidewalks = false;
        expect(street.getDescription()).toBe('Street: Street A located in City A with 2 lanes, surfaced with asphalt without sidewalks');
      });

      test('At this point, there should be 50 constructions instances', () => {
        expect(Building.getTotalInstances()).toBe(50);
      });
  });
});

// --------------------------------------------------------------------------------
// EXERCISE 6
// --------------------------------------------------------------------------------
describe('ex6', () => {
    let construction;

    beforeEach(() => {
        construction = new ConstructionFunction('Building A', 'City A');
    });

    test('should create an instance with name and location', () => {
        expect(construction.getName()).toBe('Building A');
        expect(construction.getLocation()).toBe('City A');
    });

    test('should set a new name', () => {
        construction.setName('Building B');
        expect(construction.getName()).toBe('Building B');
    });

    test('should set a new location', () => {
        construction.setLocation('City B');
        expect(construction.getLocation()).toBe('City B');
    });

    test('should return a correct description', () => {
        expect(construction.getDescription()).toBe('Building A located in City A');
    });

    test('should update the description after setting new name and location', () => {
        construction.setName('Building C');
        construction.setLocation('City C');
        expect(construction.getDescription()).toBe('Building C located in City C');
    });

    test('should have the getLocation method on the prototype', () => {
        expect(construction.hasOwnProperty('getLocation')).toBe(false);
        expect(construction.getLocation).toBe(ConstructionFunction.prototype.getLocation);
    });

    test('should have the setLocation method on the prototype', () => {
        expect(construction.hasOwnProperty('setLocation')).toBe(false);
        expect(construction.setLocation).toBe(ConstructionFunction.prototype.setLocation);
    });

    test('should have the getName and setName methods on the instance', () => {
        expect(construction.hasOwnProperty('getName')).toBe(true);
        expect(construction.hasOwnProperty('setName')).toBe(true);
    });

    test('getLocation should return the current location', () => {
        expect(construction.getLocation()).toBe('City A');
    });

    test('setLocation should update the location', () => {
        construction.setLocation('New City');
        expect(construction.getLocation()).toBe('New City');
    });
});

