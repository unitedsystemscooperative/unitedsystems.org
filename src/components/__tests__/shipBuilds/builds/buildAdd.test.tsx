import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { BuildAdd } from 'components/shipBuilds';
import { SnackbarProvider } from 'notistack';
import { MemoryRouter } from 'react-router-dom';
import * as shipHooks from 'hooks/shipBuilds/useShipBuilds';

describe('BuildAdd', () => {
  afterEach(cleanup);

  it('renders when loading', () => {
    const spy = jest.spyOn(shipHooks, 'useShipBuilds');
    spy.mockReturnValue({
      loading: true,
      shipBuilds: [],
      addBuild: jest.fn(),
      addRelated: jest.fn(),
      addVariant: jest.fn(),
      replaceBuild: jest.fn(),
    });
    const { getByText } = render(
      <SnackbarProvider maxSnack={1}>
        <MemoryRouter>
          <BuildAdd />
        </MemoryRouter>
      </SnackbarProvider>
    );
    expect(getByText('Loading')).toBeDefined();
  });

  it('renders when ready', () => {
    const spy = jest.spyOn(shipHooks, 'useShipBuilds');
    spy.mockReturnValue({
      loading: false,
      shipBuilds: [],
      addBuild: jest.fn(),
      addRelated: jest.fn(),
      addVariant: jest.fn(),
      replaceBuild: jest.fn(),
    });

    const { getByText } = render(
      <SnackbarProvider maxSnack={1}>
        <MemoryRouter>
          <BuildAdd />
        </MemoryRouter>
      </SnackbarProvider>
    );
    expect(getByText('Add Build Form')).toBeDefined();
  });

  describe('text fields', () => {
    let screen: RenderResult;

    beforeEach(() => {
      const spy = jest.spyOn(shipHooks, 'useShipBuilds');
      spy.mockReturnValue({
        loading: false,
        shipBuilds: [],
        addBuild: jest.fn(),
        addRelated: jest.fn(),
        addVariant: jest.fn(),
        replaceBuild: jest.fn(),
      });
      screen = render(
        <SnackbarProvider maxSnack={1}>
          <MemoryRouter>
            <BuildAdd />
          </MemoryRouter>
        </SnackbarProvider>
      );
    });

    it('updates the title field', async () => {
      const label = 'Title';

      fireEvent.change(screen.getByLabelText(label), {
        target: { value: 'Bad-ass ship build' },
      });

      await waitFor(() => screen.getByLabelText(label));

      expect(
        (screen.getByLabelText(label, {
          selector: 'input',
        }) as HTMLInputElement).value
      ).toBe('Bad-ass ship build');
    });

    it('updates the description field', async () => {
      const label = 'More Information - Accepts markdown';

      fireEvent.change(screen.getByLabelText(label), {
        target: { value: 'Bad-ass ship build' },
      });

      await waitFor(() => screen.getByLabelText(label));

      expect(
        (screen.getByLabelText(label, {
          selector: 'textarea',
        }) as HTMLInputElement).value
      ).toBe('Bad-ass ship build');
    });

    it('updates the buildLink field', async () => {
      const label = 'Build Link - Full';

      fireEvent.change(screen.getByLabelText(label), {
        target: { value: 'Bad-ass ship build' },
      });

      await waitFor(() => screen.getByLabelText(label));

      const field = screen.getByLabelText(label, {
        selector: 'input',
      }) as HTMLInputElement;
      expect(field.value).toBe('Bad-ass ship build');
      expect(field).toBeDisabled();
    });

    it('updates the author field', async () => {
      const label = 'Author';

      fireEvent.change(screen.getByLabelText(label), {
        target: { value: 'Bad-ass ship build' },
      });

      await waitFor(() => screen.getByLabelText(label));

      expect(
        (screen.getByLabelText(label, {
          selector: 'input',
        }) as HTMLInputElement).value
      ).toBe('Bad-ass ship build');
    });
  });

  describe('submission Types', () => {
    const addBuild = jest.fn();
    const addRelated = jest.fn();
    const addVariant = jest.fn();

    let screen: RenderResult;

    const popFields = async () => {
      if (screen) {
        fireEvent.change(screen.getByLabelText('Exported JSON'), {
          target: {
            value: `{
  "$schema": "https://coriolis.io/schemas/ship-loadout/4.json#",
  "name": "Keelback Racer",
  "ship": "Keelback",
  "references": [
    {
      "name": "Coriolis.io",
      "url": "https://coriolis.io/outfit/keelback?code=A0p3taFdl3dds8f4-------frv6B3----.Iw18cQ%3D%3D.Aw18cQ%3D%3D.H4sIAAAAAAAAAz2Puw4BURCGf%2Fd7NitriULiWgqtSLQKD6DcWqVQKCR4BU%2BgVCoVSqVHEE%2BgUIgCO2NmwznFn5Pzf%2FlmDigBwI9JfDYSmWMYyK2ygD2WW%2F6QARqPEMAhGhhyKZE8pQCr%2F2R2t5b0YXJNP5OwGi9mp%2FJmLmhf2keB%2BrQoZITKfzKAgiHOoiDQRR45Sl3Tz2%2FSn6%2FMHKOe8a8lUupKd2ygqpKaRlOjlSXB4%2BQpHlHJ8CESNbW1Z5tGxjTB7xNB7%2Bx8WVeXKHl3IRm%2F8wVtKdynJwEAAA%3D%3D&bn=Keelback%20Racer",
      "code": "A0p3taFdl3dds8f4-------frv6B3----.Iw18cQ==.Aw18cQ==.H4sIAAAAAAAAAz2Puw4BURCGf/d7NitriULiWgqtSLQKD6DcWqVQKCR4BU+gVCoVSqVHEE+gUIgCO2NmwznFn5Pzf/lmDigBwI9JfDYSmWMYyK2ygD2WW/6QARqPEMAhGhhyKZE8pQCr/2R2t5b0YXJNP5OwGi9mp/JmLmhf2keB+rQoZITKfzKAgiHOoiDQRR45Sl3Tz2/Sn6/MHKOe8a8lUupKd2ygqpKaRlOjlSXB4+QpHlHJ8CESNbW1Z5tGxjTB7xNB7+x8WVeXKHl3IRm/8wVtKdynJwEAAA==",
      "shipId": "keelback"
    }
  ],
  "components": {
    "standard": {
      "bulkheads": "Lightweight Alloy",
      "cargoHatch": {
        "enabled": true,
        "priority": 1
      },
      "powerPlant": {
        "class": 2,
        "rating": "D",
        "enabled": true,
        "priority": 1,
        "modifications": {
          "eff": 2500,
          "integrity": -2500,
          "pgen": 4000
        },
        "blueprint": {
          "fdname": "PowerPlant_Boosted",
          "grades": {
            "1": {
              "components": {
                "Sulphur": 1
              },
              "features": {
                "eff": [
                  0.05,
                  0.05
                ],
                "integrity": [
                  -0.05,
                  -0.05
                ],
                "pgen": [
                  0,
                  0.12
                ]
              },
              "uuid": "06282764-2821-4604-ad2c-d9b148d562d0"
            },
            "2": {
              "components": {
                "Conductive Components": 1,
                "Heat Conduction Wiring": 1
              },
              "features": {
                "eff": [
                  0.1,
                  0.1
                ],
                "integrity": [
                  -0.1,
                  -0.1
                ],
                "pgen": [
                  0.12,
                  0.19
                ]
              },
              "uuid": "feb49620-2df8-4ec6-9a58-13f986aed81f"
            },
            "3": {
              "components": {
                "Conductive Components": 1,
                "Heat Conduction Wiring": 1,
                "Selenium": 1
              },
              "features": {
                "eff": [
                  0.15,
                  0.15
                ],
                "integrity": [
                  -0.15,
                  -0.15
                ],
                "pgen": [
                  0.19,
                  0.26
                ]
              },
              "uuid": "9325c166-998d-4ea6-8dab-0aafcec76705"
            },
            "4": {
              "components": {
                "Cadmium": 1,
                "Conductive Ceramics": 1,
                "Heat Dispersion Plate": 1
              },
              "features": {
                "eff": [
                  0.2,
                  0.2
                ],
                "integrity": [
                  -0.2,
                  -0.2
                ],
                "pgen": [
                  0.26,
                  0.33
                ]
              },
              "uuid": "6dd84c8d-1d21-4bf5-a747-f582ffe49a99"
            },
            "5": {
              "components": {
                "Chemical Manipulators": 1,
                "Conductive Ceramics": 1,
                "Tellurium": 1
              },
              "features": {
                "eff": [
                  0.25,
                  0.25
                ],
                "integrity": [
                  -0.25,
                  -0.25
                ],
                "pgen": [
                  0.33,
                  0.4
                ]
              },
              "uuid": "f8cee63e-9cdf-43e5-9584-a945d4c57aee"
            }
          },
          "id": 63,
          "modulename": [
            "Power plant"
          ],
          "name": "Overcharged",
          "grade": 5,
          "special": {
            "name": "Stripped Down",
            "id": 127,
            "edname": "special_powerplant_lightweight",
            "uuid": "11b258eb-36d1-4cbc-be04-7fc426ef3121"
          }
        }
      },
      "thrusters": {
        "class": 4,
        "rating": "A",
        "enabled": true,
        "priority": 1,
        "modifications": {
          "integrity": -1500,
          "optmass": -1250,
          "optmul": 4000,
          "power": 1200,
          "thermload": 6000
        },
        "blueprint": {
          "fdname": "Engine_Dirty",
          "grades": {
            "1": {
              "components": {
                "Specialised Legacy Firmware": 1
              },
              "features": {
                "integrity": [
                  -0.03,
                  -0.03
                ],
                "optmass": [
                  -0.025,
                  -0.025
                ],
                "optmul": [
                  0,
                  0.12
                ],
                "power": [
                  0.04,
                  0.04
                ],
                "thermload": [
                  0.2,
                  0.2
                ]
              },
              "uuid": "bbdea125-dd2b-4031-8698-56c922df3b76"
            },
            "2": {
              "components": {
                "Mechanical Equipment": 1,
                "Specialised Legacy Firmware": 1
              },
              "features": {
                "integrity": [
                  -0.06,
                  -0.06
                ],
                "optmass": [
                  -0.05,
                  -0.05
                ],
                "optmul": [
                  0.12,
                  0.19
                ],
                "power": [
                  0.06,
                  0.06
                ],
                "thermload": [
                  0.3,
                  0.3
                ]
              },
              "uuid": "d3ccba04-e0f5-40c3-a6f8-a038d5e5b4bf"
            },
            "3": {
              "components": {
                "Chromium": 1,
                "Mechanical Components": 1,
                "Specialised Legacy Firmware": 1
              },
              "features": {
                "integrity": [
                  -0.09,
                  -0.09
                ],
                "optmass": [
                  -0.075,
                  -0.075
                ],
                "optmul": [
                  0.19,
                  0.26
                ],
                "power": [
                  0.08,
                  0.08
                ],
                "thermload": [
                  0.4,
                  0.4
                ]
              },
              "uuid": "60091d1f-38a9-4d62-bbc0-6332e03c7f3d"
            },
            "4": {
              "components": {
                "Configurable Components": 1,
                "Modified Consumer Firmware": 1,
                "Selenium": 1
              },
              "features": {
                "integrity": [
                  -0.12,
                  -0.12
                ],
                "optmass": [
                  -0.1,
                  -0.1
                ],
                "optmul": [
                  0.26,
                  0.33
                ],
                "power": [
                  0.1,
                  0.1
                ],
                "thermload": [
                  0.5,
                  0.5
                ]
              },
              "uuid": "7355e32e-b850-4428-8279-66f234f59c6a"
            },
            "5": {
              "components": {
                "Cadmium": 1,
                "Cracked Industrial Firmware": 1,
                "Pharmaceutical Isolators": 1
              },
              "features": {
                "integrity": [
                  -0.15,
                  -0.15
                ],
                "optmass": [
                  -0.125,
                  -0.125
                ],
                "optmul": [
                  0.33,
                  0.4
                ],
                "power": [
                  0.12,
                  0.12
                ],
                "thermload": [
                  0.6,
                  0.6
                ]
              },
              "uuid": "92514d80-4513-489e-b85f-1b7010b3ae0f"
            }
          },
          "id": 22,
          "modulename": [
            "Thrusters",
            "Engines"
          ],
          "name": "Dirty",
          "grade": 5,
          "special": {
            "name": "Drag Drives",
            "id": 116,
            "edname": "special_engine_overloaded",
            "uuid": "68998b16-7b65-4f58-8bc0-6e0f2686c367"
          }
        }
      },
      "frameShiftDrive": {
        "class": 4,
        "rating": "D",
        "enabled": true,
        "priority": 1,
        "modifications": {
          "integrity": -1500,
          "mass": 3000,
          "optmass": 5500,
          "power": 1500
        },
        "blueprint": {
          "fdname": "FSD_LongRange",
          "grades": {
            "1": {
              "components": {
                "Atypical Disrupted Wake Echoes": 1
              },
              "features": {
                "integrity": [
                  -0.03,
                  -0.03
                ],
                "mass": [
                  0.1,
                  0.1
                ],
                "optmass": [
                  0,
                  0.15
                ],
                "power": [
                  0.03,
                  0.03
                ]
              },
              "uuid": "bb67b1a2-7a5b-47bc-8ed8-e949b5e3fb16"
            },
            "2": {
              "components": {
                "Atypical Disrupted Wake Echoes": 1,
                "Chemical Processors": 1
              },
              "features": {
                "integrity": [
                  -0.06,
                  -0.06
                ],
                "mass": [
                  0.15,
                  0.15
                ],
                "optmass": [
                  0.15,
                  0.25
                ],
                "power": [
                  0.06,
                  0.06
                ]
              },
              "uuid": "74045351-f348-45f5-8798-487211f19520"
            },
            "3": {
              "components": {
                "Chemical Processors": 1,
                "Phosphorus": 1,
                "Strange Wake Solutions": 1
              },
              "features": {
                "integrity": [
                  -0.09,
                  -0.09
                ],
                "mass": [
                  0.2,
                  0.2
                ],
                "optmass": [
                  0.25,
                  0.35
                ],
                "power": [
                  0.09,
                  0.09
                ]
              },
              "uuid": "cf196bb9-55a1-457f-893b-84ff2afd4db9"
            },
            "4": {
              "components": {
                "Chemical Distillery": 1,
                "Eccentric Hyperspace Trajectories": 1,
                "Manganese": 1
              },
              "features": {
                "integrity": [
                  -0.12,
                  -0.12
                ],
                "mass": [
                  0.25,
                  0.25
                ],
                "optmass": [
                  0.35,
                  0.45
                ],
                "power": [
                  0.12,
                  0.12
                ]
              },
              "uuid": "ecf49fec-32fd-4930-949d-a341bf0fd00c"
            },
            "5": {
              "components": {
                "Arsenic": 1,
                "Chemical Manipulators": 1,
                "Datamined Wake Exceptions": 1
              },
              "features": {
                "integrity": [
                  -0.15,
                  -0.15
                ],
                "mass": [
                  0.3,
                  0.3
                ],
                "optmass": [
                  0.45,
                  0.55
                ],
                "power": [
                  0.15,
                  0.15
                ]
              },
              "uuid": "dddd4fd3-bc9a-4c5b-8606-853c63d0f554"
            }
          },
          "id": 26,
          "modulename": [
            "Frame shift drive",
            "FSD"
          ],
          "name": "Increased range",
          "grade": 5
        }
      },
      "lifeSupport": {
        "class": 1,
        "rating": "D",
        "enabled": true,
        "priority": 1,
        "modifications": {
          "integrity": -5000,
          "mass": -8500
        },
        "blueprint": {
          "fdname": "LifeSupport_LightWeight",
          "grades": {
            "1": {
              "components": {
                "Phosphorus": 1
              },
              "features": {
                "integrity": [
                  -0.1,
                  -0.1
                ],
                "mass": [
                  0,
                  -0.45
                ]
              },
              "uuid": "e1e1bd93-3a3f-4454-bfe3-0e2b6840b43a"
            },
            "2": {
              "components": {
                "Manganese": 1,
                "Salvaged Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.2,
                  -0.2
                ],
                "mass": [
                  -0.45,
                  -0.55
                ]
              },
              "uuid": "aaf29592-df21-4b4c-aeac-20252e75b8aa"
            },
            "3": {
              "components": {
                "Conductive Ceramics": 1,
                "Manganese": 1,
                "Salvaged Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.3,
                  -0.3
                ],
                "mass": [
                  -0.55,
                  -0.65
                ]
              },
              "uuid": "8876b27a-2c31-49f0-8a47-c11acd801c2b"
            },
            "4": {
              "components": {
                "Conductive Components": 1,
                "Phase Alloys": 1,
                "Proto Light Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.4,
                  -0.4
                ],
                "mass": [
                  -0.65,
                  -0.75
                ]
              },
              "uuid": "b7672f07-e10e-4371-989c-dd49e28c4b79"
            },
            "5": {
              "components": {
                "Conductive Ceramics": 1,
                "Proto Radiolic Alloys": 1,
                "Proto Light Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.5,
                  -0.5
                ],
                "mass": [
                  -0.75,
                  -0.85
                ]
              },
              "uuid": "ec9b7ac2-7a99-4f96-8bf1-061df58dba79"
            }
          },
          "id": 49,
          "modulename": [
            "Life support"
          ],
          "name": "Lightweight",
          "grade": 5
        }
      },
      "powerDistributor": {
        "class": 3,
        "rating": "D",
        "enabled": true,
        "priority": 1,
        "modifications": {
          "engcap": 6000,
          "engrate": 4400,
          "syscap": -1500,
          "sysrate": -1500,
          "wepcap": -1500,
          "weprate": -500
        },
        "blueprint": {
          "fdname": "PowerDistributor_PriorityEngines",
          "grades": {
            "1": {
              "components": {
                "Sulphur": 1
              },
              "features": {
                "engcap": [
                  0,
                  0.2
                ],
                "engrate": [
                  0,
                  0.16
                ],
                "syscap": [
                  -0.03,
                  -0.03
                ],
                "sysrate": [
                  -0.03,
                  -0.03
                ],
                "wepcap": [
                  -0.03,
                  -0.03
                ],
                "weprate": [
                  -0.01,
                  -0.01
                ]
              },
              "uuid": "69f1b8a3-c868-452f-bdbd-cfc95e117ab5"
            },
            "2": {
              "components": {
                "Conductive Components": 1,
                "Sulphur": 1
              },
              "features": {
                "engcap": [
                  0.2,
                  0.3
                ],
                "engrate": [
                  0.16,
                  0.23
                ],
                "syscap": [
                  -0.06,
                  -0.06
                ],
                "sysrate": [
                  -0.06,
                  -0.06
                ],
                "wepcap": [
                  -0.06,
                  -0.06
                ],
                "weprate": [
                  -0.02,
                  -0.02
                ]
              },
              "uuid": "5e91d652-7346-4a22-82c9-79853fdcdf91"
            },
            "3": {
              "components": {
                "Anomalous Bulk Scan Data": 1,
                "Chromium": 1,
                "Electrochemical Arrays": 1
              },
              "features": {
                "engcap": [
                  0.3,
                  0.4
                ],
                "engrate": [
                  0.23,
                  0.3
                ],
                "syscap": [
                  -0.09,
                  -0.09
                ],
                "sysrate": [
                  -0.09,
                  -0.09
                ],
                "wepcap": [
                  -0.09,
                  -0.09
                ],
                "weprate": [
                  -0.03,
                  -0.03
                ]
              },
              "uuid": "4185370a-c4e9-4f58-9b67-a7f46bb2d3c2"
            },
            "4": {
              "components": {
                "Unidentified Scan Archives": 1,
                "Selenium": 1,
                "Polymer Capacitors": 1
              },
              "features": {
                "engcap": [
                  0.4,
                  0.5
                ],
                "engrate": [
                  0.3,
                  0.37
                ],
                "syscap": [
                  -0.12,
                  -0.12
                ],
                "sysrate": [
                  -0.12,
                  -0.12
                ],
                "wepcap": [
                  -0.12,
                  -0.12
                ],
                "weprate": [
                  -0.04,
                  -0.04
                ]
              },
              "uuid": "6a6a497e-8261-4763-8a15-c78222a00443"
            },
            "5": {
              "components": {
                "Classified Scan Databanks": 1,
                "Cadmium": 1,
                "Military Supercapacitors": 1
              },
              "features": {
                "engcap": [
                  0.5,
                  0.6
                ],
                "engrate": [
                  0.37,
                  0.44
                ],
                "syscap": [
                  -0.15,
                  -0.15
                ],
                "sysrate": [
                  -0.15,
                  -0.15
                ],
                "wepcap": [
                  -0.15,
                  -0.15
                ],
                "weprate": [
                  -0.05,
                  -0.05
                ]
              },
              "uuid": "ac618c54-ecfc-489a-98cb-e3f5789ad69f"
            }
          },
          "id": 58,
          "modulename": [
            "Power distributor",
            "Distributor"
          ],
          "name": "Engine focused",
          "grade": 5,
          "special": {
            "name": "Super Conduits",
            "id": 129,
            "edname": "special_powerdistributor_fast",
            "uuid": "b5bb35a1-e851-4d37-8f26-8fe828f84c95"
          }
        }
      },
      "sensors": {
        "class": 2,
        "rating": "D",
        "enabled": true,
        "priority": 1,
        "modifications": {
          "integrity": -3000,
          "mass": -5000,
          "angle": -1500
        },
        "blueprint": {
          "fdname": "Sensor_LightWeight",
          "grades": {
            "1": {
              "components": {
                "Phosphorus": 1
              },
              "features": {
                "integrity": [
                  -0.1,
                  -0.1
                ],
                "mass": [
                  0,
                  -0.2
                ],
                "angle": [
                  -0.05,
                  -0.05
                ]
              },
              "uuid": "239cd942-3298-4be0-b032-143961c801a1"
            },
            "2": {
              "components": {
                "Manganese": 1,
                "Salvaged Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.2,
                  -0.2
                ],
                "mass": [
                  -0.2,
                  -0.35
                ],
                "angle": [
                  -0.1,
                  -0.1
                ]
              },
              "uuid": "8dd41f78-c4f0-4107-a1fe-d1eee78bbd23"
            },
            "3": {
              "components": {
                "Conductive Ceramics": 1,
                "Manganese": 1,
                "Salvaged Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.3,
                  -0.3
                ],
                "mass": [
                  -0.35,
                  -0.5
                ],
                "angle": [
                  -0.15,
                  -0.15
                ]
              },
              "uuid": "d51697d0-c837-4c0d-a6af-f192ace27e9a"
            },
            "4": {
              "components": {
                "Conductive Components": 1,
                "Phase Alloys": 1,
                "Proto Light Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.4,
                  -0.4
                ],
                "mass": [
                  -0.5,
                  -0.65
                ],
                "angle": [
                  -0.2,
                  -0.2
                ]
              },
              "uuid": "01ccf913-c1cb-47a6-9515-1d2ee3e3b2ae"
            },
            "5": {
              "components": {
                "Conductive Ceramics": 1,
                "Proto Light Alloys": 1,
                "Proto Radiolic Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.5,
                  -0.5
                ],
                "mass": [
                  -0.65,
                  -0.8
                ],
                "angle": [
                  -0.25,
                  -0.25
                ]
              },
              "uuid": "93c0ae86-d3ac-40c5-9ef3-b65c14d53cf6"
            }
          },
          "id": 96,
          "modulename": [
            "Sensors"
          ],
          "name": "Lightweight",
          "grade": 3
        }
      },
      "fuelTank": {
        "class": 4,
        "rating": "C",
        "enabled": true,
        "priority": 1
      }
    },
    "hardpoints": [
      null,
      null,
      null,
      null
    ],
    "utility": [
      null,
      null,
      null
    ],
    "internal": [
      {
        "class": 5,
        "rating": "D",
        "enabled": true,
        "priority": 1,
        "group": "Fighter Hangar"
      },
      {
        "class": 2,
        "rating": "G",
        "enabled": true,
        "priority": 1,
        "group": "Planetary Vehicle Hangar"
      },
      {
        "class": 4,
        "rating": "C",
        "enabled": true,
        "priority": 1,
        "group": "Bi-Weave Shield Generator",
        "modifications": {
          "integrity": -2500,
          "mass": -5000,
          "optmass": -600,
          "optmul": 1500,
          "power": -4000
        },
        "blueprint": {
          "fdname": "ShieldGenerator_Optimised",
          "grades": {
            "1": {
              "components": {
                "Distorted Shield Cycle Recordings": 1
              },
              "features": {
                "integrity": [
                  -0.05,
                  -0.05
                ],
                "mass": [
                  0,
                  -0.18
                ],
                "optmass": [
                  -0.02,
                  -0.02
                ],
                "optmul": [
                  0,
                  0.03
                ],
                "power": [
                  0,
                  -0.2
                ]
              },
              "uuid": "598e0c47-ecd2-4cfa-93d1-08bbda4cd765"
            },
            "2": {
              "components": {
                "Distorted Shield Cycle Recordings": 1,
                "Germanium": 1
              },
              "features": {
                "integrity": [
                  -0.1,
                  -0.1
                ],
                "mass": [
                  -0.18,
                  -0.26
                ],
                "optmass": [
                  -0.03,
                  -0.03
                ],
                "optmul": [
                  0.03,
                  0.06
                ],
                "power": [
                  -0.2,
                  -0.25
                ]
              },
              "uuid": "605d6333-c544-425e-96c6-a76b6b839e2c"
            },
            "3": {
              "components": {
                "Distorted Shield Cycle Recordings": 1,
                "Germanium": 1,
                "Precipitated Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.15,
                  -0.15
                ],
                "mass": [
                  -0.26,
                  -0.34
                ],
                "optmass": [
                  -0.04,
                  -0.04
                ],
                "optmul": [
                  0.06,
                  0.09
                ],
                "power": [
                  -0.25,
                  -0.3
                ]
              },
              "uuid": "db5f0467-5bdc-433e-986d-031bbd48067b"
            },
            "4": {
              "components": {
                "Inconsistent Shield Soak Analysis": 1,
                "Niobium": 1,
                "Thermic Alloys": 1
              },
              "features": {
                "integrity": [
                  -0.2,
                  -0.2
                ],
                "mass": [
                  -0.34,
                  -0.42
                ],
                "optmass": [
                  -0.05,
                  -0.05
                ],
                "optmul": [
                  0.09,
                  0.12
                ],
                "power": [
                  -0.3,
                  -0.35
                ]
              },
              "uuid": "88987ab7-b759-4cda-acbb-726bd0ad17c7"
            },
            "5": {
              "components": {
                "Military Grade Alloys": 1,
                "Tin": 1,
                "Untypical Shield Scans": 1
              },
              "features": {
                "integrity": [
                  -0.25,
                  -0.25
                ],
                "mass": [
                  -0.42,
                  -0.5
                ],
                "optmass": [
                  -0.06,
                  -0.06
                ],
                "optmul": [
                  0.12,
                  0.15
                ],
                "power": [
                  -0.35,
                  -0.4
                ]
              },
              "uuid": "cf878a5a-542b-46e8-8b56-4d179eac3f46"
            }
          },
          "id": 76,
          "modulename": [
            "Shield generator",
            "Shields"
          ],
          "name": "Enhanced low power",
          "grade": 5,
          "special": {
            "name": "Fast Charge",
            "id": 106,
            "edname": "special_shield_regenerative",
            "uuid": "42c5e92d-ccab-435a-b2c6-fd268d39d6f5"
          }
        }
      },
      null,
      null,
      null,
      null
    ]
  },
  "stats": {
    "class": 2,
    "hullCost": 2943870,
    "speed": 200,
    "boost": 300,
    "boostEnergy": 10,
    "baseShieldStrength": 135,
    "baseArmour": 270,
    "hardness": 45,
    "heatCapacity": 215,
    "hullMass": 180,
    "masslock": 8,
    "pipSpeed": 0.14,
    "fighterHangars": 1,
    "pitch": 27,
    "roll": 100,
    "yaw": 15,
    "crew": 2,
    "moduleCostMultiplier": 1,
    "fuelCapacity": 16,
    "cargoCapacity": 0,
    "passengerCapacity": 0,
    "ladenMass": 245.68,
    "armour": 692.84,
    "shield": 187.08,
    "shieldCells": 0,
    "totalCost": 5524874,
    "unladenMass": 229.68,
    "totalDpe": 0,
    "totalAbsDpe": 0,
    "totalExplDpe": 0,
    "totalKinDpe": 0,
    "totalThermDpe": 0,
    "totalDps": 0,
    "totalAbsDps": 0,
    "totalExplDps": 0,
    "totalKinDps": 0,
    "totalThermDps": 0,
    "totalSDps": 0,
    "totalAbsSDps": 0,
    "totalExplSDps": 0,
    "totalKinSDps": 0,
    "totalThermSDps": 0,
    "totalEps": 0,
    "totalHps": 0,
    "shieldExplRes": 0.49,
    "shieldKinRes": 0.39,
    "shieldThermRes": -0.22,
    "hullExplRes": -0.37,
    "hullKinRes": -0.17,
    "hullThermRes": 0.02,
    "powerAvailable": 10.08,
    "powerRetracted": 9.76,
    "powerDeployed": 9.76,
    "unladenRange": 21.1,
    "fullTankRange": 19.89,
    "ladenRange": 19.89,
    "unladenFastestRange": 163.88,
    "ladenFastestRange": 163.88,
    "maxJumpCount": 8,
    "modulearmour": 0,
    "moduleprotection": 0,
    "hullCausRes": 0,
    "topSpeed": 317.5,
    "topBoost": 476.24,
    "topPitch": 42.86,
    "topRoll": 158.75,
    "topYaw": 23.81
  }
}`,
          },
        });
        fireEvent.change(screen.getByLabelText('Title'), {
          target: { value: 'tiddles' },
        });
        fireEvent.change(
          screen.getByLabelText('More Information - Accepts markdown'),
          {
            target: { value: 'some more information' },
          }
        );
        fireEvent.change(screen.getByLabelText('Build Link - Full'), {
          target: { value: 'https://unitedsystems.org' },
        });
        fireEvent.change(screen.getByLabelText('Author'), {
          target: { value: 'AUTHOR AUTHOR!' },
        });
        fireEvent.click(screen.getByText('Cargo'));

        await waitFor(() =>
          (screen.getByText('Cargo') as HTMLButtonElement).className.includes(
            'Mui-selected'
          )
        );
      }
    };

    beforeEach(() => {
      const spy = jest.spyOn(shipHooks, 'useShipBuilds');
      spy.mockReturnValue({
        loading: false,
        shipBuilds: [],
        addBuild,
        addRelated,
        addVariant,
        replaceBuild: jest.fn(),
      });
    });

    afterEach(cleanup);

    it('should not call addbuild without necessary info', async () => {
      screen = render(
        <SnackbarProvider maxSnack={1}>
          <MemoryRouter>
            <BuildAdd />
          </MemoryRouter>
        </SnackbarProvider>
      );

      fireEvent.click(screen.getByText('Submit Build'));

      expect(addBuild).not.toHaveBeenCalled();
      expect(addRelated).not.toHaveBeenCalled();
      expect(addVariant).not.toHaveBeenCalled();
    });

    it('should call addBuild only', async () => {
      screen = render(
        <SnackbarProvider maxSnack={1}>
          <MemoryRouter>
            <BuildAdd />
          </MemoryRouter>
        </SnackbarProvider>
      );

      await popFields();

      fireEvent.click(screen.getByText('Submit Build'));

      expect(addBuild).toHaveBeenCalled();
      expect(addRelated).not.toHaveBeenCalled();
      expect(addVariant).not.toHaveBeenCalled();
    });

    it('should call addVariant only', async () => {
      screen = render(
        <SnackbarProvider maxSnack={1}>
          <MemoryRouter initialEntries={['/?type=variant&refID=1234']}>
            <BuildAdd />
          </MemoryRouter>
        </SnackbarProvider>
      );

      await popFields();

      fireEvent.click(screen.getByText('Submit Build'));

      expect(addBuild).not.toHaveBeenCalled();
      expect(addRelated).not.toHaveBeenCalled();
      expect(addVariant).toHaveBeenCalled();
    });

    it('should call addRelated only', async () => {
      screen = render(
        <SnackbarProvider maxSnack={1}>
          <MemoryRouter initialEntries={['/?type=related&refID=1234']}>
            <BuildAdd />
          </MemoryRouter>
        </SnackbarProvider>
      );

      await popFields();

      fireEvent.click(screen.getByText('Submit Build'));

      expect(addBuild).not.toHaveBeenCalled();
      expect(addRelated).toHaveBeenCalled();
      expect(addVariant).not.toHaveBeenCalled();
    });
  });
});
