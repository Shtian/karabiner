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
          {
            key_code: "left_shift",
            modifiers: ["left_control", "left_option", "left_command"],
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
      g: open("https://www.github.com"),
      j: open("https://jira.ice.net/secure/Dashboard.jspa"),
      o: open("https://octopus.ice.local/app#/Spaces-1/dashboard"),
      a: open("https://www.authenticlash.app/"),
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

    // s = "Shottr"
    s: {
      o: open("shottr://show"),
      a: open("shottr://grab/area"),
      f: open("shottr://grab/fullscreen"),
      w: open("shottr://grab/window"),
      t: open("shottr://ocr"),
      c: open("shottr://load/clipboard"),
      d: open("shottr://grab/append"),
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: open("raycast://extensions/mattisssa/spotify-player/togglePlayPause"),
      n: open("raycast://extensions/mattisssa/spotify-player/next"),
      b: open("raycast://extensions/mattisssa/spotify-player/previous"),
      l: open("raycast://extensions/mattisssa/spotify-player/nowPlaying"),
    },

    // r = "Raycast"
    r: {
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      o: open("raycast://extensions/raycast/system/open-camera"),
      c: open("raycast://extensions/raycast/raycast/confetti"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      p: open("raycast://extensions/jomifepe/bitwarden/search"),
      m: open("raycast://extensions/ratoru/google-maps-search/travelTo"),
      v: open("raycast://extensions/thomas/color-picker/pick-color"),
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
