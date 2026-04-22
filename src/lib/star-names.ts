// =============================================================================
// RANDOM STAR NAME GENERATOR FOR UTOPIAS
// =============================================================================

// Real star names mixed with invented star-sounding names
const STAR_NAMES = [
  // Real stars
  "Vega", "Altair", "Deneb", "Sirius", "Rigel", "Capella", "Arcturus",
  "Polaris", "Antares", "Betelgeuse", "Canopus", "Procyon", "Achernar",
  "Spica", "Fomalhaut", "Bellatrix", "Aldebaran", "Regulus", "Castor",
  "Pollux", "Mimosa", "Hadar", "Alnilam", "Alnitak", "Mintaka", "Shaula",
  "Gacrux", "Alioth", "Mirach", "Kochab", "Saiph", "Izar", "Schedar",
  "Albireo", "Rasalhague", "Almach", "Alphecca", "Menkent", "Diphda",
  // Invented star-sounding names
  "Veridian", "Solara", "Luminos", "Astraea", "Celestine", "Novarix",
  "Stellara", "Orionis", "Cygnara", "Velorum", "Pyralis", "Thalassa",
  "Aethon", "Helion", "Zephyria", "Caldera", "Meridia", "Borealis",
  "Australis", "Equinox", "Solstice", "Perihelion", "Zenith", "Nadir",
  "Umbra", "Penumbra", "Coronae", "Nebulae", "Auroria", "Cressida",
  "Lysander", "Oberon", "Titania", "Ariel", "Prospera", "Tempestia",
  "Serenova", "Pacifica", "Elysian", "Arcadian", "Avalonis",
];

export function generateStarName(): string {
  return STAR_NAMES[Math.floor(Math.random() * STAR_NAMES.length)];
}

export { STAR_NAMES };
