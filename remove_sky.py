from PIL import Image

def is_sky(r, g, b):
    if b > r + 15 and b > g + 10 and b > 130:
        return True
    if r > 210 and g > 210 and b > 220:
        return True
    return False

print("Opening image...")
img = Image.open("public/hero-af-mall.jpg").convert("RGBA")
data = img.getdata()

new_data = []
for item in data:
    r, g, b, a = item
    if is_sky(r, g, b):
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

print("Saving...")
img.putdata(new_data)
img.save("public/hero-af-mall-cutout.png")
print("Done!")
