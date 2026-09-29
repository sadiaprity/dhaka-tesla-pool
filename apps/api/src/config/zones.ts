export const DHAKA_ZONES = [
  "Banani", "Gulshan 1", "Mohakhali", "Dhanmondi",
  "Mirpur", "Uttara", "Farmgate", "Bashundhara",
];

export const ZONE_DISTANCE_METERS: Record<string, number> = {
  "Banani-Mohakhali": 4200,
  "Banani-Gulshan 1": 3100,
};

export const COMPATIBLE_ROUTES: Record<string, string[]> = {
  "Banani": ["Mohakhali", "Gulshan 1"],
};