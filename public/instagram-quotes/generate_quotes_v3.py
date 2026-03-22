#!/usr/bin/env python3
"""
Generate Instagram Stories quote graphics for The Live Now Club
V3: Clean minimal - cream, big text, pink accent, logo
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Brand colors
CREAM = (250, 247, 242)       # #FAF7F2
CHARCOAL = (26, 26, 26)       # #1A1A1A
PINK = (232, 74, 138)         # #E84A8A

# Instagram Stories (9:16 vertical)
WIDTH = 1080
HEIGHT = 1920

# Asset paths
ASSETS_DIR = "/Users/louiseireland/Projects/livenowclub/public"
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
        "/System/Library/Fonts/NewYork.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
    ]

    for path in fallbacks:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
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
    """Create a clean minimal quote image."""

    img = Image.new('RGB', (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(img)

    # Typography - BIG and bold
    quote_font = get_font("Georgia", 74)
    source_font = get_font("Menlo", 30)

    quote = quote_data["quote"]
    source = f"— {quote_data['source']}"

    # Wrap quote text
    max_text_width = WIDTH - 140
    lines = wrap_text(quote, quote_font, max_text_width, draw)

    # Calculate text block height
    line_height = 105
    text_block_height = len(lines) * line_height

    # Center text vertically (slightly above true center for visual balance)
    text_start_y = (HEIGHT - text_block_height) // 2 - 80

    # Draw pink accent bar above quote
    bar_y = text_start_y - 60
    bar_width = 80
    bar_height = 6
    bar_x = (WIDTH - bar_width) // 2
    draw.rectangle([(bar_x, bar_y), (bar_x + bar_width, bar_y + bar_height)], fill=PINK)

    # Draw quote lines (centered)
    y = text_start_y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=quote_font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, y), line, font=quote_font, fill=CHARCOAL)
        y += line_height

    # Draw source attribution
    y += 50
    bbox = draw.textbbox((0, 0), source, font=source_font)
    text_width = bbox[2] - bbox[0]
    x = (WIDTH - text_width) // 2
    draw.text((x, y), source, font=source_font, fill=PINK)

    # Load and place logo at bottom
    try:
        logo = Image.open(LOGO_PATH).convert('RGBA')

        # Scale logo
        logo_target_width = 360
        logo_ratio = logo.height / logo.width
        logo_new_height = int(logo_target_width * logo_ratio)
        logo = logo.resize((logo_target_width, logo_new_height), Image.LANCZOS)

        # Position centered near bottom
        logo_x = (WIDTH - logo_target_width) // 2
        logo_y = HEIGHT - logo_new_height - 120

        img.paste(logo, (logo_x, logo_y), logo)
    except Exception as e:
        print(f"Warning: Could not load logo: {e}")

    # Draw small pink accent bar below logo
    bottom_bar_y = HEIGHT - 70
    draw.rectangle([(bar_x, bottom_bar_y), (bar_x + bar_width, bottom_bar_y + bar_height)], fill=PINK)

    return img


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for quote_data in QUOTES:
        img = create_quote_image(quote_data)
        filename = f"soulmd-v3-{quote_data['id']}.png"
        filepath = os.path.join(OUTPUT_DIR, filename)
        img.save(filepath, "PNG", quality=95)
        print(f"Created: {filename}")

    print(f"\nSaved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
