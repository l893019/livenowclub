#!/usr/bin/env python3
"""
Generate Instagram Stories quote graphics for The Live Now Club
V2: Watercolor wash + handwritten logo + better typography
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os

# Brand colors
CREAM = (250, 247, 242)       # #FAF7F2
CHARCOAL = (26, 26, 26)       # #1A1A1A

# Instagram Stories (9:16 vertical)
WIDTH = 1080
HEIGHT = 1920

# Asset paths
ASSETS_DIR = "/Users/louiseireland/Projects/livenowclub/public"
WATERCOLOR_PATH = f"{ASSETS_DIR}/images/watercolor-wash-pink.png"
LOGO_PATH = f"{ASSETS_DIR}/images/logo-handwritten.png"
OUTPUT_DIR = f"{ASSETS_DIR}/instagram-quotes"

# Selected quotes
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
]


def get_font(name, size):
    """Try to load a font, with fallbacks."""
    font_paths = [
        f"/System/Library/Fonts/Supplemental/{name}.ttf",
        f"/System/Library/Fonts/Supplemental/{name}.ttc",
        f"/System/Library/Fonts/{name}.ttf",
        f"/System/Library/Fonts/{name}.ttc",
        f"/Library/Fonts/{name}.ttf",
        f"/Library/Fonts/{name}.ttc",
        f"/Users/louiseireland/Library/Fonts/{name}.ttf",
        f"/Users/louiseireland/Library/Fonts/{name}.otf",
    ]

    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass

    # Fallback fonts
    fallbacks = [
        ("/System/Library/Fonts/Supplemental/Times New Roman.ttf", size),
        ("/System/Library/Fonts/NewYork.ttf", size),
        ("/System/Library/Fonts/Supplemental/Georgia.ttf", size),
    ]

    for path, sz in fallbacks:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, sz)
            except:
                pass

    return ImageFont.load_default()


def wrap_text(text, font, max_width, draw):
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


def create_quote_image(quote_data):
    """Create a quote image with watercolor wash and logo."""

    # Create base image with cream background
    img = Image.new('RGB', (WIDTH, HEIGHT), CREAM)

    # Load and place watercolor wash at top
    try:
        watercolor = Image.open(WATERCOLOR_PATH).convert('RGBA')

        # Scale watercolor to width, but smaller
        wc_ratio = watercolor.height / watercolor.width
        new_wc_width = WIDTH + 200  # Wider to bleed off sides
        new_wc_height = int(new_wc_width * wc_ratio * 0.7)  # Shorter
        watercolor = watercolor.resize((new_wc_width, new_wc_height), Image.LANCZOS)

        # Position at top, centered horizontally, bleeding off edges
        wc_x = (WIDTH - new_wc_width) // 2
        wc_y = -20  # Slight bleed off top

        # Create a version with adjusted opacity
        watercolor_faded = watercolor.copy()
        alpha = watercolor_faded.split()[3]
        alpha = ImageEnhance.Brightness(alpha).enhance(0.85)
        watercolor_faded.putalpha(alpha)

        img.paste(watercolor_faded, (wc_x, wc_y), watercolor_faded)
    except Exception as e:
        print(f"Warning: Could not load watercolor: {e}")

    draw = ImageDraw.Draw(img)

    # Typography - LARGE for Stories
    quote_font = get_font("Georgia", 72)
    source_font = get_font("Menlo", 32)

    quote = quote_data["quote"]
    source = f"— {quote_data['source']}"

    # Wrap quote text
    max_text_width = WIDTH - 120
    lines = wrap_text(quote, quote_font, max_text_width, draw)

    # Calculate text block height
    line_height = 100
    text_block_height = len(lines) * line_height

    # Position text in the middle area (below watercolor)
    # Watercolor takes roughly top 28% of image
    available_top = int(HEIGHT * 0.30)
    available_bottom = HEIGHT - 300  # Leave room for logo

    text_start_y = available_top + (available_bottom - available_top - text_block_height) // 2

    # Draw quote lines (centered)
    y = text_start_y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=quote_font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, y), line, font=quote_font, fill=CHARCOAL)
        y += line_height

    # Draw source attribution
    y += 40
    bbox = draw.textbbox((0, 0), source, font=source_font)
    text_width = bbox[2] - bbox[0]
    x = (WIDTH - text_width) // 2
    draw.text((x, y), source, font=source_font, fill=(180, 80, 120))  # Muted pink

    # Load and place logo at bottom
    try:
        logo = Image.open(LOGO_PATH).convert('RGBA')

        # Scale logo to reasonable size
        logo_target_width = 400
        logo_ratio = logo.height / logo.width
        logo_new_height = int(logo_target_width * logo_ratio)
        logo = logo.resize((logo_target_width, logo_new_height), Image.LANCZOS)

        # Position centered near bottom
        logo_x = (WIDTH - logo_target_width) // 2
        logo_y = HEIGHT - logo_new_height - 140

        img.paste(logo, (logo_x, logo_y), logo)
    except Exception as e:
        print(f"Warning: Could not load logo: {e}")

    return img


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for quote_data in QUOTES:
        img = create_quote_image(quote_data)
        filename = f"soulmd-v2-{quote_data['id']}.png"
        filepath = os.path.join(OUTPUT_DIR, filename)
        img.save(filepath, "PNG", quality=95)
        print(f"Created: {filename}")

    print(f"\nSaved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
