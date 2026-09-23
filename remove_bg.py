from rembg import remove
from PIL import Image

print("Loading image...")
input_img = Image.open("public/hero-af-mall.jpg")

print("Removing background...")
output_img = remove(input_img)

print("Saving cutout...")
output_img.save("public/hero-af-mall-cutout.png")
print("Done!")
