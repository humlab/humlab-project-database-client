import os
from PIL import Image

# Set the main directory path and desired width
directory = "../unprocessed-assets"  # Input directory
output_directory = "../processed-assets"  # Output directory for resized images
max_width = 600  # Desired maximum width in pixels

# Ensure output directory exists
os.makedirs(output_directory, exist_ok=True)

# Loop through all directories and files recursively
for root, _, files in os.walk(directory):
    for filename in files:
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif')):
            img_path = os.path.join(root, filename)
            
            # Define output path maintaining the same subdirectory structure
            relative_path = os.path.relpath(root, directory)
            output_path_dir = os.path.join(output_directory, relative_path)
            os.makedirs(output_path_dir, exist_ok=True)
            output_path = os.path.join(output_path_dir, filename)
            
            with Image.open(img_path) as img:
                # Resize image if it's wider than the max width
                if img.width > max_width:
                    aspect_ratio = img.height / img.width
                    new_height = int(max_width * aspect_ratio)
                    resized_img = img.resize((max_width, new_height), Image.LANCZOS)
                    output_path = os.path.join(output_path_dir, filename)
                    resized_img.save(output_path, optimize=True, quality=85)
                    print(f"Resized {filename} and saved to {output_path}")
