# Park Street Survivor

## Interface

- Loading page

- Splash page

- Start page
  - Start
    - -> Time wheel(Day 1 unlock)
      - > Delete Save Button
      - > The Unlock System + Jump Storyline + Storyline Review
      - -> Day 1 room
  - Help
    - Control Keys
      - WSAD & Arrow Keys -> Direction / Select
      - Space -> Mobile Interactive
      - E -> Static Interactive
      - P -> Pause
      - Enter -> Enter
    - **Character Archive**
      - Six Profiles
      - Unlock new sentence / Description changes after unlocking a new day
    - Item Encyclopedia
      - Beneficial
        - Unlock all except for NPC Tools after the first day
      - Hazards
        - Unlock all  except for paddle after the first day
  - Setting
    - -> Volume
      - Background
      - Sound Effect
    - -> Share

- Day 1 room
  - -> Desk
    - -> Backpack(Spilt the screen)
      - -> (Left half)Bag
      - -> (Right half)Table with things on top to choose(6 things)
        - Student ID
        - Computer
        - NPC tools
      - -> (Left top)Exit
  - -> Door(Exit)
    - -> Day 1 climb
  - -> Bed(Next to player initial location)

- Day 1 climb
  - -> Top
    - Health bar
    - Distance to uni
    - Effects showing
    - Clock
    - -> Stop button
  - -> Roads
    - -> Obstacles
    - -> Tools
  - -> To the top
    - -> Enter the Wills Memorial Building
      - -> Meet npc 1
  - -> Fail
    - Hit by large cars
    - Not enough health bar
    - Late for uni


## Obstacles

- Mobile
  - Large Cars
    - e.g.
      - Bus
      - Ambulance
      - Fire Truck
    - Effect
      - Immediately die
  - Small Cars
    - e.g.
      - Any normal cars
      - Police Car
    - Effect
      - Decrease blood
      - Bounce back for several meters(?)
  - Scooter
    - Effect
      - Decrease blood
      - Bounce back for several meters(?)

- Static
  - Homeless
    - Effect
      - Dialog box covering part of the road
      - Bounce to the opposite side
  - Promoter
    - Effect
      - Flyer covering eyesight
      - Press space to throw the flyer away
        - Flyer attacks any obstacles in front of player
  - Paddle
    - Effect
      - Half-transparent rain and dirt cover half of the eyesight
      - Slow the player's speed

## Street Layout

| Zone | Coordinate Range (X) | Width | Purpose |
| :--- | :--- | :--- | :--- |
| Left Scenery | 0 - 500 | 500px | Art Integration (Houses/Trees) |
| Left Sidewalk | 500 - 700 | 200px | NPC / Pavement Hazards |
| Lane 1 | 700 - 960 | 260px | Left Vehicle Lane |
| Lane 2 | 960 - 1220 | 260px | Right Vehicle Lane |
| Right Sidewalk | 1220 - 1420 | 200px | NPC / Pavement Hazards |
| Right Scenery | 1420 - 1920 | 500px | Art Integration (Houses/Trees) |

## PSS UI Color Palette

### Primary Backgrounds

Name	RGB	Hex	Usage
Deep Void	22, 10, 48	#160A30	Default button/panel bg
Active Purple	42, 12, 75	#2A0C4B	Focused/selected bg
Panel Dark	15, 6, 32	#0F0620	Empty slot bg

### Borders & Strokes

Name	RGB	Hex	Usage
Idle Border	130, 65, 210	#8241D2	Default border
Hover Border	160, 80, 230	#A050E6	Mouse hover
Active Border	190, 110, 255	#BE6EFF	Selected/focused
Glow	170, 90, 255	#AA5AFF	Outer glow effect
Inner Rim	180, 110, 255	#B46EFF	Subtle inner highlight

### Text & Icons

Name	RGB	Hex	Usage
Gold	255, 215, 0	#FFD700	Main text, titles, arrows
Dimmed Lavender	140, 100, 200	#8C64C8	Inactive/locked text
Warm Toast	255, 200, 80	#FFC850	Toast/hint messages
Text Outline	0, 0, 0 @ 70%	#000000B3	Bold stroke behind text

### Accent (for special states)

Name	RGB	Hex	Usage
Toast Border	255, 160, 60	#FFA03C	Warning/info border
Hot Pink	255, 20, 147	#FF1493	Selected nav card 

### (TimeWheel)

Dreamcore Pink	255, 105, 180	#FF69B4	Cloud glow, day number
For arrow images and buttons
Gold #FFD700 for the icon/content layer and Deep Void #160A30 + Idle Border #8241D2 for the frame. If you need a disabled/locked state, use Dimmed Lavender #8C64C8 on a darker bg.
