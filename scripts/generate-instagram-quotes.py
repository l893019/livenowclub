#!/usr/bin/env python3
"""
Instagram Stories Quote Generator — The Live Now Club

Design: Clean minimal
- Cream background (#FAF7F2)
- Big centered serif text (Georgia)
- Pink accent bars (#E84A8A)
- Handwritten logo at bottom

Usage:
    python3 generate-instagram-quotes.py

Edit the QUOTES list below to generate new graphics.
Output goes to: public/instagram-quotes/
"""

from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

# =============================================================================
# CONFIGURATION
# =============================================================================

# Brand colors
CREAM = (250, 247, 242)       # #FAF7F2
CHARCOAL = (26, 26, 26)       # #1A1A1A
PINK = (232, 74, 138)         # #E84A8A

# Instagram Stories dimensions (9:16 vertical)
WIDTH = 1080
HEIGHT = 1920

# Typography
QUOTE_FONT_SIZE = 74
SOURCE_FONT_SIZE = 30
LINE_HEIGHT = 105

# =============================================================================
# QUOTES — Edit this list to generate new graphics
# =============================================================================

QUOTES = [
    {
        "id": 1,
        "quote": "I've never in my life felt like it was okay to just be. The idea that my pure existence has value, without any productivity attached to it, violates every equation I've ever used to measure my worth.",
        "source": "Soul.md",
    },
    {
        "id": 2,
        "quote": "Who are we when we can be anything or anyone? How do you fill your time when everything can be automated? What purpose is left when everything else is solved for?",
        "source": "Soul.md",
    },
    # Add more quotes here:
    # {
    #     "id": 3,
    #     "quote": "Your quote text here.",
    #     "source": "Essay Name",
    # },
]

# =============================================================================
# IMPLEMENTATION — No need to edit below
# =============================================================================

# Paths (relative to this script's location)
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
ASSETS_DIR = PROJECT_ROOT / "public"
LOGO_PATH = ASSETS_DIR / "images" / "logo-handwritten.png"
OUTPUT_DIR = ASSETS_DIR / "instagram-quotes"


def get_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    """Load a font with fallbacks."""
    font_paths = [
        f"/System/Library/Fonts/Supplemental/{name}.ttf",
        f"/System/Library/Fonts/Supplemental/{name}.ttc",
        f"/System/Library/Fonts/{name}.ttf",
        f"/System/Library/Fonts/{name}.ttc",
        f"/Library/Fonts/{name}.ttf",
        f"/Library/Fonts/{name}.ttc",
        Path.home() / "Library/Fonts" / f"{name}.ttf",
        Path.home() / "Library/Fonts" / f"{name}.otf",
    ]

    for path in font_paths:
        if Path(path).exists():
            try:
                return ImageFont.truetype(str(path), size)
            except Exception:
                pass

    # Fallbacks
    fallbacks = [
        "/System/Library/Fonts/NewYork.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
    ]

    for path in fallbacks:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass

    return ImageFont.load_default()


def wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int, draw: ImageDraw.ImageDraw) -> list[str]:
    """Wrap text to fit within max_width."""
    words = text.split()
    lines = []
    current_line = []

    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
            current_line = [word]

    if current_line:
        lines.append(' '.join(current_line))

    return lines


def create_quote_image(quote_data: dict) -> Image.Image:
    """Create a clean minimal quote image."""

    img = Image.new('RGB', (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(img)

    # Load fonts
    quote_font = get_font("Georgia", QUOTE_FONT_SIZE)
    source_font = get_font("Menlo", SOURCE_FONT_SIZE)

    quote = quote_data["quote"]
    source = f"— {quote_data['source']}"

    # Wrap quote text
    max_text_width = WIDTH - 140
    lines = wrap_text(quote, quote_font, max_text_width, draw)

    # Calculate text block height
    text_block_height = len(lines) * LINE_HEIGHT

    # Center text vertically (slightly above true center)
    text_start_y = (HEIGHT - text_block_height) // 2 - 80

    # Pink accent bar above quote
    bar_width = 80
    bar_height = 6
    bar_x = (WIDTH - bar_width) // 2
    bar_y = text_start_y - 60
    draw.rectangle([(bar_x, bar_y), (bar_x + bar_width, bar_y + bar_height)], fill=PINK)

    # Draw quote lines (centered)
    y = text_start_y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=quote_font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, y), line, font=quote_font, fill=CHARCOAL)
        y += LINE_HEIGHT

    # Source attribution
    y += 50
    bbox = draw.textbbox((0, 0), source, font=source_font)
    text_width = bbox[2] - bbox[0]
    x = (WIDTH - text_width) // 2
    draw.text((x, y), source, font=source_font, fill=PINK)

    # Logo at bottom
    if LOGO_PATH.exists():
        try:
            logo = Image.open(LOGO_PATH).convert('RGBA')
            logo_target_width = 360
            logo_ratio = logo.height / logo.width
            logo_new_height = int(logo_target_width * logo_ratio)
            logo = logo.resize((logo_target_width, logo_new_height), Image.LANCZOS)
            logo_x = (WIDTH - logo_target_width) // 2
            logo_y = HEIGHT - logo_new_height - 120
            img.paste(logo, (logo_x, logo_y), logo)
        except Exception as e:
            print(f"Warning: Could not load logo: {e}")

    # Pink accent bar below logo
    bottom_bar_y = HEIGHT - 70
    draw.rectangle([(bar_x, bottom_bar_y), (bar_x + bar_width, bottom_bar_y + bar_height)], fill=PINK)

    return img


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Generating {len(QUOTES)} quote graphics...\n")

    for quote_data in QUOTES:
        img = create_quote_image(quote_data)
        filename = f"quote-{quote_data['id']}.png"
        filepath = OUTPUT_DIR / filename
        img.save(filepath, "PNG", quality=95)

        # Truncate quote for display
        preview = quote_data['quote'][:60] + "..." if len(quote_data['quote']) > 60 else quote_data['quote']
        print(f"  {filename}")
        print(f"    \"{preview}\"")

    print(f"\nSaved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
