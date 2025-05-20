function match(
  svgString: string,
  data: { viewBox: string; dataPath: string },
): boolean {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  const svg = doc.querySelector('svg');
  const path = svg?.querySelector('path');

  if (!svg || !path) return false;

  const viewBox = svg.getAttribute('viewBox')?.trim();
  const d = path.getAttribute('d')?.trim();

  return viewBox === data.viewBox && d === data.dataPath;
}

export function validateSvg(
  name: string,
  svgString: string,
  data: { viewBox: string; dataPath: string },
): void {
  const valid = match(svgString, data);
  if (!valid) {
    console.warn(
      `SVG data does not match. Please update ${name}.svg or ${name}.ts`,
    );
  }
}
