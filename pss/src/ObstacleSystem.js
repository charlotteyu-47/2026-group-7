// Hazard & Entity Management
// Responsibilities: Management of obstacle spawning, lifecycle, and collision detection logic.

class ObstacleManager {
    /**
     * CONSTRUCTOR: INITIALIZATION
     * Sets up the container for active hazards and initializes the spawning clock.
     */
    constructor() {
        // Container for all active obstacle instances currently in world-space
        this.obstacles = [];

        // Internal timer to regulate spawn frequency based on global difficulty
        this.spawnTimer = 0;

        this.currentLevelConfig = null;

        this.lastSpawnTime = 0;

        this.spriteCache = {};
    }


    setLevelConfig(difficultyConfig) {
        this.currentLevelConfig = difficultyConfig;
        console.log("[ObstacleManager] Level config set:", difficultyConfig.description);
    }


    getVariantForObstacle(obstacleType) {
        if (!this.currentLevelConfig || !this.currentLevelConfig.variants) {
            return null;
        }

        const variantConfig = this.currentLevelConfig.variants[obstacleType];
        if (!variantConfig || !variantConfig.variantPool) {
            return null;
        }

        const pool = variantConfig.variantPool;
        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex];
    }

    selectRandomObstacle() {
        if (!this.currentLevelConfig || !this.currentLevelConfig.availableObstacles) {
            console.log("[DEBUG] selectRandomObstacle: no config or no availableObstacles");
            return null;
        }

        const available = this.currentLevelConfig.availableObstacles;
        console.log(`[DEBUG] selectRandomObstacle: available=${JSON.stringify(available)}`);


        const buffObstacles = ["COFFEE", "EMPTY_SCOOTER"];
        const isBuff = Math.random() < this.currentLevelConfig.spawnConfig.buffSpawnRatio;
        console.log(`[DEBUG] isBuff=${isBuff}, buffSpawnRatio=${this.currentLevelConfig.spawnConfig.buffSpawnRatio}`);

        if (isBuff) {

            const buffInAvailable = available.filter(o => buffObstacles.includes(o));
            if (buffInAvailable.length > 0) {
                return buffInAvailable[Math.floor(Math.random() * buffInAvailable.length)];
            }
        }


        const hazardsInAvailable = available.filter(o => !buffObstacles.includes(o));
        console.log(`[DEBUG] hazardsInAvailable=${JSON.stringify(hazardsInAvailable)}`);

        if (hazardsInAvailable.length > 0) {
            const selected = hazardsInAvailable[Math.floor(Math.random() * hazardsInAvailable.length)];
            console.log(`[DEBUG] selected hazard: ${selected}`);
            return selected;
        }

        const fallback = available[Math.floor(Math.random() * available.length)];
        console.log(`[DEBUG] fallback selection: ${fallback}`);
        return fallback;
    }


    selectRandomLane() {
        const lanes = [1, 2, 3, 4];
        return lanes[Math.floor(Math.random() * lanes.length)];
    }


    spawnObstacle() {
        if (!this.currentLevelConfig) {
            console.log("[DEBUG] spawnObstacle: no currentLevelConfig");
            return;
        }

        const obstacleType = this.selectRandomObstacle();
        console.log(`[DEBUG] selectRandomObstacle returned: ${obstacleType}`);
        if (!obstacleType) {
            console.log("[DEBUG] spawnObstacle: obstacleType is null");
            return;
        }

        const config = OBSTACLE_CONFIG[obstacleType];
        if (!config) {
            console.warn(`[ObstacleManager] Unknown obstacle type: ${obstacleType}`);
            return;
        }


        const lane = this.selectRandomLane();
        if (!config.allowedLanes.includes(lane)) {
            console.log(`[DEBUG] Lane ${lane} not allowed for ${obstacleType}`);
            return;
        }


        const variantId = this.getVariantForObstacle(obstacleType);
        const variant = config.variants && config.variants.length > 0
            ? config.variants[Math.floor(Math.random() * config.variants.length)]
            : config.variants?.[0];

        const obstacle = {
            type: obstacleType,
            baseType: config.baseType,
            lane: lane,
            x: GLOBAL_CONFIG.lanes[`lane${lane}`],
            y: -config.size.height,
            width: config.size.width,
            height: config.size.height,
            speed: config.speed.min + Math.random() * (config.speed.max - config.speed.min),
            damage: config.damage,
            effect: config.effect,
            variant: variant,
            config: config,
            variantId: variantId
        };

        this.obstacles.push(obstacle);
        console.log(`[ObstacleManager] Spawned ${obstacleType} at lane ${lane}`);
    }

    /**

     */
    update(scrollSpeed, player, levelPhase) {

        if (levelPhase !== "RUNNING" || !this.currentLevelConfig) {
            console.log(`[ObstacleManager] Skipping spawn: phase=${levelPhase}, hasConfig=${!!this.currentLevelConfig}`);
            return;
        }

        const randVal = Math.random();
        const spawnRate = this.currentLevelConfig.spawnConfig.spawnRatePerFrame;
        console.log(`[ObstacleManager] Spawn check: rand=${randVal.toFixed(3)} vs rate=${spawnRate}`);

        if (randVal < spawnRate) {

            const lastObs = this.obstacles[this.obstacles.length - 1];
            const canSpawn = this.obstacles.length === 0 ||
                lastObs.y > this.currentLevelConfig.spawnConfig.minObstacleInterval;

            if (canSpawn) {
                console.log(`[ObstacleManager] GENERATING OBSTACLE!`);
                this.spawnObstacle();
            } else if (this.obstacles.length > 0) {
                const dist = lastObs.y - (-lastObs.config.size.height);
                console.log(`[ObstacleManager] Interval check failed: lastObs.y=${lastObs.y}, need > ${this.currentLevelConfig.spawnConfig.minObstacleInterval}, dist from spawn=${dist}`);
            }
        }


        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];


            const baseSpeed = PLAYER_DEFAULTS.baseSpeed;
            obs.y += obs.speed * baseSpeed * (scrollSpeed / GLOBAL_CONFIG.scrollSpeed);


            if (obs.y > GLOBAL_CONFIG.resolutionH + 100) {
                this.obstacles.splice(i, 1);
                continue;
            }


            if (this.checkCollision(player, obs)) {
                console.log(`[ObstacleManager] Collision with ${obs.type}!`);
                this.handleCollision(player, obs);
                this.obstacles.splice(i, 1);
            }
        }
    }

    display() {
        for (let obs of this.obstacles) {
            push();


            if (obs.variant && obs.variant.sprite) {
                let img = this.spriteCache[obs.variant.sprite];
                if (!img && assets && assets.previews) {

                    let keyToTry = obs.variant.name ? obs.variant.name.toLowerCase() : obs.type.toLowerCase();
                    img = assets.previews[keyToTry];

                    if (!img) {

                        keyToTry = obs.type.toLowerCase();
                        img = assets.previews[keyToTry];
                    }
                }
                if (img) {
                    imageMode(CENTER);
                    image(img, obs.x, obs.y, obs.width, obs.height);
                }
            }

            pop();
        }
    }

    checkCollision(player, obs) {

        const playerLeft = player.x - player.hitboxW / 2;
        const playerRight = player.x + player.hitboxW / 2;
        const playerTop = player.y - 20;
        const playerBottom = player.y + 20;

        const obsLeft = obs.x - obs.width / 2;
        const obsRight = obs.x + obs.width / 2;
        const obsTop = obs.y - obs.height / 2;
        const obsBottom = obs.y + obs.height / 2;

        return !(playerRight < obsLeft ||
            playerLeft > obsRight ||
            playerBottom < obsTop ||
            playerTop > obsBottom);
    }


    handleCollision(player, obs) {
        const config = obs.config;


        if (config.damage > 0) {
            player.takeDamage(config.damage, obs.type);
        }
    }

    /**
     * VICTORY PHASE: STOP SPAWNING
     * Called when victory phase is triggered.
     * Prevents new obstacles from spawning during victory zone.
     */
    stopSpawning() {
        console.log("[ObstacleManager] Spawning stopped - Victory phase active");
        this.obstacles = [];
    }
}