import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  {
    description: "Map { } to right ⌘ + 7 / 0",
    manipulators: [
      {
        from: {
          key_code: "7",
          modifiers: {
            mandatory: ["right_gui"],
          },
        },
        to: [
          {
            key_code: "8",
            modifiers: ["right_alt", "right_shift"],
          },
        ],
        type: "basic",
      },
      {
        from: {
          key_code: "0",
          modifiers: {
            mandatory: ["right_gui"],
          },
        },
        to: [
          {
            key_code: "9",
            modifiers: ["right_alt", "right_shift"],
          },
        ],
        type: "basic",
      },
    ],
  },
  {
    description: "Map [ ] to right ⌘ + 8 / 9",
    manipulators: [
      {
        from: {
          key_code: "8",
          modifiers: {
            mandatory: ["right_gui"],
          },
        },
        to: [
          {
            key_code: "8",
            modifiers: ["right_alt"],
          },
        ],
        type: "basic",
      },
      {
        from: {
          key_code: "9",
          modifiers: {
            mandatory: ["right_gui"],
          },
        },
        to: [
          {
            key_code: "9",
            modifiers: ["right_alt"],
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      // Quarterly "P"lan
    },
    // o = "Open" applications
    o: {
      1: app("Bitwarden"),
      a: app("Arc"),
      g: app("Google Chrome"),
      v: app("Visual Studio Code - Insiders"),
      d: app("Discord"),
      s: app("Slack"),
      t: app("Warp"),
      // "M"essages
      m: app("Texts"),
      f: app("Finder"),
      p: app("Spotify"),
    },

    // w = "Window" via rectangle.app
    w: {
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
    },

    // s = "System"
    s: {
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      // "D"o not disturb toggle
      d: open(`raycast://extensions/yakitrak/do-not-disturb/toggle`),
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      c: open("raycast://extensions/raycast/system/open-camera"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
