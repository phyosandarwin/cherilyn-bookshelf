import os
from rembg import remove
from PIL import Image

def process_images(input_folder, output_folder, target_size=(256, 256)):
    # Ensure output folder exists
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)

            # Open the image
            with open(input_path, 'rb') as file:
                input_image = file.read()

            # Remove background
            output_image = remove(input_image)

            # Convert to PIL Image for resizing
            image = Image.open(io.BytesIO(output_image)).convert("RGBA")

            # Resize the image to the target size
            image = image.resize(target_size, Image.ANTIALIAS)

            # Save the processed image
            image.save(output_path, format="PNG")

if __name__ == "__main__":
    input_folder = "c:\\Users\\Phyo Sandar Win\\Desktop\\Others\\cherilyn-bookshelf\\input_images"
    output_folder = "c:\\Users\\Phyo Sandar Win\\Desktop\\Others\\cherilyn-bookshelf\\output_images"
    process_images(input_folder, output_folder)
