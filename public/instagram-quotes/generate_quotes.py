#!/usr/bin/env python3
"""
Generate Instagram quote graphics for The Live Now Club
Brand: Cream background, charcoal text, pink accents
"""

from PIL import Image, ImageDraw, ImageFont
import textwrap
import os

# Brand colors
CREAM = (250, 247, 242)       # #FAF7F2
CHARCOAL = (26, 26, 26)       # #1A1A1A
PINK = (232, 74, 138)         # #E84A8A
SAGE = (122, 139, 114)        # #7A8B72

# Instagram Stories (9:16 vertical)
WIDTH = 1080
HEIGHT = 1920

# Quotes from Soul.md essay
QUOTES = [
    {
        "quote": "The thing that has saved you is often the thing that slowly destroys you.",
        "attribution": "— Soul.md",
    },
    {
        "quote": "I've never in my life felt like it was okay to just be.",
        "attribution": "— Soul.md",
    },
    {
        "quote": "Our meaning is made. Connection transcends all technological innovation.",
        "attribution": "— Soul.md",
    },
    {
        "quote": "If you remove the doing, the productivity, the outputs... what remains?",
        "attribution": "— Soul.md",
    },
    {
        "quote": "The elimination of scarcity does not eliminate struggle.",
        "attribution": "— Soul.md",
    },
    {
        "quote": "You have to write new code.",
        "attribution": "— Soul.md",
    },
]


def get_font(name, size):
    """Try to load a font, fall back to default if not found."""
    font_paths = [
        f"/System/Library/Fonts/{name}.ttc",
        f"/System/Library/Fonts/{name}.ttf",
        f"/Library/Fonts/{name}.ttc",
        f"/Library/Fonts/{name}.ttf",
        f"/Users/louiseireland/Library/Fonts/{name}.ttf",
        f"/Users/louiseireland/Library/Fonts/{name}.otf",
    ]

    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass

    # Fallbacks
    fallbacks = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSText.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
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


def create_quote_image(quote_data, index):
    """Create a single quote image for Instagram Stories (9:16)."""
    img = Image.new('RGB', (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(img)

    # Fonts - larger for stories format
    quote_font = get_font("Georgia", 58)
    attr_font = get_font("Menlo", 30)
    brand_font = get_font("Menlo", 22)

    quote = quote_data["quote"]
    attribution = quote_data["attribution"]

    # Wrap quote text - more padding on sides for stories
    max_text_width = WIDTH - 140
    lines = wrap_text(quote, quote_font, max_text_width, draw)

    # Calculate total text height
    line_height = 80
    total_height = len(lines) * line_height + 120  # Extra for attribution

    # Start Y position (centered vertically, slightly above center for visual balance)
    start_y = (HEIGHT - total_height) // 2 - 100

    # Draw decorative elements - top pink line
    line_y = start_y - 80
    draw.rectangle([(WIDTH//2 - 50, line_y), (WIDTH//2 + 50, line_y + 4)], fill=PINK)

    # Draw quote lines (centered)
    y = start_y
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=quote_font)
        text_width = bbox[2] - bbox[0]
        x = (WIDTH - text_width) // 2
        draw.text((x, y), line, font=quote_font, fill=CHARCOAL)
        y += line_height

    # Draw attribution
    y += 60
    bbox = draw.textbbox((0, 0), attribution, font=attr_font)
    text_width = bbox[2] - bbox[0]
    x = (WIDTH - text_width) // 2
    draw.text((x, y), attribution, font=attr_font, fill=PINK)

    # Draw brand at bottom (away from story tap zones)
    brand_text = "THE LIVE NOW CLUB"
    bbox = draw.textbbox((0, 0), brand_text, font=brand_font)
    text_width = bbox[2] - bbox[0]
    x = (WIDTH - text_width) // 2
    draw.text((x, HEIGHT - 180), brand_text, font=brand_font, fill=SAGE)

    # Draw bottom pink line
    draw.rectangle([(WIDTH//2 - 50, HEIGHT - 140), (WIDTH//2 + 50, HEIGHT - 136)], fill=PINK)

    return img


def main():
    # Create output directory
    output_dir = os.path.dirname(os.path.abspath(__file__))

    for i, quote_data in enumerate(QUOTES, 1):
        img = create_quote_image(quote_data, i)
        filename = f"soulmd-quote-{i}.png"
        filepath = os.path.join(output_dir, filename)
        img.save(filepath, "PNG", quality=95)
        print(f"Created: {filename}")
        print(f"  \"{quote_data['quote'][:50]}...\"")

    print(f"\nAll {len(QUOTES)} quote images saved to: {output_dir}")


if __name__ == "__main__":
    main()
