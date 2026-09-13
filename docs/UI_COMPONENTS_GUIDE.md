# Hello Corona UI Components Guide

This guide explains the reusable UI patterns already used by the application. The examples are intentionally close to the source so they can be copied into another HUD-style React application.

## 1. World details list

The world details panel is composed in layers:

```jsx
<div className="world-dashboard-details flex-col">
  <CountryDetails country={selectedCountry} />
  <GraphRows countries={countries} onSelectCountry={onSelectCountry} />
</div>
```

`CountryDetails` owns the title and the data list. The list is a semantic `ul` with one `li` per metric:

```jsx
<li className="country-details-item" style={{ color: category.colorHEX }}>
  <span className="title">
    {category.title}:&nbsp;
    <div className="wrap-icon-svg">{category.svgIcon}</div>
  </span>
  <span className="value" title={value}>{value}</span>
  <span className="percent" title={percent.toFixed(2)}>{percent}%</span>
</li>
```

The layout is made with a three-column grid rather than nested tables:

```scss
.country-details-item {
  display: grid;
  grid-template-columns: 48% 36% 16%;
}
```

Important details:

- The `title` is a flex row so text and an optional SVG icon stay aligned.
- `value` has a `title` attribute, which preserves the full value when the visible layout is narrow.
- `percent` is right-aligned in the last grid column.
- Population uses `grid-column: 2 / 4` because it has an informational icon beside the value.
- The list gets `overflow: auto` and the shared scrollbar mixin so the panel remains usable at small heights.

## 2. HUD layout frame

`HudLayout` is a visual overlay. It does not contain application data and has `pointer-events: none`, so controls underneath remain clickable.

The JSX creates four anchored frame pieces:

```jsx
<div className="hud-layout">
  <div className="ui-elements">
    <div className="border-left border">
      <div className="dot-1 dot" />
      <div className="line-1 line strong" />
      {/* more segmented lines */}
    </div>
    <div className="border-top">
      <div className="border-top-left border"><div className="dot-1 dot" /></div>
      <div className="border-top-right border"><div className="dot-1 dot" /></div>
    </div>
    <div className="border-right border"><div className="dot-1 dot" /></div>
    <div className="border-bottom border"><div className="dot-1 dot" /></div>
  </div>
</div>
```

The CSS pattern is based on absolute positioning and shared variables:

```scss
.ui-elements {
  position: absolute;
  inset: 0;
  height: 100vh;
  z-index: -1;
}

.border, .line {
  position: absolute;
}

.dot, .strong {
  box-shadow: 0 0 5px var(--color1-border) inset,
              0 0 5px var(--color1-border);
}
```

Use viewport-relative offsets and the existing `--main-padding` and `--navBar-height` variables so the frame follows the application shell. The small `dot` elements mark endpoints, while segmented `line` elements create the HUD rhythm without drawing a large SVG asset.

## 3. Country view loader SVG

The loader is built from two CSS light beams and one SVG containing concentric circles:

```jsx
<div className="wrap-loader-svg">
  <div className="lighter-1 lighter" />
  <div className="lighter-2 lighter" />
  <svg className="loader-svg" viewBox="0 0 100 100">
    <g className="g-loader">
      <circle className="light-source" r="15%" />
      <circle className="spiner-1 spiner" r="20%" />
      <circle className="spiner-2 spiner" r="30%" />
      <circle className="spiner-3 spiner" r="40%" />
    </g>
  </svg>
</div>
```

The SVG stays centered because `.g-loader` is translated by `50% 50%`. The parent SVG is tilted to create depth:

```scss
.loader-svg {
  width: 12vh;
  @include transform(perspective(100vh) scale(2.5) rotateX(70deg));
}
```

The circles are hollow (`fill: transparent`) and differ by stroke width and dash pattern:

- `spiner-1`: thin, rounded, short dashes, 8 second forward rotation.
- `spiner-2`: thicker, rounded dashes, 12 second reverse rotation.
- `spiner-3`: broad, square-ended dashes, 16 second forward rotation.

The animation is declared once and applied to the group through the circle classes:

```scss
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
```

The two `lighter` elements are CSS shapes with large asymmetric border radii and a vertical transparent-to-colored gradient. They create the glow behind the loader without another SVG asset. `lighter-1` uses an oval lower edge; `lighter-2` uses a much taller rounded flare.

## 4. Country list top section and repeating conic gradient

Each country list item has a `top-section` containing the flag and status information. Its background is a small repeating tile:

```scss
.top-section {
  display: flex;
  justify-content: space-evenly;
  background: repeating-conic-gradient(
    hsla(0, 0%, calc(-30% + 30% * var(--brightness)), 0.6) 0% 25%,
    hsla(0, 0%, calc(16% * var(--brightness)), 0.6) 0% 50%
  ) 0 0 / 1em 1em round;
}
```

`repeating-conic-gradient` produces the technical checker-like texture. The `1em 1em` background size keeps the pattern proportional to the text scale, while `--brightness` lets the whole theme respond to the selected color mode.

The inner status block uses `overflow: hidden`, `white-space: nowrap`, and `text-overflow: ellipsis` so long country names and status values do not break the card geometry.

## 5. Animated country search

`FilterInput` is a controlled input. Typing updates local state, lowercases the query, filters only the requested keys, and sends either the filtered list or `null` to the parent:

```jsx
const updateFilterValue = ev => {
  setFilterValue(ev.target.value);
  const value = ev.target.value.toLowerCase();
  if (!value) onFilter(null);
  else onFilter(list.filter(item =>
    filterKeys.some(key => item[key].toLowerCase().includes(value))
  ));
};
```

The animation is a sibling span rather than an input pseudo-element. That makes the effect easy to size:

```scss
.text-filter {
  position: relative;
  border-bottom: 2px solid var(--color1-border);
}

.span-animation::before {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: var(--color2-border);
  transition: all 0.2s ease;
}

.text-filter:focus-within {
  border-bottom-color: var(--color2-border);
}

.text-filter:focus-within .span-animation::before {
  width: 100%;
}
```

`focus-within` responds when the input receives focus, and the sibling selector grows the accent line from zero to full width. The clear button is an absolutely positioned SVG `X`; it calls the same update function with an empty value so clearing and typing use one state path.

## 6. Map controls and mobile interaction

The world map is a regular SVG with a `viewBox` stored in React state. Zoom changes update the zoom and x/y values together, which keeps the map centered around its current view. The map now supports:

- Wheel zoom through the standard `wheel` React event.
- `-` and `+` controls in the existing map options row.
- Pointer drag events, which cover mouse and touch input.
- `touch-action: none` and pointer capture so a finger can drag the map without the browser taking over the gesture.

The key pattern is:

```jsx
const zoomMap = direction => {
  setMapView(current => {
    const delta = current.zoom * ratioUpdateZoom * direction;
    const zoom = clamp(current.zoom + delta, minZoom, maxZoom);
    return {
      zoom,
      x: current.x - (zoom - current.zoom) / 2,
      y: current.y - (zoom - current.zoom) / 2
    };
  });
};
```

Use functional state updates for gesture-driven SVG state. It prevents stale closures and avoids mutating the previous React state object.
