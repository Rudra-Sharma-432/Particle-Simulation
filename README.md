# Particle Simulation

An interactive 2D gravitational particle simulation built with HTML5 Canvas and vanilla JavaScript. Place particles on a canvas and watch them attract, repel, and collide with each other in real time.

🔴 **[Live Demo](https://rudra-sharma-432.github.io/Particle-Simulation/)**

## Demo

Click anywhere on the canvas to spawn a particle. Adjust the mass slider to control the size of the next particle you place.

## Features

- **Gravitational attraction** — every particle pulls every other particle toward it
- **Collision repulsion** — particles push back when they get too close
- **Adjustable mass** — use the slider to set the mass (and size) of new particles
- **Pause / Unpause** — freeze the simulation at any moment
- **Refresh** — clear all particles and start over

## Controls

| Control | Action |
|---|---|
| Click on canvas | Spawn a particle at that position |
| Mass slider | Set the mass of the next particle (1–100) |
| Pause/Unpause button | Toggle the simulation on/off |
| Spacebar | Toggle the simulation on/off |
| Refresh button | Clear all particles |

## Project Structure

```
├── index.html      # Markup and UI
├── style.css       # Styling
├── particle.js     # Particle class and physics logic
└── main.js         # Canvas setup, event listeners, animation loop
```

## Physics

The simulation uses a simple Newtonian gravity model:

- **Attraction** — when two particles are farther apart than the sum of their radii (plus a small gap), the acceleration toward the other particle follows `a = G * m / r²`
- **Repulsion** — when particles are within that threshold, the force reverses to prevent overlap
- **Collision damping** — velocity is slightly reduced on contact to simulate energy loss
- **Integration** — Euler integration with a configurable timestep (`dt`)

Key constants in `main.js` / `particle.js`:

| Constant | Default | Description |
|---|---|---|
| `G` | `2` | Gravitational constant |
| `dt` | `0.1` | Timestep per frame |
| `gap` | `3` | Extra buffer between particle surfaces |
| `milliSecondsPerFrame` | `35` | Target delay between frames (ms) |
