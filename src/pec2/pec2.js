// EXERCISE 1
// --------------------------------------------------------------------------------
export function calculateChange(amount) {

    // Comprova si l'import és negatiu o no és un nombre, i llança un error si és el cas
    if (typeof amount !== 'number' || amount < 0) {
        throw new Error("Amount must be a non-negative number"); 
    }

    // Defineix els valors de bitllets i monedes disponibles, en ordre descendent
    const denominations = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

    // Crea un objecte buit per emmagatzemar el resultat del canvi
    let change = {};

    // Itera per cada valor de bitllet o moneda
    for (let denomination of denominations) {
        // Calcula la quantitat de bitllets o monedes d'aquest valor necessaris
        let count = Math.floor(amount / denomination);

        // Si la quantitat és més gran que 0, l'afegeix al resultat
        if (count > 0) {
            change[denomination] = count;
            // Resta l'import corresponent del total restant
            amount -= count * denomination;
            // Arrodoneix l'import restant per evitar errors de precisió
            amount = Math.round(amount * 100) / 100;
        }
    }

    // Retorna l'objecte amb els bitllets i monedes necessaris
    return change;
}

 


// --------------------------------------------------------------------------------
// EXERCISE 2
// --------------------------------------------------------------------------------
// Export the DisplayDigit class to represent digits on a 7-segment display
export class DisplayDigit {
    constructor() {
        // Configuració dels segments per cada dígit (0-9)
        // Cada dígit té 7 segments representats com 0 (apagat) o 1 (encès)
        this.digits = [
            [1, 1, 1, 0, 1, 1, 1], // 0
            [0, 0, 1, 0, 0, 1, 0], // 1
            [1, 0, 1, 1, 1, 0, 1], // 2
            [1, 0, 1, 1, 0, 1, 1], // 3
            [0, 1, 1, 1, 0, 1, 0], // 4
            [1, 1, 0, 1, 0, 1, 1], // 5
            [1, 1, 0, 1, 1, 1, 1], // 6
            [1, 0, 1, 0, 0, 1, 0], // 7
            [1, 1, 1, 1, 1, 1, 1], // 8
            [1, 1, 1, 1, 0, 1, 1]  // 9
        ];
    }

    displayDigit(digit) {
        // Valida que l'entrada sigui un nombre entre 0 i 9
        if (typeof digit !== 'number' || digit < 0 || digit > 9) {
            throw new Error("The digit must be a number between 0 and 9");
        }

        // Obté la configuració de segments per al dígit especificat
        const segments = this.digits[digit];

        // Crea el patró de visualització utilitzant la configuració de segments
        const display = [
            segments[0] ? "███" : (digit === 1 ? "  █" : (digit === 4 ? "█ █" : "   ")),          // Segment superior
            (segments[1] ? "█" : " ") + " " + (segments[2] ? "█" : " "),                        // Segments lateral superior esquerre i dret
            segments[3] ? "███" : (digit === 0 ? "█ █" : "  █"),                                // Segment del mig (excepció per 0)
            (segments[4] ? "█" : " ") + " " + (segments[5] ? "█" : " "),                        // Segments lateral inferior esquerre i dret
            segments[6] ? "███" : "  █"                                                         // Segment inferior
        ];

        return display;
    }

    buildHorizontalSegment(isOn) {
        return isOn ? "███" : "   ";
    }

    buildVerticalSegment(leftOn, rightOn) {
        const left = leftOn ? "█" : " ";
        const right = rightOn ? "█" : " ";
        return `${left} ${right}`;
    }
}

// Exemple d'ús de la classe
const display = new DisplayDigit();
console.log(display.displayDigit(0));  // Visualització del dígit 0
console.log(display.displayDigit(1));  // Visualització del dígit 1
console.log(display.displayDigit(4));  // Visualització del dígit 4



// --------------------------------------------------------------------------------
// EXERCISE 3
// --------------------------------------------------------------------------------
export class DigitalClock {
    constructor(date) {
        if (!(date instanceof Date)) {
            throw new Error('The parameter must be a Date object');
        }
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
    }

    formatNumber(number) {
        return number < 10 ? '0' + number : number.toString();
    }

    getSevenSegmentDigit(digit) {
        const sevenSegmentDigits = {
            '0': ['███', '█ █', '█ █', '█ █', '███'],
            '1': ['  █', '  █', '  █', '  █', '  █'],
            '2': ['███', '  █', '███', '█  ', '███'],
            '3': ['███', '  █', '███', '  █', '███'],
            '4': ['█ █', '█ █', '███', '  █', '  █'],
            '5': ['███', '█  ', '███', '  █', '███'],
            '6': ['███', '█  ', '███', '█ █', '███'],
            '7': ['███', '  █', '  █', '  █', '  █'],
            '8': ['███', '█ █', '███', '█ █', '███'],
            '9': ['███', '█ █', '███', '  █', '███'],
            ':': ['   ', ' █ ', '   ', ' █ ', '   ']
        };
        return sevenSegmentDigits[digit];
    } 

    displayTime() {
        const hoursStr = this.formatNumber(this.hours);
        const minutesStr = this.formatNumber(this.minutes);
        const secondsStr = this.formatNumber(this.seconds);
        const timeStr = hoursStr + ':' + minutesStr + ':' + secondsStr;
        const segments = timeStr.split('').map(char => this.getSevenSegmentDigit(char));
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(segments.map(segment => segment[i]).join(' '));
        }
        return result.join('\n');
    }
}

// --------------------------------------------------------------------------------
// EXERCISE 4
// --------------------------------------------------------------------------------
// Classe base Construction
class Construction {
    static instanceCount = 0;

    constructor(name, location) {
        this._name = name;
        this._location = location;
        Construction.instanceCount++;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    getDescription() {
        return `${this.name} located in ${this.location}`;
    }

    static getTotalInstances() {
        return Construction.instanceCount;
    }
}

// Classe Building que hereta de Construction
class Building extends Construction {
    constructor(name, location, floors, material) {
        super(name, location);
        this.floors = floors;
        this.material = material;
    }

    get floors() {
        return this._floors;
    }

    set floors(value) {
        if (typeof value !== 'number' || value < 1 || value > 50) {
            throw new Error("The number of floors must be between 1 and 50");
        }
        this._floors = value;
    }

    get material() {
        return this._material;
    }

    set material(value) {
        const upperMaterial = value.toUpperCase();
        if (!['WOOD', 'STONE', 'GLASS'].includes(upperMaterial)) {
            throw new Error("Material must be one of the following: WOOD, STONE, GLASS");
        }
        this._material = upperMaterial;
    }

    getDescription() {
        return `${this.name} located in ${this.location} with ${this.floors} floors built with ${this.material}`;
    }
}

// Classe Bridge que hereta de Construction
class Bridge extends Construction {
    constructor(name, location, length, maxLoad) {
        super(name, location);
        this.length = length;
        this.maxLoad = maxLoad;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
    }

    get maxLoad() {
        return this._maxLoad;
    }

    set maxLoad(value) {
        this._maxLoad = value;
    }

    getDescription() {
        return `${this.name} located in ${this.location} spanning ${this.length} meters, max load ${this.maxLoad} tons`;
    }
}

// Classe Road que hereta de Construction
class Road extends Construction {
    constructor(name, location, lanes, surfaceMaterial) {
        super(name, location);
        this.lanes = lanes;
        this.surfaceMaterial = surfaceMaterial;
    }

    get lanes() {
        return this._lanes;
    }

    set lanes(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error("Lanes must be a positive number greater than 0");
        }
        this._lanes = value > 5 ? 5 : value;
    }

    get surfaceMaterial() {
        return this._surfaceMaterial;
    }

    set surfaceMaterial(value) {
        this._surfaceMaterial = value;
    }

    getDescription() {
        return `${this.name} located in ${this.location} with ${this.lanes} lanes, surfaced with ${this.surfaceMaterial}`;
    }
}

// --------------------------------------------------------------------------------
// EXERCISE 5
// --------------------------------------------------------------------------------
// Classe ArchBridge que hereta de Bridge
class ArchBridge extends Bridge {
    constructor(name, location, length, maxLoad, archMaterial) {
        super(name, location, length, maxLoad);
        this.archMaterial = archMaterial;
    }

    get archMaterial() {
        return this._archMaterial;
    }

    set archMaterial(value) {
        this._archMaterial = value;
    }

    getDescription() {
        return `Arch Bridge: ${this.name} located in ${this.location} spanning ${this.length} meters, max load ${this.maxLoad} tons, with arches made of ${this.archMaterial}`;
    }
}

// Classe SuspensionBridge que hereta de Bridge
class SuspensionBridge extends Bridge {
    constructor(name, location, length, maxLoad, cableType) {
        super(name, location, length, maxLoad);
        this.cableType = cableType;
    }

    get cableType() {
        return this._cableType;
    }

    set cableType(value) {
        this._cableType = value;
    }

    getDescription() {
        return `Suspension Bridge: ${this.name} located in ${this.location} spanning ${this.length} meters, max load ${this.maxLoad} tons, using ${this.cableType} cables`;
    }
}

// Classe Highway que hereta de Road
class Highway extends Road {
    constructor(name, location, lanes, surfaceMaterial, tollRoad) {
        super(name, location, lanes, surfaceMaterial);
        this.tollRoad = tollRoad;
        this.suspensionBridges = [];
        this.archBridges = [];
    }

    get tollRoad() {
        return this._tollRoad;
    }

    set tollRoad(value) {
        if (typeof value !== 'boolean') {
            throw new Error("tollRoad must be a boolean value");
        }
        this._tollRoad = value;
    }

    addSuspensionBridge(bridge) {
        if (!(bridge instanceof SuspensionBridge)) {
            throw new Error("Only SuspensionBridge instances can be added");
        }
        this.suspensionBridges.push(bridge);
    }

    removeSuspensionBridge(bridge) {
        const index = this.suspensionBridges.indexOf(bridge);
        if (index > -1) {
            this.suspensionBridges.splice(index, 1);
        }
    }

    addArchBridge(bridge) {
        if (!(bridge instanceof ArchBridge)) {
            throw new Error("Only ArchBridge instances can be added");
        }
        this.archBridges.push(bridge);
    }

    removeArchBridge(bridge) {
        const index = this.archBridges.indexOf(bridge);
        if (index > -1) {
            this.archBridges.splice(index, 1);
        }
    }

    getTotalBridges() {
        return this.suspensionBridges.length + this.archBridges.length;
    }

    getDescription() {
        const tollText = this.tollRoad ? 'toll road' : 'no toll';
        const totalBridges = this.getTotalBridges();
        
        if (totalBridges === 0) {
            return `Highway: ${this.name} located in ${this.location} with ${this.lanes} lanes, surfaced with ${this.surfaceMaterial}, ${tollText}, no bridges`;
        }
    
        const suspensionDescriptions = this.suspensionBridges.map(bridge => bridge.getDescription()).join('; ');
        const archDescriptions = this.archBridges.map(bridge => bridge.getDescription()).join('; ');
        
        let description = `Highway: ${this.name} located in ${this.location} with ${this.lanes} lanes, surfaced with ${this.surfaceMaterial}, ${tollText}, with ${totalBridges} bridges: `;
        
        if (this.suspensionBridges.length > 0) {
            description += `suspension bridges: ${suspensionDescriptions}`;
        }
        
        if (this.archBridges.length > 0) {
            if (this.suspensionBridges.length > 0) {
                description += ', ';
            }
            description += `arch bridges: ${archDescriptions}`;
        }
    
        return description.trim();
    }
}

// Classe Street que hereta de Road
class Street extends Road {
    constructor(name, location, lanes, surfaceMaterial, hasSidewalks) {
        super(name, location, lanes, surfaceMaterial);
        this.hasSidewalks = hasSidewalks;
    }

    get hasSidewalks() {
        return this._hasSidewalks ? "Yes" : "No";
    }

    set hasSidewalks(value) {
        if (typeof value !== 'boolean') {
            throw new Error("hasSidewalks must be a boolean value");
        }
        this._hasSidewalks = value;
    }

    getDescription() {
        return `Street: ${this.name} located in ${this.location} with ${this.lanes} lanes, surfaced with ${this.surfaceMaterial} ${this._hasSidewalks ? 'with sidewalks' : 'without sidewalks'}`;
    }
}

// Exporta les classes per utilitzar-les en els tests
module.exports = { Construction, Building, Bridge, Road, SuspensionBridge, ArchBridge, Highway, Street };


// --------------------------------------------------------------------------------
// EXERCISE 6
// --------------------------------------------------------------------------------
export function ConstructionFunction(name, location) {
    // Defineix propietats privades
    this._name = name;
    this._location = location;

    // Defineix el mètode getName a l'instància
    this.getName = function() {
        return this._name;
    };

    // Defineix el mètode setName a l'instància
    this.setName = function(newName) {
        this._name = newName;
    };

    // Defineix el mètode getDescription a l'instància
    this.getDescription = function() {
        return `${this._name} located in ${this._location}`;
    };
}

// Defineix el mètode getLocation al prototip
ConstructionFunction.prototype.getLocation = function() {
    return this._location;
};

// Defineix el mètode setLocation al prototip
ConstructionFunction.prototype.setLocation = function(newLocation) {
    this._location = newLocation;
};

// Exporta la funció constructora per als tests
module.exports = {calculateChange, DisplayDigit, DigitalClock, Construction, Building, Bridge, Road, SuspensionBridge, ArchBridge, Highway, Street, ConstructionFunction };