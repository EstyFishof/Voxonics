export default {
    getListScenarios: [
        {
            externalNumber: [],
            path: "/ewrwe",
            uid: "3d3c5b96-8694-470d-85ad-f3e43522ff68",
            scenario: {
                category: "from-provider",
                next: {},
                option: {name: null, externalNumber: []},
                schema: "vnumber-in"
            }
        }
    ],
    getScenario: {
        externalNumber: [],
        path: "/ewrwe",
        uid: "3d3c5b96-8694-470d-85ad-f3e43522ff68",
        scenario: {
            category: "from-provider",
            next: {},
            option: {name: null, externalNumber: []},
            schema: "vnumber-in"
        }
    },
    getShowConfig: 'queue',
    getInitialList: [
        {
            externalNumber: ['380443640000'],
            path: "/AAA",
            uid: "3d3c5b96-8694-470d-85ad-f3e43522ff68",
            scenario: {
                category: "from-provider",
                next: {},
                option: {name: null, externalNumber: ['380443640000']},
                schema: "vnumber-in"
            }
        }
    ],
    getItemScenario: {
        category: "from-provider",
        next: {},
        option: {name: null, externalNumber: ['380443640000']},
        schema: "vnumber-in"
    },
    getItemScenarioDial: {
        category: "app-dial-116-0bdc770b-9cc5-48ff-81f4-42de26aee6ef",
        next: {},
        option: {
            number: '123', 
            dialTime: 15, 
            moh: false, 
            callWait: false},
        schema: "dial"
    },
    getItemScenarioQueue: {
        category: "app-queue-1569-d0710047-b169-495e-bf41-c9a1bf86a0f6",
        next: {},
        option: {name: "Queue", number: "1569", maxWait: 3600, moh: false},
        schema: "queue"
    },
    getUserScenario: [
        {
            name: 'AAA',
            internalNumber: '123'
        }
    ],
    getQueuesScenarios: [
        {
            name: 'AAA',
            internalNumber: '1569'
        }
    ],
    getExternalNumbers: [
        {
            code: "",
            country: "Ukraine",
            description: "test",
            iso3: "AFG",
            network: "test",
            number: "380443640000",
            type: "Local",
            uid: "8a3acdbb-131a-4704-ad1f-be3cb89d48fa"
        }
    ],
    getCountriesScenario: [
        {
            country: "Afghanistan",
            // flag: "http://168.119.92.172/country/iso2/AF.svg",
            flag: "http://23.88.11.75/country/iso2/AF.svg",
            id: 1,
            iso2: "AF",
            iso3: "AFG",
        }
    ]
};