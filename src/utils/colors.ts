import { NAMED_COLORS } from '../consts';

/* eslint-disable no-bitwise */

export type ColorInput = number | string;

/**
 * RGB color values normalized to 0-1 range
 */
export type RGB = {
  r: number;
  g: number;
  b: number;
};

/**
 * Converts various color formats to RGB object
 * @param color - Can be:
 *   - Hex number (0xff0000)
 *   - Hex string ("#ff0000" or "ff0000")
 *   - RGB string ("rgb(255, 0, 0)")
 *   - Named color ("red", "blue", "purple", etc.)
 * @returns RGB object with normalized values (0-1)
 */
export function colorToVec3(color: ColorInput): RGB {
  return parseColor(color);
}

/**
 * Parses various color formats and returns normalized RGB values
 */
function parseColor(color: ColorInput): RGB {
  if (typeof color === 'number') {
    return parseHexNumber(color);
  }

  if (typeof color === 'string') {
    return parseColorString(color);
  }

  throw new Error(
    `[react-native-backgrounds] Invalid color format: ${color}. Expected hex number, hex string, rgb() string, or named color.`
  );
}

/**
 * Parses hex number (0xff0000) to RGB
 */
function parseHexNumber(hex: number): RGB {
  return {
    r: ((hex >> 16) & 0xff) / 255,
    g: ((hex >> 8) & 0xff) / 255,
    b: (hex & 0xff) / 255,
  };
}

/**
 * Parses color string to RGB
 */
function parseColorString(color: string): RGB {
  const lowerColor = color.toLowerCase().trim();

  if (isRgbString(color)) {
    return parseRgbString(color);
  }

  if (isNamedColor(lowerColor)) {
    return parseNamedColor(lowerColor);
  }

  return parseHexString(color);
}

/**
 * Checks if string is in RGB format
 */
function isRgbString(color: string): boolean {
  return color.startsWith('rgb(') && color.endsWith(')');
}

/**
 * Parses RGB string ("rgb(255, 0, 0)") to RGB
 */
function parseRgbString(color: string): RGB {
  const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);

  if (!rgbMatch) {
    throw new Error(
      `[react-native-backgrounds] Invalid RGB format: ${color}. Expected rgb(r, g, b).`
    );
  }

  return {
    r: clampColorValue(parseInt(rgbMatch[1]!, 10)) / 255,
    g: clampColorValue(parseInt(rgbMatch[2]!, 10)) / 255,
    b: clampColorValue(parseInt(rgbMatch[3]!, 10)) / 255,
  };
}

/**
 * Checks if string is a named color
 */
function isNamedColor(color: string): boolean {
  return color in NAMED_COLORS;
}

/**
 * Parses named color ("red", "blue", etc.) to RGB
 */
function parseNamedColor(color: string): RGB {
  const hexValue = NAMED_COLORS[color];
  if (hexValue === undefined) {
    throw new Error(`[react-native-backgrounds] Unknown named color: ${color}`);
  }
  return parseHexNumber(hexValue);
}

/**
 * Parses hex string ("#ff0000" or "ff0000") to RGB
 */
function parseHexString(color: string): RGB {
  const hex = color.replace('#', '');

  if (hex.length !== 6) {
    throw new Error(
      `[react-native-backgrounds] Invalid hex color: ${color}. Must be 6 characters.`
    );
  }

  const num = parseInt(hex, 16);

  if (isNaN(num)) {
    throw new Error(
      `[react-native-backgrounds] Invalid hex color: ${color}. Must be valid hexadecimal.`
    );
  }

  return parseHexNumber(num);
}

/**
 * Clamps color value to valid range (0-255)
 */
function clampColorValue(value: number): number {
  return Math.max(0, Math.min(255, value));
}
