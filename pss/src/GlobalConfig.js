// Park Street Survivor - Global Configuration
// Responsibilities: Centralised constants for canvas, physics, layout, and level data.

// ─── ENGINE STATE CONSTANTS ───────────────────────────────────────────────────
// Integer mapping for the Finite State Machine (FSM) transitions.
const STATE_MENU         = 0;
const STATE_LEVEL_SELECT = 1;
const STATE_SETTINGS     = 2;
const STATE_ROOM         = 3;
const STATE_PAUSED       = 4;
const STATE_DAY_RUN      = 5;
const STATE_FAIL         = 6;
const STATE_WIN          = 7;
const STATE_LOADING      = 8;
const STATE_SPLASH       = 9;
const STATE_HELP         = 10;
const STATE_INVENTORY    = 11;

/**
 * Core canvas resolution, world-space boundaries, and scroll physics.
 * Implements the 2-2-2 layout: two scenery zones, two sidewalks, two road lanes each side.
 */
const GLOBAL_CONFIG = {
    resolutionW: 1920,
    resolutionH: 1080,
    scrollSpeed: 12, // Base velocity for world-space translation

    // THE 2-2-2 LAYOUT INFRASTRUCTURE
    // Strict coordinate boundaries for scenery, sidewalks, and the road network.
    layout: {
        leftSceneryEnd:   500,  // Right edge of left scenery zone
        leftSidewalkEnd:  700,  // Right edge of left sidewalk
        rightLaneEnd:     1220, // Right edge of the road (all four lanes)
        rightSidewalkEnd: 1420  // Right edge of right sidewalk
    },

    // LANE CALCULATIONS
    // Precise X-coordinates for center-point snapping and obstacle spawning.
    lanes: {
        lane1: 600,
        lane2: 830,
        lane3: 1090,
        lane4: 1320
    }
};

/**
 * Default player attributes applied at the start of every session.
 */
const PLAYER_DEFAULTS = {
    baseHealth:  100,
    healthDecay: 0.05, // Stamina depletion per frame during a run
    baseSpeed:   10
};

/**
 * Per-day level configuration: distance targets, time limits, and spawn rates.
 */
const DAYS_CONFIG = {
    1: {
        description: "Tutorial - Learn the Basics",
        totalDistance: 3000,
        realTimeLimit: 180, // 3 minutes for tutorial
        obstacleSpawnInterval: 90,
        baseScrollSpeed: 8,
        basePlayerSpeed: 10,
        healthDecay: 0.03,
        type: "TUTORIAL"
    },
    2: {
        description: "Day 2 - Running Late",
        totalDistance: 200,
        realTimeLimit: 90,
        obstacleSpawnInterval: 45,
        baseScrollSpeed: 10,
        basePlayerSpeed: 10,
        healthDecay: 0.05,
        type: "NORMAL"
    },
    3: {
        description: "Day 3 - Midweek Rush",
        totalDistance: 80,
        realTimeLimit: 75,
        obstacleSpawnInterval: 35,
        baseScrollSpeed: 12,
        basePlayerSpeed: 10,
        healthDecay: 0.06,
        type: "NORMAL"
    },
    4: {
        description: "Day 4 - Deadline Pressure",
        totalDistance: 100,
        realTimeLimit: 60,
        obstacleSpawnInterval: 30,
        baseScrollSpeed: 14,
        basePlayerSpeed: 10,
        healthDecay: 0.08,
        type: "NORMAL"
    },
    5: {
        description: "Day 5 - Final Challenge",
        totalDistance: 120,
        realTimeLimit: 50,
        obstacleSpawnInterval: 25,
        baseScrollSpeed: 16,
        basePlayerSpeed: 10,
        healthDecay: 0.10,
        type: "NORMAL"
    }
};

/**
 * Story recap entries for each day. Unlocked when the player reaches that day.
 * ── TO EDIT STORY TEXT: change the `lines` arrays below ──
 */
const STORY_RECAPS = {
    1: {
        title: "FIRST DAY",
        lines: [
            "Iris wakes up in her new dorm room at UoB.",
            "It's her very first day of university.",
            "She grabs her Student ID and Laptop,",
            "and heads out to find her lecture hall.",
            "The streets of Park Street are busier",
            "than she expected...",
            "",
            "Wiola greets her outside the building.",
            "\"Hey! You must be new here. Need directions?\"",
            "Iris nods nervously and clutches her bag.",
            "\"Just follow Park Street all the way down,\"",
            "Wiola says with a warm smile.",
            "\"Watch out for the traffic though —",
            "the drivers here are... enthusiastic.\"",
            "",
            "With a deep breath, Iris steps onto",
            "the pavement and begins her first run."
        ]
    },
    2: {
        title: "DAY 2 — RUNNING LATE",
        lines: [
            "Iris overslept! Her alarm didn't go off.",
            "She rushes to pack her bag and sprints",
            "out the door. The bus is already leaving —",
            "she'll have to run the whole way.",
            "Layla the bus driver waves as she zooms past.",
            "Can Iris make it to class on time?",
            "",
            "\"You again!\" Layla shouts from the bus.",
            "\"I saved you a seat but you're too slow!\"",
            "Iris grabs a vitamin gummy from her desk",
            "and shoves it in her mouth on the way out.",
            "The sugar rush gives her a small boost.",
            "",
            "The streets are even more chaotic today.",
            "Construction barriers line the pavement.",
            "She dodges a cyclist and narrowly avoids",
            "a puddle from last night's rain."
        ]
    },
    3: {
        title: "DAY 3 — MIDWEEK RUSH",
        lines: [
            "By Wednesday the city is at peak bustle.",
            "Yuki is handing out flyers on the corner.",
            "\"Free coffee samples at Tangle!\" she calls.",
            "Iris grabs a coffee to keep her energy up",
            "for the long run ahead.",
            "",
            "The traffic seems worse than ever today.",
            "She'll need to stay sharp.",
            "A group of tourists blocks the pavement.",
            "Iris weaves through them with practiced ease.",
            "\"Excuse me! Sorry! Coming through!\"",
            "",
            "Halfway there, the coffee kicks in.",
            "Her stamina bar glows a little brighter.",
            "She picks up the pace and pushes forward",
            "through the Wednesday afternoon crowds."
        ]
    },
    4: {
        title: "DAY 4 — DEADLINE PRESSURE",
        lines: [
            "A coursework deadline looms over Iris.",
            "She barely slept, fuelled by caffeine alone.",
            "Raymond offers some advice on the way out:",
            "\"Take the headphones. Trust me,\"",
            "\"they help block out the chaos.\"",
            "",
            "The headphones muffle the traffic noise.",
            "But the streets are more dangerous now.",
            "Delivery vans zip through narrow lanes.",
            "A skateboard rolls across her path.",
            "",
            "Iris clutches her laptop bag tighter.",
            "The deadline is in two hours.",
            "She cannot afford to be late today.",
            "One more day to survive...",
            "Just one more day after this."
        ]
    },
    5: {
        title: "DAY 5 — FINAL CHALLENGE",
        lines: [
            "Friday at last — the final gauntlet.",
            "Rain hammers down on Park Street.",
            "Charlotte cheers her on from the sidelines:",
            "\"You've got this, Iris! Last day!\"",
            "",
            "With rain boots and determination,",
            "Iris faces the busiest day yet.",
            "Every obstacle she's learned to dodge",
            "appears all at once in a final rush.",
            "",
            "Buses, bikes, puddles, tourists —",
            "the whole of Bristol is against her.",
            "But she's faster now. Stronger.",
            "Five days of Park Street have forged her",
            "into a seasoned urban survivor.",
            "",
            "The lecture hall appears in the distance.",
            "Will she conquer Park Street once and for all?",
            "Only one way to find out..."
        ]
    }
};
