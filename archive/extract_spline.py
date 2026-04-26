import re

# Read the HTML file
with open('spline_page.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the array inside app.start([...])
# Using a more robust regex to capture the large array
match = re.search(r'app\.start\(\[([\d,]+)\]\)', content)

if match:
    data_str = match.group(1)
    # Convert comma-separated strings to bytes
    byte_array = bytes(int(x) for x in data_str.split(','))
    
    # Save to a binary file
    with open('scene.splinecode', 'wb') as f:
        f.write(byte_array)
    print(f"Successfully extracted {len(byte_array)} bytes to scene.splinecode")
else:
    print("Could not find the data array in the HTML file.")
