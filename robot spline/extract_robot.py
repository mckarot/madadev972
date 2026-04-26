import re

html_url = "https://my.spline.design/robotfollowcursorforlandingpage-7xLru0hbHvskxNBuDrYk5WQf/"
import urllib.request

# Download HTML
with urllib.request.urlopen(html_url) as response:
    content = response.read().decode('utf-8')

# Find the array inside app.start([...])
match = re.search(r'app\.start\(\[([\d,]+)\]\)', content)

if match:
    data_str = match.group(1)
    byte_array = bytes(int(x) for x in data_str.split(','))
    
    with open('robot_landing.splinecode', 'wb') as f:
        f.write(byte_array)
    print(f"Extraction réussie : {len(byte_array)} octets extraits.")
else:
    print("Données non trouvées.")
