from PIL import Image

def flood_fill_transparency(img_path, out_path, tolerance=60):
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    data = bytearray(img.tobytes())
    
    def get_idx(x, y):
        return (y * width + x) * 4
        
    start_idx = get_idx(0, 0)
    target_r, target_g, target_b = data[start_idx], data[start_idx+1], data[start_idx+2]
    
    def color_distance(r, g, b):
        return abs(r - target_r) + abs(g - target_g) + abs(b - target_b)
        
    queue = [(0, 0)]
    visited = set([(0, 0)])
    
    while queue:
        x, y = queue.pop(0)
        idx = get_idx(x, y)
        data[idx+3] = 0
        
        for nx, ny in [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]:
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    visited.add((nx, ny))
                    n_idx = get_idx(nx, ny)
                    nr, ng, nb = data[n_idx], data[n_idx+1], data[n_idx+2]
                    if color_distance(nr, ng, nb) < tolerance:
                        queue.append((nx, ny))
                        
    img2 = Image.frombytes("RGBA", (width, height), bytes(data))
    img2.save(out_path)

print("Running flood fill...")
flood_fill_transparency("public/hero-af-mall.jpg", "public/hero-af-mall-cutout.png", 60)
print("Done!")
